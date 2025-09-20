// Mostrar paso actual de la reserva
function getBookingContainer(){
    // Prefer modal body when available
    const modalBody = document.getElementById('booking-modal-body');
    if(modalBody) return modalBody;
    return document.getElementById('booking-content');
}

function showBookingStep(step) {
    currentBooking.step = step;
    updateProgressBar(step);

    const content = getBookingContainer();
    if(!content) return;
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
    // update modal footer buttons state if modal present
    const prevBtn = document.getElementById('booking-prev');
    const nextBtn = document.getElementById('booking-next');
    if(prevBtn) prevBtn.disabled = currentBooking.step <= 1;
    if(nextBtn) nextBtn.disabled = false;
    // Change next button text depending on step
    if(nextBtn){
        if(currentBooking.step < 5) nextBtn.textContent = (window.i18n? i18n.t('booking_next') : 'Siguiente');
        else nextBtn.textContent = (window.i18n? i18n.t('booking_pay') : 'Pagar');
    }
    if(prevBtn){ prevBtn.textContent = (window.i18n? i18n.t('booking_prev') : 'Atrás'); }
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
    const content = getBookingContainer();
    content.innerHTML = `
        <h3>${(window.i18n? i18n.t('services_title') : 'Selecciona un Servicio')}</h3>
        <div class="services-selection">
            ${services.map(service => {
                const nameKey = `service_name_${service.id}`;
                const descKey = `service_desc_${service.id}`;
                const displayName = (window.i18n ? i18n.t(nameKey) : service.name);
                const displayDesc = (window.i18n ? i18n.t(descKey) : service.description);
                return `
                <div class="service-option ${currentBooking.service?.id === service.id ? 'selected' : ''}" 
                     onclick="selectService(${service.id})">
                    <h4>${displayName}</h4>
                    <p>$${service.price} - ${service.duration}</p>
                    <p>${displayDesc}</p>
                </div>`;
            }).join('')}
        </div>
        <button class="btn-primary" onclick="nextStep()" 
                ${!currentBooking.service ? 'disabled' : ''}>
            ${(window.i18n? i18n.t('booking_continue') : 'Continuar')}
        </button>
    `;
}

// PASO 2: Selección de Estilista
function showStylistSelection() {
    const content = getBookingContainer();
    content.innerHTML = `
        <h3>${(window.i18n? i18n.t('select_stylist_title') : 'Selecciona un Estilista')}</h3>
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
    `;
}

// PASO 3: Selección de Fecha y Hora
function showDateTimeSelection() {
    const content = getBookingContainer();
    const today = new Date().toISOString().split('T')[0];
    
    content.innerHTML = `
        <h3>${(window.i18n? i18n.t('select_datetime_title') : 'Selecciona Fecha y Hora')}</h3>
        <div class="datetime-selection">
            <div class="form-group">
                <label>${(window.i18n? i18n.t('label_date') : 'Fecha:')}</label>
                <input type="date" id="booking-date" min="${today}" 
                       value="${currentBooking.date || ''}" 
                       onchange="updateBookingDate(this.value)">
            </div>
            <div class="form-group">
                <label>${(window.i18n? i18n.t('label_time') : 'Hora:')}</label>
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
    `;
}

