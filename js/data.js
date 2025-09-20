// Datos mock mínimos para MVP
const services = [
  { id: 1, name: 'Corte Clásico', price: 45, duration: '1h', description: 'Corte y styling profesional.' },
  { id: 2, name: 'Color Completo', price: 120, duration: '2h', description: 'Coloración premium con tratamiento.' },
  { id: 3, name: 'Tratamiento Hidratante', price: 65, duration: '1h', description: 'Mascarilla profunda y masaje capilar.' }
];

const stylists = [
  { id: 1, name: 'Ana López', title: 'Color Specialist', rating: 4.9, specialties: ['Color', 'Balayage'], emoji: '💇‍♀️', image: '' },
  { id: 2, name: 'María Ruiz', title: 'Senior Stylist', rating: 4.8, specialties: ['Cortes', 'Peinados'], emoji: '✂️', image: '' }
];

const products = [
  { id: 1, name: 'Champú Nutritivo', price: 28, category: 'Cuidado Capilar', description: 'Limpieza suave con ingredientes naturales', emoji: '🧴', image: '' },
  { id: 2, name: 'Acondicionador Reparable', price: 32, category: 'Cuidado Capilar', description: 'Suaviza y repara puntas abiertas', emoji: '🧴', image: '' },
  { id: 3, name: 'Jabón Orgánico', price: 12, category: 'Jabones Orgánicos', description: 'Jabón artesanal con aromas naturales', emoji: '🫧', image: '' },
  { id: 4, name: 'Aceite Capilar', price: 24, category: 'Cuidado Capilar', description: 'Tratamiento ligero para brillo', emoji: '🌿', image: '' },
  // Nuevos productos naturales con imágenes
  { id: 5, name: 'Shampoo Natural Romero & Sábila', price: 29, category: 'Cuidado Capilar', description: 'Fortalece y ayuda a la caída; limpia cuero cabelludo graso o seco.', emoji: '🌿', image: 'https://images.unsplash.com/photo-1608571424946-b1e3cfb9bb9b?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'Aceite Capilar de Argán', price: 34, category: 'Cuidado Capilar', description: 'Nutre, repara puntas abiertas y aporta brillo instantáneo.', emoji: '✨', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop' },
  { id: 7, name: 'Jabón Artesanal de Avena y Miel', price: 14, category: 'Jabones Orgánicos', description: 'Calma e hidrata la piel con ingredientes suaves y naturales.', emoji: '🧼', image: 'https://images.unsplash.com/photo-1585238342028-1e3a76e51f1c?q=80&w=800&auto=format&fit=crop' },
  { id: 8, name: 'Mascarilla Capilar de Arcilla Verde', price: 22, category: 'Tratamientos', description: 'Detox + hidratación profunda para cabello y cuero cabelludo.', emoji: '🫙', image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=800&auto=format&fit=crop' },
  { id: 9, name: 'Tónico Capilar de Romero', price: 19, category: 'Tónicos Naturales', description: 'Estimula el crecimiento y equilibra el cuero cabelludo.', emoji: '💧', image: 'https://images.unsplash.com/photo-1611930022144-b9fd4785e8be?q=80&w=800&auto=format&fit=crop' }
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
