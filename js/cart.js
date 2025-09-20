// Carrito con mejores prácticas: drawer accesible, controles de cantidad y checkout mock
const Cart = (function(){
  const STORAGE_KEY = 'pb_cart_v1';
  const ORDERS_KEY = 'pb_orders_v1';
  let items = [];

  // Focus trap simple
  let trap = { last: null, handler: null };
  function getFocusable(container){
    return Array.from(container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(el=>!el.disabled && el.tabIndex !== -1);
  }
  function enableTrap(container){
    trap.last = document.activeElement;
    const f = getFocusable(container);
    if(f[0]) f[0].focus();
    trap.handler = function(e){
      if(e.key !== 'Tab') return;
      const nodes = getFocusable(container);
      if(!nodes.length) return;
      const first = nodes[0], last = nodes[nodes.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', trap.handler, true);
  }
  function disableTrap(){ if(trap.handler){ document.removeEventListener('keydown', trap.handler, true); } if(trap.last && trap.last.focus){ try{ trap.last.focus(); }catch(e){} } trap.last=null; trap.handler=null; }

  function load(){ try{ const raw = localStorage.getItem(STORAGE_KEY); items = raw ? JSON.parse(raw) : []; }catch(e){ items = []; } render(); }
  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

  function addToCart(product){ const existing = items.find(i=>String(i.id)===String(product.id)); if(existing){ existing.quantity += 1; } else { items.push({ id: product.id, name: product.name, price: Number(product.price), quantity: 1 }); } save(); render(); if(window.Petals&&window.Petals.burst) window.Petals.burst(); }
  function removeItem(id){ items = items.filter(i=>String(i.id)!==String(id)); save(); render(); }
  function updateQuantity(id, qty){ const it = items.find(i=>String(i.id)===String(id)); if(!it) return; it.quantity = Math.max(1, Number(qty)||1); save(); render(); }
  function getSubtotal(){ return items.reduce((s,i)=> s + (Number(i.price) * Number(i.quantity)), 0); }
  function getTaxes(){ return Math.round(getSubtotal()*0.08*100)/100; } // 8% ejemplo
  function getTotal(){ return Math.round((getSubtotal()+getTaxes())*100)/100; }
  function clear(){ items = []; save(); render(); }

  function open(){
    const panel = document.getElementById('cart-panel'); if(!panel) return;
    if(panel.hasAttribute('hidden')) panel.removeAttribute('hidden');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    document.body.classList.add('cart-open');
    const openBtn = document.getElementById('open-cart'); if(openBtn) openBtn.setAttribute('aria-expanded','true');
    enableTrap(panel);
  }
  function close(){ const panel = document.getElementById('cart-panel'); if(!panel) return; panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); panel.setAttribute('hidden',''); document.body.classList.remove('cart-open'); const openBtn = document.getElementById('open-cart'); if(openBtn) openBtn.setAttribute('aria-expanded','false'); disableTrap(); }

  function render(){
    const countEl = document.getElementById('cart-count');
    const listEl = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxesEl = document.getElementById('cart-taxes');
    const totalEl = document.getElementById('cart-total');
    if(countEl){ countEl.textContent = items.reduce((s,i)=>s+i.quantity,0); }
    if(listEl){
      listEl.innerHTML = '';
      if(items.length===0){ listEl.innerHTML = '<li class="muted">Tu carrito está vacío</li>'; }
      items.forEach(it=>{
        const li = document.createElement('li'); li.className = 'cart-row';
        li.innerHTML = `
          <div class="cart-item-main">
            <div class="item-name">${it.name}</div>
            <div class="item-price">$${Number(it.price).toFixed(2)}</div>
          </div>
          <div class="cart-item-actions">
            <button class="qty-btn" data-dec="${it.id}" aria-label="Disminuir cantidad">−</button>
            <input class="qty-input" type="number" min="1" value="${it.quantity}" data-qty="${it.id}" aria-label="Cantidad">
            <button class="qty-btn" data-inc="${it.id}" aria-label="Aumentar cantidad">+</button>
            <button class="remove-btn" data-remove="${it.id}" aria-label="Eliminar del carrito">✕</button>
          </div>
        `;
        listEl.appendChild(li);
      });
    }
    if(subtotalEl) subtotalEl.textContent = getSubtotal().toFixed(2);
    if(taxesEl) taxesEl.textContent = getTaxes().toFixed(2);
    if(totalEl) totalEl.textContent = getTotal().toFixed(2);
  }

  function beginCheckout(){
    if(items.length===0){ alert('Tu carrito está vacío'); return; }
    const modal = document.getElementById('cart-payment-modal'); if(!modal) return;
    modal.setAttribute('aria-hidden','false'); modal.style.display='flex';
    // simple focus
    const first = modal.querySelector('input,button,select,textarea'); if(first) first.focus();
  }
  function cancelCheckout(){ const modal = document.getElementById('cart-payment-modal'); if(!modal) return; modal.setAttribute('aria-hidden','true'); modal.style.display='none'; }
  function submitCheckout(){
    // mock validate
    const name = (document.getElementById('cp-name')||{}).value||'';
    const email = (document.getElementById('cp-email')||{}).value||'';
    const number = (document.getElementById('cp-card')||{}).value||'';
    if(!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[0-9\s]{12,19}$/.test(number)){
      alert('Completa los datos de pago correctamente'); return;
    }
    // build order
    const order = {
      id: 'PB' + Math.floor(100000 + Math.random()*900000),
      items: items.map(i=>({ id:i.id, name:i.name, price:i.price, quantity:i.quantity })),
      subtotal: getSubtotal(), taxes: getTaxes(), total: getTotal(),
      customer: { name, email },
      createdAt: new Date().toISOString(),
      status: 'paid'
    };
    try{ const raw = localStorage.getItem(ORDERS_KEY); const list = raw? JSON.parse(raw):[]; list.push(order); localStorage.setItem(ORDERS_KEY, JSON.stringify(list)); }catch(e){}
    clear(); cancelCheckout(); close();
    if(window.showNotification) showNotification('Pago realizado. ¡Gracias por tu compra!');
  }

  // Public API
  return { load, addToCart, removeItem, updateQuantity, getTotal, open, close, beginCheckout, cancelCheckout, submitCheckout };
})();

// Inicializar y wiring
document.addEventListener('DOMContentLoaded', ()=>{
  Cart.load();
  const openBtn = document.getElementById('open-cart'); if(openBtn){ openBtn.addEventListener('click', ()=>{ Cart.open(); }); }
  const panel = document.getElementById('cart-panel');
  if(panel){
    // close buttons
    const closeBtn = document.getElementById('cart-close'); if(closeBtn) closeBtn.addEventListener('click', ()=> Cart.close());
    // delegate quantity and remove
    panel.addEventListener('click', (e)=>{
      const dec = e.target.closest('[data-dec]'); const inc = e.target.closest('[data-inc]'); const rem = e.target.closest('[data-remove]');
      if(dec){ const id = dec.dataset.dec; const input = panel.querySelector(`.qty-input[data-qty="${id}"]`); const val = Math.max(1, (Number(input.value)||1) - 1); input.value = val; Cart.updateQuantity(id, val); }
      if(inc){ const id = inc.dataset.inc; const input = panel.querySelector(`.qty-input[data-qty="${id}"]`); const val = (Number(input.value)||1) + 1; input.value = val; Cart.updateQuantity(id, val); }
      if(rem){ const id = rem.dataset.remove; Cart.removeItem(id); }
    });
    panel.addEventListener('input', (e)=>{
      const qi = e.target.closest && e.target.closest('.qty-input');
      if(qi){ const id = qi.dataset.qty; Cart.updateQuantity(id, qi.value); }
    });
    // esc to close
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && panel.classList.contains('open')) Cart.close(); });
  }
  const checkoutBtn = document.getElementById('checkout-btn'); if(checkoutBtn){ checkoutBtn.addEventListener('click', ()=> Cart.beginCheckout()); }
  const cpCancel = document.getElementById('cp-cancel'); if(cpCancel){ cpCancel.addEventListener('click', ()=> Cart.cancelCheckout()); }
  const cpClose = document.getElementById('cp-close'); if(cpClose){ cpClose.addEventListener('click', ()=> Cart.cancelCheckout()); }
  const cpSubmit = document.getElementById('cp-submit'); if(cpSubmit){ cpSubmit.addEventListener('click', ()=> Cart.submitCheckout()); }

  // delegate add-to-cart
  document.body.addEventListener('click', (e)=>{
    const btn = e.target && e.target.matches && e.target.matches('.add-to-cart') ? e.target : (e.target.closest && e.target.closest('.add-to-cart'));
    if(btn){ const id = btn.dataset.id; const name = btn.dataset.name; const price = Number(btn.dataset.price); Cart.addToCart({ id, name, price }); }
  });
});
