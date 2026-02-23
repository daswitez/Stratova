# Módulo Contable

El módulo contable es el garante final de la integridad financiera del simulador. Asegura mediante estrictos principios contables que todo el ecosistema de Stratova funcione como una entidad económicamente fidedigna, traduciendo las decisiones orgánicas en asientos automáticos, emitiendo estados financieros y bloqueando la edición tras el cierre de ciclo.

## Requerimientos Clave (1-10)

### 1-2. Asiento y Libro Mayor
La base inmutable del registro contable.
- **Entidad `AsientoContable`**: Cada operación posee indefectiblemente fecha, monto, tipo de transacción y responsable.
- **Generación Automática**: El libro mayor (general ledger) no se digita, se genera automática y nativamente por el Backend tras cada evento financiero consolidado en el flujo de la simulación.
- **Regla Dual (Debe-Haber)**: El sistema valida en tiempo real la perpetua ecuación de doble entrada sin permitir jamás descuadres asimétricos.

### 3-4. Estado de Resultados y Balance General
Los informes maestros de estatus.
- **Generación Integrada**: Calcula de forma nativa los ingresos (operativos) y egresos (costos fijos/variables, laborales), altamente integrado mediante paso de mensajes con todos los otros módulos (Especialmente Financiero y Mercado).
- **Consolidación de Balance**: Consolida activos (fijos, líquidos), pasivos (deudas de corto y largo plazo adquiridas en el módulo financiero) y patrimonio. Todo validando matemáticamente la ecuación contable.
- **Soporte de Exportación**: La Web proveerá utilidades robustas para exportar estos reportes para análisis off-platform.

### 5-6. Flujo de Caja (Cashflow) y Bloqueo por Cierre
El aire que respira la empresa analizada en tres tiempos.
- **Clasificación Tripartita**: Separa estricta y visualmente el efectivo quemado o generado en tres troncos: Actividades Operativas, de Inversión, y de Financiamiento.
- **Bloqueo de Inmutabilidad**: Una vez que un asiento o periodo contable es declarado como "cerrado", son absolutamente *inmutables*. 
- **Log de Seguridad**: Cualquier intento técnico (desde la UI o un endpoint ciego) de modificar información sellada será rechazado y registrado.

### 7-8. Ratios y Exportación Oficial
Los termómetros para los stakeholders.
- **Cálculo Automático**: Provee transversalmente el cálculo matemático implícito de los ratios principales: *Liquidez Corriente, Prueba Ácida, y Endeudamiento* sin que el equipo los solicite.
- **Firma Digital (Opcional)**: En entornos educativos formales, el sistema proveerá en la Web la capacidad de generar la Exportación en formato PDF con estampe de firma digital garantizando que el documento no fue alterado por los estudiantes. (Trabajo fuerte en Backend; UI en Frontend con botón dedicado de descarga).

### 9-10. Cierre Contable e Integridad Garantizada
El evento cúlmine del Trimestre.
- **Evento de Cierre (`CierreContable`)**: Al dispararse de parte del motor, bloquea absolutamente la entrada de cualquier nueva transacción retrasada, y se encarga de sincronizar a todos los módulos y microservicios mediante mensajes (Kafka/RabbitMQ o internal events en `core-platform`).
- **Pruebas Automatizadas (QA)**: A nivel de código fuente en la infraestructura de desarrollo, deben existir pesadas suites de pruebas automatizadas (Test-Driven Development) que avalen que bajo ningún escenario de carrera concurrente, el balance cierra descuadrado.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

Aunque no tenemos una página o componente explícito nombrado `AccountingPage.tsx` en `src/components/pages/`, muchas de estas lógicas viven como derivadas en la `FinancePage.tsx` y en el `AnalysisPage.tsx`:

1. **Vistas de Libros y Reportes**: **Necesitamos lograr** crear los componentes React específicos (DataTables avanzadas, agrupables y ordenables) para mostrar el "Estado de Resultados", el "Balance General" y el "Flujo de Caja" de manera que los usuarios puedan navegarlos como si usaran software ERP (Req 3, 4, 5).
2. **Generador y Visor PDF**: En el Frontend, precisaremos integrar una herramienta o servicio que reciba el base64 o el octet-stream del Backend para visualizar/descargar el "Reporte Oficial" (Req 8).
3. **Manejo del Estado "Solo Lectura" (Read-Only)**: Todo el frontend de la sección contable y financiera deberá reaccionar asíncronamente a los WebSockets del backend; si llega el aviso de `CierreContable` (Req 9), toda la UI debe mutar apagando editores, formularios y botones de acción.
