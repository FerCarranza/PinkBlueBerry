# 🫐 El Salón Pink Blueberry - Desafío de Hackathon de 8 Horas

## 🎯 Resumen del Desafío

**Duración:** 8 Horas  
**Juez:** Claude AI (Revisión Automática de Código)  
**Objetivo:** Construir una aplicación web de reservas y comercio electrónico de salón de lujo que combine diseño elegante con experiencia de usuario intuitiva tanto para servicios de salón como ventas de productos

## 📝 Plantillas de Documentación (Puntos Bonus)

### Plantilla de Documento de Requisitos (requirements.md)
```markdown
# Documento de Requisitos - El Salón Pink Blueberry

## Historias de Usuario

### Sistema de Reservas
1. Como cliente, quiero reservar una cita en línea para no tener que llamar
   - **Criterios de Aceptación:**
   - [ ] Puedo seleccionar de los servicios disponibles
   - [ ] Puedo elegir estilista preferido
   - [ ] Puedo elegir fecha/hora disponibles
   - [ ] Recibo confirmación después de reservar

2. Como cliente, quiero ver precios de servicios antes de reservar
   - **Criterios de Aceptación:**
   - [ ] Los precios se muestran claramente
   - [ ] El costo total se calcula antes de la confirmación

### E-Commerce
3. Como cliente, quiero comprar productos capilares en línea
   - **Criterios de Aceptación:**
   - [ ] Puedo navegar el catálogo de productos
   - [ ] Puedo agregar artículos al carrito
   - [ ] Puedo ver el total del carrito
   - [ ] El carrito persiste durante la sesión

## Requisitos Funcionales
- [ ] El sistema mostrará mínimo 3 servicios
- [ ] El sistema permitirá selección de fecha/hora
- [ ] El sistema calculará totales del carrito
- [ ] El sistema será responsivo móvil

## Requisitos No Funcionales
- [ ] Tiempo de carga de página < 3 segundos
- [ ] Funciona en dispositivos móviles
- [ ] Usa colores de marca consistentemente
```

### Plantilla de Tablero de Tareas (tasks.md)
```markdown
# Desglose de Tareas - Equipo [Nombre]

## ✅ Completado
- [x] Configurar repositorio del proyecto
- [x] Crear estructura HTML básica

## 🚧 En Progreso
- [ ] Implementar flujo de reservas - @compañero1
- [ ] Diseñar tarjetas de servicios - @compañero2

## 📋 Por Hacer
- [ ] Agregar funcionalidad de carrito de compras
- [ ] Probar en dispositivos móviles
- [ ] Escribir documentación

## 🔥 Orden de Prioridad
1. Funcionalidad core de reservas
2. Estilo básico con colores de marca
3. Carrito de compras
4. Diseño responsivo
5. Pruebas y documentación
```

### Plantilla de Plan de Pruebas (testing.md)
```markdown
# Plan de Pruebas - El Salón Pink Blueberry

## Pruebas Unitarias
- [ ] Función addToCart()
- [ ] Cálculo getCartTotal()
- [ ] Funciones de validación de formularios
- [ ] Verificación de disponibilidad fecha/hora

## Pruebas de Integración
- [ ] Flujo completo de reservas
- [ ] Agregar al carrito → Ver carrito → Checkout
- [ ] Navegación entre páginas

## Pruebas de Aceptación del Usuario
| Caso de Prueba | Pasos | Resultado Esperado | Aprobado/Fallido |
|-----------|-------|-----------------|-----------|
| Reservar cita | 1. Seleccionar servicio 2. Elegir estilista 3. Elegir fecha | Reserva confirmada | ✅ |
| Agregar al carrito | 1. Hacer clic en producto 2. Hacer clic agregar al carrito | Artículo en carrito | ✅ |
| Responsivo móvil | 1. Abrir en teléfono 2. Navegar sitio | Todas las características funcionan | ❌ |
```

## 🧪 Ejemplos de Pruebas (Puntos Bonus)