// PASO 4: Información de Contacto
function showContactForm() {
    const content = getBookingContainer();
    content.innerHTML = `
        <h3>${(window.i18n? i18n.t('your_info_title') : 'Tu Información')}</h3>
        <form id="contact-form" onsubmit="return false;">
            <div class="form-group">
                <label>${(window.i18n? i18n.t('label_fullname') : 'Nombre Completo:*')}</label>
          <input type="text" id="customer-name" value="${currentBooking.name || ''}" 
              onchange="updateBookingField('name', this.value)" placeholder="Ej. Ana Pérez" required>
          <div class="error-text" id="err-customer-name" aria-live="polite"></div>
            </div>
            <div class="form-group">
                <label>${(window.i18n? i18n.t('label_email') : 'Email:*')}</label>
          <input type="email" id="customer-email" value="${currentBooking.email || ''}" 
              onchange="updateBookingField('email', this.value)" placeholder="tu@ejemplo.com" required>
          <div class="error-text" id="err-customer-email" aria-live="polite"></div>
            </div>
            <div class="form-group">
                <label>${(window.i18n? i18n.t('label_phone') : 'Teléfono:*')}</label>
          <input type="tel" id="customer-phone" value="${currentBooking.phone || ''}" 
              onchange="updateBookingField('phone', this.value)" placeholder="+34 612 345 678" required pattern="^[0-9+\s\-()]{7,20}$">
          <div class="error-text" id="err-customer-phone" aria-live="polite"></div>
            </div>
            <div class="form-group">
                <label>${(window.i18n? i18n.t('label_notes') : 'Notas Especiales:')}</label>
                <textarea id="customer-notes" rows="3" 
                          onchange="updateBookingField('notes', this.value)">${currentBooking.notes || ''}</textarea>
            </div>

            <!-- Marketing / upsell section -->
            <div class="form-group" id="upsell-area">
                <label>${(window.i18n? i18n.t('upsell_label') : 'Mejorar experiencia (opcional)')}</label>
                <div>
                    <label><input type="checkbox" id="upsell-treatment" onchange="toggleUpsell(this.checked)" ${currentBooking.upsell? 'checked':''}> ${(window.i18n? i18n.t('upsell_option') : 'Añadir tratamiento premium (+$20)')}</label>
                </div>
                <small class="muted">Recomendado para mantener el color y brillo. Solo añade $20 al total.</small>
            </div>
        </form>
    `;
}

// PASO 5: Confirmación
function showConfirmation() {
    const content = getBookingContainer();
    const estimatePts = (window.Loyalty? Loyalty.estimatePoints(calculateTotalPrice()) : 0);
    content.innerHTML = `
        <h3>${(window.i18n? i18n.t('confirm_title') : 'Confirma tu Reserva')}</h3>
        <div class="booking-summary">
            <h4>${(window.i18n? i18n.t('summary_title') : 'Resumen de tu Cita:')}</h4>
            <div class="summary-item">
                <strong>${(window.i18n? i18n.t('summary_service') : 'Servicio:')}</strong> ${(window.i18n? i18n.t(`service_name_${currentBooking.service.id}`) : currentBooking.service.name)} - $${currentBooking.service.price}
            </div>
            <div class="summary-item">
                <strong>${(window.i18n? i18n.t('summary_stylist') : 'Estilista:')}</strong> ${currentBooking.stylist.name}
            </div>
            <div class="summary-item">
                <strong>${(window.i18n? i18n.t('summary_date') : 'Fecha:')}</strong> ${formatDate(currentBooking.date)}
            </div>
            <div class="summary-item">
                <strong>${(window.i18n? i18n.t('summary_time') : 'Hora:')}</strong> ${currentBooking.time}
            </div>
            <div class="summary-item">
                <strong>${(window.i18n? i18n.t('summary_client') : 'Cliente:')}</strong> ${currentBooking.name}
            </div>
            <div class="summary-item">
                <strong>${(window.i18n? i18n.t('summary_email') : 'Email:')}</strong> ${currentBooking.email}
            </div>
            <div class="summary-item">
                <strong>${(window.i18n? i18n.t('summary_phone') : 'Teléfono:')}</strong> ${currentBooking.phone}
            </div>
            ${currentBooking.notes ? `
                <div class="summary-item">
                    <strong>Notas:</strong> ${currentBooking.notes}
                </div>
            ` : ''}
            <div class="total-price">
                <strong>${(window.i18n? i18n.t('summary_total') : 'Total:')} $${calculateTotalPrice()}</strong>
            </div>
            ${estimatePts>0? `<div class="tiny" style="margin-top:6px;color:#0f172a;font-weight:600;">+ ${estimatePts} pts</div>`:''}
        </div>
    `;
}

