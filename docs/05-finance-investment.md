# Requisitos Técnicos Profundos: Módulo de Inversiones y Financiamiento

El Módulo de Inversiones es una pieza altamente crítica en Stratova. El requerimiento define que se debe proveer a los equipos (en su rol de dirección financiera) de herramientas profundas y de estándar empresarial absoluto para analizar exhaustivamente el destino del capital antes, durante y después del cierre de cada ciclo.

Para lograr este nivel analítico, el módulo depende explícitamente de **5 Requerimientos Clave (Req 1-5 Inversiones)**.

## 1. Entidad Proyecto de Inversión (`ProyectoInversion`)
Toda inyección de capital en la plataforma bajo la rúbrica de operaciones expansivas u operativas se define formalmente como un *Proyecto**.

- **Propiedades de la Entidad**: Consta inevitablemente de una inversión de despliegue inicial (Capex), flujos periódicos de entrada (generados) y salida (mantenimiento), y un horizonte temporal predefinido y finito de amortización o vida útil.
- **Estructura Relacional**: Se encuentra atada fuertemente a la `Empresa` y se adscribe al actual `Ciclo` de simulación vigente.
- **Trazabilidad de Auditoría**: Cada vez que el Comité "modifica" y guarda variables del proyecto en el periodo actual, es **versionado por iteración** en el backend para la auditoría contable.

## 2. Cálculo VAN y TIR
Representan las dos brújulas de todo el módulo.

- **Integridad Técnica**: Son ejecutados rígidamente al interior del microservicio o módulo financiero en una capa puramente backend (en Java Spring Boot) utilizando tasas de descuento altamente configurables (generalmente definidas desde las variables macro del Panel del Docente).
- **Validaciones Rígidas**: El backend es el celador de que la cronología y topología de los flujos de caja sean absolutamente coherentes antes del cómputo.
- **Frontend (Web)**: La obligación de la UI es abstraer el nivel de cómputo en la nube, para pintar y presentar los resultados tabulares y gráficos detallados y comprensivos para las partes interesadas (Stakeholders / Dashboard web).

## 3. Simulación Monte Carlo
Este aspecto diferencial catapulta a la plataforma como algo más que un "juego de sábanas contables".

- **Naturaleza Funcional**: En lugar de proyecciones determinísticas aburridas, evalúa y genera de manera estadística y robusta "múltiples escenarios altamente probabilísticos" frente a las variables de estrés sistémicas y de mercado cruzado del rubro de simulación (agro, SaaS, etc).
- **Backend Analytics**: Almacena en la base de datos documental (MongoDB) percentiles de dispersión clave producto de miles de iteraciones.
- **Construcción en Frontend**: La plataforma web tiene la obligación de mapear activamente en la interfase componentes visuales matemáticos (ej. gráficos de dispersión/densidad y nubes de probabilidad) que exhiban la curva de riesgo-recompensa final del proyecto.

## 4. Análisis de Sensibilidad Integral
La variable de mayor impacto para presionar y formar directivos.

- **Vectores de Configuración**: Permite al usuario/ejecutivo iterar variaciones de impacto directo y aislar variables independientes, fundamentalmente: `Precio de Venta`, `Costo Estructural / Producción`, `Tasa de Descuento`.
- **Automatismo**: El sistema debe estar dotado para **recalcular instantánea y automáticamente todos los indicadores medulares** en base a las mutaciones que el usuario realice en pantalla.
- **Bloqueos Cronométricos**: Este apartado incluye un rígido seguro en servidor y cliente: Bloquea rotundamente su ejecución, cambio y alteración visual si es que el equipo ya confirmó la jugada y "el ciclo activo ya fue cerrado". A partir de ese cierre, es material estático de sólo lectura.
- **Disposición UI**: Para lograr el *recalculo automático* el Frontend tiene que poseer una arquitectura ultra responsiva e **interfaz interactiva viva** (`sliders`, validadores cruzados, inputs enlazados reactivos sin lag visible).

## 5. Recomendación Semántica y Causal de la IA
El panel final de apoyo a las decisiones para el Comité Ejecutivo Financiero.