### Ejemplo de Prueba Unitaria Simple (test.js)
```javascript
// Suite de pruebas básica sin framework
function runTests() {
  console.log('Ejecutando Pruebas...');
  
  // Prueba 1: Cálculo Total del Carrito
  testCartTotal();
  
  // Prueba 2: Agregar al Carrito
  testAddToCart();
  
  // Prueba 3: Validación de Formulario
  testFormValidation();
  
  console.log('¡Pruebas Completadas!');
}

function testCartTotal() {
  const testCart = [
    { price: 28, quantity: 2 },
    { price: 12, quantity: 1 }
  ];
  
  const expected = 68;
  const result = testCart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0);
  
  if (result === expected) {
    console.log('✅ Cálculo total del carrito aprobado');
  } else {
    console.log('❌ Prueba total del carrito falló');
  }
}

function testAddToCart() {
  const cart = [];
  const product = { id: 1, name: 'Champú', price: 28 };
  
  // Simular agregar al carrito
  cart.push({ ...product, quantity: 1 });
  
  if (cart.length === 1 && cart[0].quantity === 1) {
    console.log('✅ Prueba agregar al carrito aprobada');
  } else {
    console.log('❌ Prueba agregar al carrito falló');
  }
}

function testFormValidation() {
  // Probar validación de email
  const validEmail = 'test@example.com';
  const invalidEmail = 'notanemail';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (emailRegex.test(validEmail) && !emailRegex.test(invalidEmail)) {
    console.log('✅ Prueba validación email aprobada');
  } else {
    console.log('❌ Prueba validación email falló');
  }
}

// Ejecutar pruebas
runTests();
```

## 🤖 Criterios de Evaluación de Claude AI

Claude evaluará tu repositorio basándose en estos criterios específicos:

### 1. **Calidad del Código (20 puntos)**
- Código limpio y legible con formato adecuado
- Nombres de variables/funciones significativos
- Organización y estructura de componentes
- Comentarios donde sea necesario (lógica compleja)
- Sin errores de consola o advertencias

### 2. **Implementación de Diseño (20 puntos)**
- Adherencia a los colores de marca Pink Blueberry
- Diseño responsivo (móvil, tablet, escritorio)
- Consistencia de jerarquía visual y espaciado
- Apariencia profesional y pulida
- Transiciones/animaciones suaves (si se implementan)

### 3. **Completitud de Características (20 puntos)**
- Todos los requisitos MVP funcionales
- Flujo de reservas funciona de extremo a extremo
- Funcionalidad de carrito de compras funciona
- Los datos se muestran correctamente
- Validación de formulario presente
- Navegación entre páginas/secciones funciona

### 4. **Experiencia del Usuario (20 puntos)**
- Navegación intuitiva
- Llamadas a la acción claras
- Estados de carga (donde aplique)
- Manejo de errores
- Interfaz amigable móvil

### 5. **Documentación y Pruebas (20 puntos)**
- README con instrucciones de configuración claras
- Comentarios de código para lógica compleja
- Archivos de prueba (si están presentes)
- Documentación de requisitos (si está presente)
- Criterios de aceptación del usuario (si están presentes)

---

## 📋 Requisitos MVP (Debe Completar)

### 1. **Página de Inicio**
```markdown
Elementos Requeridos:
- [ ] Sección hero con nombre del salón "The Pink Blueberry"
- [ ] Al menos 3 tarjetas de servicios con precios
- [ ] Botón de llamada a la acción "Reservar Ahora"
- [ ] Sección de productos destacados (mínimo 3 productos)
- [ ] Diseño responsivo móvil
```

### 2. **Flujo de Reservas**
```markdown
Pasos Requeridos (puede ser página única o multi-paso):
- [ ] Selección de Servicios (mínimo 3 servicios)
- [ ] Selección de Estilista (mínimo 2 estilistas)
- [ ] Selección de Fecha y Hora
- [ ] Formulario de Información de Contacto
- [ ] Resumen/Confirmación de Reserva
```

### 3. **Tienda E-Commerce**
```markdown
Elementos Requeridos:
- [ ] Grilla/lista de productos (mínimo 4 productos)
- [ ] Tarjetas de productos con imagen, nombre, precio
- [ ] Botones "Agregar al Carrito"
- [ ] Carrito de compras con contador de artículos
- [ ] El carrito muestra precio total
```

### 4. **Sistema de Diseño**
```markdown
Implementación Requerida:
- [ ] Colores Rosa (#ec4899) y Azul (#3b82f6) utilizados
- [ ] Estilo de botones consistente
- [ ] Componentes de tarjeta para servicios/estilistas/productos
- [ ] Tipografía legible
```

---

## 🚀 Puntos Bonus (Si el Tiempo Permite)

