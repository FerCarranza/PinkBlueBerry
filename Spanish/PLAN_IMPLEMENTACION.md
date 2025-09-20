# Plan de Implementación - MVP Pink Blueberry (Hackathon)

Objetivo: Implementar el MVP mínimo requerido por la documentación en un repositorio estático HTML/CSS/JS (8 horas estimadas). Este plan prioriza la completitud y las verificaciones de la rúbrica de Claude AI.

## Fases y Tareas (ordenadas)

1. Fundación (30-60 min)
   - Crear copia de seguridad del repo actual.
   - Añadir `Spanish/RESUMEN_REQUISITOS.md` (ya generado).
   - Confirmar estructura: `index.html`, `css/styles.css`, `js/*.js`, `images/`.

2. Homepage + UI base (60-90 min)
   - Implementar `index.html` hero con logo, tagline y CTA "Reservar Ahora".
   - Añadir paleta CSS en `css/styles.css` con variables (rosa y azul) y gradiente.
   - Crear componentes: tarjetas de servicios (3), productos (4), estilistas (2).

3. Flujo de Reservas (120-150 min)
   - Implementar modal o sección multi-paso en `js/booking.js` con estado local (objetos JS).
   - Pasos: servicio → estilista → fecha/hora → contacto → confirmación.
   - Validación de formulario del lado cliente (email y teléfono).
   - Mantener estado entre pasos; permite editar pasos previos.

4. Tienda y Carrito (90-120 min)
   - Implementar `js/cart.js` con funciones `addToCart`, `getCartTotal`, `updateQuantity`, `removeItem`.
   - Mostrar ícono de carrito flotante con contador y modal/sidebar del carrito.
   - Persistencia simple en `sessionStorage` o `localStorage` para navegación entre páginas.

5. Estilado y accesibilidad (45-60 min)
   - Asegurar uso de HTML semántico; labels, roles y tabindex.
   - Verificar contraste de color y tamaños táctiles (>=44px).
   - Añadir focus-visible styles.

6. Tests y validación (30-60 min)
   - Añadir `test/test.js` con 3 pruebas básicas (carrito total, addToCart, validación email).
   - Ejecutar tests manualmente (`node` o archivo HTML que ejecute test.js).

7. Documentación y entrega (30-45 min)
   - Actualizar `README.md` con instrucciones "Cómo Ejecutar" y mapeo de requisitos básicos.
   - Incluir checklist de la rúbrica.

## Entregables mínimos
- `index.html` con hero, servicios, productos y estilistas.
- `css/styles.css` (variables de color y componentes básicos).
- `js/booking.js` (flujo de reservas multi-paso funcional).
- `js/cart.js` (carrito funcional con contador y total).
- `test/test.js` (suite mínima de pruebas).
- `README.md` actualizado.

## Casos borde a cubrir
- Campos vacíos o formato inválido (email, teléfono).
- Intento de avance sin seleccionar servicio o estilista.
- Carrito vacío al intentar checkout.
- Navegación hacia atrás durante flujo de reservas (mantener estado).

## Validaciones de calidad (gates)
- Build/Static check: `index.html` válido, `meta viewport` presente.
- Lint JS: evitar `var`, usar `let/const`.
- Pruebas: `test/test.js` al menos 2 pruebas pasan.
- Accesibilidad básica: labels y focus visibles.

## Suposiciones realizadas
- No se integra backend real; todas las funcionalidades pueden usar datos mock en JS.
- El tiempo real de hackathon se respeta; priorizaremos funcionalidades core sobre extras.

## Siguientes pasos
1. Empezar implementando hero y variables CSS.
2. Implementar tarjetas de servicios y productos estáticos.
3. Construir `booking.js` y `cart.js`.
4. Ejecutar pruebas y preparar README para entrega.

