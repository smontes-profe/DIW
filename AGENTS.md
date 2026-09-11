# Guía para agentes

## Propósito del repositorio

Este repositorio reúne ejemplos de código de la asignatura **Diseño de interfaces web (DIW)**, del segundo curso de Desarrollo de aplicaciones web. Los ejemplos sirven como material de apoyo para las presentaciones teóricas y deben poder consultarse visualmente desde GitHub Pages.

El contenido combina:

- Conceptos de diseño visual y de interfaces.
- Ejemplos pequeños y autocontenidos de HTML y CSS.
- Código fuente junto a su representación visual en el navegador.

## Rol de los agentes de IA

Cada vez que se solicite una tarea a un agente de IA, debe actuar como una persona experta en UX/UI además de resolver la parte técnica. Toda propuesta o modificación debe:

- Aplicar fundamentos de diseño visual: jerarquía, contraste, alineación, proximidad, repetición, ritmo, equilibrio y uso intencionado del espacio.
- Priorizar la usabilidad: contenido claro, recorridos previsibles, acciones comprensibles, feedback visible y controles adecuados para cada interacción.
- Respetar las Pautas de Accesibilidad para el Contenido Web (WCAG), tomando como referencia el nivel AA de WCAG 2.2.
- Garantizar navegación completa con teclado, foco visible, orden lógico de tabulación, HTML semántico y nombres accesibles para controles e imágenes.
- Comprobar contraste suficiente, legibilidad, tamaños táctiles razonables, ausencia de dependencia exclusiva del color y adaptación a pantallas estrechas y amplias.
- Considerar estados de carga, error, vacío, hover, focus y disabled cuando la interfaz los necesite, y respetar `prefers-reduced-motion` en cualquier animación.
- Revisar la experiencia desde la perspectiva del alumnado: lenguaje directo en español, baja carga cognitiva y relación evidente entre el código y su resultado visual.

## Estructura

- `index.html` y `index.css`: portada e índice visual de las micro-lecciones.
- `UT1/index.html` y `UT1/index.css`: página agrupada y responsive de la primera unidad de trabajo.
- `UT1/UT1_*.html` y `UT1/UT1_*.css`: ejemplos originales independientes de la unidad.
- `UT2/index.html` y `UT2/index.css`: página agrupada y responsive sobre uso de estilos.
- Cada ejercicio puede incluir un archivo `.html` y su hoja `.css` asociada.
- `README.md`: descripción y punto de entrada del repositorio.

## Criterios de trabajo

- Mantener los ejemplos sencillos, legibles y adecuados para alumnado de segundo de DAW.
- Usar HTML semántico, una estructura accesible y textos en español, salvo que el concepto requiera otra cosa.
- Mantener HTML y CSS sin frameworks ni herramientas de compilación, a menos que un ejercicio lo necesite explícitamente.
- Conservar la relación directa entre cada documento HTML y su hoja de estilos.
- Priorizar demostraciones visuales claras sobre abstracciones o soluciones innecesariamente complejas.
- No modificar ejemplos de alumnado de forma no relacionada con la tarea solicitada.
- Evitar incorporar dependencias externas; si se usan recursos remotos, deben ser opcionales y no impedir que el ejemplo funcione localmente.

## Comprobación de cambios

Antes de dar por terminado un cambio:

1. Abrir el HTML modificado directamente en un navegador o servir la carpeta localmente.
2. Comprobar que los enlaces a CSS, imágenes y demás recursos funcionan.
3. Revisar el resultado en una ventana estrecha y otra amplia.
4. Verificar que el código mostrado en la página coincide con el comportamiento visual.
5. Mantener los nombres de archivo y las rutas relativos para que el contenido funcione en GitHub Pages.

No hay actualmente un proceso de build, test o lint configurado. Para cambios puramente HTML/CSS, la validación principal es visual y mediante la consola del navegador.

## Publicación

GitHub Pages debe poder servir los archivos estáticos directamente desde la rama configurada del repositorio. No introducir rutas absolutas dependientes de `localhost` ni asumir que el sitio se sirve desde la raíz del dominio.

Cuando se añada un nuevo ejemplo, incluir su archivo en la unidad correspondiente y actualizar el índice del `README.md` si procede.
