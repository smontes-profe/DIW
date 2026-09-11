# Documento de diseño
## Web de ejemplos de Diseño de interfaces web

**Proyecto:** repositorio didáctico de DIW  
**Público principal:** alumnado de segundo de Desarrollo de aplicaciones web  
**Estado:** versión inicial funcional  
**Tecnología:** HTML y CSS estáticos, sin proceso de compilación

## 1. Propósito

Esta web reúne micro-lecciones de diseño de interfaces. Cada lección presenta una idea teórica junto a una demostración visual y el código que la produce.

El sitio debe servir para:

- Consultar ejemplos durante las explicaciones de clase.
- Relacionar directamente HTML y CSS con su resultado visual.
- Experimentar modificando el código.
- Enlazar contenidos concretos desde presentaciones teóricas.
- Publicar el material como sitio estático mediante GitHub Pages.

## 2. Usuarios y necesidades

### Alumnado

Necesita localizar rápidamente una lección, comprender el concepto sin una explicación extensa y distinguir qué parte del código produce cada resultado visual.

### Profesorado

Necesita una estructura estable, enlaces previsibles y páginas independientes que pueda enlazar desde presentaciones, actividades o apuntes.

### Necesidades comunes

- Navegación clara y persistente.
- Lectura cómoda en móvil y escritorio.
- Lenguaje directo en español.
- Código visible y fácil de copiar o modificar.
- Acceso mediante teclado y tecnologías de asistencia.

## 3. Arquitectura de contenidos

```text
index.html · Diseño de interfaces web
├── UT1/index.html · Fundamentos del diseño visual e interacción
│   ├── 01 · Punto, línea y forma
│   ├── 02 · Plano, volumen y textura
│   ├── 03 · Distribución y espacio negativo
│   ├── 04 · Tipografía web e iconografía
│   └── 05 · Arquitectura de la información y mapas de navegación
└── UT2/index.html · Uso de estilos
    ├── 01 · Tipos de aplicación de estilos CSS
    └── 02 · Conmutación dinámica de temas
```

Las páginas agrupadas de cada unidad son las entradas recomendadas. Los archivos `UT1_*.html` se conservan como ejemplos independientes para facilitar el estudio de cada ejercicio por separado.

## 4. Recorridos principales

### Consultar una unidad

1. El usuario llega a `index.html`.
2. Selecciona `UT1`.
3. Consulta el índice de micro-lecciones.
4. Salta a una sección o recorre la unidad verticalmente.
5. Regresa al inicio mediante la cabecera o el pie de página.

### Estudiar un ejemplo independiente

1. El usuario abre un archivo `UT1_*.html` desde una presentación o una ruta directa.
2. Usa la cabecera persistente para volver al inicio o al índice de UT1.
3. Compara la demostración visual con su hoja CSS asociada.

## 5. Principios de diseño

- **Jerarquía:** títulos, índices y etiquetas hacen visible la estructura antes de entrar en el detalle.
- **Contraste:** color, tamaño y peso tipográfico diferencian niveles de información y acciones.
- **Alineación:** los contenidos comparten ejes y anchuras para facilitar el escaneo.
- **Proximidad:** cada demostración se mantiene junto a la explicación y al código que la genera.
- **Repetición:** las tarjetas, etiquetas y bloques de código siguen patrones reconocibles.
- **Ritmo:** el espaciado separa las micro-lecciones y marca pausas de lectura.
- **Equilibrio:** el peso visual se reparte entre texto, demostraciones y espacio negativo.

El espacio en blanco no se trata como un sobrante: permite distinguir grupos, reduce la carga cognitiva y mejora la legibilidad.

## 6. Sistema visual

### Color

La interfaz utiliza una base cálida y neutra para que los ejemplos destaquen. Coral, azul, verde y amarillo funcionan como acentos con significado visual, no como información exclusiva.

Los bloques de código usan un fondo oscuro y una tipografía monoespaciada para separarlos del contenido explicativo.