- **Orquestación Micro/Macro**: El frontend captura el JSON maestro de la estructura financiera deseada y en paralelo y de fondo lo transfiere contra el endpoint centralizado del `ai-service`.
- **Consejeros y Prevención**: Se recibe de vuelta una cascada de advertencias o "sugerencias analíticas de ajuste" generadas probabilísticamente (por las RNN de las que trata el Capítulo 4). 
- **Voluntariedad**: Las inyecciones de la IA **jamás tienen naturaleza de obligatoriedad**. El ejecutivo tiene el derecho explícito de obviar la alerta por completo y fallar/vencer bajo sus propios méritos en este simulador de vuelo directivo.
## 6. Coherencia Contable
Cierre automático del ciclo de capital.
- **Evento de Propagación**: Cuando el comité firma un proyecto y éste atraviesa la simulación, se refleja de inmediato en el Módulo Contable levantando el evento `ProyectoAprobado`.
- **Arquitectura Backend**: Es el servicio central de *core-platform* en Spring Boot el que se encarga de retransmitir y propagar el evento hacia la capa contable en un proceso robusto y netamente de servidor (Backend).

## 7. Dashboard Financiero Web
El centro de mandos interactivo.
- **Gráficos Dinámicos Web**: Muestra el VAN, TIR y las matrices de riesgo utilizando indicadores gráficos y visualizadores estadísticos enriquecidos.
- **Tiempo Real**: Se actualiza y recalcula la vista (en cliente) tras cada manipulación o prueba de decisión sobre los sliders del escenario (Req 4).
- **Vista Móvil**: La app móvil, reconociendo sus limitaciones de interactividad, mostrará únicamente un **resumen ejecutivo** plano pero veloz.

## 8. Comparación entre Equipos (Ranking Financiero)
Generador de presión.
- **Ranking C-Level**: Los equipos son enfrentados y posicionados en un Ranking directo guiado mediante la máxima **Rentabilidad** de sus gestiones en la industria.
- **Calculadora Arbitral**: El backend es el único ente que calcula y sella estas puntuaciones; la aplicación Web se limita estrictamente a visualizarlas y presentarlas.
- **Integridad**: Garantiza la integridad incondicional de los datos bloqueando definitivamente cualquier edición o refactorización del proyecto posterior al *cierre* cronometrado.

## 9. Auditoría Financiera
Mecanismo de trazabilidad absoluta.
- **Registro Histórico**: Graba celosamente cualquier variación o ajuste introducido en los diagramas de flujos del proyecto.
- **Vinculación de Usuarios**: Atrapa la firma (usuario IAM) de quién y cuándo autorizó o modificó los flujos, guardando snapshots/versiones consecutivas de la jugada anterior.
- **UI de Revisión**: El backend expone estos registros en un panel especial en la Web para procesos de autoría por el director/docente.

## 10. Rendimiento del Motor Financiero
Soporte para múltiples concurrentes.
- **Escalabilidad Cohorte**: Debe poder soportar múltiples equipos dentro del mismo ciclo efectuando simulaciones superpuestas de Monte Carlo (Req 3) de manera simultánea sin degradación de latencia que entorpezca la experiencia de usuario.
- **Optimización**: Se exige la medición periódica de los tiempos de respuesta y la optimización de las queries y procesos pesados dentro de la infraestructura backend.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

En el código alojado en `src/components/pages/FinancePage.tsx`:

1. **Dashboard Financiero Moderno (`FinancePage.tsx`)**: Actualmente cuenta con una base de interfaz. **Necesitamos lograr** expandirla masivamente en su peso y capacidades introduciendo pestañas o secciones hijas de `Tabs` que separen: *Panel Resumen*, *Herramientas de Inversión* y *Resultados del Ciclo*.
2. **Componentes Visuales Interactivos**: Deberemos construir y refinar dentro de Finanzas una UI interactiva con sliders que dispare el **Análisis de Sensibilidad** (Req 4). Debe sentirse como una tabla de Excel con reacción a luz de milisegundos, para lo cual los Hooks de validación y cómputo de "previas" del VAN/TIR (Req 2) deberán existir también parcialmente implementados en memoria de UI (Zustand, Redux o *useMemo*) de manera "optimista" previo al envío final al backend de Spring Boot que valida rigurosamente los datos.
3. **Integración Monte Carlo / Gráficos Completos**: Tendremos que lograr implementar librerías avanzadas como Recharts y armar un componente de **Gráfico de Dispersión** que esté listo para aceptar y pre-renderizar la nube de puntos provenientes de la Simulación de Monte Carlo (Req 3).
4. **Flujo de Asesoría AI (`ai-service`)**: Requerimos generar la integración hacia un componente visible (un Card o Floating Widget dentro de Inversiones) designado para mostrar el "texto explicable" arrojado como sugerencias (Req 5) cada vez que el equipo altere radicalmente las hojas financieras.
5. **Entidad y Persistencia (`ProyectoInversion`)**: Se necesitará asegurar que exista la lógica de formularios (`react-hook-form` o Formik) en el frontend adecuada capaz de amasar de manera estricta y segura el JSON del ente `ProyectoInversion` (Req 1) listo para ser despachado como carga de trabajo al servidor Java.
