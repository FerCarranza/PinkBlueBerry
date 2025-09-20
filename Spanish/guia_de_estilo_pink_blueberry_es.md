# Guía de Estilo: La Aplicación Web del Salón Pink Blueberry

## Sistema de Colores

### Paleta de Colores Principal

**Espectro Rosa**
```css
/* Rosa Principal */
--pink-500: #ec4899;
--pink-400: #f472b6;
--pink-300: #f9a8d4;
--pink-200: #fbcfe8;
--pink-100: #fce7f3;
--pink-50: #fdf2f8;

/* Uso: CTAs principales, acentos de marca, elementos interactivos */
```

**Espectro Azul**
```css
/* Azul Principal */
--blue-600: #2563eb;
--blue-500: #3b82f6;
--blue-400: #60a5fa;
--blue-300: #93c5fd;
--blue-200: #bfdbfe;
--blue-100: #dbeafe;
--blue-50: #eff6ff;

/* Uso: CTAs secundarios, elementos de confianza, acentos profesionales */
```

**Combinaciones de Gradiente**
```css
/* Gradiente Principal */
background: linear-gradient(135deg, #ec4899 0%, #3b82f6 100%);

/* Gradiente de Fondo Sutil */
background: linear-gradient(135deg, #fdf2f8 0%, #eff6ff 100%);

/* Gradiente Estado Hover */
background: linear-gradient(135deg, #db2777 0%, #1d4ed8 100%);
```

### Paleta de Colores Neutros

**Espectro Pizarra**
```css
/* Elementos de Texto e Interfaz */
--slate-900: #0f172a; /* Texto principal */
--slate-800: #1e293b; /* Encabezados */
--slate-700: #334155; /* Texto secundario */
--slate-600: #475569; /* Texto silenciado */
--slate-500: #64748b; /* Texto de marcador */
--slate-400: #94a3b8; /* Texto deshabilitado */
--slate-300: #cbd5e1; /* Bordes */
--slate-200: #e2e8f0; /* Bordes claros */
--slate-100: #f1f5f9; /* Tintes de fondo */
--slate-50: #f8fafc;  /* Fondos de página */
```

### Colores Semánticos

**Estados de Éxito**
```css
--green-500: #10b981; /* Mensajes de éxito, confirmaciones */
--green-100: #d1fae5; /* Fondos de éxito */
```

**Estados de Advertencia**
```css
--amber-500: #f59e0b; /* Advertencias, atención */
--amber-100: #fef3c7; /* Fondos de advertencia */
```

**Estados de Error**
```css
--red-500: #ef4444; /* Mensajes de error, validación */
--red-100: #fee2e2; /* Fondos de error */
```

---

## Sistema Tipográfico

### Familia de Fuentes
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
             'Helvetica Neue', Arial, sans-serif;
```

### Escala Tipográfica

**Tipografía de Exhibición**
```css
/* Títulos Heroicos */
.text-display-xl {
  font-size: 4.5rem; /* 72px */
  line-height: 1.1;
  font-weight: 300;
  letter-spacing: -0.02em;
}

.text-display-lg {
  font-size: 3.75rem; /* 60px */
  line-height: 1.1;
  font-weight: 300;
  letter-spacing: -0.02em;
}

.text-display-md {
  font-size: 3rem; /* 48px */
  line-height: 1.2;
  font-weight: 300;
  letter-spacing: -0.01em;
}
```

**Tipografía de Encabezados**
```css
/* Encabezados de Sección */
.text-heading-xl {
  font-size: 2.25rem; /* 36px */
  line-height: 1.3;
  font-weight: 500;
}

.text-heading-lg {
  font-size: 1.875rem; /* 30px */
  line-height: 1.3;
  font-weight: 500;
}

.text-heading-md {
  font-size: 1.5rem; /* 24px */
  line-height: 1.4;
  font-weight: 500;
}

.text-heading-sm {
  font-size: 1.25rem; /* 20px */
  line-height: 1.4;
  font-weight: 500;
}
```

**Tipografía del Cuerpo**
```css
/* Texto del Cuerpo */
.text-body-xl {
  font-size: 1.25rem; /* 20px */
  line-height: 1.6;
  font-weight: 400;
}