### Victorias Rápidas (5 puntos cada uno, 15-30 min):
```markdown
- [ ] Logo animado o sección hero
- [ ] Efectos hover en tarjetas
- [ ] Spinner/esqueleto de carga
- [ ] Favicon personalizado
- [ ] Footer con información de contacto
```

### Esfuerzo Medio (10 puntos cada uno, 30-60 min):
```markdown
- [ ] Filtro/búsqueda de servicios funcional
- [ ] Calculadora de precios
- [ ] Validación de formulario con mensajes de error
- [ ] Navegación "Atrás" en flujo de reservas
- [ ] Visualización de calificaciones de estilistas
- [ ] Almacenamiento local para datos de reservas/carrito
```

### Alto Valor (15 puntos cada uno, 45-90 min):
```markdown
- [ ] Suite de Pruebas (pruebas unitarias para funciones core)
- [ ] Documento de Requisitos (historias de usuario y criterios de aceptación)
- [ ] Toggle de modo oscuro
- [ ] Sección de reseñas/testimonios
```

### Premios de Excelencia (20 puntos cada uno):
```markdown
- [ ] Cobertura de Pruebas Comprensiva (>50% de funciones probadas)
- [ ] Documentación Completa de Requisitos con Criterios de Aceptación del Usuario
- [ ] Documentación de Tablero de Tareas/Gestión de Proyecto
- [ ] Documentación de Pruebas de Accesibilidad (verificación de cumplimiento WCAG)
```

---

## ⏱ Cronograma de 8 Horas

### Hora 0-1: Configuración y Planificación
- Configurar repositorio y entorno de desarrollo
- Revisar requisitos y documentos de diseño
- Crear estructura del proyecto
- Instalar dependencias

### Hora 1-2: Estructura Core
- Construir diseño de página de inicio con hero
- Configurar navegación entre páginas/secciones
- Crear estructuras de datos para servicios, estilistas, productos

### Hora 2-4: Flujo de Reservas
- Construir selección de servicios
- Agregar selección de estilistas
- Crear selector de fecha/hora
- Implementar formulario de contacto

### Hora 4-6: Tienda E-Commerce
- Crear diseño de grilla de productos
- Construir tarjetas de productos
- Implementar funcionalidad de carrito de compras
- Agregar cálculo de total del carrito

### Hora 6-7: Estilo y Pulido
- Aplicar colores de marca y tipografía
- Hacer diseños responsivos
- Agregar estados hover y transiciones
- Arreglar espaciado y alineación

### Hora 7-8: Pruebas y Documentación
- Probar flujo completo de reservas
- Probar funcionalidad de carrito de compras
- Arreglar bugs
- Escribir README
- Commit y push final

---

## 🛠 Opciones de Stack Tecnológico

### Opción 1: Simple (Recomendado para 8 horas)
```bash
# HTML/CSS/JS Vanilla
mkdir pink-blueberry-salon
cd pink-blueberry-salon
touch index.html styles.css script.js
# ¡Empezar a codificar inmediatamente!
```

### Opción 2: Moderno
```bash
# React + Vite (si te sientes cómodo)
npm create vite@latest pink-blueberry-salon -- --template react
cd pink-blueberry-salon
npm install
npm run dev
```

---

## 📁 Estructura de Repositorio Requerida

Tu repositorio DEBE incluir:

```
pink-blueberry-salon/
├── README.md           # REQUERIDO: Cómo ejecutar tu proyecto
├── index.html          # Punto de entrada
├── /src o /js         # Archivos JavaScript
├── /styles o /css     # Archivos CSS
├── /images o /assets  # Imágenes (si las hay)
└── package.json        # (Si usas herramientas npm/build)
```

## Plantilla README.md
```markdown
# El Salón Pink Blueberry

## Nombre del Equipo: [Tu Nombre de Equipo]
## Miembros del Equipo: [Nombres]

## Cómo Ejecutar
[Instrucciones claras sobre cómo ejecutar tu proyecto]

## Características Implementadas
- [ ] Página de inicio con sección hero
- [ ] Catálogo de servicios
- [ ] Flujo de reservas
- [ ] Tienda de productos con carrito
- [ ] Diseño responsivo
- [ ] [Cualquier característica bonus]

## Tecnologías Utilizadas
- HTML/CSS/JavaScript
- [Cualquier framework/librería]

## Problemas Conocidos
- [Cualquier bug o característica incompleta]

## Capturas de Pantalla
[Opcional: Agregar capturas de pantalla de tu aplicación]
```

---

## 🎨 Recursos de Diseño Esenciales