### Tipografía

- **Space Grotesk:** títulos y elementos de alta jerarquía.
- **DM Sans:** texto de lectura y navegación.
- **Consolas o monospace:** código y datos técnicos.

Las fuentes externas son una mejora visual opcional. El sistema incluye alternativas locales para que el contenido siga siendo legible si no se cargan.

### Componentes

- Cabecera persistente.
- Marca y enlace de inicio.
- Índice de unidad.
- Tarjeta de ejemplo.
- Área de demostración visual.
- Bloque de código.
- Sección de idea clave.
- Pie de página con navegación de retorno.

## 7. Responsive

La composición parte de una lectura amplia en escritorio y se adapta progresivamente:

- En escritorio, las demostraciones se distribuyen en rejillas de varias columnas.
- En tablet, las tarjetas reorganizan texto, demostración y código para conservar la relación entre ellos.
- En móvil, el contenido pasa a una sola columna y el índice se convierte en una lista vertical.
- La cabecera permite que los enlaces se ajusten en varias líneas sin ocultar destinos importantes.
- Las demostraciones tienen dimensiones estables para evitar saltos de layout.

## 8. Accesibilidad y usabilidad

La referencia de trabajo es WCAG 2.2 AA.

- Se usa HTML semántico: `header`, `nav`, `main`, `section`, `article` y `footer`.
- Cada página ofrece un enlace para saltar al contenido principal.
- Los controles y enlaces tienen nombres comprensibles.
- El foco de teclado es visible mediante `:focus-visible`.
- Las demostraciones visuales tienen descripciones accesibles cuando aportan información.
- Los SVG incluyen una alternativa textual mediante `aria-label` o se ocultan cuando son decorativos.
- El color no debe ser el único medio para distinguir información.
- El cuerpo de texto usa como referencia un mínimo de `16px` y un interlineado aproximado de `1.4` a `1.6`.
- Las columnas de lectura buscan mantenerse entre 60 y 75 caracteres.
- Las animaciones deben respetar `prefers-reduced-motion`.
- Las rutas y recursos son relativos para funcionar en GitHub Pages.

## 9. Decisiones técnicas

### HTML y CSS sin framework

El objetivo es que el código sea transparente para el alumnado. Evitar frameworks mantiene visible la relación entre estructura, presentación y resultado.

### Página agrupada y páginas independientes

`UT1/index.html` facilita la navegación y la consulta completa de la unidad. Los archivos `UT1_1.html`, `UT1_2.html`, `UT1_3.html` y `UT1_4.html` conservan el formato de micro-ejemplo aislado, útil para estudiar o enlazar una idea concreta.

### Recursos externos opcionales

Las fuentes de Google Fonts mejoran la personalidad visual, pero cada hoja incluye familias alternativas. La web no debe depender de una conexión externa para funcionar.

## 10. Validación

Antes de publicar una modificación hay que revisar:

- Que todos los enlaces relativos funcionen.
- Que cada HTML encuentre su hoja CSS.
- Que la página se pueda recorrer con teclado.
- Que el foco sea visible.
- Que los textos no se corten en móvil.
- Que las demos sigan siendo comprensibles sin depender solo del color.
- Que el contenido se lea en una ventana estrecha y en una amplia.
- Que el código mostrado coincida con el resultado visual.
- Que no se introduzcan rutas absolutas dependientes de `localhost`.

## 11. Evolución prevista

Las siguientes unidades pueden incorporarse manteniendo el mismo patrón:

1. Crear la carpeta de la unidad.
2. Crear su página `index.html` agrupada y su CSS.
3. Añadir los ejemplos independientes de cada micro-lección.
4. Incorporar la unidad al índice raíz.
5. Actualizar este documento si cambia la arquitectura o el sistema visual.

El documento de diseño debe evolucionar junto con la web: no es una especificación cerrada, sino una referencia para tomar decisiones coherentes y poder explicarlas.
