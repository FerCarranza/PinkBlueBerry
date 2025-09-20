# El Salón Pink Blueberry - Documento Detallado de Requisitos del Proyecto

**Versión:** 1.0  
**Fecha:** Noviembre 2024  
**Estado:** Final para Hackathon  
**Tipo de Documento:** Especificación de Requisitos Técnicos

---

## Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Visión General del Proyecto](#visión-general-del-proyecto)
3. [Requisitos Funcionales](#requisitos-funcionales)
4. [Requisitos No Funcionales](#requisitos-no-funcionales)
5. [Historias de Usuario y Criterios de Aceptación](#historias-de-usuario--criterios-de-aceptación)
6. [Requisitos Técnicos](#requisitos-técnicos)
7. [Requisitos de Diseño](#requisitos-de-diseño)
8. [Requisitos de Datos](#requisitos-de-datos)
9. [Requisitos de Pruebas](#requisitos-de-pruebas)
10. [Requisitos de Despliegue](#requisitos-de-despliegue)
11. [Métricas de Éxito](#métricas-de-éxito)
12. [Restricciones y Suposiciones](#restricciones-y-suposiciones)

---

## 1. Resumen Ejecutivo

### 1.1 Propósito
Este documento define los requisitos completos para la aplicación web The Pink Blueberry Salon, una Aplicación Web Progresiva (PWA) de lujo que combina capacidades de reservas de salón con funcionalidad de comercio electrónico para un desafío de hackathon de 8 horas.

### 1.2 Alcance
La aplicación abarca:
- Sistema de reservas de citas en línea
- Plataforma de comercio electrónico para productos capilares y jabones orgánicos
- Showcase de portafolio de estilistas
- Programa de recompensas al cliente (fase futura)
- Diseño responsivo mobile-first
- Capacidades de Aplicación Web Progresiva

### 1.3 Partes Interesadas Clave
- **Usuarios Finales:** Clientes del salón que buscan citas y productos
- **Estilistas:** Profesionales capilares mostrando su trabajo
- **Gerencia del Salón:** Propietarios del negocio rastreando reservas y ventas
- **Equipo de Desarrollo:** Participantes del hackathon construyendo la solución

---

## 2. Visión General del Proyecto

### 2.1 Objetivos del Negocio
| Objetivo | Descripción | Métrica de Éxito |
|-----------|-------------|----------------|
| **Transformación Digital** | Pasar de reservas solo por teléfono a plataforma en línea | 50% de reservas en línea en 3 meses |
| **Crecimiento de Ingresos** | Agregar canal de e-commerce para ventas de productos | $10,000 ventas mensuales en línea |
| **Lealtad del Cliente** | Implementar programa de recompensas | 30% incremento retención cliente |
| **Mejora de Marca** | Crear experiencia digital de lujo | Satisfacción cliente >4.5/5 |

### 2.2 Restricciones del Proyecto
- **Tiempo:** Ventana de desarrollo de 8 horas
- **Tamaño del Equipo:** 2-4 desarrolladores por equipo
- **Tecnología:** Solo tecnologías web
- **Presupuesto:** Cero (proyecto de hackathon)
- **Evaluación:** Automatizada por Claude AI

### 2.3 Inspiración de Diseño
- **Flujo UX:** Proceso de pedido streamlineado de Chipotle
- **Estética Visual:** Diseño sofisticado de Pottery Barn
- **Identidad de Marca:** Arándano en acuarela con caligrafía dorada

---

## 3. Requisitos Funcionales

### 3.1 Página de Inicio (FR-HOME)

#### FR-HOME-001: Sección Hero
**Prioridad:** P0 (Crítico)  
**Descripción:** Mostrar sección hero enfocada en marca con llamada a la acción

**Requisitos:**
- Mostrar nombre del salón "The Pink Blueberry" prominentemente
- Incluir tagline "Donde el Lujo se Encuentra con la Belleza Natural"
- Presentar elemento visual de arándano en acuarela
- Implementar botón CTA "Reservar Ahora"
- Soportar gradiente de fondo (rosa a azul)

#### FR-HOME-002: Showcase de Servicios
**Prioridad:** P0 (Crítico)  
**Descripción:** Mostrar servicios disponibles del salón

**Requisitos:**
- Mostrar mínimo 3 servicios (máx 6 en homepage)
- Cada servicio muestra:
  - Nombre del servicio
  - Precio (formato USD)
  - Duración
  - Descripción breve
  - Botón "Reservar Ahora"
- Los servicios deben ser tarjetas visualmente distintas

#### FR-HOME-003: Productos Destacados
**Prioridad:** P0 (Crítico)  
**Descripción:** Mostrar productos de la tienda

**Requisitos:**
- Mostrar mínimo 3 productos destacados
- Enlace a sección completa de tienda
- Mostrar nombre y precio del producto
- Incluir funcionalidad "Agregar al Carrito"

### 3.2 Sistema de Reservas (FR-BOOK)

#### FR-BOOK-001: Flujo de Reservas Multi-Paso
**Prioridad:** P0 (Crítico)  
**Descripción:** Implementar proceso de reservas de 5 pasos

**Paso 1: Selección de Servicios**
- Mostrar todos los servicios disponibles
- Permitir selección de servicio único
- Mostrar detalles del servicio (precio, duración, descripción)
- Estado visual de selección (seleccionado/no seleccionado)
- Habilitar "Siguiente" solo después de selección

**Paso 2: Selección de Estilista**
- Mostrar mínimo 2 estilistas
- Mostrar información del estilista:
  - Nombre y título
  - Especialidades (mínimo 2)
  - Calificación (numérica, escala 1-5)
  - Foto o avatar
- Estado visual de selección
- Opción para "Sin preferencia"

**Paso 3: Selección de Fecha y Hora**
- Selector de fecha (calendario o input)
- Fecha mínima: día actual
- Franjas horarias (9 AM - 5 PM)
- Incrementos mínimo de 1 hora
- Mostrar fecha/hora seleccionada claramente

**Paso 4: Información de Contacto**
- Campos requeridos:
  - Nombre completo
  - Dirección de email
  - Número de teléfono
- Campos opcionales:
  - Solicitudes especiales/notas
- Validación del lado cliente:
  - Validación formato email
  - Formato número teléfono
  - Verificación campos requeridos

**Paso 5: Confirmación de Reserva**
- Mostrar resumen completo de reserva:
  - Servicio seleccionado y precio
  - Estilista elegido
  - Fecha y hora
  - Información del cliente
  - Costo total
- Acción "Confirmar Reserva"
- Opción "Editar" para regresar

#### FR-BOOK-002: Gestión de Estado de Reservas
**Prioridad:** P1 (Alto)  
**Descripción:** Mantener datos de reserva a través de los pasos

**Requisitos:**
- Preservar selecciones al navegar hacia atrás
- Indicador visual claro de progreso
- Permitir edición de pasos anteriores
- Resetear reserva después de confirmación

#### FR-BOOK-003: Confirmación de Reserva
**Prioridad:** P1 (Alto)  
**Descripción:** Confirmar reserva exitosa

**Requisitos:**
- Mostrar mensaje de éxito
- Número de referencia de reserva (puede ser mock)
- Opción para reservar otra cita
- Opción para continuar comprando

### 3.3 Tienda E-Commerce (FR-SHOP)

#### FR-SHOP-001: Catálogo de Productos
**Prioridad:** P0 (Crítico)  
**Descripción:** Mostrar todos los productos disponibles

**Requisitos:**
- Mínimo 4 productos requeridos
- Categorías de productos:
  - Productos de Cuidado Capilar
  - Jabones Orgánicos
- Información del producto:
  - Nombre del producto
  - Categoría
  - Precio (USD)
  - Descripción (1-2 oraciones)
  - Imagen/marcador del producto

#### FR-SHOP-002: Filtrado de Productos
**Prioridad:** P2 (Medio)  
**Descripción:** Filtrar productos por categoría

**Requisitos:**
- Vista "Todos los Productos" (por defecto)
- Filtro "Cuidado Capilar"
- Filtro "Jabones Orgánicos"
- Indicación de filtro activo
- Filtrado instantáneo (sin recarga de página)

#### FR-SHOP-003: Carrito de Compras
**Prioridad:** P0 (Crítico)  
**Descripción:** Implementar funcionalidad de carrito

**Características Core:**
- Agregar productos al carrito
- Ver contenido del carrito
- Actualizar cantidades
- Remover artículos
- Calcular precio total
- Mostrar contador de artículos

**Requisitos de Visualización del Carrito:**
- Ícono de carrito flotante con contador
- Modal o sidebar del carrito
- Artículos de línea con:
  - Nombre del producto
  - Controles de cantidad (botones +/-)
  - Total de línea
  - Opción de remover
- Mostrar total general
- Botón "Checkout" (puede ser mock)

#### FR-SHOP-004: Persistencia del Carrito
**Prioridad:** P3 (Nice-to-have)  
**Descripción:** Mantener carrito durante sesión

**Requisitos:**
- Carrito persiste durante navegación de página
- Opcional: implementación LocalStorage
- Limpiar carrito después de checkout

### 3.4 Perfiles de Estilistas (FR-STYLE)

#### FR-STYLE-001: Showcase de Estilistas
**Prioridad:** P1 (Alto)  
**Descripción:** Mostrar información de estilistas

**Requisitos:**
- Mínimo 2 perfiles de estilistas
- Información del perfil:
  - Nombre
  - Título/Posición
  - Foto/Avatar
  - Biografía (2-3 oraciones)
  - Lista de especialidades
  - Calificación (si aplica)
- Diseño de grilla o tarjetas
- Enlace a reserva con estilista pre-seleccionado

---

## 4. Requisitos No Funcionales

### 4.1 Rendimiento (NFR-PERF)

#### NFR-PERF-001: Velocidad de Carga de Página
**Objetivo:** < 3 segundos carga inicial
**Medición:** Chrome DevTools Lighthouse

#### NFR-PERF-002: Responsividad de Interacción
**Objetivo:** < 100ms respuesta a acciones del usuario
**Aplica a:** Botones, inputs de formulario, navegación

### 4.2 Usabilidad (NFR-USE)

#### NFR-USE-001: Responsividad Móvil
**Requisito:** Funcionalidad completa en dispositivos móviles
**Puntos de Quiebre:**
- Móvil: 320px - 767px
- Tablet: 768px - 1023px  
- Escritorio: 1024px+

#### NFR-USE-002: Objetivos Táctiles
**Requisito:** Mínimo 44x44px para elementos táctiles
**Aplica a:** Todos los botones, enlaces, inputs de formulario en móvil

#### NFR-USE-003: Mensajería de Error
**Requisito:** Mensajes de error claros y accionables
**Ejemplos:**
- "Por favor ingrese una dirección de email válida"
- "Por favor seleccione un servicio antes de continuar"

### 4.3 Accesibilidad (NFR-ACC)

#### NFR-ACC-001: HTML Semántico
**Requisito:** Usar elementos HTML5 semánticos apropiados
- Headers (h1-h6) en jerarquía correcta
- Etiquetas nav, main, section, article
- Labels de formulario para todos los inputs

#### NFR-ACC-002: Navegación por Teclado
**Requisito:** Todos los elementos interactivos accesibles por teclado
- Orden de tab lógico
- Estados de foco visibles
- Enlaces de salto opcionales

#### NFR-ACC-003: Contraste de Color
**Requisito:** Cumplimiento WCAG 2.1 AA
- Texto normal: relación 4.5:1
- Texto grande: relación 3:1

### 4.4 Compatibilidad (NFR-COMP)

#### NFR-COMP-001: Soporte de Navegadores
**Requisitos Mínimos:**
- Chrome 90+ (70% de usuarios)
- Safari 14+ (20% de usuarios)
- Firefox 88+ (5% de usuarios)
- Edge 90+ (5% de usuarios)

#### NFR-COMP-002: Soporte de Viewport
**Requisitos:**
- Sin scroll horizontal en cualquier punto de quiebre
- Etiqueta meta viewport presente
- Imágenes/contenido responsivo

---

## 5. Historias de Usuario y Criterios de Aceptación

### 5.1 Historias de Usuario del Sistema de Reservas

#### US-001: Reservar una Cita
**Como** cliente  
**Quiero** reservar una cita en línea  
**Para que** no tenga que llamar al salón

**Criterios de Aceptación:**
- [ ] Puedo ver servicios disponibles con precios
- [ ] Puedo seleccionar un estilista preferido o "sin preferencia"
- [ ] Puedo elegir de fechas disponibles (hoy o después)
- [ ] Puedo seleccionar de franjas horarias disponibles
- [ ] Puedo proporcionar mi información de contacto
- [ ] Recibo confirmación de que mi reserva fue exitosa
- [ ] Todo el proceso toma menos de 2 minutos

#### US-002: Ver Precios de Servicios
**Como** cliente consciente del precio  
**Quiero** ver todos los precios de servicios por adelantado  
**Para que** pueda presupuestar para mi cita

**Criterios de Aceptación:**
- [ ] Todos los servicios muestran precios en USD
- [ ] Los precios son visibles antes de reservar
- [ ] Sin tarifas ocultas o cargos
- [ ] Costo total mostrado antes de confirmación

### 5.2 Historias de Usuario de E-Commerce

#### US-003: Navegar Productos
**Como** cliente  
**Quiero** navegar productos del salón en línea  
**Para que** pueda comprar productos profesionales de cuidado capilar

**Criterios de Aceptación:**
- [ ] Puedo ver todos los productos disponibles
- [ ] Puedo filtrar por categoría de producto
- [ ] Puedo ver precios de productos claramente
- [ ] Puedo leer descripciones de productos
- [ ] Los productos tienen imágenes o marcadores

#### US-004: Gestionar Carrito de Compras
**Como** cliente  
**Quiero** agregar productos a un carrito de compras  
**Para que** pueda comprar múltiples artículos a la vez

**Criterios de Aceptación:**
- [ ] Puedo agregar productos al carrito con un clic
- [ ] Puedo ver contenido del carrito en cualquier momento
- [ ] Puedo cambiar cantidades en el carrito
- [ ] Puedo remover artículos del carrito
- [ ] Veo el precio total actualizarse automáticamente
- [ ] El contador del carrito siempre es visible

### 5.3 Historias de Usuario de Selección de Estilistas

#### US-005: Elegir Estilista Preferido
**Como** cliente recurrente  
**Quiero** reservar con mi estilista preferido  
**Para que** reciba servicio consistente

**Criterios de Aceptación:**
- [ ] Puedo ver todos los estilistas disponibles
- [ ] Puedo ver especialidades de estilistas
- [ ] Puedo ver calificaciones/reseñas de estilistas
- [ ] Puedo seleccionar un estilista específico
- [ ] El estilista seleccionado se muestra en resumen de reserva

---

## 6. Requisitos Técnicos

### 6.1 Requisitos de Arquitectura

#### TR-001: Tipo de Aplicación
**Requisito:** Aplicación de Una Sola Página (SPA) o Aplicación Multi-Página (MPA)
**Frameworks Aceptables:**
- JavaScript/HTML/CSS Vanilla
- React + Vite
- Vue + Vite
- Angular (si el equipo tiene experiencia)

#### TR-002: Gestión de Estado
**Requisito:** Mantener estado de aplicación
**Opciones de Implementación:**
- Objetos/arrays JavaScript
- React Context/State
- Vue Composition API
- LocalStorage para persistencia

### 6.2 Requisitos de Calidad del Código

#### TR-003: Organización de Archivos
**Estructura Requerida:**
```
/project-root
├── index.html
├── /styles o /css
│   └── main.css
├── /js o /src
│   ├── data.js
│   ├── booking.js
│   ├── shop.js
│   └── main.js
├── /assets o /images
├── /tests (bonus)
├── /docs (bonus)
└── README.md
```

#### TR-004: Estándares de Código
**Requisitos:**
- Usar `const`/`let` en lugar de `var`
- Nombres significativos para variables y funciones
- Comentarios para lógica compleja
- Indentación consistente (2 o 4 espacios)
- Sin console.error() en producción

### 6.3 Requisitos de Pruebas

#### TR-005: Pruebas Básicas (Puntos Bonus)
**Áreas de Cobertura de Pruebas:**
- Cálculos del carrito
- Validación de formularios
- Completación de flujo de reservas
- Filtrado de productos

**Implementación de Pruebas:**
- Mínimo 3 funciones de prueba
- Puede usar pruebas basadas en consola simples
- Avanzado: Framework Jest/Vitest

---

## 7. Requisitos de Diseño

### 7.1 Colores de Marca (Requerido)

#### DR-001: Implementación de Paleta de Colores
**Colores Primarios (DEBE USAR):**
```css
--pink-primary: #ec4899;
--blue-primary: #3b82f6;
```

**Colores de Apoyo:**
```css
--pink-light: #f9a8d4;
--blue-light: #93c5fd;
--text-dark: #1e293b;
--text-light: #64748b;
--white: #ffffff;
--gray-light: #f1f5f9;
```

### 7.2 Requisitos de Tipografía

#### DR-002: Jerarquía de Fuentes
**Requisitos:**
- Heading 1: 2.5-3rem
- Heading 2: 1.75-2rem
- Texto del cuerpo: 1rem (16px)
- Texto pequeño: 0.875rem (14px)
- Altura de línea: mínimo 1.4

### 7.3 Diseño de Componentes

#### DR-003: Estilos de Botones
**Botón Primario:**
- Fondo gradiente (rosa a azul)
- Texto blanco
- Padding: 12px 24px
- Border radius: 12px
- Estado hover (transform o shadow)

#### DR-004: Componentes de Tarjeta
**Requisitos:**
- Fondo blanco
- Border radius: 12-16px
- Box shadow
- Padding: 24px
- Efecto hover (elevación o escala)

### 7.4 Requisitos de Layout

#### DR-005: Grilla Responsiva
**Puntos de Quiebre:**
```css
/* Mobile First */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

**Especificaciones de Grilla:**
- Móvil: Una sola columna
- Tablet: Máx 2 columnas
- Escritorio: 3-4 columnas para productos/servicios

---

## 8. Requisitos de Datos

### 8.1 Modelo de Datos de Servicios

```javascript
{
  id: number,
  name: string,
  price: number,
  duration: string, // "XX min"
  description: string,
  category: string // "cuts" | "color" | "treatments" | "styling"
}
```

**Servicios Mínimos Requeridos:** 3
**Servicios Recomendados:** 6

### 8.2 Modelo de Datos de Estilistas

```javascript
{
  id: number,
  name: string,
  title: string,
  specialties: string[],
  bio: string,
  rating: number, // 1.0 - 5.0
  image: string // URL o marcador emoji
}
```

**Estilistas Mínimos Requeridos:** 2
**Estilistas Recomendados:** 4

### 8.3 Modelo de Datos de Productos

```javascript
{
  id: number,
  name: string,
  category: string, // "Hair Care" | "Organic Soap"
  price: number,
  description: string,
  image: string // URL o marcador emoji
}
```

**Productos Mínimos Requeridos:** 4
**Productos Recomendados:** 8

### 8.4 Modelo de Datos de Reservas

```javascript
{
  service: Service,
  stylist: Stylist,
  date: string, // YYYY-MM-DD
  time: string, // HH:MM
  customer: {
    name: string,
    email: string,
    phone: string,
    notes?: string
  }
}
```

### 8.5 Modelo de Datos del Carrito

```javascript
{
  items: [{
    product: Product,
    quantity: number
  }],
  total: number
}
```

---

## 9. Requisitos de Pruebas

### 9.1 Lista de Verificación de Pruebas Manuales

#### Pruebas de Flujo de Reservas
- [ ] Puede seleccionar un servicio
- [ ] Puede seleccionar un estilista
- [ ] Puede seleccionar fecha/hora
- [ ] Puede ingresar info de contacto
- [ ] Validación de formulario funciona
- [ ] Puede navegar atrás/adelante
- [ ] Confirmación de reserva se muestra
- [ ] Estado persiste entre pasos

#### Pruebas de Carrito de Compras
- [ ] Puede agregar productos al carrito
- [ ] Contador del carrito se actualiza correctamente
- [ ] Puede ver contenido del carrito
- [ ] Puede actualizar cantidades
- [ ] Puede remover artículos
- [ ] Total se calcula correctamente
- [ ] Carrito persiste durante sesión

#### Pruebas Responsivas
- [ ] Sin scroll horizontal a 375px
- [ ] Navegación funciona en móvil
- [ ] Botones son amigables al tacto
- [ ] Formularios son usables en móvil
- [ ] Imágenes escalan apropiadamente

### 9.2 Pruebas Automatizadas (Bonus)

#### Pruebas Unitarias a Implementar
```javascript
// Probar cálculo total del carrito
testCartTotal()

// Probar función agregar al carrito
testAddToCart()

// Probar validación email
testEmailValidation()

// Probar gestión estado reservas
testBookingState()

// Probar filtrado productos
testProductFilter()
```

### 9.3 Pruebas de Aceptación del Usuario

| Caso de Prueba | Pasos | Resultado Esperado | Prioridad |
|-----------|-------|-----------------|----------|
| Reserva Completa | 1. Seleccionar servicio<br>2. Seleccionar estilista<br>3. Elegir fecha/hora<br>4. Ingresar info<br>5. Confirmar | Mensaje reserva confirmada | P0 |
| Agregar al Carrito | 1. Navegar productos<br>2. Clic "Agregar al Carrito"<br>3. Ver carrito | Producto en carrito con precio correcto | P0 |
| Navegación Móvil | 1. Abrir en móvil<br>2. Navegar todas secciones | Todas las secciones accesibles | P0 |
| Filtrar Productos | 1. Ir a tienda<br>2. Clic filtro categoría | Solo productos filtrados mostrados | P1 |

---

## 10. Requisitos de Despliegue

### 10.1 Requisitos del Repositorio

#### DR-001: Repositorio GitHub
**Requisitos:**
- Repositorio público
- README.md claro con instrucciones de configuración
- .gitignore para node_modules (si aplica)
- Todo el código committeado a rama main
- Nomenclatura repositorio: `pink-blueberry-[nombreequipo]`

### 10.2 Requisitos de Documentación

#### DR-002: Contenido README
**Secciones Requeridas:**
- Nombre del equipo y miembros
- Cómo ejecutar el proyecto
- Características implementadas
- Tecnologías utilizadas
- Problemas conocidos/limitaciones

#### DR-003: Documentación Adicional (Bonus)
- Documento de requisitos (este documento)
- Desglose de tareas/tablero
- Resultados de pruebas
- Criterios de aceptación del usuario

---

## 11. Métricas de Éxito

### 11.1 Métricas de Evaluación Claude AI

| Categoría | Puntos | Peso |
|----------|---------|--------|
| Calidad del Código | 20 | 20% |
| Implementación de Diseño | 20 | 20% |
| Completitud de Características | 20 | 20% |
| Experiencia del Usuario | 20 | 20% |
| Documentación y Pruebas | 20 | 20% |
| **Total Base** | **100** | **100%** |
| Puntos Bonus | 100 | +100% |
| **Puntuación Máxima** | **200** | **200%** |

### 11.2 Criterios de Producto Mínimo Viable

**Debe Tener (P0):**
- [ ] Página de inicio con sección hero
- [ ] 3+ servicios mostrados
- [ ] Flujo completo de reservas (5 pasos)
- [ ] 2+ estilistas disponibles
- [ ] 4+ productos en tienda
- [ ] Carrito de compras funcional
- [ ] Diseño responsivo móvil
- [ ] Colores de marca implementados

**Debería Tener (P1):**
- [ ] Filtrado de productos
- [ ] Gestión de estado de reservas
- [ ] Validación de formularios
- [ ] Mensajes de éxito

**Nice to Have (P2):**
- [ ] Animaciones/transiciones
- [ ] Modo oscuro
- [ ] Almacenamiento local
- [ ] Suite de pruebas
- [ ] Documentación completa

---

## 12. Restricciones y Suposiciones

### 12.1 Restricciones

1. **Restricción de Tiempo:** Ventana de desarrollo de 8 horas
2. **Restricción Tecnológica:** Solo tecnologías web
3. **Restricción de Equipo:** Máximo 4 desarrolladores
4. **Restricción de Evaluación:** Evaluación automatizada por Claude AI
5. **Restricción de Infraestructura:** Sin backend/base de datos

### 12.2 Suposiciones

1. **Suposiciones del Usuario:**
   - Los usuarios tienen navegadores modernos
   - Los usuarios tienen internet estable
   - Los usuarios entienden reservas en línea

2. **Suposiciones Técnicas:**
   - Datos mock son aceptables
   - Procesamiento de pagos es simulado
   - Sin programación real de citas
   - Sin confirmaciones por email requeridas

3. **Suposiciones del Negocio:**
   - Todos los servicios siempre disponibles
   - Todos los estilistas siempre disponibles
   - Inventario ilimitado de productos
   - Sin autenticación requerida

### 12.3 Fuera del Alcance

Los siguientes elementos están explícitamente FUERA DEL ALCANCE para el hackathon:
- Autenticación/login de usuario
- Procesamiento real de pagos
- Notificaciones email/SMS
- Desarrollo de API backend
- Integración de base de datos
- Panel de administración
- Gestión de inventario
- Disponibilidad en tiempo real
- Soporte multi-idioma
- Características avanzadas de accesibilidad

---

## Apéndice A: Referencia Rápida

### Factores Críticos de Éxito
1. ✅ Colores de marca (#ec4899, #3b82f6) visibles
2. ✅ Flujo de reservas completable
3. ✅ Funcionalidad del carrito funcionando
4. ✅ Responsivo móvil
5. ✅ Sin errores de consola

### Errores Comunes a Evitar
1. ❌ Sobre-ingeniería de la solución
2. ❌ Omitir pruebas móviles
3. ❌ Faltan colores de marca
4. ❌ Flujo de reservas incompleto
5. ❌ Sin documentación README

### Guía de Gestión de Tiempo
- **Hora 1:** Configuración y planificación
- **Hora 2-3:** Estructura HTML/CSS core
- **Hora 3-5:** Funcionalidad de reservas
- **Hora 5-6:** Carrito de compras
- **Hora 6-7:** Estilo y responsivo
- **Hora 7-8:** Pruebas y documentación

---

## Apéndice B: Lista de Verificación de Evaluación para Equipos

### Lista de Verificación Pre-Entrega
- [ ] Página de inicio carga sin errores
- [ ] Todos los enlaces de navegación funcionan
- [ ] Puede completar flujo de reservas
- [ ] Puede agregar artículos al carrito
- [ ] Total del carrito calcula correctamente
- [ ] Vista móvil funciona (ancho 375px)
- [ ] Vista escritorio funciona (ancho 1920px)
- [ ] Color rosa #ec4899 es visible
- [ ] Color azul #3b82f6 es visible
- [ ] README tiene instrucciones de ejecución
- [ ] Código está organizado en carpetas
- [ ] Repositorio es público
- [ ] Commit final está subido

### Lista de Verificación Puntos Bonus
- [ ] Pruebas escritas y pasando
- [ ] Requisitos documentados
- [ ] Tablero de tareas creado
- [ ] Animaciones implementadas
- [ ] Modo oscuro disponible
- [ ] Almacenamiento local usado
- [ ] Búsqueda/filtro funciona
- [ ] Estados de carga mostrados

---

**Fin del Documento de Requisitos**

*Este documento sirve como la especificación técnica completa para el proyecto hackathon The Pink Blueberry Salon. Los equipos deben referirse a este documento a lo largo del desarrollo para asegurar que se cumplan todos los requisitos.*

**Estado del Documento:** Aprobado para Uso en Hackathon  
**Última Actualización:** Noviembre 2024  
**Próxima Revisión:** Retrospectiva Post-Hackathon
