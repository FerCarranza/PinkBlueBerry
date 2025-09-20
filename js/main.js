// Cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    loadServices();
    loadProducts();
    updateCartCount();
    showBookingStep(1);
});

// FUNCIONES DE SERVICIOS
function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <h3>${service.name}</h3>
            <p class="service-price">$${service.price}</p>
            <p>${service.duration}</p>
            <p>${service.description}</p>
            <button class="btn-primary" onclick="selectServiceForBooking(${service.id})">
                Reservar Este Servicio
            </button>
        `;
        servicesGrid.appendChild(card);
    });
}

// FUNCIONES DE PRODUCTOS
function loadProducts(filter = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; // Limpiar grid
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <p>${product.description}</p>
                <button class="btn-primary" onclick="addToCart(${product.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Filtrar productos
function filterProducts(category) {
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Cargar productos filtrados
    loadProducts(category);
}

// FUNCIONES DEL CARRITO
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    showNotification('Producto agregado al carrito!');
}

function updateCartDisplay() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

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

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
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