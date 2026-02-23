"use client";

import { motion } from "motion/react";
import { GlassCard, KPIStatCard } from "@/components/GlassComponents";
import { financialData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { TrendingUp, DollarSign, PiggyBank } from "lucide-react";

export default function FinancePage() {
  const scenarioChartData = financialData.scenarios.map(s => ({
    name: s.name,
    revenue: s.revenue / 1000000,
    profit: s.profit / 1000000,
    probability: s.probability * 100
  }));

  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)]">
          Módulo Finanzas e Inversiones
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Análisis financiero, flujos de caja y evaluación de inversiones
        </p>
      </motion.div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPIStatCard
          title="Ingresos Totales"
          value={financialData.revenue}
          unit="$"
          delta={8.5}
          trend="up"
          status="success"
        />
        <KPIStatCard
          title="Margen Neto"
          value={financialData.margin}
          unit="%"
          delta={2.3}
          trend="up"
          status="success"
        />
        <KPIStatCard
          title="VAN"
          value={financialData.metrics.van}
          unit="$"
          status="success"
        />
        <KPIStatCard
          title="TIR"
          value={financialData.metrics.tir}
          unit="%"
          status="success"
        />
      </div>

      {/* Cash Flow & Metrics */}
      <div className="grid grid-cols-2 gap-6">
        {/* Cash Flow */}
        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Flujo de Caja Proyectado
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Flujos operacionales, de inversión y financiamiento
              </p>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={financialData.cashFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--r-sm)',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => `$${(value/1000).toFixed(0)}K`}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                />
                <Bar dataKey="operational" name="Operacional" fill="#0E9F6E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="investment" name="Inversión" fill="#B45309" radius={[4, 4, 0, 0]} />
                <Bar dataKey="financing" name="Financiamiento" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--glass-border)]">
              <div className="space-y-1">
                <p className="text-[11px] text-[var(--text-tertiary)]">Flujo Operacional</p>
                <p className="font-['JetBrains_Mono'] text-[16px] font-semibold text-[var(--success)]">
                  $1.55M
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-[var(--text-tertiary)]">Inversiones</p>
                <p className="font-['JetBrains_Mono'] text-[16px] font-semibold text-[var(--warning)]">
                  -$500K
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-[var(--text-tertiary)]">Financiamiento</p>
                <p className="font-['JetBrains_Mono'] text-[16px] font-semibold text-[var(--accent)]">
                  $50K
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Investment Metrics */}
        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Indicadores de Inversión
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                VAN, TIR y período de recuperación
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-[var(--r-md)] bg-gradient-to-br from-[var(--success-soft)] to-transparent border border-[var(--success)]/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--success)] flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[var(--text-secondary)]">Valor Actual Neto</p>
                    <p className="font-['JetBrains_Mono'] text-[28px] font-semibold text-[var(--text-primary)]">
                      ${(financialData.metrics.van / 1000000).toFixed(2)}M
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  VAN positivo indica que el proyecto genera valor
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-[var(--r-md)] bg-gradient-to-br from-[var(--accent-soft)] to-transparent border border-[var(--accent)]/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[var(--text-secondary)]">Tasa Interna de Retorno</p>
                    <p className="font-['JetBrains_Mono'] text-[28px] font-semibold text-[var(--text-primary)]">
                      {financialData.metrics.tir.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  TIR por encima del costo de capital (12%)
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-[var(--r-md)] bg-gradient-to-br from-[var(--warning-soft)] to-transparent border border-[var(--warning)]/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--warning)] flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[var(--text-secondary)]">Período de Recuperación</p>
                    <p className="font-['JetBrains_Mono'] text-[28px] font-semibold text-[var(--text-primary)]">
                      {financialData.metrics.payback.toFixed(1)} años
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Tiempo estimado para recuperar inversión inicial
                </p>
              </motion.div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Scenario Analysis */}
      <GlassCard className="p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
              Análisis de Escenarios (IA)
            </h2>
            <p className="text-[12px] text-[var(--text-secondary)] mt-1">
              Proyecciones optimistas, base y pesimistas generadas por el modelo
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scenarioChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--r-sm)',
                  fontSize: '12px'
                }}
                formatter={(value: any) => `$${value}M`}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="revenue" name="Ingresos" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Utilidad" fill="#0E9F6E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-4">
            {financialData.scenarios.map((scenario, index) => (
              <div
                key={scenario.name}
                className="p-4 rounded-[var(--r-md)] bg-[var(--muted)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[14px] font-medium text-[var(--text-primary)]">
                    {scenario.name}
                  </h3>
                  <span className="text-[11px] text-[var(--text-tertiary)]">
                    {(scenario.probability * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[var(--text-secondary)]">Ingresos</span>
                    <span className="font-['JetBrains_Mono'] text-[var(--text-primary)]">
                      ${(scenario.revenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[var(--text-secondary)]">Utilidad</span>
                    <span className="font-['JetBrains_Mono'] text-[var(--text-primary)]">
                      ${(scenario.profit / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Risk Analysis */}
      <GlassCard className="p-8">
        <div className="space-y-4">
          <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
            Análisis de Riesgo bajo Incertidumbre
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium text-[var(--accent)]">
                Variables de Mayor Impacto
              </h3>
              <ul className="space-y-2 text-[13px] text-[var(--text-secondary)]">
                <li className="flex items-center justify-between">
                  <span>• Demanda del mercado</span>
                  <span className="text-[var(--danger)]">Alto impacto</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>• Costos de materias primas</span>
                  <span className="text-[var(--warning)]">Medio impacto</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>• Tasas de interés</span>
                  <span className="text-[var(--success)]">Bajo impacto</span>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium text-[var(--accent)]">
                Recomendaciones IA
              </h3>
              <ul className="space-y-2 text-[13px] text-[var(--text-secondary)] list-disc list-inside">
                <li>Mantener reserva de caja para escenario pesimista</li>
                <li>Diversificar inversiones para reducir exposición</li>
                <li>Monitorear sensibilidad a cambios en demanda</li>
              </ul>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
