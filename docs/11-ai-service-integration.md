# Integración Crítica con AI-Service

El `ai-service` no es un añadido menor; es un núcleo esencial del valor de Stratova. Dada la naturaleza de estos modelos subyacentes (Machine Learning, NLP, Clustering, Series de Tiempo), su integración con el `core-platform` exige prácticas de ingeniería resilientes, orientadas a la robustez, trazabilidad y manejo de la asincronía.

## Requerimientos Clave (1-10)

### 1. Contrato Formal Backend a Backend
- **Especificación Técnica estricta**: El `core-platform` (Spring Boot) y el `ai-service` (Python) dialogan mediante un contrato cerrado (ej. OpenAPI/Swagger o gRPC). 
- **Definiciones**: Obliga al versionado semántico de los servicios, definición milimétrica de Endpoints, Payloads permitidos y estructuras cerradas de manejo de errores HTTP. (Trabajo un 100% circunscrito a capas de Backend).

### 2. Cliente HTTP Resiliente en Core
La IA a veces tarda en pensar.
- **Protección de Red**: El cliente HTTP dentro de Spring Boot (que llame a Python) debe poseer lógicas formales de *Circuit Breakers* o *Retry Patterns*.
- **Comportamientos**: Esto abarca reintentos automáticos condicionales, *timeouts* altamente configurables frente a picos de inferencia pesados, y un volcado de logs para trazabilidad en la observabilidad (Ej: Datadog/ELK).

### 3. Versionado de Modelos IA
Para la auditoría y depuración matemática.
- **Firma del Oráculo**: Cada vez que el modelo devuelve una predicción al sistema contable o de mercado, el retorno debe venir adjunto o timbrado con la "Versión Mínima Activa" del modelo que sirvió la inferencia (ej. `v1.4.2-arima`).
- **Trazabilidad DB**: Se guarda esta estampa en base de datos al lado de la decisión de mercado para saber bajo qué "cerebro" el equipo tomó o recibió una decisión.

### 4. Caché de Resultados (Performance)
Aliviano al motor matemático.
- **Estrategia**: El escenario no cambia si las variables no cambian. El backend implementa una agresiva política de memoria Caché (ej. Redis o Memcached) para evitar re-invocar inferencias ya precalculadas.
- **Invalidación Precisa**: La Caché solo expira ("Eviction") si el equipo cambia el valor de un input en el trimestre, o abruptamente al cruzar y bloquear el fin del ciclo.

### 5. Sanitización y Validación Pre-Inferencia
- **Normalización**: Spring Boot normaliza, poda variables basura, chequea lógicas de dominio y verifica los *rangos de input* (ej. "Nómina ingresada no puede ser negativa") antes de despacharle la data sensible al modelo probabilístico en Python.

### 6. Manejo de Fallos Silencioso (Graceful Degradation)
El simulador no debe caer porque la IA tropieza.
- **Plan B Automatizado**: Ante un *Timeout* definitivo o caída del `ai-service`, el Backend de Spring Boot debe retornar silenciosamente una respuesta controlada y dummy (ej. Promedios históricos precalculados).
- **Fluidez UX**: Permite siempre terminar la decisión de ciclo sin bloqueos técnicos en la Web o Móvil. Se registra la caída como Event/Incidencia Crítica en la observabilidad para el DevOps.

### 7. Ciclo de Vida: Entrenamiento Futuro (DataOps)
- **Recolección Empírica**: Toda jugada, escenario, rentabilidad final y decisiones del usuario son anonimizadas y compiladas en un "Dataset de Origen" vasto.
- **Separación de Ambientes**: Esta bolsa de datos se extrae del ambiente productivo para re-alimentar re-entrenamientos seguros de Data Analytics en repositorios/ambientes estrictamente de R&D experimental.

### 8. Monitoreo de Desempeño del Modelo (MLOps)
- **Vigilancia de Precisión**: Medición paralela e implícita de si la métrica que predijo el modelo de verdad funcionó en el trimestre.
- **Alertas Tempranas**: Si el umbral de métricas de precisión cruza barreras peligrosas hacia abajo (Degradación/Model Drift), detona automáticamente alertas severas a la infraestructura IT.

### 9. Documentación del Pipeline ML
Norma técnica para el equipo de Datos.
- Descripción completa y exhaustiva sobre toda la canalización de los datos (*Data Pipeline*), sus limpiezas, entranamiento iterativo y cómo se envase/despliega hacia el endpoint de producción. Debe reposar en wikis o repositorios del equipo de IA.

### 10. Pruebas de Integración y Estrés Conjunto
- **Concurrencia IA**: Los equipos de QA y Automatización deben simular "Múltiples llamadas masivas concurrentes" disparadas hacia Spring Boot, forzando a este a saturar al clúster de Python.
- **Metas**: Validar métricas de Estabilidad extrema de latencia de red bajo estrés para evitar caídas catastróficas durante torneos de simuladores grandes en las Universidades.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

La gigantesca mayoría de estos 10 requisitos corresponde a la infraestructura dura del Backend, DevOps y MLOps. Para nuestro frente Next.js actual (`src/components/pages/`):

1. **Indicadores de Gracia (Graceful Degradation)**: **Necesitamos lograr** que nuestra UI (Web/Móvil) maneje impecablemente estados nulos. Si el requerimiento de fallos (Req 6) devuelve datos vacíos porque la IA cayó intermitentemente, el frontend de Next.js **no debe crashear o lanzar Pantallas Rojas (White Screen of Death)**; deberá renderizar `ErrorBoundaries` locales que digan "*Asistente IA temporalmente no disponible*" pero manteniendo intacto el flujo normal de botones o envíos de negocio del usuario.
2. **Estados de Carga (Skeletons)**: Siendo la IA naturalmente asíncrona y con latencias variables por la Caché (Req 4), nuestros componentes en react (`FinancePage`, `MarketPage`, `HRPage`) necesitarán fuertes incorporaciones de `Skeletons` visuales (marcadores de carga grises intermitentes) en las zonas donde irán las proyecciones y sugerencias, indicando en la Web que el motor "está pensando".
