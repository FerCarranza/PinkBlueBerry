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
    // Initialize cart UI from Cart module
    if(window.Cart) Cart.load();
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

// Open-cart button wiring
document.addEventListener('DOMContentLoaded', ()=>{
    const openCartBtn = document.getElementById('open-cart');
    if(openCartBtn){ openCartBtn.addEventListener('click', ()=>{ toggleCart(); }); }
});

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

// FUNCIONES DEL CARRITO
// Integración con Cart module (cart.js)
function addToCart(productId) {
    const product = (appProducts || products).find(p => Number(p.id) === Number(productId));
    if(window.Cart){ Cart.addToCart(product); showNotification('Producto agregado al carrito!'); }
    else {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) existingItem.quantity += 1; else cart.push({ ...product, quantity: 1 });
        updateCartDisplay(); showNotification('Producto agregado al carrito!');
    }
}

function updateCartDisplay() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

function updateCartCount() { if(window.Cart) Cart.load(); else { const count = cart.reduce((t,i)=>t+i.quantity,0); document.getElementById('cart-count').textContent = count; } }

function updateCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Tu carrito está vacío</p>';
        return;
    }
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div style="padding: 10px; border-bottom: 1px solid #eee;">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity} = $${item.price * item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = `$${total}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function toggleCart() { const panel = document.getElementById('cart-panel'); const hidden = panel.hasAttribute('hidden'); if(hidden){ panel.removeAttribute('hidden'); panel.setAttribute('aria-hidden','false'); } else { panel.setAttribute('hidden',''); panel.setAttribute('aria-hidden','true'); } }

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