.text-body-lg {
  font-size: 1.125rem; /* 18px */
  line-height: 1.6;
  font-weight: 400;
}

.text-body-md {
  font-size: 1rem; /* 16px */
  line-height: 1.6;
  font-weight: 400;
}

.text-body-sm {
  font-size: 0.875rem; /* 14px */
  line-height: 1.5;
  font-weight: 400;
}
```

**Tipografía de Subtítulos**
```css
/* Texto Pequeño */
.text-caption-lg {
  font-size: 0.875rem; /* 14px */
  line-height: 1.4;
  font-weight: 500;
}

.text-caption-md {
  font-size: 0.75rem; /* 12px */
  line-height: 1.4;
  font-weight: 500;
}

.text-caption-sm {
  font-size: 0.6875rem; /* 11px */
  line-height: 1.3;
  font-weight: 500;
}
```

---

## Sistema de Espaciado

### Unidad Base: 4px

```css
/* Escala de Espaciado */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
```

### Pautas de Espaciado de Componentes

**Botones**
```css
/* Relleno */
.btn-sm { padding: 0.5rem 1rem; }      /* 8px 16px */
.btn-md { padding: 0.75rem 1.5rem; }   /* 12px 24px */
.btn-lg { padding: 1rem 2rem; }        /* 16px 32px */
.btn-xl { padding: 1.25rem 2.5rem; }   /* 20px 40px */
```

**Tarjetas**
```css
/* Relleno */
.card-sm { padding: 1rem; }      /* 16px */
.card-md { padding: 1.5rem; }    /* 24px */
.card-lg { padding: 2rem; }      /* 32px */
.card-xl { padding: 3rem; }      /* 48px */
```

---

## Sistema de Radio de Borde

```css
/* Escala de Radio de Borde */
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-3xl: 2rem;     /* 32px */
--radius-full: 9999px;  /* Completamente redondeado */
```

### Radio de Borde de Componentes

```css
/* Botones */
.btn { border-radius: var(--radius-lg); }

/* Tarjetas */
.card { border-radius: var(--radius-2xl); }

/* Campos de Entrada */
.input { border-radius: var(--radius-md); }

/* Insignias */
.badge { border-radius: var(--radius-full); }
```

---

## Sistema de Sombras

```css
/* Escala de Sombras */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Sombras Coloreadas */
--shadow-pink: 0 25px 50px -12px rgb(236 72 153 / 0.25);
--shadow-blue: 0 25px 50px -12px rgb(59 130 246 / 0.25);
```

### Sombras de Componentes

```css
/* Tarjetas */
.card-default { box-shadow: var(--shadow-lg); }
.card-hover { box-shadow: var(--shadow-xl); }

/* Botones */
.btn-primary { box-shadow: var(--shadow-pink); }
.btn-secondary { box-shadow: var(--shadow-md); }

/* Modales */
.modal { box-shadow: var(--shadow-2xl); }
```

---

## Especificaciones de Componentes

### Botones

**Botón Principal**
```css
.btn-primary {
  background: linear-gradient(135deg, #ec4899 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: 0 4px 15px 0 rgba(236, 72, 153, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #db2777 0%, #1d4ed8 100%);
  box-shadow: 0 8px 25px 0 rgba(236, 72, 153, 0.4);
  transform: translateY(-2px);
}
```

**Botón Secundario**
```css
.btn-secondary {
  background: transparent;
  color: #ec4899;
  border: 2px solid #ec4899;
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #ec4899;
  color: white;
  box-shadow: 0 4px 15px 0 rgba(236, 72, 153, 0.3);
}
```

### Tarjetas

**Tarjeta Estándar**
```css
.card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

### Elementos de Formulario

**Campos de Entrada**
```css
.input {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
}
```

**Área de Texto**
```css
.textarea {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
}

.textarea:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
}
```

---

## Pautas de Animación

### Temporización de Transición

```css
/* Transiciones Estándar */
--transition-fast: 150ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;

/* Funciones de Suavizado */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Animaciones Comunes

**Desvanecimiento de Entrada**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
```

**Deslizamiento Hacia Arriba**
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}
```

**Escalado de Entrada**
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}
```

