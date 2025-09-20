// admin.js - manage products and reservations using localStorage
(function(){
  'use strict';
  // i18n helper
  function t(key, fallback){
    try{ return (window.i18n? i18n.t(key) : (fallback||key)); }
    catch(e){ return fallback||key; }
  }

  // Read file -> dataURL resized to maxSize (px)
  function readImageFileToDataUrl(file, maxSize){
    maxSize = maxSize || 800;
    return new Promise((resolve, reject)=>{
      try{
        const fr = new FileReader();
        fr.onerror = ()=> reject(new Error('read_error'));
        fr.onload = ()=>{
          const img = new Image();
          img.onload = ()=>{
            const w = img.width, h = img.height;
            let nw = w, nh = h;
            const scale = Math.max(nw, nh) > maxSize ? (maxSize / Math.max(nw, nh)) : 1;
            nw = Math.round(nw * scale); nh = Math.round(nh * scale);
            const canvas = document.createElement('canvas');
            canvas.width = nw; canvas.height = nh;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, nw, nh);
            try{ resolve(canvas.toDataURL('image/jpeg', 0.88)); }
            catch(e){ resolve(fr.result); }
          };
          img.onerror = ()=> reject(new Error('image_error'));
          img.src = fr.result;
        };
        fr.readAsDataURL(file);
      }catch(e){ reject(e); }
    });
  }
  const PROD_KEY = 'pb_products_v1';
  const RES_KEY = 'pb_reservations_v1';
  const STY_KEY = 'pb_stylists_v1';

  // Helper: return inline SVG for named icon
  function getIcon(name){
    const common = 'width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"';
    switch(name){
      case 'edit': return `<svg ${common}><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor"/></svg>`;
      case 'delete': return `<svg ${common}><path d="M6 7h12v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7zm3-4h6l1 1H8l1-1z" fill="currentColor"/></svg>`;
      case 'notify': return `<svg ${common}><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor"/></svg>`;
      case 'pay': return `<svg ${common}><path d="M2 7h20v2H2V7zm2 4h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6z" fill="currentColor"/></svg>`;
      case 'move': return `<svg ${common}><path d="M12 2v6l4-4-4-4v6zM4 12h6l-4 4 4 4H4v-8zM18 12h2v10h-2V12z" fill="currentColor"/></svg>`;
      case 'arrow-left': return `<svg ${common}><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case 'arrow-right': return `<svg ${common}><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      default: return '';
    }
  }

  // Default image helpers (Unsplash Source URLs)
  function getDefaultProductImage(p){
    const name = (p && p.name || '').toLowerCase();
    if(name.includes('champ') || name.includes('shamp')) return 'https://source.unsplash.com/800x800/?shampoo,bottle,cosmetics';
    if(name.includes('acond') || name.includes('condit')) return 'https://source.unsplash.com/800x800/?conditioner,bottle,cosmetics';
    if(name.includes('aceite') || name.includes('oil')) return 'https://source.unsplash.com/800x800/?hair,oil,bottle';
    if(name.includes('jab') || name.includes('soap')) return 'https://source.unsplash.com/800x800/?soap,handmade,organic';
    return 'https://source.unsplash.com/800x800/?haircare,cosmetics,product';
  }
  function getDefaultStylistImage(s){
    return 'https://source.unsplash.com/800x1000/?hairdresser,portrait,studio';
  }
  function ensureDefaultImages(){
    try{
      let prods = loadProducts(); let changed=false;
      prods.forEach(p=>{ if(!p.image){ p.image = getDefaultProductImage(p); changed=true; } });
      if(changed) saveProducts(prods);
    }catch(e){}
    try{
      let sts = loadStylists(); let changedS=false;
      sts.forEach(s=>{ if(!s.image){ s.image = getDefaultStylistImage(s); changedS=true; } });
      if(changedS) saveStylists(sts);
    }catch(e){}
  }

  // Loyalty logs rendering
  let _lpCache = [];
  let _lpPage = 1;
  const LP_PER_PAGE = 5;
  function renderLoyaltyLogs(filters){
    const root = document.getElementById('lp-results'); if(!root) return;
    const logs = (window.Loyalty? Loyalty.getLog(filters||{}) : []);
    _lpCache = logs.slice(); _lpPage = 1;
    root.innerHTML = '';
    if(!logs.length){ root.innerHTML = '<div class="muted">No hay registros</div>'; return; }
    function renderPage(page){
      root.innerHTML = '';
      const total = _lpCache.length;
      const totalPages = Math.max(1, Math.ceil(total / LP_PER_PAGE));
      _lpPage = Math.min(Math.max(1, page||1), totalPages);
      const start = (_lpPage-1) * LP_PER_PAGE;
      const rows = _lpCache.slice(start, start + LP_PER_PAGE);

      const table = document.createElement('table'); table.className = 'res-table';
      table.innerHTML = `
        <thead>
          <tr>
            <th>Fecha</th><th>Email</th><th>Nombre</th><th>Puntos</th><th>Tipo</th><th>Origen</th><th>Monto</th><th>Orden</th><th>Reserva</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      const tbody = table.querySelector('tbody');
      rows.forEach(l=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${l.createdAt}</td>
          <td>${l.email}</td>
          <td>${l.name||''}</td>
          <td>${l.points}</td>
          <td>${l.type||''}</td>
          <td>${l.source||''}</td>
          <td>${l.amount!=null? ('$'+l.amount): ''}</td>
          <td>${l.orderId||''}</td>
          <td>${l.reservationId||''}</td>
        `;
        tbody.appendChild(tr);
      });
      // pager
      const pager = document.createElement('div'); pager.className = 'res-pager';
      const prev = Math.max(1, _lpPage-1);
      const next = Math.min(totalPages, _lpPage+1);
      pager.innerHTML = `
        <div class="pager-controls">
          ${iconButton('arrow-left','Anterior', `class=\"btn page-btn\" data-lp-page=\"${prev}\" ${_lpPage<=1? 'disabled':''}`)}
          <span class="pager-info">Página ${_lpPage} de ${totalPages}</span>
          ${iconButton('arrow-right','Siguiente', `class=\"btn page-btn\" data-lp-page=\"${next}\" ${_lpPage>=totalPages? 'disabled':''}`)}
        </div>`;

      root.appendChild(table);
      root.appendChild(pager);
    }
    renderPage(1);
    // delegate click on pager
    root.addEventListener('click', (e)=>{
      const btn = e.target.closest && e.target.closest('[data-lp-page]');
      if(!btn) return;
      const p = Number(btn.getAttribute('data-lp-page'))||1;
      renderPage(p);
    });
  }
  // Image URL validation helper
  function setupImagePreview(inputId, previewId, errorId){
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const err = document.getElementById(errorId);
    if(!input) return;
    function clear(){ if(preview){ preview.style.display='none'; preview.removeAttribute('src'); } if(err){ err.textContent=''; } }
    input.addEventListener('input', ()=>{
      const url = (input.value || '').trim();
      if(!url){ clear(); return; }
      try{
        const img = new Image();
        img.onload = function(){ if(preview){ preview.src = url; preview.style.display='inline-block'; } if(err){ err.textContent=''; } };
        img.onerror = function(){ clear(); if(err){ err.textContent = 'URL de imagen inválida'; } };
        img.src = url;
      }catch(e){ clear(); if(err){ err.textContent = 'URL de imagen inválida'; } }
    });
  }

  function bindMobileFiltersToolbar(){
    const toolbar = document.getElementById('filters-toolbar');
    const pop = document.getElementById('mobile-filter-popover');
    const body = document.getElementById('mf-body');
    const btnClose = document.getElementById('mf-close');
    const btnApply = document.getElementById('mf-apply');
    const btnCancel = document.getElementById('mf-cancel');
    if(!toolbar || !pop || !body) return;
    function isSmall(){ return window.matchMedia && window.matchMedia('(max-width: 900px)').matches; }
    function openPopover(kind){
      body.innerHTML = '';
      // clone relevant controls
      if(kind==='stylist'){
        const sel = document.getElementById('filter-stylist').cloneNode(true); sel.id = 'mf-stylist'; sel.value = document.getElementById('filter-stylist').value; body.appendChild(wrapField('Estilista', sel));
      } else if(kind==='status'){
        const sel = document.getElementById('filter-status').cloneNode(true); sel.id = 'mf-status'; sel.value = document.getElementById('filter-status').value; body.appendChild(wrapField('Estado', sel));
      } else if(kind==='date'){
        const f = document.getElementById('filter-date-from').cloneNode(true); f.id='mf-date-from'; f.value = document.getElementById('filter-date-from').value;
        const t = document.getElementById('filter-date-to').cloneNode(true); t.id='mf-date-to'; t.value = document.getElementById('filter-date-to').value;
        body.appendChild(wrapField('Desde', f)); body.appendChild(wrapField('Hasta', t));
      } else if(kind==='search'){
        const q = document.getElementById('filter-search').cloneNode(true); q.id='mf-search'; q.value = document.getElementById('filter-search').value; body.appendChild(wrapField('Buscar', q));
      }
      pop.setAttribute('aria-hidden','false'); pop.style.display='flex';
    }
    function closePopover(){ pop.setAttribute('aria-hidden','true'); pop.style.display='none'; }
    function wrapField(label, node){ const div = document.createElement('div'); div.className = 'form-group'; const l = document.createElement('label'); l.textContent = label; div.appendChild(l); div.appendChild(node); return div; }

    function labelChips(){
      const tb = document.getElementById('filters-toolbar'); if(!tb) return;
      const status = document.getElementById('filter-status').value;
      const from = document.getElementById('filter-date-from').value;
      const to = document.getElementById('filter-date-to').value;
      const search = document.getElementById('filter-search').value;
      const statusChip = tb.querySelector('[data-filter="status"]'); if(statusChip){ statusChip.textContent = status && status!=='all' ? `Estado: ${status}` : 'Estado'; }
      const dateChip = tb.querySelector('[data-filter="date"]'); if(dateChip){ dateChip.textContent = (from||to) ? `Fecha: ${from||''}${to? ' → '+to:''}` : 'Fecha'; }
      const searchChip = tb.querySelector('[data-filter="search"]'); if(searchChip){ searchChip.textContent = search ? `Buscar: ${search}` : 'Buscar'; }
    }
    labelChips();

    toolbar.addEventListener('click', (e)=>{
      const chip = e.target.closest && e.target.closest('.chip');
      if(!chip || !isSmall()) return;
      const kind = chip.getAttribute('data-filter');
      if(kind==='clear'){
        document.getElementById('filter-status').value='all';
        document.getElementById('filter-stylist').value='';
        document.getElementById('filter-date-from').value='';
        document.getElementById('filter-date-to').value='';
        document.getElementById('filter-search').value='';
        const applyBtn = document.getElementById('filter-apply'); if(applyBtn) applyBtn.click(); else renderReservations();
        labelChips();
        return;
      }
      openPopover(kind);
    });
    btnClose && btnClose.addEventListener('click', closePopover);
    btnCancel && btnCancel.addEventListener('click', closePopover);
    btnApply && btnApply.addEventListener('click', ()=>{
      // write back values
      const s1 = document.getElementById('mf-stylist'); if(s1) document.getElementById('filter-stylist').value = s1.value;
      const s2 = document.getElementById('mf-status'); if(s2) document.getElementById('filter-status').value = s2.value;
      const d1 = document.getElementById('mf-date-from'); if(d1) document.getElementById('filter-date-from').value = d1.value;
      const d2 = document.getElementById('mf-date-to'); if(d2) document.getElementById('filter-date-to').value = d2.value;
      const q = document.getElementById('mf-search'); if(q) document.getElementById('filter-search').value = q.value;
      closePopover();
      // call existing apply
      const applyBtn = document.getElementById('filter-apply'); if(applyBtn) applyBtn.click(); else renderReservations();
      labelChips();
    });
  }

  // Return HTML for a button with icon and optional text. attrs should be a string of attributes (e.g. 'data-id="1" class="btn"')
  function iconButton(iconName, text, attrs=''){
    const svg = getIcon(iconName) || '';
    // show text in a span .btn-text for larger screens; CSS can hide it on small screens
    return `<button ${attrs} class="btn icon-btn">${svg}<span class="btn-text">${text}</span></button>`;
  }

  function loadProducts(){
    try{ const raw = localStorage.getItem(PROD_KEY); return raw ? JSON.parse(raw) : window.products || []; }catch(e){ return window.products || []; }
  }
  function saveProducts(list){ localStorage.setItem(PROD_KEY, JSON.stringify(list)); }

  function loadStylists(){
    try{ const raw = localStorage.getItem(STY_KEY); return raw ? JSON.parse(raw) : (window.appStylists || window.stylists || []); }catch(e){ return (window.appStylists || window.stylists || []); }
  }
  function saveStylists(list){ localStorage.setItem(STY_KEY, JSON.stringify(list)); }

  function loadReservations(){ try{ const raw = localStorage.getItem(RES_KEY); return raw ? JSON.parse(raw) : []; }catch(e){ return []; } }
  function saveReservations(list){ localStorage.setItem(RES_KEY, JSON.stringify(list)); }

  // Safe helpers
  function ensureArray(key){
    try{
      const raw = localStorage.getItem(key);
      if(!raw){ localStorage.setItem(key, JSON.stringify([])); return []; }
      const arr = JSON.parse(raw);
      if(Array.isArray(arr)) return arr;
      localStorage.setItem(key, JSON.stringify([]));
      return [];
    }catch(e){ localStorage.setItem(key, JSON.stringify([])); return []; }
  }

  function renderProducts(){
    const panel = document.getElementById('products-list');
    const list = loadProducts();
    panel.innerHTML = '';
    const isMobile = window.matchMedia && window.matchMedia('(max-width:900px)').matches;
  if(isMobile){
      // render products as a table under reservations (stacked)
      const table = document.createElement('table'); table.className = 'prod-table';
      table.innerHTML = `
        <thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr></thead>
        <tbody></tbody>
      `;
      const tbody = table.querySelector('tbody');
      list.forEach(p=>{
        const tr = document.createElement('tr');
        const thumb = p.image ? `<img src="${p.image}" alt="${p.name}" style="width:28px;height:28px;object-fit:cover;border-radius:6px;margin-right:6px;vertical-align:middle;"/>` : '';
        tr.innerHTML = `<td>${p.id}</td><td>${thumb}<strong>${p.name}</strong><div class="tiny muted">${p.description||''}</div></td><td>${p.category||''}</td><td>$${p.price||0}</td><td>${iconButton('edit', 'Editar', `data-edit-id=\"${p.id}\"`)} ${iconButton('delete', 'Eliminar', `data-delete-id=\"${p.id}\"`)}</td>`;
        tbody.appendChild(tr);
      });
      panel.appendChild(table);
      return;
    }
    list.forEach(p=>{
      const el = document.createElement('div'); el.className='list-item';
      const thumb = p.image ? `<img src="${p.image}" alt="${p.name}" style="width:32px;height:32px;object-fit:cover;border-radius:6px;margin-right:8px;vertical-align:middle;"/>` : '';
      el.innerHTML = `<div>${thumb}<strong>${p.name}</strong> <span class="muted">${p.category}</span><div class="tiny">${p.description||''}</div></div><div><button class="btn" data-edit-id="${p.id}">Editar</button> <button class="btn" data-delete-id="${p.id}">Eliminar</button></div>`;
      panel.appendChild(el);
    });
  }

  function renderStylistsAdmin(){
    const panel = document.getElementById('stylists-list');
    if(!panel) return;
    const list = loadStylists();
    panel.innerHTML = '';
    const isMobile = window.matchMedia && window.matchMedia('(max-width:900px)').matches;
    if(isMobile){
      const table = document.createElement('table'); table.className = 'res-table';
      table.innerHTML = `<thead><tr><th>ID</th><th>Nombre</th><th>Título</th><th>Rating</th><th>Acciones</th></tr></thead><tbody></tbody>`;
      const tbody = table.querySelector('tbody');
      list.forEach(s=>{
        const tr = document.createElement('tr');
        const thumb = s.image ? `<img src="${s.image}" alt="${s.name}" style="width:28px;height:28px;object-fit:cover;border-radius:6px;margin-right:6px;vertical-align:middle;"/>` : '';
        tr.innerHTML = `<td>${s.id}</td><td>${thumb}<strong>${s.name}</strong></td><td>${s.title||''}</td><td>${s.rating||''}</td><td>${iconButton('edit','Editar',`data-edit-sty=\"${s.id}\"`)} ${iconButton('delete','Eliminar',`data-delete-sty=\"${s.id}\"`)}</td>`;
        tbody.appendChild(tr);
      });
      panel.appendChild(table);
      return;
    }
    list.forEach(s=>{
      const el = document.createElement('div'); el.className = 'list-item';
      const thumb = s.image ? `<img src="${s.image}" alt="${s.name}" style="width:32px;height:32px;object-fit:cover;border-radius:6px;margin-right:8px;vertical-align:middle;"/>` : '';
      el.innerHTML = `<div>${thumb}<strong>${s.name}</strong> <span class="muted">${s.title||''}</span></div><div><button class="btn" data-edit-sty="${s.id}">Editar</button> <button class="btn" data-delete-sty="${s.id}">Eliminar</button></div>`;
      panel.appendChild(el);
    });
  }

  // Pagination / table support for mobile view
  let _reservationsCache = null;
  let _reservationsPage = 1;
  const RES_PER_PAGE = 5;

  function renderReservations(){
    // legacy entrypoint: render current reservations (unfiltered)
    const list = ensureArray(RES_KEY) || loadReservations();
    renderReservationsList(list, 1);
  }

  function renderReservationsList(list, page=1){
    if(!Array.isArray(list)) list = loadReservations();
    // sort list
    list.sort((a,b)=>{ if(!a.date && !b.date) return 0; if(!a.date) return 1; if(!b.date) return -1; return new Date(a.date + ' ' + (a.time||'00:00')) - new Date(b.date + ' ' + (b.time||'00:00')); });
    _reservationsCache = list.slice();
    _reservationsPage = page || 1;

    const panel = document.getElementById('reservations-list');
    panel.innerHTML = '';
    if(list.length===0){ panel.innerHTML = '<div class="muted">No hay reservas</div>'; return; }

    // Detect mobile/smaller screens to show table with pagination
    const isMobile = window.matchMedia && window.matchMedia('(max-width:900px)').matches;
    if(isMobile){
      renderReservationsTable(list, panel, _reservationsPage);
      return;
    }

    // Desktop: render card/list view
    list.forEach(r=>{
      const el = document.createElement('div'); el.className='list-item';
      el.innerHTML = `
        <div>
          <strong>${r.name}</strong>
          <div class="tiny">${r.serviceName} - ${r.date} ${r.time}</div>
          <div class="muted">${r.email} • ${r.phone}</div>
          <div class="tiny">${t('res_th_paid','Pago')}: ${r.paid ? '<strong style=\"color:green\">'+t('res_paid','Pagado')+'</strong>' : '<span style=\"color:#c00\">'+t('res_pending','Pendiente')+'</span>'} ${r.upsell? '• Tratamiento Premium':''}</div>
        </div>
        <div>
          ${iconButton('edit', t('action_edit','Editar'), `data-edit-res=\"${r.id}\"`)}
          ${iconButton('move', t('action_move','Mover'), `data-move-res=\"${r.id}\"`)}
          ${iconButton('pay', r.paid? t('action_mark_pending','Marcar Pendiente') : t('action_mark_paid','Marcar Pagado'), `data-toggle-paid=\"${r.id}\"`)}
          ${iconButton('notify', t('action_notify','Notificar'), `data-notify-res=\"${r.id}\"`)}
          ${iconButton('delete', t('action_delete','Eliminar'), `data-delete-res=\"${r.id}\"`)}
        </div>
      `;
      panel.appendChild(el);
    });
  }

  function renderReservationsTable(list, container, page=1){
    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / RES_PER_PAGE));
    page = Math.min(Math.max(1, page), totalPages);

    const start = (page-1) * RES_PER_PAGE;
    const pageItems = list.slice(start, start + RES_PER_PAGE);

    const table = document.createElement('table'); table.className = 'res-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>${t('res_th_id','ID')}</th>
          <th>${t('res_th_name','Nombre')}</th>
          <th>${t('res_th_service','Servicio')}</th>
          <th>${t('res_th_stylist','Estilista')}</th>
          <th>${t('res_th_date','Fecha')}</th>
          <th>${t('res_th_time','Hora')}</th>
          <th>${t('res_th_amount','Importe')}</th>
          <th>${t('res_th_paid','Pago')}</th>
          <th>${t('res_th_actions','Acciones')}</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');
    pageItems.forEach(r=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.id}</td>
        <td><strong>${r.name}</strong><div class="tiny muted">${r.email} • ${r.phone}</div></td>
        <td>${r.serviceName || ''}</td>
        <td>${r.stylistName || ''}</td>
        <td>${r.date || ''}</td>
        <td>${r.time || ''}</td>
        <td>$${r.amount || 0}</td>
        <td>${r.paid? '<span style="color:green">'+t('res_paid','Pagado')+'</span>':'<span style="color:#c00">'+t('res_pending','Pendiente')+'</span>'}</td>
        <td class="actions">
          ${iconButton('edit', t('action_edit','Editar'), `data-edit-res=\"${r.id}\"`)}
          ${iconButton('pay', r.paid? t('action_mark_pending','Marcar Pendiente'): t('action_mark_paid','Marcar Pagado'), `data-toggle-paid=\"${r.id}\"`)}
          ${iconButton('delete', t('action_delete','Eliminar'), `data-delete-res=\"${r.id}\"`)}
        </td>
      `;
      tbody.appendChild(tr);
    });

    // pagination controls with disabled states
    const pager = document.createElement('div'); pager.className = 'res-pager';
    const prevPage = Math.max(1, page-1);
    const nextPage = Math.min(totalPages, page+1);
    pager.innerHTML = `
      <div class="pager-controls">
        ${iconButton('arrow-left','Anterior', `class=\"btn page-btn\" data-page=\"${prevPage}\" ${page<=1? 'disabled':''}`)}
        <span class="pager-info">Página ${page} de ${totalPages}</span>
        ${iconButton('arrow-right','Siguiente', `class=\"btn page-btn\" data-page=\"${nextPage}\" ${page>=totalPages? 'disabled':''}`)}
      </div>
    `;

    container.appendChild(table);
    container.appendChild(pager);
  }

  // Helper to refresh current page when data mutates
  function refreshReservationsCurrentPage(){
    const list = _reservationsCache && _reservationsCache.length ? _reservationsCache : loadReservations();
    const totalPages = Math.max(1, Math.ceil(list.length / RES_PER_PAGE));
    if(_reservationsPage > totalPages) _reservationsPage = totalPages;
    renderReservationsList(list, _reservationsPage);
  }

  function bind(){
    // Save product
    const prodSave = document.getElementById('prod-save');
    if(prodSave){ prodSave.addEventListener('click', ()=>{
      const idField = document.getElementById('prod-id');
      const name = document.getElementById('prod-name').value.trim();
      const price = Number(document.getElementById('prod-price').value || 0);
      const category = document.getElementById('prod-category').value.trim();
      const emoji = document.getElementById('prod-emoji').value.trim();
      const image = document.getElementById('prod-image').value.trim();
      if(!name){ alert('Nombre requerido'); return; }
      const list = loadProducts();
      if(idField.value){ // edit
        const id = Number(idField.value);
        const idx = list.findIndex(p=>p.id===id);
        if(idx>=0){ list[idx] = { ...list[idx], name, price, category, emoji, image }; }
      } else { // create new
        const id = list.length ? Math.max(...list.map(p=>p.id))+1 : 1;
        list.push({ id, name, price, category, emoji, image });
      }
      saveProducts(list); renderProducts(); clearForm();
      alert('Producto guardado');
    }); }

    // Clear product form
    const prodClear = document.getElementById('prod-clear'); if(prodClear){ prodClear.addEventListener('click', ()=>{ clearForm(); }); }

    // Product list actions
    const prodList = document.getElementById('products-list');
    if(prodList){ prodList.addEventListener('click', (e)=>{
      const edit = e.target.closest('[data-edit-id]');
      const del = e.target.closest('[data-delete-id]');
      if(edit){ const id = Number(edit.dataset.editId); const list = loadProducts(); const p = list.find(x=>x.id===id); if(p){ document.getElementById('prod-id').value = p.id; document.getElementById('prod-name').value = p.name; document.getElementById('prod-price').value = p.price; document.getElementById('prod-category').value = p.category; document.getElementById('prod-emoji').value = p.emoji; document.getElementById('prod-image').value = p.image || ''; const prev = document.getElementById('prod-image-preview'); if(prev){ if(p.image){ prev.src = p.image; prev.style.display='inline-block'; } else { prev.style.display='none'; } } } }
      if(del){ if(confirm('Eliminar producto?')){ const id = Number(del.dataset.deleteId); let list = loadProducts(); list = list.filter(x=>x.id!==id); saveProducts(list); renderProducts(); } }
    }); }

    // Product image live preview + validation
    setupImagePreview('prod-image', 'prod-image-preview', 'prod-image-error');
    // Product file upload -> resize -> set data URL
    const prodFile = document.getElementById('prod-image-file');
    if(prodFile){
      prodFile.addEventListener('change', async ()=>{
        const file = prodFile.files && prodFile.files[0]; if(!file) return;
        try{
          const dataUrl = await readImageFileToDataUrl(file, 800);
          const urlInput = document.getElementById('prod-image'); const prev = document.getElementById('prod-image-preview');
          if(urlInput){ urlInput.value = dataUrl; }
          if(prev){ prev.src = dataUrl; prev.style.display = 'inline-block'; }
          const err = document.getElementById('prod-image-error'); if(err) err.textContent = '';
        }catch(e){ const err = document.getElementById('prod-image-error'); if(err) err.textContent = 'No se pudo procesar la imagen'; }
      });
    }

    // Reservations list actions (pagination, edit, move, toggle paid, notify, delete)
    const resList = document.getElementById('reservations-list');
    if(resList){ resList.addEventListener('click', (e)=>{
      const del = e.target.closest('[data-delete-res]');
      const edit = e.target.closest('[data-edit-res]');
      const move = e.target.closest('[data-move-res]');
      const togglePaid = e.target.closest('[data-toggle-paid]');
      const notify = e.target.closest('[data-notify-res]');

      if(edit){ const id = edit.dataset.editRes; openEditReservation(id); return; }

      const pageBtn = e.target.closest('.page-btn') || e.target.closest('[data-page]');
      if(pageBtn){ const targetPage = Number(pageBtn.dataset.page) || 1; renderReservationsList(_reservationsCache || loadReservations(), targetPage); return; }

      if(move){ const id = move.dataset.moveRes; openMoveReservation(id); return; }
      if(togglePaid){ const id = togglePaid.dataset.togglePaid; toggleReservationPaid(id); return; }
      if(notify){ const id = notify.dataset.notifyRes; sendNotificationForReservation(id); return; }
      if(del){ if(confirm('Eliminar reserva?')){ const id = del.dataset.deleteRes; let list = loadReservations(); list = list.filter(x=>String(x.id)!==String(id)); saveReservations(list); _reservationsCache = loadReservations(); refreshReservationsCurrentPage(); } }
    }); }

    // Clear all reservations
    const resClear = document.getElementById('reservations-clear'); if(resClear){ resClear.addEventListener('click', ()=>{ if(confirm('Limpiar todas las reservas?')){ saveReservations([]); renderReservations(); } }); }

    // Stylists list actions
    const styList = document.getElementById('stylists-list');
    if(styList){
      styList.addEventListener('click', (e)=>{
        const edit = e.target.closest('[data-edit-sty]');
        const del = e.target.closest('[data-delete-sty]');
        if(edit){ const id = Number(edit.dataset.editSty); const list = loadStylists(); const s = list.find(x=>x.id===id); if(s){ document.getElementById('sty-id').value = s.id; document.getElementById('sty-name').value = s.name || ''; document.getElementById('sty-title').value = s.title || ''; document.getElementById('sty-rating').value = s.rating || ''; document.getElementById('sty-emoji').value = s.emoji || ''; document.getElementById('sty-specialties').value = Array.isArray(s.specialties)? s.specialties.join(', ') : ''; const prev = document.getElementById('sty-image-preview'); const urlInput = document.getElementById('sty-image'); if(prev){ const url = (s.image||'').trim(); if(url){ prev.src = url; prev.style.display='inline-block'; } else { prev.style.display='none'; } } if(urlInput){ urlInput.value = s.image || ''; } } }
        if(del){ if(confirm('Eliminar estilista?')){ let list = loadStylists(); list = list.filter(x=>Number(x.id)!==Number(del.dataset.deleteSty)); saveStylists(list); renderStylistsAdmin(); } }
      });
    }

    // Loyalty logs filters
    const lpApply = document.getElementById('lp-apply');
    const lpClear = document.getElementById('lp-clear');
    const lpExport = document.getElementById('lp-export');
    const fEmail = document.getElementById('lp-email');
    const fType = document.getElementById('lp-type');
    const fSource = document.getElementById('lp-source');
    const fFrom = document.getElementById('lp-from');
    const fTo = document.getElementById('lp-to');
    function getFilters(){
      return {
        email: (fEmail&&fEmail.value)||'',
        type: (fType&&fType.value)||'',
        source: (fSource&&fSource.value)||'',
        from: (fFrom&&fFrom.value)||'',
        to: (fTo&&fTo.value)||''
      };
    }
    function applyLogs(){ renderLoyaltyLogs(getFilters()); }
    if(lpApply){ lpApply.addEventListener('click', applyLogs); }
    if(lpClear){ lpClear.addEventListener('click', ()=>{ if(fEmail) fEmail.value=''; if(fType) fType.value=''; if(fSource) fSource.value=''; if(fFrom) fFrom.value=''; if(fTo) fTo.value=''; renderLoyaltyLogs({}); }); }
    if(lpExport){ lpExport.addEventListener('click', ()=>{
      const logs = (window.Loyalty? Loyalty.getLog(getFilters()) : []);
      if(!logs.length){ alert('No hay registros para exportar'); return; }
      const rows = [['createdAt','email','name','points','type','source','amount','orderId','reservationId']];
      logs.forEach(l=> rows.push([l.createdAt,l.email,l.name,l.points,l.type,l.source,l.amount,l.orderId,l.reservationId]));
      const csv = rows.map(r=> r.map(c=> '"'+String(c||'').replace(/"/g,'""')+'"').join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download='loyalty_logs.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }); }
    // initial render
    renderLoyaltyLogs({});

    // Stylist save/clear
    const stySave = document.getElementById('sty-save');
    if(stySave){ stySave.addEventListener('click', ()=>{
      const idField = document.getElementById('sty-id');
      const name = document.getElementById('sty-name').value.trim();
      const title = document.getElementById('sty-title').value.trim();
      const rating = Number(document.getElementById('sty-rating').value || 0);
      const emoji = document.getElementById('sty-emoji').value.trim();
      const specs = document.getElementById('sty-specialties').value.trim();
      const image = document.getElementById('sty-image').value.trim();
      if(!name){ alert('Nombre requerido'); return; }
      let list = loadStylists();
      if(idField.value){
        const id = Number(idField.value);
        const idx = list.findIndex(s=>s.id===id);
        if(idx>=0){ list[idx] = { ...list[idx], name, title, rating, emoji, specialties: specs? specs.split(',').map(s=>s.trim()).filter(Boolean) : [], image }; }
      } else {
        const id = list.length ? Math.max(...list.map(s=>s.id))+1 : 1;
        list.push({ id, name, title, rating, emoji, specialties: specs? specs.split(',').map(s=>s.trim()).filter(Boolean) : [], image });
      }
      saveStylists(list); renderStylistsAdmin(); clearStylistForm(); alert('Estilista guardado');
    }); }
    const styClear = document.getElementById('sty-clear'); if(styClear){ styClear.addEventListener('click', ()=> clearStylistForm()); }
    // Stylist image live preview + validation
    setupImagePreview('sty-image', 'sty-image-preview', 'sty-image-error');
  }

  function clearForm(){ document.getElementById('prod-id').value=''; document.getElementById('prod-name').value=''; document.getElementById('prod-price').value=''; document.getElementById('prod-category').value=''; document.getElementById('prod-emoji').value=''; const img = document.getElementById('prod-image'); if(img) img.value=''; const prev = document.getElementById('prod-image-preview'); if(prev) prev.style.display='none'; }

  function clearStylistForm(){ const ids=['sty-id','sty-name','sty-title','sty-rating','sty-emoji','sty-specialties','sty-image']; ids.forEach(id=>{ const el=document.getElementById(id); if(!el) return; if(el.tagName==='INPUT') el.value=''; }); const prev = document.getElementById('sty-image-preview'); if(prev) prev.style.display='none'; }

  // Reservation helpers
  function findReservation(id){ const list = loadReservations(); return list.find(x=>String(x.id)===String(id)); }
  function saveReservationObject(res){ const list = loadReservations(); const idx = list.findIndex(x=>String(x.id)===String(res.id)); if(idx>=0){ list[idx]=res; } else { list.push(res); } saveReservations(list); renderReservations(); }

  function openEditReservation(id){
    const r = findReservation(id);
    if(!r){ alert('Reserva no encontrada'); return; }
    // Open modal editor with the reservation loaded
    openReservationModal(r);
  }

  function openMoveReservation(id){
    const r = findReservation(id); if(!r){ alert('Reserva no encontrada'); return; }
    const newDate = prompt('Nueva fecha (YYYY-MM-DD)', r.date) || r.date;
    const newTime = prompt('Nueva hora (HH:MM)', r.time) || r.time;
    r.date = newDate; r.time = newTime;
    // optionally change stylist or service
    const newStylist = prompt('Estilista (nombre) o dejar vacío', r.stylistName) || r.stylistName;
    r.stylistName = newStylist;
    saveReservationObject(r);
  }

  function toggleReservationPaid(id){
    const r = findReservation(id); if(!r){ alert('Reserva no encontrada'); return; }
    r.paid = !r.paid; saveReservationObject(r); alert(`Reserva ${r.paid? 'marcada como pagada':'marcada como pendiente'}`);
  }

  function sendNotificationForReservation(id){
    const r = findReservation(id); if(!r){ alert('Reserva no encontrada'); return; }
    const subject = encodeURIComponent('Confirmación de tu cita - Pink Blueberry');
    const body = encodeURIComponent(`Hola ${r.name},%0A%0ATu cita para ${r.serviceName} está programada para el ${r.date} a las ${r.time}.%0A%0AEstatus de pago: ${r.paid? 'Pagado' : 'Pendiente'}%0A%0AGracias por elegirnos!%0APink Blueberry`);
    // open mailto in a new tab/window
    window.open(`mailto:${r.email}?subject=${subject}&body=${body}`);
    r.notificationSent = true; saveReservationObject(r);
    alert('Ventana de correo abierta (simulado) y marca de notificación guardada');
  }

  // Modal behavior for editing reservations
  function openReservationModal(res){
    const modal = document.getElementById('reservation-modal');
    if(!modal) return;
    // populate fields
    document.getElementById('res-id').value = res.id;
    document.getElementById('res-name').value = res.name || '';
    document.getElementById('res-email').value = res.email || '';
    document.getElementById('res-phone').value = res.phone || '';
    document.getElementById('res-date').value = res.date || '';
    document.getElementById('res-time').value = res.time || '';
    // populate service and stylist selects
    const svcSel = document.getElementById('res-service'); svcSel.innerHTML = '';
    const stSel = document.getElementById('res-stylist'); stSel.innerHTML = '';
    const prods = loadProducts();
    prods.forEach(p=>{ const opt = document.createElement('option'); opt.value = p.id; opt.textContent = `${p.name} ($${p.price})`; svcSel.appendChild(opt); });
    services.forEach(s=>{ const opt = document.createElement('option'); opt.value = s.id; opt.textContent = s.name; stSel.appendChild(opt); });
    if(res.serviceId) svcSel.value = res.serviceId;
    if(res.stylistId) stSel.value = res.stylistId;
    document.getElementById('res-upsell').checked = !!res.upsell;
    document.getElementById('res-paid').checked = !!res.paid;
    modal.setAttribute('aria-hidden','false'); modal.style.display = 'flex';
  }

  function closeReservationModal(){ const modal = document.getElementById('reservation-modal'); if(!modal) return; modal.setAttribute('aria-hidden','true'); modal.style.display='none'; }

  function bindModalActions(){
    const close = document.getElementById('res-modal-close'); if(close) close.addEventListener('click', closeReservationModal);
    const cancel = document.getElementById('res-cancel'); if(cancel) cancel.addEventListener('click', (e)=>{ e.preventDefault(); closeReservationModal(); });
    const save = document.getElementById('res-save'); if(save) save.addEventListener('click', (e)=>{ e.preventDefault(); saveReservationFromModal(); });
    const notify = document.getElementById('res-notify'); if(notify) notify.addEventListener('click', (e)=>{ e.preventDefault(); const id = document.getElementById('res-id').value; sendNotificationForReservation(id); });
  }

  function saveReservationFromModal(){
    const id = document.getElementById('res-id').value;
    const r = findReservation(id);
    if(!r){ alert('Reserva no encontrada'); return; }
    const nameVal = document.getElementById('res-name').value.trim();
    const emailVal = document.getElementById('res-email').value.trim();
    const phoneVal = document.getElementById('res-phone').value.trim();
    const dateVal = document.getElementById('res-date').value;
    const timeVal = document.getElementById('res-time').value.trim();

    // validations: name required, valid email, date not in past, time simple HH:MM
    const errors = [];
    const errEl = document.getElementById('res-errors'); errEl.style.display = 'none'; errEl.innerHTML = '';
    // clear previous error styles
    ['res-name','res-email','res-date','res-time'].forEach(id=> document.getElementById(id).classList.remove('input-error'));
    if(!nameVal){ errors.push('Nombre requerido'); document.getElementById('res-name').classList.add('input-error'); }
    const emailOk = (typeof window.validateEmail === 'function') ? window.validateEmail(emailVal) : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal));
    if(!emailOk){ errors.push('Email inválido'); document.getElementById('res-email').classList.add('input-error'); }
    if(dateVal){
      const today = new Date();
      const selected = new Date(dateVal + 'T' + (timeVal || '00:00'));
      const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      if(selected < todayZero){ errors.push('La fecha no puede estar en el pasado'); document.getElementById('res-date').classList.add('input-error'); }
    }
    if(timeVal && !/^\d{1,2}:\d{2}$/.test(timeVal)){ errors.push('Hora inválida (usar formato HH:MM)'); document.getElementById('res-time').classList.add('input-error'); }
    if(errors.length){ errEl.style.display = 'block'; errEl.innerHTML = errors.map(e=>`<div class="error-text">${e}</div>`).join(''); return; }

    r.name = nameVal;
    r.email = emailVal;
    r.phone = phoneVal;
    r.date = dateVal;
    r.time = timeVal;
    r.serviceId = Number(document.getElementById('res-service').value);
    const svc = loadProducts().find(p=>p.id===r.serviceId);
    r.serviceName = svc ? svc.name : r.serviceName;
    r.stylistId = Number(document.getElementById('res-stylist').value);
    const st = stylists.find(s=>s.id===r.stylistId);
    r.stylistName = st ? st.name : r.stylistName;
  r.upsell = !!document.getElementById('res-upsell').checked;
  r.paid = !!document.getElementById('res-paid').checked;
    // recalc amount
    const base = svc ? Number(svc.price) : (r.amount||0);
    r.amount = base + (r.upsell? 20 : 0);
    saveReservationObject(r);
    closeReservationModal();
    // after saving, refresh cached list and keep same page
    const all = loadReservations(); _reservationsCache = all; renderReservationsList(all, _reservationsPage);
    alert('Reserva actualizada');
  }

  // Filters and controls
  function populateFilterControls(){
    const fs = document.getElementById('filter-stylist');
    fs.innerHTML = '<option value="">Todos los estilistas</option>';
    stylists.forEach(s=>{ const opt = document.createElement('option'); opt.value = s.id; opt.textContent = s.name; fs.appendChild(opt); });
    // toggle petals initial state
    const settingsRaw = localStorage.getItem('pb_settings_v1');
    const settings = settingsRaw ? JSON.parse(settingsRaw) : {petals:true};
    const toggle = document.getElementById('toggle-petals'); if(toggle) { toggle.checked = !!settings.petals; toggle.addEventListener('change', ()=>{ settings.petals = toggle.checked; localStorage.setItem('pb_settings_v1', JSON.stringify(settings)); }); }
  }

  function applyFilters(){
    const status = document.getElementById('filter-status').value;
    const stylist = document.getElementById('filter-stylist').value;
    const from = document.getElementById('filter-date-from').value;
    const to = document.getElementById('filter-date-to').value;
    const q = document.getElementById('filter-search').value.trim().toLowerCase();
    let list = loadReservations();
    if(status==='paid') list = list.filter(r=>r.paid);
    if(status==='pending') list = list.filter(r=>!r.paid);
    if(stylist) list = list.filter(r=>String(r.stylistId)===String(stylist));
    if(from) list = list.filter(r=>r.date && r.date >= from);
    if(to) list = list.filter(r=>r.date && r.date <= to);
    if(q) list = list.filter(r=> (r.name||'').toLowerCase().includes(q) || (r.email||'').toLowerCase().includes(q));
    // render filtered list
    renderReservationsList(list);
  }

  

  function exportCSV(){
    const list = loadReservations();
    if(!list.length){ alert('No hay reservas para exportar'); return; }
    const rows = [['id','name','email','phone','service','stylist','date','time','amount','paid','createdAt']];
    list.forEach(r=> rows.push([r.id, r.name, r.email, r.phone, r.serviceName, r.stylistName, r.date, r.time, r.amount, r.paid, r.createdAt]));
    const csv = rows.map(r=> r.map(c=> '"'+String(c||'').replace(/"/g,'""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'reservas.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }

  function bindFilterActions(){
    const STORAGE = (window.AppConfig && AppConfig.storage) || { };
    const KEY = STORAGE.adminFilters || 'pb_admin_filters_state_v1';
    function saveState(){
      const state = {
        stylist: document.getElementById('filter-stylist').value,
        status: document.getElementById('filter-status').value,
        from: document.getElementById('filter-date-from').value,
        to: document.getElementById('filter-date-to').value,
        q: document.getElementById('filter-search').value
      };
      try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){}
      updateChipsActive(state);
    }
    function loadState(){
      try{
        const raw = localStorage.getItem(KEY); if(!raw) return;
        const s = JSON.parse(raw) || {};
        if('stylist' in s) document.getElementById('filter-stylist').value = s.stylist;
        if('status' in s) document.getElementById('filter-status').value = s.status;
        if('from' in s) document.getElementById('filter-date-from').value = s.from;
        if('to' in s) document.getElementById('filter-date-to').value = s.to;
        if('q' in s) document.getElementById('filter-search').value = s.q;
        updateChipsActive(s);
      }catch(e){}
    }
    function updateChipsActive(state){
      const toolbar = document.getElementById('filters-toolbar'); if(!toolbar) return;
      function setActive(name, isActive){ const chip = toolbar.querySelector(`.chip[data-filter="${name}"]`); if(!chip) return; chip.classList.toggle('active', !!isActive); }
      setActive('stylist', !!state.stylist);
      setActive('status', state.status && state.status !== 'all');
      setActive('date', !!state.from || !!state.to);
      setActive('search', !!state.q);
    }

    // apply + persist
    document.getElementById('filter-apply').addEventListener('click', ()=>{ saveState(); applyFilters(); });
    document.getElementById('filter-clear').addEventListener('click', ()=>{ document.getElementById('filter-status').value='all'; document.getElementById('filter-stylist').value=''; document.getElementById('filter-date-from').value=''; document.getElementById('filter-date-to').value=''; document.getElementById('filter-search').value=''; renderReservations(); });
    document.getElementById('export-csv').addEventListener('click', exportCSV);
    // load state on bind
    loadState();
  }

  function bindFiltersToggle(){
    const aside = document.querySelector('.admin-sidebar');
    const btn = document.getElementById('filters-toggle');
    const container = document.getElementById('filters-container');
    if(!aside || !btn || !container) return;
    const STORE_KEY = 'pb_admin_filters_collapsed_v1';
    function setCollapsed(collapsed){
      if(collapsed){
        aside.classList.add('collapsed');
        btn.setAttribute('aria-expanded','false');
        btn.textContent = 'Mostrar filtros';
      } else {
        aside.classList.remove('collapsed');
        btn.setAttribute('aria-expanded','true');
        btn.textContent = 'Ocultar filtros';
      }
      try{ localStorage.setItem(STORE_KEY, JSON.stringify({ collapsed })); }catch(e){}
    }
    function isSmall(){ return window.matchMedia && window.matchMedia('(max-width: 900px)').matches; }
    let pref = null;
    try{
      const raw = localStorage.getItem(STORE_KEY);
      if(raw){ const obj = JSON.parse(raw); pref = (typeof obj.collapsed === 'boolean') ? obj.collapsed : null; }
    }catch(e){}
    if(pref === null){ setCollapsed(isSmall()); } else { setCollapsed(pref); }
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded')==='true';
      setCollapsed(expanded);
    });
    window.addEventListener('resize', ()=>{ if(pref===null){ setCollapsed(isSmall()); } });
  }

  // On load
  document.addEventListener('DOMContentLoaded', function(){
    // assign default images if missing
    ensureDefaultImages();
    renderProducts();
    renderReservations();
    renderStylistsAdmin();
    bind();
    populateFilterControls();
    bindModalActions();
    bindFilterActions();
    bindFiltersToggle();
    bindMobileFiltersToolbar();
  });

  // Expose helper for other scripts: allow saving reservations
  window.AdminAPI = {
    saveReservation: function(res){
      const list = ensureArray(RES_KEY);
      list.push(res);
      saveReservations(list);
      // refresh list while keeping page
      _reservationsCache = list.slice();
      refreshReservationsCurrentPage();
    }
  };
})();
