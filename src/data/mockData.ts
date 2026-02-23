// Mock data for Stratova student simulation

export const studentUser = {
  id: "stu-001",
  name: "Sofía García",
  email: "sofia.garcia@universidad.edu",
  institution: "Universidad Empresarial de Buenos Aires",
  role: "Gerente de Finanzas",
  avatar: "SG",
  team: "Equipo Alpha",
  cohort: "MBA 2026 - Simulación Empresarial"
};

export const currentCycle = {
  number: 3,
  name: "Trimestre 3",
  status: "OPEN" as "OPEN" | "CLOSED",
  timeRemaining: "2d 14h 32m",
  deadline: "2026-02-25T18:00:00",
  totalCycles: 8
};

export const teamData = {
  id: "team-alpha",
  name: "Equipo Alpha",
  members: [
    { id: "1", name: "Sofía García", role: "Gerente de Finanzas", status: "Decisiones enviadas" },
    { id: "2", name: "Martín Rodríguez", role: "Gerente General", status: "Decisiones enviadas" },
    { id: "3", name: "Carolina Méndez", role: "Gerente de Marketing", status: "En borrador" },
    { id: "4", name: "Diego Fernández", role: "Gerente de RRHH", status: "Pendiente" },
    { id: "5", name: "Ana López", role: "Gerente de Operaciones", status: "Decisiones enviadas" }
  ],
  decisionsStatus: "IN_PROGRESS" as "NOT_STARTED" | "IN_PROGRESS" | "SUBMITTED" | "LOCKED",
  rank: 2,
  industry: "Retail Electrónica"
};

export const kpiData = [
  {
    id: "profitability",
    title: "Rentabilidad",
    value: 18.5,
    unit: "%",
    delta: 2.3,
    trend: "up" as "up" | "down" | "neutral",
    sparkline: [14.2, 15.8, 16.2, 17.1, 18.5],
    status: "success" as "success" | "warning" | "danger" | "neutral"
  },
  {
    id: "liquidity",
    title: "Liquidez",
    value: 2.4,
    unit: "x",
    delta: -0.3,
    trend: "down" as "up" | "down" | "neutral",
    sparkline: [2.8, 2.9, 2.7, 2.5, 2.4],
    status: "warning" as "success" | "warning" | "danger" | "neutral"
  },
  {
    id: "debt",
    title: "Endeudamiento",
    value: 45.2,
    unit: "%",
    delta: -4.1,
    trend: "down" as "up" | "down" | "neutral",
    sparkline: [52.3, 50.1, 48.2, 46.8, 45.2],
    status: "success" as "success" | "warning" | "danger" | "neutral"
  },
  {
    id: "efficiency",
    title: "Eficiencia Operacional",
    value: 87.3,
    unit: "%",
    delta: 3.8,
    trend: "up" as "up" | "down" | "neutral",
    sparkline: [79.5, 82.1, 84.5, 85.9, 87.3],
    status: "success" as "success" | "warning" | "danger" | "neutral"
  },
  {
    id: "marketshare",
    title: "Participación de Mercado",
    value: 14.8,
    unit: "%",
    delta: 1.2,
    trend: "up" as "up" | "down" | "neutral",
    sparkline: [12.4, 13.1, 13.6, 14.0, 14.8],
    status: "success" as "success" | "warning" | "danger" | "neutral"
  },
  {
    id: "cash",
    title: "Caja Disponible",
    value: 1245000,
    unit: "$",
    delta: 8.5,
    trend: "up" as "up" | "down" | "neutral",
    sparkline: [980000, 1050000, 1120000, 1180000, 1245000],
    status: "success" as "success" | "warning" | "danger" | "neutral"
  }
];

