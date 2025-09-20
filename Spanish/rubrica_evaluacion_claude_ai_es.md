# 🤖 Rúbrica de Evaluación Claude AI - Hackathon del Salón Pink Blueberry

## Algoritmo de Puntuación Automática

Este documento describe los criterios exactos de puntuación que Claude usará para evaluar las entregas del hackathon. Cada sección incluye verificaciones específicas y asignaciones de puntos.

---

## 📊 Cálculo de Puntuación Total

```
Puntuación Base (100 puntos) + Puntos Bonus (hasta 100 puntos) = Puntuación Final (máx 200 puntos)
```

---

## 1️⃣ Calidad del Código (20 puntos)

### Organización de Archivos (5 puntos)
```markdown
✓ Existe estructura de carpetas apropiada (2 pts)
  - Verificar: existe carpeta /js o /src
  - Verificar: existe carpeta /css o /styles
  - Verificar: index.html en raíz

✓ Separación lógica de archivos (3 pts)
  - Verificar: CSS separado de HTML
  - Verificar: JS separado de HTML
  - Verificar: Sin estilos inline en HTML (>10 líneas)
```

### Estándares de Código (5 puntos)
```markdown
✓ Validación HTML (2 pts)
  - Verificar: <!DOCTYPE html> presente
  - Verificar: etiqueta <meta viewport> existe
  - Verificar: Estructura HTML apropiada (head/body)

✓ Calidad JavaScript (3 pts)
  - Verificar: Sin declaraciones "var" (usar let/const)
  - Verificar: Funciones tienen nombres descriptivos
  - Verificar: Sin console.error() en salida
```

### Legibilidad del Código (5 puntos)
```markdown
✓ Nombres significativos (2 pts)
  - Verificar: Sin variables de una letra (excepto loops)
  - Verificar: Nombres de funciones describen acción

✓ Comentarios presentes (2 pts)
  - Verificar: Al menos 5 comentarios en código JS
  - Verificar: Funciones complejas tienen descripciones

✓ Formato consistente (1 pt)
  - Verificar: Indentación consistente (2 o 4 espacios)
```

### Manejo de Errores (5 puntos)
```markdown
✓ Sin errores de runtime (3 pts)
  - Verificar: Consola no tiene errores al cargar
  - Verificar: Todos los botones/enlaces funcionan sin errores

✓ Validación de formulario existe (2 pts)
  - Verificar: Campos requeridos validados
  - Verificar: Validación de formato de email presente
```

---

## 2️⃣ Implementación de Diseño (20 puntos)

### Cumplimiento de Marca (8 puntos)
```markdown
✓ Color rosa usado (3 pts)
  - Verificar: #ec4899 o rgb(236, 72, 153) en CSS
  - Verificar: Rosa visible en la página

✓ Color azul usado (3 pts)
  - Verificar: #3b82f6 o rgb(59, 130, 246) en CSS
  - Verificar: Azul visible en la página

✓ Estilo consistente (2 pts)
  - Verificar: Botones tienen estilo consistente
  - Verificar: Tarjetas/secciones tienen espaciado consistente
```

### Jerarquía Visual (6 puntos)
```markdown
✓ Encabezados claros (2 pts)
  - Verificar: Etiqueta H1 existe y es la más grande
  - Verificar: Jerarquía de encabezados apropiada (h1 > h2 > h3)

✓ Tipografía legible (2 pts)
  - Verificar: Font-size >= 14px para texto del cuerpo
  - Verificar: Line-height >= 1.4

✓ Espaciado apropiado (2 pts)
  - Verificar: Padding/margins consistentes
  - Verificar: Espacio en blanco entre secciones
```

### Diseño Responsivo (6 puntos)
```markdown
✓ Responsivo móvil (3 pts)
  - Verificar: @media queries existen
  - Verificar: max-width o width: 100% usado
  - Verificar: Sin scroll horizontal a 375px de ancho

✓ Optimizado para escritorio (3 pts)
  - Verificar: Contenido legible a 1920px
  - Verificar: Restricción de max-width existe
  - Verificar: Diseño multi-columna en escritorio
```

---

## 3️⃣ Completitud de Características (20 puntos)

### Página de Inicio (4 puntos)
```markdown
✓ Sección hero (1 pt)
  - Verificar: Texto "Pink Blueberry" existe
  - Verificar: Sección hero identificable

✓ Visualización de servicios (2 pts)
  - Verificar: Al menos 3 servicios mostrados
  - Verificar: Precios mostrados para cada uno

✓ CTA presente (1 pt)
  - Verificar: Botón/enlace "Reservar" existe
```

### Flujo de Reservas (8 puntos)
```markdown
✓ Selección de servicios (2 pts)
  - Verificar: Servicios seleccionables
  - Verificar: Estado de selección visible

✓ Selección de estilistas (2 pts)
  - Verificar: Al menos 2 estilistas mostrados
  - Verificar: Estilistas seleccionables

✓ Selección de fecha/hora (2 pts)
  - Verificar: Input de fecha existe
  - Verificar: Selección de hora disponible

✓ Formulario de contacto (2 pts)
  - Verificar: Campos nombre, email, teléfono existen
  - Verificar: Formulario puede enviarse
```

