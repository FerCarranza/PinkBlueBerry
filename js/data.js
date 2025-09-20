// Datos mock mínimos para MVP
const services = [
  { id: 1, name: 'Corte Clásico', price: 45, duration: '1h', description: 'Corte y styling profesional.' },
  { id: 2, name: 'Color Completo', price: 120, duration: '2h', description: 'Coloración premium con tratamiento.' },
  { id: 3, name: 'Tratamiento Hidratante', price: 65, duration: '1h', description: 'Mascarilla profunda y masaje capilar.' }
];

const stylists = [
  { id: 1, name: 'Ana López', title: 'Color Specialist', rating: 4.9, specialties: ['Color', 'Balayage'], emoji: '💇‍♀️' },
  { id: 2, name: 'María Ruiz', title: 'Senior Stylist', rating: 4.8, specialties: ['Cortes', 'Peinados'], emoji: '✂️' }
];

const products = [
  { id: 1, name: 'Champú Nutritivo', price: 28, category: 'Cuidado Capilar', description: 'Limpieza suave con ingredientes naturales', emoji: '🧴' },
  { id: 2, name: 'Acondicionador Reparable', price: 32, category: 'Cuidado Capilar', description: 'Suaviza y repara puntas abiertas', emoji: '🧴' },
  { id: 3, name: 'Jabón Orgánico', price: 12, category: 'Jabones Orgánicos', description: 'Jabón artesanal con aromas naturales', emoji: '🫧' },
  { id: 4, name: 'Aceite Capilar', price: 24, category: 'Cuidado Capilar', description: 'Tratamiento ligero para brillo', emoji: '🌿' }
];

// Estado de reserva compartido con booking.js
let currentBooking = {
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

// Estado simple de carrito cuando main.js lo usa (Cart.js hará persistencia)
let cart = [];
