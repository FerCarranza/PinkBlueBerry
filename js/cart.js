// Módulo mínimo de carrito para MVP
const Cart = (function(){
  const STORAGE_KEY = 'pb_cart_v1';
  let items = [];

  function load(){
    try{ const raw = localStorage.getItem(STORAGE_KEY); items = raw ? JSON.parse(raw) : []; }catch(e){ items = []; }
    updateUI();
  }

  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

  function addToCart(product){
    const existing = items.find(i=>i.id===product.id);
    if(existing){ existing.quantity += 1; }
    else { items.push({ ...product, quantity: 1 }); }
    save(); updateUI();
    // trigger petals animation on add
    if(window.Petals && typeof window.Petals.burst === 'function') window.Petals.burst();
  }

  function removeItem(id){ items = items.filter(i=>i.id!==id); save(); updateUI(); }

  function updateQuantity(id, qty){ const it = items.find(i=>i.id===id); if(!it) return; it.quantity = Math.max(1, qty); save(); updateUI(); }

  function getTotal(){ return items.reduce((s,i)=>s + (i.price * i.quantity), 0); }

  function clear(){ items = []; save(); updateUI(); }

  function updateUI(){
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if(!countEl || !itemsEl || !totalEl) return;
    const count = items.reduce((s,i)=>s+i.quantity,0);
    countEl.textContent = count;
    itemsEl.innerHTML = '';
    items.forEach(it=>{
      const li = document.createElement('li');
      li.textContent = `${it.name} x${it.quantity} - $${it.price * it.quantity}`;
      itemsEl.appendChild(li);
    });
    totalEl.textContent = getTotal();
  }

  // Exponer API
  return { load, addToCart, removeItem, updateQuantity, getTotal, clear };
})();

// Inicializar cuando DOM listo
document.addEventListener('DOMContentLoaded', ()=>{
  Cart.load();
  const openCart = document.getElementById('open-cart');
  const cartPanel = document.getElementById('cart-panel');
  if(openCart && cartPanel){
    openCart.addEventListener('click', ()=>{
      const hidden = cartPanel.hasAttribute('hidden');
      if(hidden){ cartPanel.removeAttribute('hidden'); cartPanel.setAttribute('aria-hidden','false'); }
      else { cartPanel.setAttribute('hidden',''); cartPanel.setAttribute('aria-hidden','true'); }
    });
  }

  // delegate add-to-cart buttons
  document.body.addEventListener('click', (e)=>{
    if(e.target && e.target.matches && e.target.matches('.add-to-cart')){
      const id = e.target.dataset.id;
      const name = e.target.dataset.name;
      const price = Number(e.target.dataset.price);
      Cart.addToCart({ id, name, price });
    }
  });
});
