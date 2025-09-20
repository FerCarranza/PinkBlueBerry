// allow admin-saved products to override default list
let appProducts = products;
let appStylists = stylists;
function loadStoredProducts(){
    try{
        const raw = localStorage.getItem('pb_products_v1');
        const stored = raw ? JSON.parse(raw) : [];
        // Merge defaults from data.js (products) into stored by id
        const byId = new Map(stored.map(p=> [Number(p.id), p]));
        let changed = false;
        (products||[]).forEach(d=>{
            const id = Number(d.id);
            if(!byId.has(id)) { byId.set(id, d); changed = true; }
        });
        const merged = Array.from(byId.values());
        if(changed){ try{ localStorage.setItem('pb_products_v1', JSON.stringify(merged)); }catch(e){} }
        appProducts = merged.length ? merged : (products||[]);
    }catch(e){ /* ignore */ }
}
function loadStoredStylists(){
    try{
        const raw = localStorage.getItem('pb_stylists_v1');
        if(raw){ appStylists = JSON.parse(raw); }
    }catch(e){ /* ignore */ }
}

// Cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    loadStoredProducts();
    loadStoredStylists();
    renderServices();
    renderProducts();
    renderStylists();
    showBookingStep(1);
});

// FUNCIONES DE SERVICIOS
function renderServices() {
    const servicesGrid = document.getElementById('services-grid');
    servicesGrid.innerHTML = '';
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card card';
        card.dataset.id = service.id;
        card.dataset.name = service.name;
        card.dataset.price = service.price;
        card.innerHTML = `
            <h3>${service.name}</h3>
            <p class="service-price">$${service.price}</p>
            <p>${service.duration}</p>
            <p>${service.description}</p>
            <div class="actions">
                            <button class="btn btn-primary" data-open-booking data-service-id="${service.id}">Reservar</button>
            </div>
        `;
        servicesGrid.appendChild(card);
    });
}

// Render stylists
function renderStylists(){
        const grid = document.getElementById('stylists-grid');
        if(!grid) return;
        grid.innerHTML = '';
        (appStylists || stylists).forEach(s=>{
            const card = document.createElement('div');
            card.className = 'stylist-card card';
            card.dataset.id = s.id;
            card.innerHTML = `
                ${s.image ? `<img src="${s.image}" alt="${s.name}" style="width:100%;height:160px;object-fit:cover;border-radius:12px;"/>` : `<div class=\"stylist-emoji\">${s.emoji}</div>`}
                <h3>${s.name}</h3>
                <p>${s.title}</p>
                <p>⭐ ${s.rating}</p>
                <p>Especialidades: ${s.specialties.join(', ')}</p>
                <div class="actions"><button class="btn" data-open-booking data-stylist-id="${s.id}">Reservar con ${s.name}</button></div>
            `;
            grid.appendChild(card);
        });
}

// Cart open/close and event wiring handled by js/cart.js

// FUNCIONES DE PRODUCTOS
function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    const filteredProducts = filter === 'all' ? appProducts : appProducts.filter(p => p.category === filter);
    // Priorizar categorías naturales/visuales
    function catPriority(cat){
        const c = String(cat||'').toLowerCase();
        if(c.includes('tónico') || c.includes('tonico') || c.includes('tonic') || c.includes('natural')) return 0;
        if(c.includes('tratamientos')) return 1;
        if(c.includes('jabones')) return 2;
        if(c.includes('cuidado capilar')) return 3;
        return 4;
    }
    const sorted = filteredProducts.slice().sort((a,b)=>{
        const pa = catPriority(a.category), pb = catPriority(b.category);
        if(pa!==pb) return pa-pb;
        return String(a.name||'').localeCompare(String(b.name||''));
    });
    sorted.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card card';
        const cat = String(product.category||'');
        const isNat = /natural|org[aá]nic|jabones|tratamientos/i.test(cat);
        const badge = isNat ? `<span style="display:inline-block;background:linear-gradient(90deg,#ec4899,#3b82f6);color:#fff;border-radius:999px;padding:4px 8px;font-size:12px;font-weight:700;">${cat}</span>` : '';
        card.innerHTML = `
            <div class="product-image">${product.image ? `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;"/>` : product.emoji}</div>
            <div class="product-info">
                ${badge}
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <p>${product.description}</p>
                <div class="actions">
                  <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Filtrar productos
function filterProducts(category, event) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');
    renderProducts(category);
}

// CARRITO: delegar completamente en Cart (cart.js)
function addToCart(productId) {
    const product = (appProducts || products).find(p => Number(p.id) === Number(productId));
    if(window.Cart){
        Cart.addToCart(product);
        showNotification('Producto agregado al carrito!');
    }
}

// NAVEGACIÓN
function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function selectServiceForBooking(serviceId) {
    currentBooking.service = services.find(s => s.id === serviceId);
    showBookingStep(1);
    scrollToBooking();
}

// NOTIFICACIONES SIMPLES
function showNotification(message) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--pink-primary);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 1000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}