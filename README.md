# Pink Blueberry - Implementación MVP (Resumen)

Este repo contiene una implementación mínima orientada al hackathon para cumplir los requisitos definidos en la carpeta `Spanish`.

Cómo probar localmente:
1. Abrir `index.html` en un navegador moderno (Chrome/Safari/Firefox).
2. Revisar la sección Hero, Servicios (3), Productos (4) y Estilistas (2).
3. Click en "Reservar Ahora" o usar la sección de Reservas para flujo multi-paso (cliente-side).
4. Agregar productos al carrito usando botones "Agregar al Carrito" y abrir el panel de carrito.
5. Ejecutar `test/test.html` en el navegador para una prueba rápida de persistencia de carrito.

Mapa rápido de requisitos implementados:
- Hero con nombre y CTA: Implementado (index.html + css)
- Servicios: 3 servicios mock cargados (js/data.js -> render)
- Reservas: Flujo multi-paso UI presente (js/booking.js)
- Productos: 4 productos mock cargados (js/data.js -> render)
- Carrito: Persistencia en localStorage y UI mínima (js/cart.js)
- Estilistas: 2 estilistas mock cargados (js/data.js)
- Estilos: Colores de marca y botones implementados (css/styles.css)

Limitaciones conocidas:
- Checkout es mock y no hay integración de pagos (Square) — aceptable para MVP hackathon.
- Validación y UX son básicas y requieren mejoras para producción.


## Notes: email sending and payment integration

This project is a static front-end MVP. Two actions in the admin/booking flows intentionally use client-side fallbacks:

- Email notifications: the admin uses `mailto:` to open the user's email client and prefill a message. For automatic email delivery (server-side), implement a backend endpoint (e.g., Node/Express) that accepts a POST with reservation details and uses an SMTP provider or transactional email service (SendGrid, Mailgun). Store API keys securely on the server and call the endpoint from the admin UI.

- Payments: the booking flow contains a simulated payment prompt. To accept real payments, integrate a payment provider (Stripe recommended). Typical flow:
	1. Create a server endpoint to create a payment intent (server-side, using secret key).
	2. Return client secret to frontend and call Stripe.js to collect card details.
	3. Confirm payment on the client and update reservation `paid` status on the server.

If you'd like, I can scaffold example server endpoints (Express) and the minimal front-end changes to connect Stripe or SendGrid (requires API keys you provide securely).

