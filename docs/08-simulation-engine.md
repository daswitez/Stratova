# Motor de Simulación Dinámica

El Motor de Simulación es el **corazón y el core matemático** de todo el ecosistema de Stratova AI. Es el engranaje profundo en el backend responsable de gestionar las transiciones de estado de todas las "empresas" en juego, asimilar las variables de mercado e inyectar eventos de caos, al tiempo que garantiza integridad técnica en cada milisegundo de ejecución.

## Requerimientos Clave (1-10)

### 1-2. Core: Estado Empresarial y Función de Transición
Las primitivas de la existencia en el simulador.
- **Agregado `EstadoEmpresarial`**: Almacena el snapshot íntegro de un equipo en un punto del tiempo, combinando todas sus variables subyacentes: financieras, comerciales y organizativas. Está rígidamente versionado para permitir consultas históricas.
- **La Función de Transición**: Es el algoritmo puro (T). Recibe como inputs la matriz con las decisiones de todos los equipos del grupo, aplica sobre ellos las reglas matemáticas del juego (tanto determinísticas como estocásticas/probabilísticas) y *escupé* el nuevo `EstadoEmpresarial` resultante que será vigente para el ciclo futuro.

### 3-4. Variables Exógenas y Ruido Aleatorio (Caos)
El tablero de control del mundo.
- **Inyección de Entorno**: El motor lee variables macro impredecibles establecidas: Índices de inflación global, agresividad de la competencia bot, y eventos de crisis externa (pandemia, cierre portuario).
- **Panel Docente (`Web Administrativa`)**: El docente es el arquitecto supremo; tiene una UI dedicada en Web donde moldea y calibra estas variables para endurecer o facilitar el ciclo.
- **Eventos Aleatorios Controlados**: El motor posee un generador pseudoaleatorio basado en una *Semilla Reproducible* (clave para auditoría de que no hubo trampa del sistema al generar los dados). Esto activa o desactiva las probabilidades de que un accidente golpee al mercado afectando demanda y curvas de costo.

### 5-6. Consistencia Transaccional e Interfaz de Activación
La confiabilidad concurrente del software.
- **Arquitectura Atómica**: Cada transición y cómputo de estado que afecte a un equipo y sus módulos satélites, corre encapsulado dentro de una Transacción Atómica de Base de Datos. Si una minúscula parte falla, hace *Rollback* y no corrompe la consistencia inter-módulos.
- **El Endpoint Central (`EjecutarCiclo`)**: Es el gatillo que jala el docente. Al llamarlo en el backend, la petición inmediatamente impone candados lógicos (*bloquea ejecución simultánea*) sobre todos los endpoints de decisión pública. 
- **Frontend Dual**: La capa Web y Móvil actuarán de manera reactiva ante la promesa de esta respuesta, pero solo la Web (en el panel Docente) tiene los botones para *Activar* este endpoint maestro.

### 7-8. Histórico de Estados y Event Driven Architecture
El pulso vital del sistema.
- **Snapshots Periódicos**: Tras el cómputo, el motor solidifica en Base de Datos una foto que cruza los efectos de absolutamente todas las decisiones. Permite realizar un trazado temporal.
- **Patrón de Eventos**: El microservicio dispara internamente un evento macro `EstadoActualizado` una vez finalizada la ardua tarea de cómputo para alertar y destrabar a componentes y vistas cacheadas del frontend que deben rehidratarse con la nueva data.

### 9-10. Calidad de Ingeniería (QA y Doc.)
- **Pruebas de Estrés Continuas**: El equipo de desarrollo debe empujar ráfagas de múltiples ciclos consecutivos de prueba (`Unit Tests` y `Integration Tests`) en servidores locales para probar exhaustivamente que bajo extrema velocidad el algoritmo no genera grietas ni inconsistencias contables insalvables.
- **Documentación de Caja Blanca (Transparencia)**: Se le debe al Docente, como máxima autoridad pedagógica, una documentación de soporte adjunta en la vista de apoyo donde se delineen con precisión absoluta **cuáles son las fórmulas y supuestos matemáticos** que rigen las entrañas deductivas del motor.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

Este módulo vivirá casi enteramente en el clúster de servidores de Spring Boot (`core-platform`), pero nuestro Frontend debe abrazar su impacto:

1. **Dashboard Administrativo (Panel Docente Req 3 y 6)**: Actualmente no contamos en `src/components/pages/` con el indispensable "Dashboard del Profesor". **Necesitamos lograr** crear un conjunto de vistas (ej. `AdminSimulationPage.tsx`) que tengan los controles maestros, botones para disparar el comando `EjecutarCiclo` y sliders para manipular la curva de Inflación.
2. **Reactividad al Socket "EstadoActualizado" (Req 8)**: La arquitectura en Next.js debe implementar lógica de *Server Sent Events (SSE)* o *WebSockets*. Cuando el motor emita el evento, el jugador que esté con su pantalla abierta ("Esperando cierre...") debe ver una transición hacia los resultados sin necesidad de presionar F5 u obligar un refresh manual.
3. **Manejo de Estados Globales de Espera (Loading States)**: Al activarse el cómputo de transición (que puede tardar dependiendo de la cohorte), el flujo de pantallas debe presentar loaders corporativos que aseguren la retención del usuario hasta que el snapshot atómico haya sido commiteado y sea seguro leer el trimestre nuevo.
