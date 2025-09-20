// allow admin-saved products to override default list
let appProducts = products;
function loadStoredProducts(){
    try{
        const raw = localStorage.getItem('pb_products_v1');
        if(raw){ appProducts = JSON.parse(raw); }
    }catch(e){ /* ignore */ }
}

// Cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    loadStoredProducts();
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
        stylists.forEach(s=>{
            const card = document.createElement('div');
            card.className = 'stylist-card card';
            card.dataset.id = s.id;
            card.innerHTML = `
                <div class="stylist-emoji">${s.emoji}</div>
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
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card card';
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
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