### Variables CSS Copiar-Pegar
```css
:root {
  /* REQUERIDO: Usar estos colores */
  --pink-primary: #ec4899;
  --pink-light: #f9a8d4;
  --blue-primary: #3b82f6;
  --blue-light: #93c5fd;
  --text-dark: #1e293b;
  --text-light: #64748b;
  --white: #ffffff;
  --gray-light: #f1f5f9;
  
  /* Espaciado */
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* Radio de Borde */
  --radius: 12px;
}
```

### Componentes Esenciales

**Botón (Listo para Copiar-Pegar):**
```css
.btn-primary {
  background: linear-gradient(135deg, var(--pink-primary), var(--blue-primary));
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
}
```

**Tarjeta de Servicio:**
```css
.service-card {
  background: white;
  border-radius: var(--radius);
  padding: var(--space-lg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}
```

**Tarjeta de Producto:**
```css
.product-card {
  background: white;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.product-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: var(--gray-light);
}

.product-info {
  padding: var(--space-md);
}

.product-price {
  color: var(--pink-primary);
  font-size: 20px;
  font-weight: bold;
}
```

**Carrito de Compras:**
```css
.cart-icon {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--pink-primary);
  color: white;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--blue-primary);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
```

---

## 📊 Datos de Muestra (Listo para Copiar-Pegar)

```javascript
const services = [
  {
    id: 1,
    name: "Corte y Peinado Signature",
    price: 85,
    duration: "60 min",
    description: "Corte de precisión con peinado profesional"
  },
  {
    id: 2,
    name: "Color Completo",
    price: 150,
    duration: "120 min",
    description: "Transformación completa de color"
  },
  {
    id: 3,
    name: "Luces Balayage",
    price: 200,
    duration: "180 min",
    description: "Luces pintadas a mano"
  },
  {
    id: 4,
    name: "Acondicionamiento Profundo",
    price: 45,
    duration: "30 min",
    description: "Tratamiento intensivo para el cabello"
  }
];

const stylists = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Estilista Senior",
    specialties: ["Color", "Balayage"],
    rating: 4.9
  },
  {
    id: 2,
    name: "James Chen",
    title: "Director de Estilo",
    specialties: ["Cortes", "Peinado"],
    rating: 4.8
  },
  {
    id: 3,
    name: "Maria Garcia",
    title: "Especialista en Color",
    specialties: ["Corrección de Color", "Luces"],
    rating: 5.0
  }
];

const products = [
  {
    id: 1,
    name: "Champú Bloqueo de Humedad",
    category: "Cuidado Capilar",
    price: 28,
    description: "Champú hidratante con aceite de argán",
    image: "shampoo.jpg"
  },
  {
    id: 2,
    name: "Acondicionador Reparación Seda",
    category: "Cuidado Capilar",
    price: 32,
    description: "Tratamiento acondicionador profundo",
    image: "conditioner.jpg"
  },
  {
    id: 3,
    name: "Jabón Sueños de Lavanda",
    category: "Jabón Orgánico",
    price: 12,
    description: "Jabón orgánico artesanal de lavanda",
    image: "lavender-soap.jpg"
  },
  {
    id: 4,
    name: "Barra Exfoliante Avena Miel",
    category: "Jabón Orgánico",
    price: 14,
    description: "Jabón exfoliante natural con miel",
    image: "honey-soap.jpg"
  },
  {
    id: 5,
    name: "Spray Defensa Calor",
    category: "Cuidado Capilar",
    price: 24,
    description: "Protección térmica para peinado",
    image: "heat-spray.jpg"
  },
  {
    id: 6,
    name: "Set Jabón Jardín de Rosas",
    category: "Jabón Orgánico",
    price: 35,
    description: "Set de 3 jabones orgánicos con aroma a rosa",
    image: "rose-soap-set.jpg"
  }
];

// Ejemplo de Carrito de Compras
let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartDisplay();
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}
```

---

## ✅ Lista de Verificación de Evaluación de Claude

Claude verificará estos elementos específicos:

### Pruebas de Funcionalidad
```markdown
1. La página de inicio carga sin errores
2. Todos los enlaces de navegación funcionan
3. La selección de servicios captura la elección del usuario
4. La selección de estilistas captura la elección del usuario
5. Se puede seleccionar fecha/hora
6. El formulario acepta entrada del usuario
7. El flujo de reservas se puede completar
8. Los productos se muestran con precios
9. La funcionalidad agregar al carrito funciona
10. El carrito muestra el contador correcto de artículos
11. El carrito calcula el total correctamente
12. Responsivo móvil (etiqueta meta viewport presente)
```

