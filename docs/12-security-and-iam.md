# Seguridad, IAM y Control de Roles

La base de confianza de Stratova. Como una plataforma diseñada para entornos académicos y corporativos competitivos, la seguridad no es una capa superficial, sino una restricción de diseño. Funciona bajo un esquema Zero-Trust (Confianza Cero) guiado por el microservicio central `iam-service`.

## Requerimientos Completos (1-5)

### 1. Autenticación JWT (JSON Web Tokens)
El pasaporte digital.
- **Validación Continua**: El `core-platform` no confía en nadie. Valida criptográficamente la firma del token JWT en absolutamente cada request HTTP que recibe.
- **Tolerancia Cero**: Rechaza de tajo solicitudes inválidas, expiradas o malformadas.
- **Auditoría de Acceso**: Registra activamente en los logs de seguridad los intentos fallidos reiterados (Brute Force/Credential Stuffing). (Exclusivo de las capas de Backend e Infra).

### 2. Roles y Permisos Granulares (RBAC)
Segmentación de poder.
- **Docente (Admin)**: Ostenta permisos administrativos; capaz de crear cohortes, iniciar/cerrar ciclos, auditar finanzas y manipular variables macro de caos.
- **Estudiante (Player)**: Restringido; sólo posee capacidad de mutación (POST/PUT) sobre las decisiones empresariales de su equipo asignado mientras el ciclo esté _Abierto_.
- **Mentor (Watcher)**: Rol pasivo; sólo posee lectura estratégica omnisciente para asesorar, sin poder inyectar decisiones al sistema.
- **Capa Mixta**: Las barreras viven en el Backend, pero la **Web** debe respetar estos roles condicionando los menús y botones visibles (Renderizado Condicional de UI).

### 3. Control por Empresa (Tenancy) y Auditoría Inmutable
- **Aislamiento de Tenant**: Un usuario autenticado *jamás* puede cruzar la valla para leer el estado de una empresa competidora antes de que acabe el ciclo, a menos que sea a través de los rankings públicos sancionados. Valida estrictamente el "tenant" institucional universitario.
- **Registro Inmutable**: Cada acción grave (Ej. Enviar Inversión) graba a fuego en la Base de Datos la triada: `[Usuario IAM, Acción Realizada, Fecha/Hora exacta]`. Esta tabla apend-only no puede ser alterada ni siquiera por el Docente.

### 4. Cifrado y Protección de Endpoints
- **Estándares Modernos**: Obliga a TLS 1.3 (HTTPS) para el tránsito de datos simulando el estándar bancario, y cifra los volúmenes de reposo de la base de datos (Ej. AWS KMS o equivalentes locales).
- **Rate Limiting**: El API Gateway (o Spring Cloud Gateway) implementa ahogamiento de peticiones (Throttling) frente a APIs críticas para mitigar ataques DDoS o *scraping* abusivo de la competencia simulada.

### 5. Sesión Móvil, Pruebas y Política
- **Gestión Extendida (Cross-Device)**: Implementa `Refresh Tokens` permitiendo a los usuarios mantener sus aplicaciones móviles logeadas sin la fricción de ingresar credenciales a diario.
- **Kill-Switch**: Capacidad de invalidar prematuramente la sesión de un dispositivo comprometido desde la panel de usuario u olvido de contraseña.
- **Políticas DevSecOps**: Pruebas de penetración periódicas (Pentesting) y mantenimiento de un marco político documentado de respuesta a incidentes.

---

## Estado Actual y Lo Que Necesitamos Lograr (Análisis del Proyecto Actual)

El área de Identidad es crítica para levantar los cimientos del código frontend Next.js actual:

1. **Contexto Global de Sesión (`AuthContext`)**: **Necesitamos lograr** la creación (o refinamiento si ya existe) de un Contexto global de React y un Custom Hook (`useAuth`) que almacene el JWT token de manera segura y lo inyecte automáticamente en la cabecera `Authorization: Bearer <token>` de Axios o el *Fetch client* para dialogar con el Spring Boot (Req 1).
2. **Componentes y Vistas Protegidas (Guards)**: Implementar *Higher-Order Components (HOCs)* o lógicas en el Middleware de Next.js (`middleware.ts`) que actúen como un muro: repeler al `ProfilePage` a cualquier usuario no autenticado, o botar a un Estudiante que intente forzar por URL la entrada al Panel Administrativo del Docente (Req 2).
3. **Manejo de Roles UI**: En las páginas existentes (`FinancePage`, `HRPage`), inyectar renderizados condicionales: `{user.role === 'MENTOR' ? <ReadOnlyView /> : <InteractiveForm />}` asegurando el cumplimiento visual de las reglas (Req 2).
4. **Flujo de LogOut e Invalidación**: La `WorkspacePage` o Navbar debe poseer un componente robusto para cerrar sesión. Al accionar, debe destruir el estado global, purgar las *Cookies* locales o memoria de sesión, y rutear de retorno hacia `/login` (Req 5).
