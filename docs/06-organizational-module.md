# Módulo Organizacional (RRHH y Estructura)

El módulo organizacional tiene una meta dual: modelar la estructura jerárquica puramente gerencial de la empresa simulada y, simultáneamente, anclar estas decisiones humanas al frío de sus consecuencias formales contables calculando los costos laborales absolutos totales. Además, utiliza inteligencia artificial para encontrar eficiencias.

Este submódulo debe cumplir estrictamente con los siguientes requisitos transversales:

## 1. Agregado: Estructura Organizacional (`EstructuraOrganizacional`)
El esqueleto humano de la corporación.
- **Naturaleza**: Modela y soporta una jerarquía multinivel real (Junta, VPs, Directores, Managers, Operativos).
- **Relaciones**: Entidad fuertemente vinculada a su `Empresa` propietaria y con estricta versión temporal por cada `Ciclo`.
- **Diseño Transaccional**: Capacidad nativa de soportar alteraciones de iteración/ciclo (despidos, expansiones, quiebras). Su diseño y gobierno maestro reside enteramente en backend.

## 2. Entidad Puesto Individual (`Puesto`)
La unidad atómica de costo laboral.
- **Propiedades de la Entidad**: Se le atribuye firmemente un salario determinado, un área funcional asignada y una lista codificada de responsabilidades.
- **Relación Múltiple**: El sistema, por simplificación corporativa, soporta o permite asignar "múltiples empleados/capitas" genéricos atados a este mismo rol funcional, escalando así un mismo modelo de costo.
- **Backend Exclusivo**: La lógica que amarra y define su valor es calculada bajo el modelo exclusivista de servidor (Backend).

## 3. Costo Laboral Total y Productividad IA
El cruce directo entre el mundo humano y corporativo.
- **Autosuma del Motor**: Calcula la sumilla de salarios bases junto con las cargas sociales legales (parametrizables).
- **Propagación**: Envía este golpe financiero automáticamente en forma de impacto directo hacia el módulo de Contabilidad.
- **Capa IA (Evaluador)**: Como se menciona en el Pilar Analítico, una IA explora la nómina, evalúa la eficiencia global en proporción a la industria, y detona *alertas de ineficiencia estructural* frente a curvas históricas.
- **Responsive UI**: En el plano Frontend Web se detalla minuciosamente el árbol de costos; por otro lado, la aplicación Móvil resume el indicador en "alertas simples de estatus" sin saturar con el organigrama numérico.

## 4. Editor Drag & Drop Web
La herramienta interactiva para construir la corporación.
- **Funcionalidad Core**: Los ejecutivos de Recursos Humanos organizan desde cero empujando (Drag & Drop) y reubicando nodos para armar sub-departamentos de la estructura de la compañía.
- **Validaciones UX**: Previene dinámicamente cruces de área y validaciones de movimientos imposibles (Ej: referenciar a un ciclo ya cerrado e inalterable).
- **Exclusividad**: Por la complejidad espacial de los árboles de dependencia, esta es una meta **exclusivamente asignada para el Frontend en Web** (mediante la API del sistema).

## 5. Simulación de Expansión Corporativa y Vista Móvil
- **Simulación Causal (Web)**: Permitir crear departamentos temporales para proyectar dinámicamente cómo un posible set de contrataciones alteraría o lastraría los ingresos actuales (recalculo de rentabilidad y productividad). Mapea el "Impacto Financiero de Expansión".
- **Consumo Lectura (Móvil)**: La contraparte en smartphones o tabletas ofrecerá y dibujará un organigrama condensado, limitándose a una vista estática y puramente orientada a la lectura de los KPIs jerárquicos de la firma.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

Dado nuestro entorno de desarrollo actual (React y `src/components/pages/HRPage.tsx`):

1. **Dashboard de Interfaz**: Contamos con una silueta básica en Next.js para Recursos Humanos.
2. **Editor de Nodos (React Flow)**: **Necesitamos lograr** la integración de una librería sofisticada para construir el "Editor Drag & Drop Web" (Req 4). Librerías como \`react-flow-renderer\` son idóneas para modelar interactivamente este flujo de árbol.
3. **Conexión de Alerta IA**: Introducir una consola o toast notifications en esta página que levante las notificaciones de despilfarro estructural que retorne el modelo (Req 3).
4. **Calculadora Previa de Nómina**: Un sumariador o recuadro estático reactivo (State local) que estime el "Impacto Financiero de la Expansión" en caliente antes de guardar y bloquear la página enviando la mutación hacia el `EstructuraOrganizacional` de Spring Boot.