function calculateTotalPrice(){
    const base = currentBooking.service ? Number(currentBooking.service.price) : 0;
    const upsell = currentBooking.upsell ? 20 : 0;
    return base + upsell;
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

function toggleUpsell(checked){
    currentBooking.upsell = !!checked;
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
    clearFieldError('customer-name');
    clearFieldError('customer-email');
    clearFieldError('customer-phone');

    const name = (document.getElementById('customer-name')||{}).value || '';
    const email = (document.getElementById('customer-email')||{}).value || '';
    const phone = (document.getElementById('customer-phone')||{}).value || '';

    let ok = true;
    if(!name){ showFieldError('customer-name','El nombre es obligatorio'); ok = false; }
    if(!phone){ showFieldError('customer-phone','El teléfono es obligatorio'); ok = false; }
    else {
        const phonePattern = /^[0-9+\s\-()]{7,20}$/;
        if(!phonePattern.test(phone)){ showFieldError('customer-phone','Formato de teléfono inválido'); ok = false; }
    }
    if(!email){ showFieldError('customer-email','El email es obligatorio'); ok = false; }
    else if(!validateEmail(email)){ showFieldError('customer-email','Ingresa un email válido'); ok = false; }

    if(!ok) return;

    nextStep();
}

// Field error helpers
function showFieldError(fieldId, message){
    const input = document.getElementById(fieldId);
    const err = document.getElementById('err-' + fieldId);
    if(input) input.classList.add('input-error');
    if(err) err.textContent = message;
}

function clearFieldError(fieldId){
    const input = document.getElementById(fieldId);
    const err = document.getElementById('err-' + fieldId);
    if(input) input.classList.remove('input-error');
    if(err) err.textContent = '';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// CONFIRMACIÓN
function confirmBooking() {
    // build reservation object
    const reservation = {
        id: generateConfirmationNumber(),
        name: currentBooking.name,
        email: currentBooking.email,
        phone: currentBooking.phone,
        serviceId: currentBooking.service?.id,
        serviceName: currentBooking.service?.name,
        stylistId: currentBooking.stylist?.id,
        stylistName: currentBooking.stylist?.name,
        date: currentBooking.date,
        time: currentBooking.time,
        notes: currentBooking.notes || '',
        upsell: !!currentBooking.upsell,
        amount: calculateTotalPrice(),
        paid: false,
        notificationSent: false,
        createdAt: new Date().toISOString()
    };

    // Open payment modal (mock) to collect card details
    window._pendingReservation = reservation; // keep temporarily
    openPaymentModal();
}

// Payment modal helpers (mock)
function openPaymentModal(){
    const modal = document.getElementById('payment-modal');
    if(!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
    lockBodyScroll(true);
    setupFocusTrap(modal);
}

function closePaymentModal(){
    const modal = document.getElementById('payment-modal');
    if(!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
    releaseFocusTrap();
    lockBodyScroll(false);
}

function validatePaymentForm(){
    // simple field checks
    let ok = true;
    const name = (document.getElementById('card-name')||{}).value || '';
    const number = (document.getElementById('card-number')||{}).value || '';
    const exp = (document.getElementById('card-exp')||{}).value || '';
    const cvc = (document.getElementById('card-cvc')||{}).value || '';
    // clear errors
    ['card-name','card-number','card-exp','card-cvc'].forEach(id=>{ const e=document.getElementById('err-'+id); if(e) e.textContent=''; const inp=document.getElementById(id); if(inp) inp.classList.remove('input-error'); });
    if(!name){ document.getElementById('err-card-name').textContent=(window.i18n? i18n.t('err_required_name') : 'Nombre requerido'); document.getElementById('card-name').classList.add('input-error'); ok=false; }
    if(!/^[0-9\s]{12,19}$/.test(number)){ document.getElementById('err-card-number').textContent=(window.i18n? i18n.t('err_invalid_number') : 'Número inválido'); document.getElementById('card-number').classList.add('input-error'); ok=false; }
    if(!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(exp)){ document.getElementById('err-card-exp').textContent=(window.i18n? i18n.t('err_invalid_exp') : 'Formato MM/AA'); document.getElementById('card-exp').classList.add('input-error'); ok=false; }
    if(!/^[0-9]{3,4}$/.test(cvc)){ document.getElementById('err-card-cvc').textContent=(window.i18n? i18n.t('err_invalid_cvc') : 'CVC inválido'); document.getElementById('card-cvc').classList.add('input-error'); ok=false; }
    return ok;
}

// wire payment buttons on DOMContentLoaded
document.addEventListener('DOMContentLoaded', ()=>{
    const payClose = document.getElementById('payment-close');
    const payCancel = document.getElementById('payment-cancel');
    const paySubmit = document.getElementById('payment-submit');
    // Set button texts with i18n if available
    if(payCancel && window.i18n){ payCancel.textContent = i18n.t('btn_cancel'); }
    if(paySubmit && window.i18n){ paySubmit.textContent = i18n.t('btn_pay'); }
    if(payClose) payClose.addEventListener('click', closePaymentModal);
    if(payCancel) payCancel.addEventListener('click', closePaymentModal);
    if(paySubmit) paySubmit.addEventListener('click', ()=>{
        if(!validatePaymentForm()) return;
        // simulate processing
        showBookingSpinner(true);
        setTimeout(()=>{
            showBookingSpinner(false);
            const reservation = window._pendingReservation;
            if(reservation){ reservation.paid = true; persistAndFinalize(reservation); window._pendingReservation = null; }
            // loyalty integration: add points if email exists
            try{
                const email = (currentBooking && currentBooking.email) || '';
                const name = (currentBooking && currentBooking.name) || '';
                const total = calculateTotalPrice();
                const pts = (window.Loyalty? Loyalty.estimatePoints(total) : 0);
                if(email && pts>0 && window.Loyalty){ Loyalty.addPoints(email, name, pts); }
                else if(!email && pts>0 && window.showNotification){
                    const invite = (window.i18n? 'Para acumular puntos, ingresa tu email y únete como miembro.' : 'Enter your email to earn loyalty points!');
                    showNotification(invite);
                }
            }catch(e){}
            closePaymentModal();
        }, 1200);
    });

    // Auto-format MM/AA for card expiration field
    const expInput = document.getElementById('card-exp');
    if(expInput){
        expInput.setAttribute('inputmode','numeric');
        expInput.setAttribute('maxlength','5');
        expInput.addEventListener('input', (e)=>{
            const el = e.target;
            let v = (el.value || '').replace(/[^0-9]/g, '');
            if(v.length > 4) v = v.slice(0,4);
            // Insert slash after two digits when available
            if(v.length >= 3){
                el.value = v.slice(0,2) + '/' + v.slice(2);
            } else if(v.length >= 1){
                el.value = v;
            } else {
                el.value = '';
            }
        });
    }

    // Global Escape handler to close modals when open
    document.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape'){
            const bookingOpen = document.getElementById('booking-modal');
            const paymentOpen = document.getElementById('payment-modal');
            if(paymentOpen && paymentOpen.getAttribute('aria-hidden') === 'false'){ closePaymentModal(); }
            else if(bookingOpen && bookingOpen.getAttribute('aria-hidden') === 'false'){ closeBookingModal(); }
        }
    });
});

function persistAndFinalize(reservation){
    try{
        if(window.AdminAPI && typeof window.AdminAPI.saveReservation === 'function'){
            window.AdminAPI.saveReservation(reservation);
        } else {
            // fallback: write directly to pb_reservations_v1
            const key = 'pb_reservations_v1';
            const raw = localStorage.getItem(key); const list = raw ? JSON.parse(raw) : [];
            list.push(reservation); localStorage.setItem(key, JSON.stringify(list));
        }
    }catch(e){ console.warn('No se pudo guardar la reserva localmente', e); }
    // clear any messages/spinner
    showBookingSpinner(false);
    clearBookingMessage();

    // show success UI
    const content = getBookingContainer();
    content.innerHTML = `
        <div class="booking-success">
            <h3>¡Reserva Confirmada! ✨</h3>
            <p>Gracias ${reservation.name}!</p>
            <p>Tu cita ha sido reservada exitosamente.</p>
            <p>Número de confirmación: #${reservation.id}</p>
            <p>Te hemos enviado (simulado) un email de confirmación a ${reservation.email}</p>
            <p class="muted">Estado de pago: ${reservation.paid ? 'Pagado' : 'Pendiente'}</p>
            <button class="btn-primary" onclick="resetBooking()">Hacer Otra Reserva</button>
        </div>
    `;

    showNotification((window.i18n? i18n.t('booking_saved_notify') : 'Reserva registrada. Revisa tu correo para más detalles.'));
    const modal = document.getElementById('booking-modal');
    if(modal) closeBookingModal();
    if(window.Petals && typeof window.Petals.burst === 'function') window.Petals.burst({count: 40});
}

// Inline message and spinner helpers
function showBookingMessage(message, type='info'){
    let container = document.getElementById('booking-message');
    if(!container){
        const content = getBookingContainer();
        container = document.createElement('div');
        container.id = 'booking-message';
        container.className = 'booking-message';
        content.insertBefore(container, content.firstChild);
    }
    container.innerHTML = `<div class="message ${type}">${message}</div>`;
}

function clearBookingMessage(){
    const container = document.getElementById('booking-message');
    if(container) container.remove();
}

function showBookingSpinner(show){
    let spinner = document.getElementById('booking-spinner');
    const content = getBookingContainer();
    if(show){
        if(!spinner){
            spinner = document.createElement('div');
            spinner.id = 'booking-spinner';
            spinner.className = 'booking-spinner';
            spinner.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
            content.appendChild(spinner);
        }
    } else {
        if(spinner) spinner.remove();
    }
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
        notes: '',
        upsell: false
    };
    showBookingStep(1);
}

