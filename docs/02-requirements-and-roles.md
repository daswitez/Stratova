# Requerimientos y Roles (Alcance del Sistema)

## Requerimientos Principales

1. **Documento de Visión**
   - **Alcance**: Define actores, módulos y límites técnicos del sistema.
   - **Alineación Arquitectónica**: Trabaja de la mano con los microservicios core (`core-platform`, `iam-service` y `ai-service`).
   - **Plataformas**: Aplica de manera transversal a web y móvil.

2. **Repositorio Principal**
   - **Estructura**: Ya sea bajo un esquema monorepo o multi-repo, existirá una separación sumamente clara entre *backend* y *frontend*.
   - **Aplicaciones Frontend**: Web como una Single Page Application (SPA) moderna; móvil de manera nativa o híbrida.
   - **APIs**: Uso de APIs centralizadas para la comunicación de los clientes con el backend.

3. **Entorno de Desarrollo**
   - Control de versiones avanzado estructurado por *feature* (Feature Branching).
   - Integración continua obligatoria y robustecida.
   - Pruebas unitarias imperativas. Soporte abarcativo para el entorno móvil y web.

4. **Modelo de Negocio Simulado**
   - Base estructural de qué compone y representa realmente una "empresa" en el sistema con todas sus variables estratégicas.
   - Modelado profundo y pesado en el backend.
   - En la interfaz web: Recolección y manipulación mediante formularios y dashboards.
   - En la interfaz móvil: Resumen ejecutivo rápido y de alto nivel.

5. **Roles de Usuario**
   - Múltiples actores diferenciados: Docente, Estudiante, Mentor, Empresa.
   - **Autenticación**: `iam-service` tomará la gestión de la identidad.
   - **Docente**: Panel administrativo minucioso y completo en la web. La vista móvil será simplificada.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

Analizando nuestro código frontend (proyecto Next.js SPA ya inicializado):

1. **Estructura SPA (Req. 2)**: Tenemos la aplicación montada como SPA con Next.js/React. Sin embargo, carecemos aún del mapeo exacto hacia las APIs centralizadas (necesitaremos configurar la capa de peticiones de red hacia el backend Spring Boot `core-platform`).
2. **Roles Estudiante y Docente (Req. 5)**: Contamos con vistas de estudiante (Finanzas, Análisis, Mercado), pero **necesitamos lograr** un módulo de "Panel Administrativo Completo" (Dashboard Docente) con controles de partida, gestión de rúbricas y disparos de eventos.
3. **IAM Service / Roles (Req. 5)**: Requerimos implementar las barreras de autenticación en nuestra app Next.js usando la sesión e información provista por `iam-service`. Actualmente nuestras páginas en `src/components/pages/` asumen acceso irrestricto al no tener todavía la capa visual de guards (React context/auth hooks) finalizada.
4. **Formularios Estratégicos (Req. 4)**: En nuestras vistas de departamentos (como `FinancePage.tsx` o `HRPage.tsx`), debemos construir los **formularios interactivos** de donde se despachará la decisión de ese ciclo particular hacia el backend.
