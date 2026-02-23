# Módulo de Estudio de Mercado

El módulo de mercado es estratégico y fundacional: es el **primer módulo funcional** dentro del ciclo de decisiones que conecta simultánea y coordinadamente el backend, la aplicación web y la interfaz móvil. Integra análisis profundo de segmentación, predicción de demanda impulsada por IA, y visualizaciones de cuota de mercado.

## Requerimientos Clave (1-10)

### 1. Entidad Estudio de Mercado (`EstudioDeMercado`)
La base de datos de la investigación.
- **Variables Críticas**: Define el segmento objetivo del equipo, calcula el tamaño potencial del mercado (TAM/SAM/SOM) y releva la percepción de la competencia.
- **Relaciones**: Está rígidamente vinculada a la `Empresa` activa y es obligatoriamente versionada por cada `Ciclo` de la simulación.

### 2. Análisis de Segmentación (Clustering IA)
Comprender al consumidor simulado.
- **Consumo de AI**: Se conecta y consume asíncronamente el `ai-service` para ejecutar algoritmos de Clustering sobre la base de posibles consumidores en la industria seleccionada.
- **Persistencia**: Los resultados topológicos se almacenan en la base de datos documental (MongoDB).
- **Consumo de UI**: La aplicación Web es responsable de levantar una **visualización detallada** (gráficos de dispersión/segmentos), mientras que la Móvil renderiza solo un resumen en formato de texto.

### 3. Predicción de Demanda (Forecasting)
El oráculo financiero de la empresa.
- **Variables de Input**: Envía inputs como el *Precio fijado, presupuesto de Marketing y nivel de variables de Competencia* hacia el `ai-service`.
- **Registro Histórico**: Las predicciones devueltas no se descartan; se registran para contrastar el "forecast" versus la "demanda real" post-ciclo.
- **Consumo de UI**: La aplicación Web permite a los jugadores **simular escenarios** iterando las variables antes de guardar, mientras que la Móvil solo permite la visualización pasiva del pronóstico actual.

### 4. Panel Web de Carga de Datos
El ingestor de información de mercado externa.
- **Múltiples Vías**: Permite el ingreso manual mediante formularios y la **carga masiva vía archivos CSV** para datos de estudios externos.
- **Consistencia y Bloqueo**: Se valida la consistencia del archivo antes de inyectarlo al backend. Está sujeto a las mismas reglas de bloqueo de *Ciclo Cerrado* dictadas por el Sistema Core.
- **Exclusividad**: Esta capacidad pesada es 100% exclusiva del Frontend Web.

### 5. Validaciones Lógicas de Negocio
Reglas estrictas de prelación.
- **Prelación de Acciones**: *Sin segmentación previa, no existe predicción de demanda*. El flujo asume este orden como regla dura.
- **Inmutabilidad de Ciclo**: No se rutea ni se guarda ningún cambio de penetración de mercado o precio en un ciclo ya cerrado.
- **Manejo de UI**: Estas reglas pesadas viven en el dominio del backend, pero la capa Web debe capturar los códigos de error amigablemente e instruir al usuario (ej. "Debes correr el Análisis de Segmentación primero").

### 6. Reporte Exportable Ejecutivo
- **Formatos**: Generación y exportación de documentos PDF y Excel enriquecidos con los gráficos del análisis semántico y textual.
- **División de Trabajo**: El backend Spring Boot emite y compila la data JSON o binaria estructurada; el frontend Web renderiza y construye el artefacto final visual a descargar.

### 7. Dashboard Estratégico (Visualización Temporal)
- **Indicadores Dinámicos**: Muestra la curva de *Demanda Proyectada* frente a la estimación empírica de *Cuota de Mercado*.
- **Tiempo Real**: Las gráficas de React deben actualizarse en caliente en base a las iteraciones de la simulación de precios.
- **UI Responsivo**: Paneles Web con gráficos interactivos profundos (Recharts/Chart.js); Móvil abstraído a tarjetas de KPIs ultra-compactas.

### 8. Histórico Comparativo
- **Cálculo de Variación**: Computa la variación porcentual de demanda, precio y tamaño de mercado contra los ciclos empresariales anteriores.
- **Almacén**: Esto se guarda por empresa y proporciona una vista puramente comparativa en el dashboard Web (`MarketPage` histórica).

### 9. Impacto Financiero Proyectado (Inter-Módulo)
El cordón umbilical entre Mercado y Finanzas.
- **Propagación del Dato**: La "Demanda Estimada / Proyectada" calculada y sellada no se archiva o se tipea nuevamente. Se despacha al instante rumbo al Módulo Financiero emitiendo el evento de domino `MercadoActualizado`.
- **Integración Microservicios**: Es el `core-platform` (Backend) quien intercepta y gestiona la propagación de este evento hacia los libros financieros.

### 10. Pruebas Integrales y Calidad
- **Espectro de Pruebas**: Ejecución de suites dedicadas a validar la coherencia matemática entre lo que el Mercado demanda y lo que Finanzas asume como Ingreso Operativo (Revenue).
- **Fuzzing de Escenarios**: Ejecución con datos extremos (elasticidad de precio anormal) y simulación de flujos de error, tanto en Backend como a nivel E2E en la Web (Cypress/Playwright).

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

Analizando nuestro código frontend (proyecto Next.js SPA) sobre la vista de Mercado (`src/components/pages/MarketPage.tsx`):

1. **Soporte de Carga de Archivos (`CSV Upload`)**: **Necesitamos lograr** integrar dentro de `MarketPage.tsx` una zona de "Dropzone" (`react-dropzone`) exclusiva para la web (Req 4) que permita a los estudiantes subir estudios o balances de mercado masivos en CSV, parcheándolos a JSON y enviando al backend.
2. **Dashboard de Simulador de Demanda (Req 3 y Req 7)**: El módulo debe incluir "Sliders" de Precio y Presupuesto Comercial vinculados asincrónicamente mediante una query/hook para golpear al `ai-service`, y actualizar pasivamente una gráfica *Chart* pre-renderizando la predicción de demanda resultante.
3. **Control de Flujo de Interfaz (Req 5)**: React Router y el Contexto de la página deben prever los "Blocked States". El componente que muestra la Predicción deberá estar desactivado, tachado u oculto bajo un render condicional si el usuario aún no ha ejecutado o guardado el análisis de "Segmentación de Clustering" (Req 2).
4. **Formularios de Exportación PDF (Req 6)**: Implementar una librería ligera como `jspdf` o un visor de blobs en el frontend para despachar, bajo la demanda del usuario, un artefacto PDF estéticamente diagramado.