### E-Commerce (8 puntos)
```markdown
✓ Visualización de productos (3 pts)
  - Verificar: Al menos 4 productos mostrados
  - Verificar: Nombres y precios de productos visibles

✓ Funcionalidad de carrito (3 pts)
  - Verificar: Botones "Agregar al Carrito" existen
  - Verificar: Carrito se actualiza cuando se agregan artículos
  - Verificar: Contador de artículos se muestra

✓ Total del carrito (2 pts)
  - Verificar: Precio total calculado
  - Verificar: Total se actualiza con artículos
```

---

## 4️⃣ Experiencia del Usuario (20 puntos)

### Navegación (5 puntos)
```markdown
✓ Navegación clara (3 pts)
  - Verificar: Menú o navegación existe
  - Verificar: Todos los enlaces funcionales
  - Verificar: Sección actual identificable

✓ Flujo de usuario (2 pts)
  - Verificar: Puede completar flujo de reservas
  - Verificar: Puede agregar artículos al carrito
```

### Interactividad (5 puntos)
```markdown
✓ Estados hover (2 pts)
  - Verificar: Botones tienen estilos :hover
  - Verificar: Enlaces tienen estilos :hover

✓ Retroalimentación visual (3 pts)
  - Verificar: Estados activos visibles
  - Verificar: Artículos seleccionados resaltados
  - Verificar: Animaciones de carga o transición
```

### Usabilidad (5 puntos)
```markdown
✓ Amigable al tacto (2 pts)
  - Verificar: Botones >= 44px altura en móvil
  - Verificar: Enlaces tienen espaciado adecuado

✓ Contenido legible (3 pts)
  - Verificar: Relación de contraste adecuada
  - Verificar: Texto no se superpone
  - Verificar: Imágenes tienen texto alt
```

### Prevención de Errores (5 puntos)
```markdown
✓ Validación de formulario (3 pts)
  - Verificar: Campos requeridos marcados
  - Verificar: Entrada inválida muestra errores
  - Verificar: Mensajes de éxito mostrados

✓ Guía del usuario (2 pts)
  - Verificar: Texto de marcador o etiquetas
  - Verificar: Texto de ayuda donde sea necesario
```

---

## 5️⃣ Documentación y Pruebas (20 puntos)

### Calidad del README (5 puntos)
```markdown
✓ Instrucciones de configuración (2 pts)
  - Verificar: Sección "Cómo Ejecutar" existe
  - Verificar: Pasos claros proporcionados

✓ Lista de características (2 pts)
  - Verificar: Características implementadas listadas
  - Verificar: Tecnologías mencionadas

✓ Info del equipo (1 pt)
  - Verificar: Nombre del equipo y miembros listados
```

### Pruebas (7 puntos)
```markdown
✓ Archivos de prueba existen (3 pts)
  - Verificar: Carpeta /tests o archivo test.js
  - Verificar: Al menos 3 funciones de prueba

✓ Pruebas ejecutan (4 pts)
  - Verificar: Comando de ejecución de pruebas en README
  - Verificar: Pruebas realmente ejecutan
  - Verificar: Al menos 50% de pruebas pasan
```

### Documentación de Requisitos (8 puntos)
```markdown
✓ Archivo de requisitos (3 pts)
  - Verificar: requirements.md existe
  - Verificar: Historias de usuario presentes
  - Verificar: Criterios de aceptación definidos

✓ Seguimiento de tareas (2 pts)
  - Verificar: tasks.md existe
  - Verificar: Tareas marcadas como completas/en progreso

✓ Documentación de pruebas (3 pts)
  - Verificar: Plan de pruebas documentado
  - Verificar: Resultados de pruebas registrados
  - Verificar: Criterios UAT definidos
```

---

## 🎯 Puntuación de Puntos Bonus

### Victorias Rápidas (5 puntos cada uno)
```markdown
□ Elementos animados - Verificar: animaciones CSS o transiciones
□ Favicon personalizado - Verificar: favicon.ico o etiqueta link
□ Footer presente - Verificar: etiqueta <footer> con contenido
□ Estados de carga - Verificar: spinner o pantallas esqueleto
□ Efectos hover - Verificar: pseudo-clase :hover usada
```

### Características Medias (10 puntos cada uno)
```markdown
□ Búsqueda/Filtro - Verificar: Input filtra productos/servicios
□ Calculadora de precios - Verificar: Actualizaciones dinámicas de precios
□ Validación de formulario - Verificar: Retroalimentación de validación en tiempo real
□ Navegación atrás - Verificar: Funcionalidad de paso anterior
□ Visualización de calificaciones - Verificar: Calificaciones de estrellas visibles
□ Almacenamiento local - Verificar: localStorage usado para persistencia
```

