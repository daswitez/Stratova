# Lógica del Negocio: Stratova AI

## 1. Funcionamiento de la Plataforma
Stratova es una simulación empresarial por cohortes donde diferentes equipos compiten durante **ciclos definidos** (por ejemplo, trimestres). Cada equipo funciona como un **"comité ejecutivo"**, dentro del cual cada miembro asume un rol específico para tomar decisiones informadas en un tiempo determinado.

### Ciclo de Decisión y Flujo
El flujo núcleo de la plataforma, o lo que el usuario debe "sentir", es el siguiente:
**Decisión → Bloqueo → Resultado → Aprendizaje → Competencia**

1. **Decisión**: Durante una ventana de tiempo abierta, cada jugador (Finanzas, Marketing, RRHH, etc.) toma decisiones en su módulo correspondiente.
2. **Bloqueo**: Una vez que el equipo envía sus decisiones de forma definitiva, estas quedan bloqueadas y no se pueden alterar.
3. **Procesamiento y Resultado**: Al cerrar el ciclo, el motor de simulación de Stratova procesa todas las decisiones de la cohorte simultáneamente. El sistema aplica además los eventos externos configurados por el docente (crisis, regulaciones, cambios de competencia) y genera resultados concretos como:
   - KPIs del ciclo
   - Estados financieros
   - Participación de mercado
   - Productividad
4. **Aprendizaje**: Se provee retroalimentación basada en el desempeño y resultados.
5. **Competencia**: Las posiciones de los equipos se actualizan para mostrar el progreso relativo en la simulación.

### Flujo Sistémico de Decisiones
El flujo se basa de forma holística en ciclos periódicos simulados que dictan el ritmo. Cada ciclo representa un periodo empresarial íntegro (por ejemplo, un trimestre o un año de operación). 
- Los equipos toman decisiones interconectadas.
- Stratova AI recalcula variables dinámicamente según la industria asimilada.
- Se observan resultados consolidados.
La integración entre todos los módulos es **automática y transparente**: en ningún momento se requiere exportar, manipular o cargar datos manualmente entre áreas. Todo fluye de forma nativa dentro del ecosistema unificado de Stratova AI para fomentar un **aprendizaje iterativo continuo**.

## 2. Experiencia de Usuario y Panel Ejecutivo
La experiencia visual y funcional está diseñada para ser intuitiva pero al mismo tiempo con un rigor profundamente profesional. El objetivo definitivo es que tanto estudiantes como ejecutivos experimentados se sientan dentro de un entorno corporativo real de alto nivel.

- **Panel Ejecutivo Personalizado**: Cada equipo observa su estado financiero consolidado, junto a resultados de mercado y desempeño organizacional. Stratova AI inyecta información resaltando **alertas críticas automáticamente**, simulando la presión genuina que recae sobre un C-Level.
- **Ciclos Estructurados (Bloqueos)**: El docente define ciclos de tiempo estricto (fase de análisis, toma de decisiones, y posterior evaluación). El sistema responde aplicando **bloqueos técnicos** que impiden los cambios fuera del periodo permitido, introduciendo una fortísima disciplina estratégica.
- **Rankings en Tiempo Real**: Los equipos (por industria/cohorte) visualizan su posición relativa en dashboards transparentes. Esta transparencia competitiva fomenta la ética de trabajo corporativa y motiva fuertemente la mejora continua.

## 3. El Rol de la Inteligencia Artificial
La IA en Stratova **no "juega por el usuario"**, sino que funciona como un copresidente o asistente avanzado:
- **Predicción y proyecciones**: Predice demanda futura y sugiere diferentes escenarios posibles.
- **Detección de problemas**: Detecta anomalías o ineficiencias en las estructuras de costos o estrategias de la empresa.
- **Benchmarking competitivo**: Compara el desempeño entre diferentes equipos y ofrece insights.
- **Evaluaciones textuales**: Es capaz de evaluar la "estrategia explicada" y la justificación de los textos escritos por los estudiantes, sirviendo de soporte para las rúbricas establecidas por los docentes.

## 3. Escalabilidad e Industrias Dinámicas (Plug & Play Inteligente)
Una de las mayores complejidades del sistema es su adaptabilidad. Stratova AI **no está estancada en un solo tipo de industria**. 

- Cuando un usuario crea una cuenta o inicia un nuevo escenario, puede **elegir entre una serie de industrias distintas** (ej. la agroindustria para plantar soya, una startup tecnológica, etc.).
- El sistema extrae *tendencias reales*, *precios internacionales* o *métricas y riesgos* dependiendo de la industria seleccionada, haciendo que **ningún escenario sea idéntico a otro** y favoreciendo un uso altísimamente escalable.

## 4. El Rol del Docente Administrativo
El docente controla todo el entorno y contexto general de la simulación mediante:
- Reglas macro y parámetros económicos iniciales.
- Duración de los ciclos y la simulación.
- Eventos e inyecciones de incertidumbre.
- Rúbricas y metodologías de evaluación.

> Todo el proceso guarda una **trazabilidad completa** y registros de auditoría que dictaminan "quién decidió qué y cuándo", promoviendo la rendición de cuentas e imposición justa de notas.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

Actualmente en el repositorio **frontend** (`src/components/pages/`), contamos con soporte visual e interfaces para varios de los módulos requeridos por los roles en el comité ejecutivo:
- `FinancePage.tsx` (Finanzas)
- `HRPage.tsx` (Recursos Humanos)
- `MarketPage.tsx` (Márketing y Mercado)
- `AnalysisPage.tsx`, `DecisionsPage.tsx`, `RankingPage.tsx`, `WorkspacePage.tsx`

**Lo que necesitamos lograr en próximos pasos de desarrollo:**
1. **Lógica de "Bloqueo" en Frontend**: Las páginas de decisiones (`DecisionsPage`, páginas departamentales) deben tener un estado de sólo-lectura (`read-only`) o bloqueados visiblemente para el equipo una vez enviadas las decisiones del ciclo.
2. **Selector de Industria al Iniciar/Configurar Sesión**: Se necesita implementar o robustecer el flujo en la creación de partida para permitir que los usuarios seleccionen en qué "industria" o "sector" se desarrollará la simulación.
3. **Integración con IA (`ai-service`) en la Interfaz**: Necesitamos agregar los componentes de sugerencias, prevención de anomalías y benchmarking dentro de la UX para que el usuario reciba notificaciones o paneles con los insights sin quitarle el control.
4. **Validación de Roles Reactiva**: El frontend debe asegurar que el usuario de Marketing sólo envíe o edite módulos pertinentes a su rol, pero pueda "ver" los resultados genéricos mediante sus credenciales (`iam-service`).
5. **Panel del Docente Control / Trazabilidad**: El tablero administrativo y los eventos configurables (crisis) tendrán que implementarse como interfaz si no actúan hoy por hoy.
