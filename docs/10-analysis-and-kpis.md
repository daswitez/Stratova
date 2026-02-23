# Módulo de Análisis General y KPIs

El módulo de Análisis es la cúspide piramidal del simulador. Su propósito es consolidar e ingerir absolutamente todos los datos diseminados en los submódulos (Mercado, Finanzas, Contabilidad, RRHH) para generar los indicadores globales definitivos, armar los rankings de cohorte y proveer recomendaciones estratégicas de alto nivel.

## Requerimientos Clave

### 1. Servicio Core: `AnalisisEstrategico`
El cerebro unificador.
- **Consolidación Integral**: Un servicio alojado puramente en el Backend encargado de barrer y consolidar la data de todos los módulos adyacentes al cierre del periodo.
- **Cálculo y Versionado**: Calcula los macro-indicadores globales e históricos, y los versiona atándolos permanentemente al `Ciclo` cerrado de la `Empresa`.

### 2. Catálogo Oficial de KPIs
El tablero de medición.
- **Dimensiones**: Diseñado netamente en el Backend, abarca 5 ejes críticos:
  1. Rentabilidad (ROE, ROA, Margen Neto)
  2. Liquidez (Ratios Corrientes)
  3. Crecimiento (Ventas YoY, Cuota de Mercado)
  4. Eficiencia Organizacional (Productividad vs Gasto Laboral)
  5. Riesgo Financiero (Endeudamiento y Apalancamiento)

### 3. Ranking Competitivo Inter-Equipos
El motor de la presión lúdica y competitiva.
- **Ordenamiento Ponderado**: El Docente puede configurar qué peso tiene cada KPI (p.ej. 50% Rentabilidad, 30% Crecimiento, 20% ESG/Riesgo) para establecer el "Puntaje Ponderado" final del trimestre.
- **Cierre y Manipulación**: Está rotundamente bloqueado contra manipulación manual.
- **Separación de Responsabilidades**: El Backend hace el cómputo del ranking de la cohorte; la Web se encarga exclusivamente de renderizar este podio o Leaderboard.

### 4. Recomendaciones Estratégicas (IA)
El Director de la Junta (Board Member AI).
- **Consumo Asíncrono**: Despacha la sabana del `AnalisisEstrategico` hacia el `ai-service` para recibir un diagnóstico del trimestre cerrado.
- **Sugerencias y Riesgo**: El modelo emite "Sugerencias de Pivot/Estrategia" clasificadas explícitamente con un "Nivel de Riesgo" asociado (Bajo, Medio, Alto).
- **Dualidad de Pantalla**: La plataforma Web detalla extensamente los "porqués" de la sugerencia (XAI - IA Explicable), mientras que el Móvil resume en *Bullet Points* ejecutivos.

### 5. Exportación Docente y Auditoría
- **Reporte PDF Integral**: Capacidad de generar un "Annual Report" o Reporte Trimestral consolidado y estético en PDF.
- **Evento de Auditoría (`AnalisisGenerado`)**: Cuando el docente o el alumno detona la vista de este análisis final, se levanta el evento atado indisolublemente al Usuario Solicitante (IAM UID) y al Ciclo exacto, asegurando trazabilidad de lectura en Base de Datos.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

Dado nuestro entorno actual en `src/components/pages/`:

1. **Vistas Consolidadas**: Ya tenemos los archivos bases `AnalysisPage.tsx` y `RankingPage.tsx`. **Necesitamos lograr** expandirlos conectándolos a un State Manager global, poblando los 5 ejes del "Catálogo Oficial de KPIs" con gráficas tipo "Radar/Spider" o "Gauge Charts" que referencien la salud integral de la empresa (Req 2).
2. **Dashboard de Leaderboard UI (Req 3)**: El componente `RankingPage.tsx` requerirá un diseño de grilla o podio que escuche pasivamente la tabla de posiciones desde el servidor. Si el alumno está dentro del ranking, su fila debe destacarse mediante convenciones visuales (ej. colores primarios de marca).
3. **Consola o Panel de Asesoría AI (Req 4)**: Dentro del `AnalysisPage`, requerimos reservar espacio para un panel de "Notas del Board / Recomendaciones Estratégicas". Este panel inyectará las respuestas del `ai-service` mediante insignias de colores (*Badges*) advirtiendo visualmente el **Nivel de Riesgo** de la recomendación (Verde, Amarillo, Rojo).
4. **Action Buttons de Exportación**: Incorporar los botones para despachar los requests de "Exportar a PDF" a lo largo de estos componentes para cumplir el Req 5.