---

## Puntos de Quiebre Responsivos

```css
/* Puntos de Quiebre Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Tipografía Responsiva

```css
/* Tipografía Fluida */
.text-responsive-xl {
  font-size: clamp(2rem, 5vw, 4rem);
}

.text-responsive-lg {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

.text-responsive-md {
  font-size: clamp(1.25rem, 3vw, 2rem);
}
```

---

## Pautas de Accesibilidad

### Relaciones de Contraste de Color

**Requisitos de Contraste de Texto:**
- Texto normal: mínimo 4.5:1
- Texto grande (18px+): mínimo 3:1
- Componentes de UI: mínimo 3:1

**Combinaciones Verificadas:**
```css
/* Alto Contraste */
color: #1e293b; /* slate-800 */
background: #ffffff; /* Relación: 12.6:1 */

/* Contraste Medio */
color: #475569; /* slate-600 */
background: #f8fafc; /* Relación: 7.2:1 */

/* Contraste Mínimo */
color: #64748b; /* slate-500 */
background: #ffffff; /* Relación: 4.6:1 */
```

### Estados de Foco

```css
/* Anillo de Foco */
.focus-ring:focus {
  outline: 2px solid #ec4899;
  outline-offset: 2px;
}

/* Foco Interno */
.focus-within:focus-within {
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
}
```

---

## Sistema de Iconos

### Tamaños de Iconos

```css
/* Tamaños de Iconos */
.icon-xs { width: 12px; height: 12px; }
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }
```

### Pautas de Uso de Iconos

**Iconos de Botones:**
- Usa iconos de 16px para botones pequeños
- Usa iconos de 20px para botones medianos
- Usa iconos de 24px para botones grandes

**Iconos de Navegación:**
- Usa iconos de 20px para navegación principal
- Usa iconos de 16px para navegación secundaria

**Iconos Decorativos:**
- Usa iconos de 32px+ para destacar características
- Usa iconos de 48px+ para estados vacíos

---

## Sistema de Rejilla

### Anchos de Contenedor

```css
/* Tamaños de Contenedor */
.container-sm { max-width: 640px; }
.container-md { max-width: 768px; }
.container-lg { max-width: 1024px; }
.container-xl { max-width: 1280px; }
.container-2xl { max-width: 1536px; }
```

### Diseños de Rejilla

```css
/* Patrones de Rejilla Comunes */
.grid-1 { grid-template-columns: 1fr; }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

/* Rejilla Responsiva */
.grid-responsive {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

---

## Notas de Implementación

### Uso de Propiedades Personalizadas CSS

```css
:root {
  /* Usa nomenclatura semántica */
  --color-primary: var(--pink-500);
  --color-secondary: var(--blue-500);
  --color-text: var(--slate-800);
  --color-text-muted: var(--slate-600);
  
  /* Variables específicas de componentes */
  --btn-padding-x: 1.5rem;
  --btn-padding-y: 0.75rem;
  --btn-border-radius: 0.75rem;
  
  /* Variables de diseño */
  --header-height: 5rem;
  --sidebar-width: 16rem;
  --content-max-width: 1280px;
}
```

### Consideraciones de Rendimiento

**Optimización CSS:**
- Usa propiedades personalizadas CSS para temas
- Minimiza conflictos de especificidad
- Agrupa propiedades relacionadas
- Usa propiedades abreviadas cuando sea posible

**Rendimiento de Animaciones:**
- Prefiere `transform` y `opacity` para animaciones
- Usa `will-change` con moderación y elimina después de la animación
- Evita animar propiedades de diseño (width, height, padding)

---

Esta guía de estilo sirve como la referencia definitiva para implementar el sistema de diseño de The Pink Blueberry. Todas las medidas, colores y especificaciones deben seguirse con precisión para mantener la consistencia de diseño en toda la aplicación.
