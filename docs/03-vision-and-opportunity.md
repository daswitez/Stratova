# Visión Fundacional y Problema Global

## Capítulo 1: Visión Fundacional del Proyecto
El mundo empresarial ha cambiado radicalmente durante los últimos años hacia entornos hiperconectados y veloces. No obstante, las universidades e instituciones educativas siguen enseñando bajo esquemas estáticos tradicionales que ya no reflejan la dinámica real, viva y cambiante del mercado digital.

En la actualidad, las decisiones modernas en el ámbito corporativo se toman utilizando análisis predictivo exhaustivo, minería de datos y, centralmente, la inteligencia artificial.

Aún con este panorama, la amplia mayoría de los estudiantes egresan de sus carreras universitarias sin haber experimentado "la presión real de tomar decisiones ejecutivas en un entorno empresarial completo y orgánico". **Esta brecha sustancial entre la teoría de los libros y la práctica cruda en el mundo competitivo es exactamente la oportunidad que Stratova AI viene a cerrar.**

### 5 Pilares Diferenciales
La propuesta de valor de Stratova se asienta sobre 5 pilares fundamentales:
1. **IA Generativa**: Escenarios empresariales únicos generados automáticamente. No existen casos prefabricados.
2. **Datos Reales**: Extracción automática de tendencias y precios desde fuentes abiertas en tiempo real para el entorno de simulación.
3. **Roles Ejecutivos**: Competencia estructurada con KPIs dinámicos por posición estratégica real, simulando la experiencia C-Level.
4. **Plug & Play Sectorial**: Adaptación automática al tipo de industria seleccionado al inicio, sin la necesidad de configuraciones manuales extensas.
5. **Arquitectura Escalable**: Pensada inicialmente como una aplicación monolítica modular que evolucionará de manera limpia a microservicios según el crecimiento de la base de usuarios.

### Adaptabilidad Dinámica: El Núcleo Innovador de Stratova
Stratova AI opera en modo *plug & play* inteligente (pilar 4). Se adapta de forma completamente automática al sector de industria seleccionado al inicio.

- Si el grupo de estudio simula la creación y gestión de una **empresa agroindustrial** → Stratova AI en tiempo real extrae tendencias verídicas del mercado agrícola junto con los precios internacionales y fluctuaciones de dicha materia prima.
- Si eligen simular una **startup tecnológica SaaS** → Ajusta por compelo el set de métricas de la cohorte (CAC, LTV, Churn) y los riesgos propios del entorno digital y del venture capital.

> Absolutamente **ningún escenario** será idéntico a otro dentro de la plataforma.

### Stack Tecnológico Definido
El ecosistema de Stratova descansa sobre las siguientes tecnologías punta:
- **Backend:** Spring Boot (Garantiza estabilidad, robustez transaccional y seguridad de grado empresarial).
- **Motor de IA:** Python integrando modelos customizados de Machine Learning.
- **Bases de Datos:** Una arquitectura híbrida moderna balanceando PostgreSQL (relacional/estructurado) y MongoDB (noSql/documental).
- **Frontend:** React / Next.js proveyendo Dashboards SPA dinámicos e interactivos de muy alta velocidad.

## Capítulo 2: Problema Global y Oportunidad de Mercado
El principal y más flagrante "pain point" dentro de la educación de negocios es la desconexión total que persiste entre la teoría académica y la forma en la que se ejerce en la práctica estratégica moderna. 

En los recintos se dictan Finanzas, Marketing Práctico y Recursos Humanos como compartimientos estancos y materias 100% aisladas e independientes. En el tablero real de juego, estas áreas empresariales chocan, coexisten e interactúan interdependientemente de manera simultánea en todo momento.

Los estudiantes no entrenan esta **toma de decisión bajo la presión, sincronización y la incertidumbre dinámica de mercado**. Se crea un producto que los pone verdaderamente a prueba frente al ecosistema corporativo del mañana.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

Evaluando nuestro Stack Tecnológico y componentes actuales definidos en `src/`:

1. **Frontend (Dashboard Interactivo)**: Ya se ha comenzado a cumplir el requerimiento del stack tecnológico desplegando el frontend sobre React / Next.js bajo SPA en el actual formato de repositorio. Las bases visuales existen pero necesitan conexión profunda con los sistemas.
2. **Dashboards Dinámicos**: Los componentes como `AnalysisPage.tsx` requerirán estar listos para consumir grandes sumas de datos y graficar los resultados de las proyecciones de mercado (que varían según el escenario agrario vs startup). Necesitaremos bibliotecas de *charting* potentes instaladas (Chart.js, Recharts, Nivo, etc.) para visualizar la data rica.
3. **Escenario de Presión Sistémica**: Para el objetivo del Capítulo 2, nosotros como interfaz **necesitamos lograr** introducir notificaciones de cambios abruptos en el mercado, cronómetros de decisiones en la cabecera del entorno (`Navbar` timer) o ventanas de incidentes urgentes en `WorkspacePage.tsx` para generar esta presión palpable en el "comité".
4. **Acoplamiento con IA en Python**: Deberemos asegurarnos de preparar los webhooks / hooks de React (SWR / React-Query o fetching simple) que asíncronamente dialoguen con el endpoint del "Motor de IA" para pre-cargar sugerencias que se insertarán lateralmente en cada módulo de estudiante (por ej. un componente `<AISidebar />` flotante o Drawer que sirva como el copiloto mencionado).