export const alerts = [
  {
    id: "alert-1",
    type: "warning" as "info" | "success" | "warning" | "danger",
    title: "Liquidez por debajo del objetivo",
    message: "El ratio de liquidez actual (2.4) está por debajo del objetivo estratégico (2.8). Considere ajustar inversiones o capital de trabajo.",
    module: "Finanzas",
    priority: "medium" as "low" | "medium" | "high",
    timestamp: "2026-02-23T09:15:00"
  },
  {
    id: "alert-2",
    type: "info" as "info" | "success" | "warning" | "danger",
    title: "Nueva regulación aplicada",
    message: "El docente ha activado una nueva regulación laboral que incrementa costos de personal en un 8%. Revise el módulo organizacional.",
    module: "Organizacional",
    priority: "high" as "low" | "medium" | "high",
    timestamp: "2026-02-23T08:00:00"
  },
  {
    id: "alert-3",
    type: "success" as "info" | "success" | "warning" | "danger",
    title: "Objetivo de market share alcanzado",
    message: "Felicitaciones, han superado el objetivo de participación de mercado establecido para este trimestre.",
    module: "Mercado",
    priority: "low" as "low" | "medium" | "high",
    timestamp: "2026-02-22T16:30:00"
  }
];

export const events = [
  {
    id: "event-1",
    type: "crisis" as "crisis" | "regulation" | "opportunity" | "competition",
    title: "Crisis de suministro global",
    description: "Una crisis en la cadena de suministro global ha incrementado los costos de materias primas en un 15%.",
    impact: ["Costos de producción +15%", "Margen bruto -3%", "Competidores afectados por igual"],
    cycle: 2,
    status: "active" as "pending" | "active" | "resolved"
  },
  {
    id: "event-2",
    type: "regulation" as "crisis" | "regulation" | "opportunity" | "competition",
    title: "Nueva ley laboral",
    description: "Nueva regulación aumenta salarios mínimos y beneficios sociales obligatorios.",
    impact: ["Costos laborales +8%", "Productividad inicial -2%", "Afecta a todos los equipos"],
    cycle: 3,
    status: "active" as "pending" | "active" | "resolved"
  }
];

export const rankingData = [
  {
    rank: 1,
    team: "Equipo Omega",
    score: 94.2,
    profitability: 22.1,
    marketShare: 18.3,
    efficiency: 91.5,
    change: 0
  },
  {
    rank: 2,
    team: "Equipo Alpha",
    score: 89.7,
    profitability: 18.5,
    marketShare: 14.8,
    efficiency: 87.3,
    change: 1
  },
  {
    rank: 3,
    team: "Equipo Beta",
    score: 87.3,
    profitability: 17.2,
    marketShare: 16.1,
    efficiency: 85.9,
    change: -1
  },
  {
    rank: 4,
    team: "Equipo Gamma",
    score: 84.1,
    profitability: 15.8,
    marketShare: 13.2,
    efficiency: 82.4,
    change: 0
  },
  {
    rank: 5,
    team: "Equipo Delta",
    score: 79.5,
    profitability: 12.3,
    marketShare: 11.5,
    efficiency: 78.2,
    change: 0
  }
];

export const marketData = {
  totalMarketSize: 42500000,
  growth: 6.8,
  segments: [
    { name: "Premium", size: 35, growth: 8.2, competition: "Alta" },
    { name: "Media", size: 45, growth: 6.1, competition: "Media" },
    { name: "Económica", size: 20, growth: 4.5, competition: "Muy Alta" }
  ],
  demandPrediction: {
    optimistic: 125000,
    base: 98000,
    pessimistic: 82000,
    confidence: 0.82
  },
  competitors: [
    { name: "TechCorp", share: 22.3, strategy: "Diferenciación Premium" },
    { name: "ValueElectro", share: 19.1, strategy: "Liderazgo en Costos" },
    { name: "MegaStore", share: 18.5, strategy: "Enfoque Segmento Medio" }
  ]
};

export const financialData = {
  revenue: 8450000,
  costs: 6890000,
  margin: 18.5,
  cashFlow: [
    { month: "Mes 1", operational: 450000, investment: -250000, financing: 100000 },
    { month: "Mes 2", operational: 520000, investment: -100000, financing: 0 },
    { month: "Mes 3", operational: 580000, investment: -150000, financing: -50000 }
  ],
  metrics: {
    van: 1250000,
    tir: 24.5,
    payback: 2.8
  },
  scenarios: [
    { name: "Optimista", revenue: 9200000, profit: 1850000, probability: 0.25 },
    { name: "Base", revenue: 8450000, profit: 1560000, probability: 0.50 },
    { name: "Pesimista", revenue: 7600000, profit: 1140000, probability: 0.25 }
  ]
};