// Modal control functions
function openBookingModal(){
    const modal = document.getElementById('booking-modal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');
    modal.style.display = 'flex';
    lockBodyScroll(true);
    setupFocusTrap(modal);
    showBookingStep(currentBooking.step || 1);
}

function closeBookingModal(){
    const modal = document.getElementById('booking-modal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    modal.style.display = 'none';
    releaseFocusTrap();
    lockBodyScroll(false);
}

// Wire modal controls on DOM ready
document.addEventListener('DOMContentLoaded', ()=>{
    const prev = document.getElementById('booking-prev');
    const next = document.getElementById('booking-next');
    const close = document.getElementById('booking-close');
    const backdrop = document.getElementById('booking-backdrop');
    const heroBtn = document.getElementById('hero-book');

    if(prev) prev.addEventListener('click', previousStep);
    if(next) next.addEventListener('click', ()=>{
        // step-aware behavior: steps 1-2-3 -> nextStep, step 4 -> validateAndContinue, step 5 -> confirm
        const step = currentBooking.step || 1;
        if(step < 4) return nextStep();
        if(step === 4) return validateAndContinue();
        if(step === 5) return confirmBooking();
    });
    if(close) close.addEventListener('click', closeBookingModal);
    if(backdrop) backdrop.addEventListener('click', closeBookingModal);
    if(heroBtn) heroBtn.addEventListener('click', ()=>{ openBookingModal(); });

        // also add open behavior to any element with data-open-booking or anchors to #booking
        document.body.addEventListener('click', (e)=>{
            const anchor = e.target.closest && e.target.closest('a[href="#booking"]');
            const el = e.target.closest && e.target.closest('[data-open-booking]');
            if(anchor){
                e.preventDefault();
                openBookingModal();
                return;
            }
            if(el){
                e.preventDefault();
                const sid = el.dataset.serviceId || el.dataset.serviceId === '' ? el.dataset.serviceId : null;
                const stylistId = el.dataset.stylistId || null;
                // reset service/stylist selection depending on dataset
                if(stylistId){ currentBooking.stylist = stylists.find(st=>String(st.id)===String(stylistId)); }
                else if(sid){ if(sid !== '') currentBooking.service = services.find(s=>String(s.id)===String(sid)); }
                openBookingModal();
            }
        });
});

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

.booking-message {
    margin-bottom: 12px;
}
.booking-message .message {
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #e6e6e6;
    background: #fff;
    box-shadow: 0 6px 12px rgba(0,0,0,0.04);
}
.booking-message .message.info { border-left: 4px solid var(--blue-primary); }
.booking-message .message.error { border-left: 4px solid #e55353; }

.booking-actions { display:flex; gap:12px; justify-content:flex-end; margin-top:12px; }
.booking-actions button { padding: 8px 12px; border-radius:8px; border: none; cursor: pointer; }
.booking-actions button.btn-primary { background: linear-gradient(90deg,var(--pink-primary),var(--blue-primary)); color:#fff; }

.booking-spinner { position: absolute; right: 28px; top: 18px; display:flex; gap:6px; }
.booking-spinner .dot { width:8px; height:8px; background:var(--pink-primary); border-radius:50%; animation:blink 1s infinite; }
.booking-spinner .dot:nth-child(2){ animation-delay:0.2s }
.booking-spinner .dot:nth-child(3){ animation-delay:0.4s }
@keyframes blink { 0%{opacity:0.2}50%{opacity:1}100%{opacity:0.2} }

.input-error {
    border-color: #e55353 !important;
    box-shadow: 0 0 0 3px rgba(229,83,83,0.06);
}
.error-text {
    color: #e55353;
    margin-top: 6px;
    font-size: 13px;
}
</style>
`;

// Agregar estilos al documento
document.head.insertAdjacentHTML('beforeend', bookingStyles);

// ===== Accesibilidad de modales: focus trap y helpers =====
let _focusTrap = {
    root: null,
    lastActive: null,
    handler: null
};

function getFocusable(container){
    if(!container) return [];
    return Array.from(container.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1 && el.offsetParent !== null);
}

function setupFocusTrap(modal){
    const panel = modal.querySelector('.modal-panel');
    _focusTrap.lastActive = document.activeElement;
    _focusTrap.root = modal;
    const focusables = getFocusable(modal);
    // Ensure panel can receive focus
    if(panel && panel.tabIndex < 0) panel.tabIndex = -1;
    const first = focusables[0] || panel;
    if(first) first.focus(); else if(panel) panel.focus();
    // keydown handler
    _focusTrap.handler = function(e){
        if(e.key !== 'Tab') return;
        const nodes = getFocusable(modal);
        if(!nodes.length) { e.preventDefault(); return; }
        const firstEl = nodes[0];
        const lastEl = nodes[nodes.length - 1];
        if(e.shiftKey && document.activeElement === firstEl){ e.preventDefault(); lastEl.focus(); }
        else if(!e.shiftKey && document.activeElement === lastEl){ e.preventDefault(); firstEl.focus(); }
    };
    document.addEventListener('keydown', _focusTrap.handler, true);
}

function releaseFocusTrap(){
    if(_focusTrap.handler){ document.removeEventListener('keydown', _focusTrap.handler, true); }
    if(_focusTrap.lastActive && typeof _focusTrap.lastActive.focus === 'function'){
        try{ _focusTrap.lastActive.focus(); }catch(e){}
    }
    _focusTrap.root = null; _focusTrap.lastActive = null; _focusTrap.handler = null;
}

function lockBodyScroll(lock){
    if(lock){ document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
}