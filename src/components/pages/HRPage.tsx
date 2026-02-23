"use client";

import { motion } from "motion/react";
import { GlassCard, KPIStatCard } from "@/components/GlassComponents";
import { organizationalData } from "@/data/mockData";
import { Users, TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function HRPage() {
  const structureData = [
    { name: "Liderazgo", value: organizationalData.structure.leadership, color: "#1D4ED8" },
    { name: "Gerencia", value: organizationalData.structure.management, color: "#0E9F6E" },
    { name: "Operacional", value: organizationalData.structure.operational, color: "#B45309" },
    { name: "Soporte", value: organizationalData.structure.support, color: "#7C3AED" }
  ];

  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)]">
          Módulo Organizacional (RRHH)
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Estructura, productividad y detección de ineficiencias
        </p>
      </motion.div>

      {/* HR KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPIStatCard
          title="Headcount Total"
          value={organizationalData.headcount}
          unit="personas"
          delta={5.2}
          trend="up"
          status="neutral"
        />
        <KPIStatCard
          title="Costos Laborales"
          value={organizationalData.laborCosts}
          unit="$"
          delta={8.0}
          trend="up"
          status="warning"
        />
        <KPIStatCard
          title="Productividad"
          value={organizationalData.productivity}
          unit="%"
          delta={3.8}
          trend="up"
          status="success"
        />
        <KPIStatCard
          title="Costo por Empleado"
          value={(organizationalData.laborCosts / organizationalData.headcount) / 1000}
          unit="K$/año"
          delta={2.7}
          trend="up"
          status="neutral"
        />
      </div>

      {/* Structure & Productivity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Organization Structure */}
        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Estructura Organizacional
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Distribución de personal por nivel
              </p>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={structureData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {structureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--r-sm)',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-4">
              {structureData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <p className="text-[12px] text-[var(--text-secondary)]">{item.name}</p>
                    <p className="font-['JetBrains_Mono'] text-[14px] text-[var(--text-primary)]">
                      {item.value} personas
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Productivity Metrics */}
        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Métricas de Productividad
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Indicadores de eficiencia del equipo
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-[var(--r-md)] bg-gradient-to-br from-[var(--success-soft)] to-transparent border border-[var(--success)]/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--success)] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[var(--text-secondary)]">Índice General</p>
                    <p className="font-['JetBrains_Mono'] text-[28px] font-semibold text-[var(--text-primary)]">
                      {organizationalData.productivity.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  +3.8pp vs ciclo anterior
                </p>
              </motion.div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-[var(--r-sm)] bg-[var(--muted)]">
                  <span className="text-[13px] text-[var(--text-secondary)]">Producción</span>
                  <span className="font-['JetBrains_Mono'] text-[14px] text-[var(--text-primary)]">
                    92%
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-[var(--r-sm)] bg-[var(--muted)]">
                  <span className="text-[13px] text-[var(--text-secondary)]">Ventas</span>
                  <span className="font-['JetBrains_Mono'] text-[14px] text-[var(--text-primary)]">
                    88%
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-[var(--r-sm)] bg-[var(--muted)]">
                  <span className="text-[13px] text-[var(--text-secondary)]">Administración</span>
                  <span className="font-['JetBrains_Mono'] text-[14px] text-[var(--text-primary)]">
                    81%
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-[var(--r-sm)] bg-[var(--muted)]">
                  <span className="text-[13px] text-[var(--text-secondary)]">Logística</span>
                  <span className="font-['JetBrains_Mono'] text-[14px] text-[var(--text-primary)]">
                    85%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Inefficiencies Detection (IA) */}
      <GlassCard className="p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--warning-soft)] flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[var(--warning)]" />
            </div>
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Detector de Ineficiencias (IA)
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)]">
                Anomalías y oportunidades de optimización identificadas
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {organizationalData.inefficiencies.map((inefficiency, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-[var(--r-md)] border-l-2 border-[var(--warning)] bg-[var(--warning-soft)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[15px] font-medium text-[var(--text-primary)]">
                        {inefficiency.area}
                      </h3>
                      <span className={`text-[11px] px-2 py-1 rounded-full ${
                        inefficiency.severity === "high" 
                          ? "bg-[var(--danger-soft)] text-[var(--danger)]"
                          : inefficiency.severity === "medium"
                          ? "bg-[var(--warning-soft)] text-[var(--warning)]"
                          : "bg-[var(--accent-soft)] text-[var(--accent)]"
                      }`}>
                        {inefficiency.severity === "high" ? "Alta prioridad" :
                         inefficiency.severity === "medium" ? "Media prioridad" :
                         "Baja prioridad"}
                      </span>
                    </div>
                    <p className="text-[13px] text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Problema:</span> {inefficiency.issue}
                    </p>
                    <p className="text-[13px] text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Impacto:</span> {inefficiency.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded-[var(--r-md)] bg-[var(--accent-soft)]">
            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
              <span className="text-[var(--accent)] font-medium">Recomendación IA:</span> Considera consolidar funciones administrativas en Producción y reorganizar estructura de Logística para reducir costos en aproximadamente $196K anuales sin afectar productividad.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Cost Analysis */}
      <GlassCard className="p-8">
        <div className="space-y-4">
          <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
            Análisis de Costos Laborales
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-[12px] text-[var(--text-tertiary)]">Salarios Base</p>
              <p className="font-['JetBrains_Mono'] text-[20px] font-semibold text-[var(--text-primary)]">
                $1.85M
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">75.5% del total</p>
            </div>
            <div className="space-y-2">
              <p className="text-[12px] text-[var(--text-tertiary)]">Cargas Sociales</p>
              <p className="font-['JetBrains_Mono'] text-[20px] font-semibold text-[var(--text-primary)]">
                $425K
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">17.3% del total</p>
            </div>
            <div className="space-y-2">
              <p className="text-[12px] text-[var(--text-tertiary)]">Beneficios y Capacitación</p>
              <p className="font-['JetBrains_Mono'] text-[20px] font-semibold text-[var(--text-primary)]">
                $175K
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">7.2% del total</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