### Alto Valor (15 puntos cada uno)
```markdown
□ Suite de pruebas - Verificar: >5 pruebas escritas y pasando
□ Documento de requisitos - Verificar: Historias de usuario completas con AC
□ Modo oscuro - Verificar: Toggle cambia tema
□ Sección de reseñas - Verificar: Testimonios mostrados
```

### Excelencia (20 puntos cada uno)
```markdown
□ Cobertura de pruebas >50% - Verificar: Mayoría de funciones probadas
□ Documentación completa - Verificar: Todos los docs comprensivos
□ Gestión de tareas - Verificar: Tablero de proyecto completo documentado
□ Accesibilidad - Verificar: Cumplimiento WCAG documentado
```

---

## 🔧 Script de Evaluación de Claude

```javascript
// Pseudocódigo para el proceso de evaluación de Claude

function evaluateSubmission(repoUrl) {
  let score = {
    codeQuality: 0,
    design: 0,
    features: 0,
    ux: 0,
    documentation: 0,
    bonus: 0
  };
  
  // 1. Clonar y analizar repositorio
  const repo = analyzeRepository(repoUrl);
  
  // 2. Verificar estructura de archivos
  score.codeQuality += checkFileOrganization(repo);
  
  // 3. Parsear y validar HTML
  const html = parseHTML(repo.indexHTML);
  score.design += checkBrandColors(html, repo.css);
  
  // 4. Probar funcionalidad
  score.features += testBookingFlow(html);
  score.features += testShoppingCart(html);
  
  // 5. Evaluar UX
  score.ux += checkResponsiveness(html, repo.css);
  score.ux += checkAccessibility(html);
  
  // 6. Revisar documentación
  score.documentation += evaluateREADME(repo.readme);
  score.documentation += checkTests(repo.tests);
  
  // 7. Calcular puntos bonus
  score.bonus = calculateBonusPoints(repo);
  
  return {
    total: Object.values(score).reduce((a, b) => a + b, 0),
    breakdown: score,
    feedback: generateFeedback(score)
  };
}
```

---

## 📝 Ejemplo de Salida de Evaluación

```markdown
## Equipo: Codificadores Geniales
## Repositorio: pink-blueberry-genial

### Puntuación: 142/200

#### Desglose:
- Calidad del Código: 17/20 ✅
- Implementación de Diseño: 18/20 ✅
- Completitud de Características: 16/20 ✅
- Experiencia del Usuario: 15/20 ✅
- Documentación y Pruebas: 18/20 ✅
- Puntos Bonus: 58/100

#### Fortalezas:
✅ Excelente documentación con historias de usuario claras
✅ Colores de marca implementados apropiadamente
✅ Carrito de compras completamente funcional
✅ 8 pruebas pasando cubriendo funcionalidad core

#### Áreas de Mejora:
⚠️ Responsividad móvil necesita trabajo (scroll horizontal a 375px)
⚠️ Selector de fecha/hora no completamente funcional
⚠️ Falta manejo de errores en flujo de checkout

#### Puntos Bonus Ganados:
+ Favicon personalizado (5 pts)
+ Funcionalidad de búsqueda (10 pts)
+ Implementación de almacenamiento local (10 pts)
+ Suite de pruebas con 8 pruebas (15 pts)
+ Documento de requisitos completo (15 pts)
+ Documentación de accesibilidad (3 pts)
```

---

## 🏆 Algoritmo de Clasificación

```javascript
function rankTeams(allScores) {
  return allScores
    .sort((a, b) => {
      // Ordenar primario por puntuación total
      if (b.total !== a.total) return b.total - a.total;
      
      // Desempate 1: Documentación y Pruebas
      if (b.documentation !== a.documentation) 
        return b.documentation - a.documentation;
      
      // Desempate 2: Completitud de Características
      if (b.features !== a.features) 
        return b.features - a.features;
      
      // Desempate 3: Calidad del Código
      return b.codeQuality - a.codeQuality;
    })
    .map((team, index) => ({
      rank: index + 1,
      ...team
    }));
}
```

---

## 🚨 Criterios de Descalificación Automática

```markdown
❌ Repositorio es privado o inaccesible
❌ No hay archivo index.html en el repositorio
❌ Código es claramente plagiado o generado por IA sin modificación
❌ Código malicioso detectado
❌ Entrega después de la fecha límite
```

---

## 📋 Lista de Verificación de Evaluación de Claude

```markdown
Verificaciones Pre-Vuelo:
□ Repositorio accesible
□ README existe
□ index.html existe
□ Sin violaciones de seguridad

Evaluación Core:
□ Ejecutar pruebas automáticas
□ Verificar diseño responsivo a 375px, 768px, 1920px
□ Validar estructura HTML
□ Parsear CSS para colores de marca
□ Probar completación de flujo de reservas
□ Probar funcionalidad del carrito
□ Contar y ejecutar archivos de prueba
□ Evaluar completitud de documentación

Pasos Finales:
□ Calcular puntuación total
□ Generar reporte de retroalimentación
□ Clasificar contra otras entregas
□ Marcar cualquier preocupación para revisión humana
```

---

*Esta rúbrica asegura evaluación consistente, justa y transparente de todas las entregas del hackathon.*
