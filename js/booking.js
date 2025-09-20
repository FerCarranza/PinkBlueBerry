// Mostrar paso actual de la reserva
function showBookingStep(step) {
    currentBooking.step = step;
    updateProgressBar(step);
    
    const content = document.getElementById('booking-content');
    content.innerHTML = '';
    
    switch(step) {
        case 1:
            showServiceSelection();
            break;
        case 2:
            showStylistSelection();
            break;
        case 3:
            showDateTimeSelection();
            break;
        case 4:
            showContactForm();
            break;
        case 5:
            showConfirmation();
            break;
    }
}

// Actualizar barra de progreso
function updateProgressBar(currentStep) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index < currentStep - 1) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index === currentStep - 1) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// PASO 1: Selección de Servicio
function showServiceSelection() {
    const content = document.getElementById('booking-content');
    content.innerHTML = `
        <h3>Selecciona un Servicio</h3>
        <div class="services-selection">
            ${services.map(service => `
                <div class="service-option ${currentBooking.service?.id === service.id ? 'selected' : ''}" 
                     onclick="selectService(${service.id})">
                    <h4>${service.name}</h4>
                    <p>$${service.price} - ${service.duration}</p>
                    <p>${service.description}</p>
                </div>
            `).join('')}
        </div>
        <button class="btn-primary" onclick="nextStep()" 
                ${!currentBooking.service ? 'disabled' : ''}>
            Continuar
        </button>
    `;
}

// PASO 2: Selección de Estilista
function showStylistSelection() {
    const content = document.getElementById('booking-content');
    content.innerHTML = `
        <h3>Selecciona un Estilista</h3>
        <div class="stylists-selection">
            ${stylists.map(stylist => `
                <div class="stylist-option ${currentBooking.stylist?.id === stylist.id ? 'selected' : ''}" 
                     onclick="selectStylist(${stylist.id})">
                    <div class="stylist-emoji">${stylist.emoji}</div>
                    <h4>${stylist.name}</h4>
                    <p>${stylist.title}</p>
                    <p>⭐ ${stylist.rating}</p>
                    <p>Especialidades: ${stylist.specialties.join(', ')}</p>
                </div>
            `).join('')}
        </div>
        <div class="booking-navigation">
            <button onclick="previousStep()">Atrás</button>
            <button class="btn-primary" onclick="nextStep()"
                    ${!currentBooking.stylist ? 'disabled' : ''}>
                Continuar
            </button>
        </div>
    `;
}

// PASO 3: Selección de Fecha y Hora
function showDateTimeSelection() {
    const content = document.getElementById('booking-content');
    const today = new Date().toISOString().split('T')[0];
    
    content.innerHTML = `
        <h3>Selecciona Fecha y Hora</h3>
        <div class="datetime-selection">
            <div class="form-group">
                <label>Fecha:</label>
                <input type="date" id="booking-date" min="${today}" 
                       value="${currentBooking.date || ''}" 
                       onchange="updateBookingDate(this.value)">
            </div>
            <div class="form-group">
                <label>Hora:</label>
                <select id="booking-time" onchange="updateBookingTime(this.value)">
                    <option value="">Selecciona una hora</option>
                    ${generateTimeSlots().map(time => `
                        <option value="${time}" ${currentBooking.time === time ? 'selected' : ''}>
                            ${time}
                        </option>
                    `).join('')}
                </select>
            </div>
        </div>
        <div class="booking-navigation">
            <button onclick="previousStep()">Atrás</button>
            <button class="btn-primary" onclick="nextStep()"
                    ${!currentBooking.date || !currentBooking.time ? 'disabled' : ''}>
                Continuar
            </button>
        </div>
    `;
}

// PASO 4: Información de Contacto
function showContactForm() {
    const content = document.getElementById('booking-content');
    content.innerHTML = `
        <h3>Tu Información</h3>
        <form id="contact-form" onsubmit="return false;">
            <div class="form-group">
                <label>Nombre Completo:*</label>
                <input type="text" id="customer-name" value="${currentBooking.name}" 
                       onchange="updateBookingField('name', this.value)" required>
            </div>
            <div class="form-group">
                <label>Email:*</label>
                <input type="email" id="customer-email" value="${currentBooking.email}" 
                       onchange="updateBookingField('email', this.value)" required>
            </div>
            <div class="form-group">
                <label>Teléfono:*</label>
                <input type="tel" id="customer-phone" value="${currentBooking.phone}" 
                       onchange="updateBookingField('phone', this.value)" required>
            </div>
            <div class="form-group">
                <label>Notas Especiales:</label>
                <textarea id="customer-notes" rows="3" 
                          onchange="updateBookingField('notes', this.value)">${currentBooking.notes}</textarea>
            </div>
        </form>
        <div class="booking-navigation">
            <button onclick="previousStep()">Atrás</button>
            <button class="btn-primary" onclick="validateAndContinue()">
                Continuar
            </button>
        </div>
    `;
}