### Verificaciones de Calidad del Código
```markdown
1. HTML es válido y semántico
2. CSS usa los colores de marca
3. JavaScript no tiene errores de consola
4. El código está organizado en archivos lógicos
5. README tiene instrucciones claras
6. Gestión de estado del carrito está implementada
7. Archivos de prueba existen y ejecutan
8. Documentación es comprehensiva
```

### Evaluación de Diseño
```markdown
1. Color rosa #ec4899 es visible
2. Color azul #3b82f6 es visible
3. El texto es legible (buen contraste)
4. Los botones son claramente clicables
5. Las tarjetas de productos muestran imágenes/marcadores
6. El carrito de compras es visible
7. El diseño funciona en móvil (ancho máximo: 480px)
8. El diseño funciona en escritorio (ancho mínimo: 1024px)
```

---

## 🚫 Errores Comunes a Evitar

1. **No sobrecompliques** - 8 horas es poco, enfócate en características funcionales
2. **No omitas pruebas móviles** - Abre DevTools y revisa vista móvil
3. **No olvides el README** - Claude necesita instrucciones para ejecutar tu código
4. **No hardcodees todo** - Usa los arrays de datos de muestra
5. **No omitas los colores de marca** - Rosa y azul son requeridos

---

## 💡 Estrategias de Victoria Rápida

1. **Usa CSS Grid/Flexbox** - Más rápido que posicionar todo manualmente
2. **Copia el CSS proporcionado** - No pierdas tiempo escribiendo desde cero
3. **Aplicación de Una Sola Página** - Evita routing complejo, usa secciones
4. **Enfócate en el Flujo** - Asegúrate de que las reservas funcionen antes de agregar extras
5. **Prueba Seguido** - Revisa tu trabajo cada 30 minutos

---

## 📤 Requisitos de Entrega

### Tu repositorio de GitHub debe incluir:

1. **Todo el código fuente** subido a la rama main
2. **README.md** con instrucciones de ejecución
3. **Sin carpeta node_modules** (agregar .gitignore)
4. **Commit final** antes de la fecha límite

### Convención de Nomenclatura del Repositorio:
```
pink-blueberry-[nombredelequipo]
Ejemplo: pink-blueberry-equipogenial
```

### Campos del Formulario de Entrega:
- URL del Repositorio GitHub
- Nombre del Equipo
- Miembros del Equipo
- Cualquier instrucción especial de ejecución

---

## 🏆 Estrategia Ganadora

**Enfócate en estos en orden:**

1. ✅ Hacer que algo funcione (aunque sea feo)
2. ✅ Completar el flujo de reservas
3. ✅ Agregar funcionalidad de carrito de compras
4. ✅ Agregar colores de marca
5. ✅ Hacerlo responsivo
6. 📝 Escribir pruebas para funciones core (BONUS)
7. 📋 Documentar requisitos y tareas (BONUS)
8. ✨ Pulir y agregar características adicionales

**Consejo Pro:** ¡Los equipos que documentan su proceso y escriben pruebas a menudo obtienen las puntuaciones más altas con la evaluación de Claude!

**Recuerda:** ¡Una aplicación fea pero funcional con pruebas y documentación vence a una aplicación hermosa pero rota!

---

## 🆘 Ayuda Rápida

### Si el flujo de reservas parece complejo:
```javascript
// Gestión de estado simple
let booking = {
  service: null,
  stylist: null,
  date: null,
  time: null,
  name: '',
  email: '',
  phone: ''
};

// Actualizar reserva
function selectService(serviceId) {
  booking.service = serviceId;
  showNextStep();
}
```

### Si el diseño responsivo es confuso:
```css
/* Enfoque Mobile First */
.container {
  padding: 16px;
  max-width: 100%;
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }
}
```

---

## 🎉 ¡Buena Suerte!

**Recuerda:** Claude juzgará basándose en características funcionales, código limpio y uso apropiado de colores de marca. Enfócate en entregar un sistema de reservas completo y funcional en lugar de características perfectas pero incompletas.

**Fecha Límite:** [Insertar hora exacta]  
**Entrega:** [Insertar enlace/formulario de entrega]

---

*¡Que tu código compile y tu flujo de reservas sea suave! 🫐✨*
