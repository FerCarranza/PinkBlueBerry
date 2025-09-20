// admin.js - manage products and reservations using localStorage
(function(){
  const PROD_KEY = 'pb_products_v1';
  const RES_KEY = 'pb_reservations_v1';

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

  function loadReservations(){ try{ const raw = localStorage.getItem(RES_KEY); return raw ? JSON.parse(raw) : []; }catch(e){ return []; } }
  function saveReservations(list){ localStorage.setItem(RES_KEY, JSON.stringify(list)); }

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
        tr.innerHTML = `<td>${p.id}</td><td><strong>${p.name}</strong><div class="tiny muted">${p.description||''}</div></td><td>${p.category||''}</td><td>$${p.price||0}</td><td>${iconButton('edit', 'Editar', `data-edit-id=\"${p.id}\"`)} ${iconButton('delete', 'Eliminar', `data-delete-id=\"${p.id}\"`)}</td>`;
        tbody.appendChild(tr);
      });
      panel.appendChild(table);
      return;
    }
    list.forEach(p=>{
      const el = document.createElement('div'); el.className='list-item';
      el.innerHTML = `<div><strong>${p.name}</strong> <span class="muted">${p.category}</span><div class="tiny">${p.description||''}</div></div><div><button class="btn" data-edit-id="${p.id}">Editar</button> <button class="btn" data-delete-id="${p.id}">Eliminar</button></div>`;
      panel.appendChild(el);
    });
  }

  // Pagination / table support for mobile view
  let _reservationsCache = null;
  let _reservationsPage = 1;
  const RES_PER_PAGE = 5;

  function renderReservations(){
    // legacy entrypoint: render current reservations (unfiltered)
    const list = loadReservations();
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
          <div class="tiny">Estado de pago: ${r.paid ? '<strong style="color:green">Pagado</strong>' : '<span style="color:#c00">Pendiente</span>'} ${r.upsell? '• Tratamiento Premium':''}</div>
        </div>
        <div>
          ${iconButton('edit', r.paid? 'Editar':'Editar', `data-edit-res=\"${r.id}\"`)}
          ${iconButton('move', 'Mover', `data-move-res=\"${r.id}\"`)}
          ${iconButton('pay', r.paid? 'Marcar Pendiente':'Marcar Pagado', `data-toggle-paid=\"${r.id}\"`)}
          ${iconButton('notify', 'Notificar', `data-notify-res=\"${r.id}\"`)}
          ${iconButton('delete', 'Eliminar', `data-delete-res=\"${r.id}\"`)}
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
          <th>ID</th>
          <th>Nombre</th>
          <th>Servicio</th>
          <th>Estilista</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Importe</th>
          <th>Pago</th>
          <th>Acciones</th>
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
        <td>${r.paid? '<span style="color:green">Pagado</span>':'<span style="color:#c00">Pendiente</span>'}</td>
        <td class="actions">
          ${iconButton('edit', 'Editar', `data-edit-res=\"${r.id}\"`)}
          ${iconButton('pay', r.paid? 'Marcar Pendiente':'Marcar Pagado', `data-toggle-paid=\"${r.id}\"`)}
          ${iconButton('delete', 'Eliminar', `data-delete-res=\"${r.id}\"`)}
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
    document.getElementById('prod-save').addEventListener('click', ()=>{
      const idField = document.getElementById('prod-id');
      const name = document.getElementById('prod-name').value.trim();
      const price = Number(document.getElementById('prod-price').value || 0);
      const category = document.getElementById('prod-category').value.trim();
      const emoji = document.getElementById('prod-emoji').value.trim();
      if(!name){ alert('Nombre requerido'); return; }
      const list = loadProducts();
      if(idField.value){ // edit
        const id = Number(idField.value);
        const idx = list.findIndex(p=>p.id===id);
        if(idx>=0){ list[idx] = { ...list[idx], name, price, category, emoji }; }
      } else { // create new
        const id = list.length ? Math.max(...list.map(p=>p.id))+1 : 1;
        list.push({ id, name, price, category, emoji });
      }
      saveProducts(list); renderProducts(); clearForm();
      alert('Producto guardado');
    });

    document.getElementById('prod-clear').addEventListener('click', ()=>{ clearForm(); });
    document.getElementById('products-list').addEventListener('click', (e)=>{
      const edit = e.target.closest('[data-edit-id]');
      const del = e.target.closest('[data-delete-id]');
      if(edit){ const id = Number(edit.dataset.editId); const list = loadProducts(); const p = list.find(x=>x.id===id); if(p){ document.getElementById('prod-id').value = p.id; document.getElementById('prod-name').value = p.name; document.getElementById('prod-price').value = p.price; document.getElementById('prod-category').value = p.category; document.getElementById('prod-emoji').value = p.emoji; } }
      if(del){ if(confirm('Eliminar producto?')){ const id = Number(del.dataset.deleteId); let list = loadProducts(); list = list.filter(x=>x.id!==id); saveProducts(list); renderProducts(); } }
    });

    document.getElementById('reservations-list').addEventListener('click', (e)=>{
      const del = e.target.closest('[data-delete-res]');
      const edit = e.target.closest('[data-edit-res]');
      const move = e.target.closest('[data-move-res]');
      const togglePaid = e.target.closest('[data-toggle-paid]');
      const notify = e.target.closest('[data-notify-res]');

        if(edit){
          const id = edit.dataset.editRes;
          openEditReservation(id);
          return;
        }

        const pageBtn = e.target.closest('.page-btn') || e.target.closest('[data-page]');
        if(pageBtn){
          const targetPage = Number(pageBtn.dataset.page) || 1;
          // re-render using cached list and target page
          renderReservationsList(_reservationsCache || loadReservations(), targetPage);
          return;
        }

      if(move){
        const id = move.dataset.moveRes;
        openMoveReservation(id);
        return;
      }

      if(togglePaid){
        const id = togglePaid.dataset.togglePaid;
        toggleReservationPaid(id);
        return;
      }

      if(notify){
        const id = notify.dataset.notifyRes;
        sendNotificationForReservation(id);
        return;
      }

      if(del){ if(confirm('Eliminar reserva?')){ const id = del.dataset.deleteRes; let list = loadReservations(); list = list.filter(x=>String(x.id)!==String(id)); saveReservations(list); // refresh and keep page
        // update cache and refresh
        _reservationsCache = loadReservations(); refreshReservationsCurrentPage();
       } }
    });

    document.getElementById('reservations-clear').addEventListener('click', ()=>{
      if(confirm('Limpiar todas las reservas?')){ saveReservations([]); renderReservations(); }
    });
  }

  function clearForm(){ document.getElementById('prod-id').value=''; document.getElementById('prod-name').value=''; document.getElementById('prod-price').value=''; document.getElementById('prod-category').value=''; document.getElementById('prod-emoji').value=''; }

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

  function renderReservationsList(list){
    const panel = document.getElementById('reservations-list');
    panel.innerHTML = '';
    if(list.length===0) panel.innerHTML = '<div class="muted">No hay reservas</div>';
    list.sort((a,b)=>{ if(!a.date && !b.date) return 0; if(!a.date) return 1; if(!b.date) return -1; return new Date(a.date + ' ' + (a.time||'00:00')) - new Date(b.date + ' ' + (b.time||'00:00')); });
    list.forEach(r=>{
      const el = document.createElement('div'); el.className='list-item';
      el.innerHTML = `
        <div>
          <strong>${r.name}</strong>
          <div class="tiny">${r.serviceName} - ${r.date} ${r.time}</div>
          <div class="muted">${r.email} • ${r.phone}</div>
          <div class="tiny">Estado de pago: ${r.paid ? '<strong style="color:green">Pagado</strong>' : '<span style="color:#c00">Pendiente</span>'} ${r.upsell? '• Tratamiento Premium':''}</div>
        </div>
        <div>
          <button class="btn" data-edit-res="${r.id}">Editar</button>
          <button class="btn" data-move-res="${r.id}">Mover</button>
          <button class="btn" data-toggle-paid="${r.id}">${r.paid? 'Marcar Pendiente':'Marcar Pagado'}</button>
          <button class="btn" data-notify-res="${r.id}">Notificar</button>
          <button class="btn" data-delete-res="${r.id}">Eliminar</button>
        </div>
      `;
      panel.appendChild(el);
    });
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
    document.getElementById('filter-apply').addEventListener('click', applyFilters);
    document.getElementById('filter-clear').addEventListener('click', ()=>{ document.getElementById('filter-status').value='all'; document.getElementById('filter-stylist').value=''; document.getElementById('filter-date-from').value=''; document.getElementById('filter-date-to').value=''; document.getElementById('filter-search').value=''; renderReservations(); });
    document.getElementById('export-csv').addEventListener('click', exportCSV);
  }

  // On load
  document.addEventListener('DOMContentLoaded', ()=>{
    renderProducts(); renderReservations(); bind();
    populateFilterControls(); bindModalActions(); bindFilterActions();
  });

  // Expose helper for other scripts: allow saving reservations
  window.AdminAPI = {
    saveReservation: function(res){ const list = loadReservations(); list.push(res); saveReservations(list); }
  };
})();

