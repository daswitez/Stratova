# Módulos Clave y Modelos Analíticos

El motor de simulación de Stratova está fundamentado en módulos interconectados de manera holística que representan la operativa completa de una empresa. Cada módulo está fuertemente soportado por un componente de Inteligencia Artificial que ejecuta modelos analíticos avanzados.

## 1. Módulo de Estudio de Mercado
Es el punto de partida estratégico de todo ciclo empresarial.
- **Operación**: Los equipos deben analizar activamente la segmentación de sus clientes, calcular el tamaño del mercado potencial y evaluar el comportamiento de la competencia directa. 
- **Decisiones Fundamentadas**: Stratova AI es exigente y requiere que todas las decisiones de mercado estén sólidamente justificadas y fundamentadas en data, no sólo introducidas manualmente.
- **Soporte IA (Modelo Analítico - Mercado)**: 
  - La inteligencia asiste empleando algoritmos de **regresión y clustering**. Estos dividen y segmentan a los consumidores en agrupaciones lógicas para lograr predecir con alta precisión la demanda potencial ante variaciones de mercado.

## 2. Módulo de Inversiones y Financiamiento
El motor central del crecimiento. Aquí se estructuran las proyecciones de ingresos, costos directos y flujos de caja libre.
- **Cálculos Automáticos**: El sistema se hace cargo de la algoritmia pesada, calculando de forma limpia y transparente el **VAN** (Valor Actual Neto), el **TIR** (Tasa Interna de Retorno) y los periodos de recuperación del capital invertido.
- **Soporte IA (Modelo Analítico - Finanzas)**:
  - Utiliza **Redes Neuronales Recurrentes (RNNs)**. Estas redes estiman de manera no-lineal los flujos de caja futuros y el comportamiento del mercado financiero considerando las tendencias históricas dentro del escenario temporal que se simula.
  - La IA **sugiere escenarios financieros alternativos** para evitar la bancarrota o para escalar, pero bajo ningún concepto reemplaza el juicio, el peso y la responsabilidad final de la decisión humana en el equipo.

## 3. Módulo Organizacional (RRHH)
Garantiza que la empresa no sea sólo números, sino personas y estructuras funcionales.
- **Operación**: Determina una estructura jerárquica, define y actualiza los perfiles y compensaciones de cada puesto, y controla activamente los costos laborales absolutos.
- **Conexión Directa**: Conecta por primera vez la teoría tradicional de gestión organizacional blanda (RRHH) con resultados puramente cuantificables en los estados de resultados.
- **Soporte IA (Modelo Analítico - Organización)**:
  - Implementa **algoritmos rápidos de detección de anomalías**. Estos exploran continuamente la estructura de costos de los equipos e identifican activamente organigramas ineficientes, costos desproporcionados o riesgos de retención de talento. La IA luego alerta a la cohorte para sugerir mejoras estructurales activas.

## 4. Módulo Contable
El espinazo de registro auditable de la experiencia.
- **Operación Transparente**: Registra **automáticamente** en tiempo real todas y cada una de las decisiones tomadas y firmadas por la junta. Cada inversión física o decisión comercial genera y propaga sus asientos contables equivalentes y levanta los Estados Financieros trimestrales o de ciclo.
- **Impacto Educativo**: Permite a los estudiantes asimilar de forma tangible y sin abrumarlos con la carga pesada aritmética, cómo y en qué medida las micro-decisiones puntuales impactan en la macro contabilidad empresarial real.

## 5. Módulo de Análisis General
El ojo del cóndor sobre todo el ecosistema.
- **Consolidación Integral**: Unifica ávidamente toda la información recolectada de los demás subsistemas. Aquí se fraguan y emiten los indicadores globales fundamentales (Rentabilidad ROE/ROA, liquidez ácida/corriente y ratios de eficiencia).
- **Entorno Competitivo**: Contrasta abierta y saludablemente el comportamiento dinámico y el rendimiento numérico entre los diferentes equipos. En este módulo el sistema introduce la presión sistémica al exponer "quién está ganando la industria" durante el trimestre lectivo actual.
- **Soporte IA (Modelo Analítico - Estrategia Global)**:
  - Hace uso de **Procesamiento de Lenguaje Natural (NLP)** avanzado. Evalúa, analiza la semántica y puntúa la coherencia lógica interna de las justificaciones y estrategias redactadas manualmente por los equipos, verificando que la narrativa escrita tenga sentido y validez respecto al desempeño numérico empírico que tuvo el equipo.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

Analizando los componentes ya presentes en el proyecto bajo `src/components/pages/`:

1. **Dashboard Consolidado (Módulo de Análisis General)**: `AnalysisPage.tsx` y `RankingPage.tsx` forman una excelente base de interfaz. **Necesitamos lograr** inyectarles a estos componentes lógica del estado global proveniente del backend (Redux / Context + SWR) que cruce activamente y en vivo los KPIs con los de otros jugadores (la tabla de `RankingPage.tsx` debe poblarse desde la red simulando los resultados trimestrales cruzados).
2. **Organización Ineficiente (IA)**: En `HRPage.tsx`, necesitamos incorporar los flags o alertas visuales provenientes del módulo IA (detección de anomalías). Cuando exista un "costo laboral desproporcionado", el componente React debería renderizar un `Alert` amigable advirtiendo a los ejecutivos de esa ineficiencia antes de que prescriba el trimestre.
3. **Módulo de Mercado e Inversión Separados**: `MarketPage.tsx` ya existe y deberá montar las gráficas de IA predictivas (*clustering* y demanda). `FinancePage.tsx` tiene que convertirse en la nave insignia que consuma los modelos de *Redes Neuronales Recurrentes* para estimar flujos.
4. **Validación NLP en Texto Libre**: En `DecisionsPage.tsx` o vistas similares donde los equipos documenten por qué tomaron un curso de acción, necesitamos un `<textarea>` con un pequeño botón "Analizar Estrategia IA" o de "Check de Coherencia" que envíe el texto natural hacia la capa NLP de la infraestructura para validación e inyección de nota sugerida del docente.
