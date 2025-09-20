// Simple i18n module (ES/EN)
(function(){
  'use strict';
  const STORAGE_KEY = 'pb_lang_v1';
  const fallback = 'es';
  const dict = {
    es: {
      nav_home: 'Inicio',
      nav_services: 'Servicios',
      nav_booking: 'Reservar',
      nav_shop: 'Tienda',
      nav_admin: 'Admin',
      admin_view_site: 'Ver sitio',
      admin_logout: 'Logout',
      hero_title: 'The Pink Blueberry',
      hero_subtitle: 'Donde el Lujo se Encuentra con la Belleza Natural',
      hero_cta: 'Reservar Ahora',
      admin_panel: 'Panel de Administración',
      admin_products: 'Productos',
      admin_reservations: 'Reservas',
      login_title: 'Admin Login',
      login_subtitle: 'Accede al panel administrativo',
      login_user: 'Usuario',
      login_pass: 'Contraseña',
      login_btn: 'Ingresar',
      lang_label: 'Idioma',
      admin_panel: 'Panel de Administración',
      admin_products: 'Productos',
      admin_add_edit_product: 'Agregar / Editar Producto',
      admin_reservations: 'Reservas',
      admin_clear_reservations: 'Limpiar todas las reservas',
      admin_stylists: 'Estilistas',
      admin_add_edit_stylist: 'Agregar / Editar Estilista',
      admin_save: 'Guardar',
      admin_clear: 'Limpiar',
      err_required_name: 'Nombre requerido',
      err_invalid_number: 'Número inválido',
      err_invalid_exp: 'Formato MM/AA',
      err_invalid_cvc: 'CVC inválido',
      cart_empty: 'Tu carrito está vacío',
      cart_paid_thanks: 'Pago realizado. ¡Gracias por tu compra!',
      btn_cancel: 'Cancelar',
      btn_pay: 'Pagar'
      ,booking_saved_notify: 'Reserva registrada. Revisa tu correo para más detalles.'
      ,admin_subtitle: 'Administrar productos de la tienda y ver reservas'
      ,res_modal_title: 'Editar Reserva'
      ,prod_name_ph: 'Nombre'
      ,prod_price_ph: 'Precio'
      ,prod_category_ph: 'Categoría'
      ,prod_emoji_ph: 'Emoji'
      ,prod_image_ph: 'URL de imagen (opcional)'
      ,sty_name_ph: 'Nombre'
      ,sty_title_ph: 'Título'
      ,sty_rating_ph: 'Rating'
      ,sty_emoji_ph: 'Emoji'
      ,sty_specs_ph: 'Especialidades (coma separada)'
      ,sty_image_ph: 'URL de imagen (opcional)'
      ,service_name_1: 'Corte Clásico'
      ,service_desc_1: 'Corte y styling profesional.'
      ,service_name_2: 'Color Completo'
      ,service_desc_2: 'Coloración premium con tratamiento.'
      ,service_name_3: 'Tratamiento Hidratante'
      ,service_desc_3: 'Mascarilla profunda y masaje capilar.'
      ,services_title: 'Selecciona un Servicio'
      ,booking_continue: 'Continuar'
      ,booking_prev: 'Atrás'
      ,booking_next: 'Siguiente'
      ,booking_pay: 'Pagar'
      ,select_stylist_title: 'Selecciona un Estilista'
      ,select_datetime_title: 'Selecciona Fecha y Hora'
      ,label_date: 'Fecha:'
      ,label_time: 'Hora:'
      ,your_info_title: 'Tu Información'
      ,label_fullname: 'Nombre Completo:*'
      ,label_email: 'Email:*'
      ,label_phone: 'Teléfono:*'
      ,label_notes: 'Notas Especiales:'
      ,upsell_label: 'Mejorar experiencia (opcional)'
      ,upsell_option: 'Añadir tratamiento premium (+$20)'
      ,confirm_title: 'Confirma tu Reserva'
      ,summary_title: 'Resumen de tu Cita:'
      ,summary_service: 'Servicio:'
      ,summary_stylist: 'Estilista:'
      ,summary_date: 'Fecha:'
      ,summary_time: 'Hora:'
      ,summary_client: 'Cliente:'
      ,summary_email: 'Email:'
      ,summary_phone: 'Teléfono:'
      ,summary_total: 'Total:'
      ,filters_title: 'Filtros'
      ,filter_stylist: 'Estilista'
      ,filter_status: 'Estado'
      ,filter_date: 'Fecha'
      ,filter_search: 'Buscar'
      ,filter_clear: 'Limpiar'
      ,from_label: 'Desde'
      ,to_label: 'Hasta'
      ,apply_label: 'Aplicar'
      ,export_csv: 'Exportar CSV'
      ,cart_subtotal: 'Subtotal'
      ,cart_taxes: 'Impuestos'
      ,cart_total: 'Total'
      ,cart_pay_now: 'Pagar ahora'
      ,res_save: 'Guardar'
      ,res_cancel: 'Cancelar'
      ,res_notify: 'Notificar'
      ,res_name_ph: 'Nombre completo'
      ,res_email_ph: 'Email'
      ,res_phone_ph: 'Teléfono'
      ,loyalty_earned: 'Has ganado'
      ,loyalty_balance: 'Tu saldo actual:'
      ,points_suffix: 'puntos'
      ,loyalty_title: 'Lealtad'
      ,loyalty_rate_label: 'Puntos por $1'
      ,loyalty_save: 'Guardar tasa'
      ,loyalty_query_label: 'Consultar puntos por email'
      ,loyalty_query_btn: 'Consultar'
      ,loyalty_rate_saved: 'Tasa de lealtad guardada'
      ,loyalty_invalid_rate: 'Ingresa una tasa válida entre 0 y 10'
      ,loyalty_points_now: 'Puntos actuales:'
      ,loyalty_points_title: 'Puntos de Lealtad'
      ,loyalty_manual_title: 'Ajuste manual'
      ,loyalty_mode: 'Modo'
      ,loyalty_mode_earn: 'Bonificar'
      ,loyalty_mode_redeem: 'Canjear'
      ,loyalty_points_label: 'Puntos'
      ,loyalty_apply: 'Aplicar'
      ,loyalty_applied: 'Ajuste aplicado'
      ,loyalty_invalid_points: 'Ingresa puntos válidos (>0)'
      ,res_th_id: 'ID'
      ,res_th_name: 'Nombre'
      ,res_th_service: 'Servicio'
      ,res_th_stylist: 'Estilista'
      ,res_th_date: 'Fecha'
      ,res_th_time: 'Hora'
      ,res_th_amount: 'Importe'
      ,res_th_paid: 'Pago'
      ,res_th_actions: 'Acciones'
      ,res_paid: 'Pagado'
      ,res_pending: 'Pendiente'
      ,action_edit: 'Editar'
      ,action_move: 'Mover'
      ,action_mark_paid: 'Marcar Pagado'
      ,action_mark_pending: 'Marcar Pendiente'
      ,action_notify: 'Notificar'
      ,action_delete: 'Eliminar'
      ,add_to_cart: 'Agregar al Carrito'
      ,booking_modal_title: 'Reservar Cita'
      ,booking_prev: 'Atrás'
      ,booking_next: 'Siguiente'
      ,payment_modal_title: 'Pago con Tarjeta (Mock)'
      ,payment_cancel: 'Cancelar'
      ,payment_submit: 'Pagar'
      ,services_title: 'Nuestros Servicios'
      ,shop_title: 'Productos Destacados'
      ,stylists_title: 'Conoce a Nuestros Estilistas'
      ,cart_title: 'Tu Carrito'
      ,subtotal_label: 'Subtotal'
      ,taxes_label: 'Impuestos'
      ,total_label: 'Total'
      ,checkout_now: 'Pagar ahora'
    },
    en: {
      nav_home: 'Home',
      nav_services: 'Services',
      nav_booking: 'Book',
      nav_shop: 'Shop',
      nav_admin: 'Admin',
      admin_view_site: 'View site',
      admin_logout: 'Logout',
      hero_title: 'The Pink Blueberry',
      hero_subtitle: 'Where Luxury Meets Natural Beauty',
      hero_cta: 'Book Now',
      admin_panel: 'Admin Panel',
      admin_products: 'Products',
      admin_reservations: 'Reservations',
      login_title: 'Admin Login',
      login_subtitle: 'Sign in to the admin panel',
      login_user: 'User',
      login_pass: 'Password',
      login_btn: 'Sign in',
      lang_label: 'Language',
      admin_panel: 'Admin Panel',
      admin_products: 'Products',
      admin_add_edit_product: 'Add / Edit Product',
      admin_reservations: 'Reservations',
      admin_clear_reservations: 'Clear all reservations',
      admin_stylists: 'Stylists',
      admin_add_edit_stylist: 'Add / Edit Stylist',
      admin_save: 'Save',
      admin_clear: 'Clear',
      err_required_name: 'Name is required',
      err_invalid_number: 'Invalid number',
      err_invalid_exp: 'Format MM/YY',
      err_invalid_cvc: 'Invalid CVC',
      cart_empty: 'Your cart is empty',
      cart_paid_thanks: 'Payment completed. Thank you for your purchase!',
      btn_cancel: 'Cancel',
      btn_pay: 'Pay'
      ,booking_saved_notify: 'Reservation saved. Check your email for details.'
      ,admin_subtitle: 'Manage shop products and view reservations'
      ,res_modal_title: 'Edit Reservation'
      ,prod_name_ph: 'Name'
      ,prod_price_ph: 'Price'
      ,prod_category_ph: 'Category'
      ,prod_emoji_ph: 'Emoji'
      ,prod_image_ph: 'Image URL (optional)'
      ,sty_name_ph: 'Name'
      ,sty_title_ph: 'Title'
      ,sty_rating_ph: 'Rating'
      ,sty_emoji_ph: 'Emoji'
      ,sty_specs_ph: 'Specialties (comma-separated)'
      ,sty_image_ph: 'Image URL (optional)'
      ,service_name_1: 'Classic Haircut'
      ,service_desc_1: 'Professional cut and styling.'
      ,service_name_2: 'Full Color'
      ,service_desc_2: 'Premium coloring with treatment.'
      ,service_name_3: 'Hydration Treatment'
      ,service_desc_3: 'Deep mask and scalp massage.'
      ,services_title: 'Select a Service'
      ,booking_continue: 'Continue'
      ,booking_prev: 'Back'
      ,booking_next: 'Next'
      ,booking_pay: 'Pay'
      ,select_stylist_title: 'Select a Stylist'
      ,select_datetime_title: 'Select Date and Time'
      ,label_date: 'Date:'
      ,label_time: 'Time:'
      ,your_info_title: 'Your Information'
      ,label_fullname: 'Full Name:*'
      ,label_email: 'Email:*'
      ,label_phone: 'Phone:*'
      ,label_notes: 'Special Notes:'
      ,upsell_label: 'Improve experience (optional)'
      ,upsell_option: 'Add premium treatment (+$20)'
      ,confirm_title: 'Confirm your Booking'
      ,summary_title: 'Your Appointment Summary:'
      ,summary_service: 'Service:'
      ,summary_stylist: 'Stylist:'
      ,summary_date: 'Date:'
      ,summary_time: 'Time:'
      ,summary_client: 'Client:'
      ,summary_email: 'Email:'
      ,summary_phone: 'Phone:'
      ,summary_total: 'Total:'
      ,filters_title: 'Filters'
      ,filter_stylist: 'Stylist'
      ,filter_status: 'Status'
      ,filter_date: 'Date'
      ,filter_search: 'Search'
      ,filter_clear: 'Clear'
      ,from_label: 'From'
      ,to_label: 'To'
      ,apply_label: 'Apply'
      ,export_csv: 'Export CSV'
      ,cart_subtotal: 'Subtotal'
      ,cart_taxes: 'Taxes'
      ,cart_total: 'Total'
      ,cart_pay_now: 'Pay now'
      ,res_save: 'Save'
      ,res_cancel: 'Cancel'
      ,res_notify: 'Notify'
      ,res_name_ph: 'Full name'
      ,res_email_ph: 'Email'
      ,res_phone_ph: 'Phone'
      ,loyalty_earned: 'You earned'
      ,loyalty_balance: 'Your current balance:'
      ,points_suffix: 'points'
      ,loyalty_title: 'Loyalty'
      ,loyalty_rate_label: 'Points per $1'
      ,loyalty_save: 'Save rate'
      ,loyalty_query_label: 'Check points by email'
      ,loyalty_query_btn: 'Check'
      ,loyalty_rate_saved: 'Loyalty rate saved'
      ,loyalty_invalid_rate: 'Enter a valid rate between 0 and 10'
      ,loyalty_points_now: 'Current points:'
      ,loyalty_points_title: 'Loyalty Points'
      ,loyalty_manual_title: 'Manual adjustment'
      ,loyalty_mode: 'Mode'
      ,loyalty_mode_earn: 'Earn'
      ,loyalty_mode_redeem: 'Redeem'
      ,loyalty_points_label: 'Points'
      ,loyalty_apply: 'Apply'
      ,loyalty_applied: 'Adjustment applied'
      ,loyalty_invalid_points: 'Enter valid points (>0)'
      ,res_th_id: 'ID'
      ,res_th_name: 'Name'
      ,res_th_service: 'Service'
      ,res_th_stylist: 'Stylist'
      ,res_th_date: 'Date'
      ,res_th_time: 'Time'
      ,res_th_amount: 'Amount'
      ,res_th_paid: 'Payment'
      ,res_th_actions: 'Actions'
      ,res_paid: 'Paid'
      ,res_pending: 'Pending'
      ,action_edit: 'Edit'
      ,action_move: 'Move'
      ,action_mark_paid: 'Mark Paid'
      ,action_mark_pending: 'Mark Pending'
      ,action_notify: 'Notify'
      ,action_delete: 'Delete'
      ,add_to_cart: 'Add to Cart'
      ,booking_modal_title: 'Book Appointment'
      ,booking_prev: 'Back'
      ,booking_next: 'Next'
      ,payment_modal_title: 'Card Payment (Mock)'
      ,payment_cancel: 'Cancel'
      ,payment_submit: 'Pay'
      ,services_title: 'Our Services'
      ,shop_title: 'Featured Products'
      ,stylists_title: 'Meet Our Stylists'
      ,cart_title: 'Your Cart'
      ,subtotal_label: 'Subtotal'
      ,taxes_label: 'Taxes'
      ,total_label: 'Total'
      ,checkout_now: 'Checkout Now'
    }
  };

  function getLang(){
    try{ const raw = localStorage.getItem(STORAGE_KEY); if(raw) return JSON.parse(raw).lang; }catch(e){}
    const nav = (navigator.language || 'es').slice(0,2);
    return ['es','en'].includes(nav) ? nav : fallback;
  }
  function setLang(lang){
    if(!['es','en'].includes(lang)) lang = fallback;
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang })); }catch(e){}
    document.documentElement.setAttribute('lang', lang);
    applyTranslations();
    try{ document.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang } })); }catch(e){}
  }
  function t(key){
    const lang = document.documentElement.getAttribute('lang') || getLang();
    return (dict[lang] && dict[lang][key]) || (dict[fallback] && dict[fallback][key]) || key;
  }
  function applyTranslations(root){
    const scope = root || document;
    const nodes = scope.querySelectorAll('[data-i18n]');
    nodes.forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(!key) return;
      el.textContent = t(key);
    });

    // placeholders
    const phNodes = scope.querySelectorAll('[data-i18n-placeholder]');
    phNodes.forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      if(!key) return;
      el.setAttribute('placeholder', t(key));
    });

    // aria-labels
    const ariaNodes = scope.querySelectorAll('[data-i18n-aria-label]');
    ariaNodes.forEach(el=>{
      const key = el.getAttribute('data-i18n-aria-label');
      if(!key) return;
      el.setAttribute('aria-label', t(key));
    });
  }

  function initSelector(){
    const selects = document.querySelectorAll('.lang-select');
    const current = getLang();
    selects.forEach(sel=>{
      if(sel.tagName.toLowerCase() === 'select'){
        sel.value = current;
        sel.addEventListener('change', ()=> setLang(sel.value));
      }
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    // set initial lang
    setLang(getLang());
    initSelector();
    applyTranslations();
  });

  window.i18n = { t, setLang, getLang, applyTranslations };
})();