export const organizationalData = {
  headcount: 145,
  laborCosts: 2450000,
  productivity: 87.3,
  structure: {
    leadership: 8,
    management: 22,
    operational: 95,
    support: 20
  },
  inefficiencies: [
    { area: "Área de Producción", issue: "Sobrecarga de personal administrativo", impact: "Costos +12%, Productividad -5%", severity: "medium" },
    { area: "Logística", issue: "Estructura duplicada entre almacén y distribución", impact: "Costos +8%", severity: "low" }
  ]
};

export const decisionModules = [
  {
    id: "market",
    name: "Mercado",
    icon: "TrendingUp",
    status: "draft" as "pending" | "draft" | "submitted" | "locked",
    progress: 60,
    decisions: [
      { id: "price", label: "Precio Promedio", value: 1250, unit: "$", min: 800, max: 2000 },
      { id: "marketing", label: "Presupuesto Marketing", value: 450000, unit: "$", min: 0, max: 1000000 },
      { id: "channels", label: "Canales Activos", value: ["Online", "Retail", "Distribuidores"], options: ["Online", "Retail", "Distribuidores", "B2B"] }
    ]
  },
  {
    id: "finance",
    name: "Finanzas",
    icon: "DollarSign",
    status: "submitted" as "pending" | "draft" | "submitted" | "locked",
    progress: 100,
    decisions: [
      { id: "investment", label: "Inversión en Activos", value: 500000, unit: "$", min: 0, max: 2000000 },
      { id: "financing", label: "Financiamiento Externo", value: 250000, unit: "$", min: 0, max: 1000000 },
      { id: "dividend", label: "Distribución Dividendos", value: 100000, unit: "$", min: 0, max: 500000 }
    ]
  },
  {
    id: "hr",
    name: "Recursos Humanos",
    icon: "Users",
    status: "pending" as "pending" | "draft" | "submitted" | "locked",
    progress: 0,
    decisions: [
      { id: "hiring", label: "Nuevas Contrataciones", value: 8, unit: "personas", min: 0, max: 50 },
      { id: "training", label: "Presupuesto Capacitación", value: 75000, unit: "$", min: 0, max: 300000 },
      { id: "salary", label: "Ajuste Salarial", value: 5, unit: "%", min: 0, max: 15 }
    ]
  },
  {
    id: "operations",
    name: "Operaciones",
    icon: "Settings",
    status: "draft" as "pending" | "draft" | "submitted" | "locked",
    progress: 40,
    decisions: [
      { id: "production", label: "Volumen de Producción", value: 98000, unit: "unidades", min: 50000, max: 150000 },
      { id: "inventory", label: "Nivel de Inventario", value: 15000, unit: "unidades", min: 5000, max: 30000 },
      { id: "quality", label: "Inversión en Calidad", value: 120000, unit: "$", min: 0, max: 500000 }
    ]
  }
];

export const auditLog = [
  { timestamp: "2026-02-23T10:45:00", user: "Sofía García", module: "Finanzas", action: "Envió decisiones", details: "Inversión: $500,000, Financiamiento: $250,000" },
  { timestamp: "2026-02-23T10:30:00", user: "Martín Rodríguez", module: "General", action: "Actualizó justificación estratégica", details: "Agregó análisis de competencia" },
  { timestamp: "2026-02-23T09:15:00", user: "Ana López", module: "Operaciones", action: "Guardó borrador", details: "Producción: 98,000 unidades" },
  { timestamp: "2026-02-22T16:20:00", user: "Carolina Méndez", module: "Mercado", action: "Guardó borrador", details: "Precio: $1,250, Marketing: $450,000" },
  { timestamp: "2026-02-22T15:00:00", user: "Sistema", module: "Simulación", action: "Ciclo 2 cerrado", details: "Resultados procesados y publicados" }
];