// PASO 5: Confirmación
function showConfirmation() {
    const content = document.getElementById('booking-content');
    content.innerHTML = `
        <h3>Confirma tu Reserva</h3>
        <div class="booking-summary">
            <h4>Resumen de tu Cita:</h4>
            <div class="summary-item">
                <strong>Servicio:</strong> ${currentBooking.service.name} - $${currentBooking.service.price}
            </div>
            <div class="summary-item">
                <strong>Estilista:</strong> ${currentBooking.stylist.name}
            </div>
            <div class="summary-item">
                <strong>Fecha:</strong> ${formatDate(currentBooking.date)}
            </div>
            <div class="summary-item">
                <strong>Hora:</strong> ${currentBooking.time}
            </div>
            <div class="summary-item">
                <strong>Cliente:</strong> ${currentBooking.name}
            </div>
            <div class="summary-item">
                <strong>Email:</strong> ${currentBooking.email}
            </div>
            <div class="summary-item">
                <strong>Teléfono:</strong> ${currentBooking.phone}
            </div>
            ${currentBooking.notes ? `
                <div class="summary-item">
                    <strong>Notas:</strong> ${currentBooking.notes}
                </div>
            ` : ''}
            <div class="total-price">
                <strong>Total: $${currentBooking.service.price}</strong>
            </div>
        </div>
        <div class="booking-navigation">
            <button onclick="previousStep()">Atrás</button>
            <button class="btn-primary" onclick="confirmBooking()">
                Confirmar Reserva
            </button>
        </div>
    `;
}

// FUNCIONES DE SELECCIÓN
function selectService(serviceId) {
    currentBooking.service = services.find(s => s.id === serviceId);
    showBookingStep(1); // Refrescar vista
}

function selectStylist(stylistId) {
    currentBooking.stylist = stylists.find(s => s.id === stylistId);
    showBookingStep(2); // Refrescar vista
}

function updateBookingDate(date) {
    currentBooking.date = date;
}

function updateBookingTime(time) {
    currentBooking.time = time;
}

function updateBookingField(field, value) {
    currentBooking[field] = value;
}

// NAVEGACIÓN
function nextStep() {
    if (currentBooking.step < 5) {
        showBookingStep(currentBooking.step + 1);
    }
}

function previousStep() {
    if (currentBooking.step > 1) {
        showBookingStep(currentBooking.step - 1);
    }
}

// VALIDACIÓN
function validateAndContinue() {
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const phone = document.getElementById('customer-phone').value;
    
    if (!name || !email || !phone) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Por favor ingresa un email válido');
        return;
    }
    
    nextStep();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// CONFIRMACIÓN
function confirmBooking() {
    // Mostrar mensaje de éxito
    document.getElementById('booking-content').innerHTML = `
        <div class="booking-success">
            <h3>¡Reserva Confirmada! ✨</h3>
            <p>Gracias ${currentBooking.name}!</p>
            <p>Tu cita ha sido reservada exitosamente.</p>
            <p>Número de confirmación: #${generateConfirmationNumber()}</p>
            <p>Te hemos enviado un email de confirmación a ${currentBooking.email}</p>
            <button class="btn-primary" onclick="resetBooking()">
                Hacer Otra Reserva
            </button>
        </div>
    `;
    
    showNotification('¡Reserva confirmada exitosamente!');
}

// UTILIDADES
function generateTimeSlots() {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
        slots.push(`${hour}:00`);
        if (hour < 17) {
            slots.push(`${hour}:30`);
        }
    }
    return slots;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function generateConfirmationNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

function resetBooking() {
    currentBooking = {
        step: 1,
        service: null,
        stylist: null,
        date: null,
        time: null,
        name: '',
        email: '',
        phone: '',
        notes: ''
    };
    showBookingStep(1);
}

// ESTILOS ADICIONALES PARA BOOKING
const bookingStyles = `
<style>
.service-option, .stylist-option {
    border: 2px solid #e2e8f0;
    padding: 16px;
    margin: 8px 0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.service-option:hover, .stylist-option:hover {
    border-color: var(--pink-primary);
    transform: scale(1.02);
}

.service-option.selected, .stylist-option.selected {
    border-color: var(--pink-primary);
    background: #fdf2f8;
}

.stylists-selection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.stylist-emoji {
    font-size: 48px;
    margin-bottom: 8px;
}

.booking-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
}

.form-group input, 
.form-group select, 
.form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 16px;
}

.summary-item {
    padding: 8px 0;
    border-bottom: 1px solid #e2e8f0;
}

.total-price {
    margin-top: 16px;
    font-size: 24px;
    color: var(--pink-primary);
}

.booking-success {
    text-align: center;
    padding: 48px;
}

.booking-success h3 {
    color: var(--blue-primary);
    margin-bottom: 16px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
`;

// Agregar estilos al documento
document.head.insertAdjacentHTML('beforeend', bookingStyles);