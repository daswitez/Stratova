"use client";

import { motion } from "motion/react";
import { GlassCard, KPIStatCard } from "@/components/GlassComponents";
import { kpiData, rankingData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { TrendingUp, Award, Target } from "lucide-react";

export default function AnalysisPage() {
  const evolutionData = [
    { cycle: "C1", rentabilidad: 14.2, liquidez: 2.8, eficiencia: 79.5, marketShare: 12.4 },
    { cycle: "C2", rentabilidad: 16.2, liquidez: 2.7, eficiencia: 82.1, marketShare: 13.1 },
    { cycle: "C3", rentabilidad: 18.5, liquidez: 2.4, eficiencia: 87.3, marketShare: 14.8 }
  ];

  const benchmarkData = [
    { metric: "Rentabilidad", tuEquipo: 18.5, promedio: 16.8, top: 22.1 },
    { metric: "Liquidez", tuEquipo: 2.4, promedio: 2.6, top: 3.1 },
    { metric: "Eficiencia", tuEquipo: 87.3, promedio: 82.9, top: 91.5 },
    { metric: "Market Share", tuEquipo: 14.8, promedio: 13.8, top: 18.3 },
    { metric: "Endeudamiento", tuEquipo: 45.2, promedio: 48.5, top: 38.9 }
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
          Análisis General
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Consolidación de KPIs y comparativa con cohorte
        </p>
      </motion.div>

      {/* Consolidated KPIs */}
      <div className="grid grid-cols-3 gap-6">
        <GlassCard className="p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--success)] to-[var(--success)]/70 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-tertiary)]">Puntaje General</p>
                <p className="font-['JetBrains_Mono'] text-[32px] font-semibold text-[var(--text-primary)]">
                  89.7
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--text-secondary)]">Posición</span>
                <span className="text-[var(--accent)] font-medium">#2 de 5</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--text-secondary)]">vs Promedio</span>
                <span className="text-[var(--success)] font-medium">+3.3%</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-tertiary)]">Tendencia</p>
                <p className="text-[20px] font-semibold text-[var(--text-primary)]">
                  Creciente
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--text-secondary)]">Ciclo a ciclo</span>
                <span className="text-[var(--success)] font-medium">+2.9pts</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--text-secondary)]">Mejora acumulada</span>
                <span className="text-[var(--success)] font-medium">+8.1pts</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--warning)] to-[var(--warning)]/70 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[12px] text-[var(--text-tertiary)]">Distancia al Líder</p>
                <p className="font-['JetBrains_Mono'] text-[32px] font-semibold text-[var(--text-primary)]">
                  4.5
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--text-secondary)]">Ciclo anterior</span>
                <span className="text-[var(--text-tertiary)] font-medium">6.2pts</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--text-secondary)]">Reducción</span>
                <span className="text-[var(--success)] font-medium">-27.4%</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Evolution Chart */}
      <GlassCard className="p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
              Evolución de KPIs por Ciclo
            </h2>
            <p className="text-[12px] text-[var(--text-secondary)] mt-1">
              Progreso de indicadores clave a lo largo de la simulación
            </p>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
              <XAxis 
                dataKey="cycle" 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--r-sm)',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="rentabilidad" 
                name="Rentabilidad (%)"
                stroke="#1D4ED8" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="eficiencia" 
                name="Eficiencia (%)"
                stroke="#0E9F6E" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="marketShare" 
                name="Market Share (%)"
                stroke="#B45309" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Benchmark Comparison */}
      <div className="grid grid-cols-2 gap-6">
        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Comparativa vs Cohorte
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Posición relativa en métricas clave
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={benchmarkData}>
                <PolarGrid stroke="var(--glass-border)" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
                />
                <PolarRadiusAxis 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                />
                <Radar 
                  name="Tu Equipo" 
                  dataKey="tuEquipo" 
                  stroke="#1D4ED8" 
                  fill="#1D4ED8" 
                  fillOpacity={0.3}
                />
                <Radar 
                  name="Top Equipo" 
                  dataKey="top" 
                  stroke="#0E9F6E" 
                  fill="#0E9F6E" 
                  fillOpacity={0.1}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Benchmark Detallado
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Comparación numérica con promedio y líder
              </p>
            </div>

            <div className="space-y-4">
              {benchmarkData.map((item) => (
                <div key={item.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[var(--text-primary)]">
                      {item.metric}
                    </span>
                    <div className="flex gap-4 text-[12px] font-['JetBrains_Mono']">
                      <span className="text-[var(--accent)]">{item.tuEquipo}</span>
                      <span className="text-[var(--text-tertiary)]">{item.promedio}</span>
                      <span className="text-[var(--success)]">{item.top}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full flex">
                      <div 
                        className="bg-[var(--accent)] relative"
                        style={{ width: `${(item.tuEquipo / item.top) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--glass-border)] flex gap-6 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--text-secondary)]">Tu Equipo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--text-tertiary)]" />
                <span className="text-[var(--text-secondary)]">Promedio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--success)]" />
                <span className="text-[var(--text-secondary)]">Top</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* AI Insights */}
      <GlassCard className="p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
              Patrones de Éxito y Fracaso (IA)
            </h2>
            <p className="text-[12px] text-[var(--text-secondary)] mt-1">
              Análisis inteligente de estrategias ganadores y áreas de mejora
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--success)]" />
                <h3 className="text-[15px] font-medium text-[var(--success)]">
                  Fortalezas Identificadas
                </h3>
              </div>
              <ul className="space-y-3 text-[13px] text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--success)] mt-0.5">✓</span>
                  <span>Estrategia de crecimiento de market share consistente y bien ejecutada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--success)] mt-0.5">✓</span>
                  <span>Mejora sostenida en eficiencia operacional (+7.8pp en 3 ciclos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--success)] mt-0.5">✓</span>
                  <span>Balance adecuado entre inversión y rentabilidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--success)] mt-0.5">✓</span>
                  <span>Reducción de endeudamiento sin sacrificar crecimiento</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--warning)]" />
                <h3 className="text-[15px] font-medium text-[var(--warning)]">
                  Áreas de Mejora
                </h3>
              </div>
              <ul className="space-y-3 text-[13px] text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--warning)] mt-0.5">→</span>
                  <span>Liquidez por debajo del promedio de cohorte (2.4 vs 2.6)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--warning)] mt-0.5">→</span>
                  <span>Gap en market share con líder aún significativo (-3.5pp)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--warning)] mt-0.5">→</span>
                  <span>Eficiencia en área administrativa puede optimizarse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--warning)] mt-0.5">→</span>
                  <span>Considerar diversificación de segmentos para mayor estabilidad</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--glass-border)]">
            <div className="p-4 rounded-[var(--r-md)] bg-[var(--accent-soft)]">
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                <span className="text-[var(--accent)] font-medium">Recomendación Estratégica para Ciclo 4:</span> Mantener el impulso en market share pero con foco en mejorar márgenes. Priorizar eficiencia operacional en áreas administrativas y fortalecer liquidez para asegurar flexibilidad ante eventos externos. El equipo muestra una trayectoria ascendente sólida y está bien posicionado para alcanzar el liderazgo.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Static Balance / Income Statement Tables */}
      <GlassCard className="p-8">
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-[var(--glass-border)] pb-4">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Estados Financieros Consolidados (Balances Históricos)
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Auditoría financiera del último ciclo cerrado (C3)
              </p>
            </div>
            <button className="px-3 py-1.5 rounded-[var(--r-sm)] border border-[var(--glass-border)] bg-[var(--surface)] text-[12px] font-medium text-[var(--text-primary)] hover:bg-[var(--muted)] transition-colors">
               Descargar Excel
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Estado de Resultados */}
            <div className="space-y-3">
              <h3 className="text-[14px] font-semibold text-[var(--text-primary)] bg-[var(--surface)] p-2 rounded-[var(--r-sm)] border border-[var(--glass-border)] text-center tracking-wider uppercase">Estado de Resultados (P&L)</h3>
              <table className="w-full text-[12px]">
                 <tbody className="divide-y divide-[var(--glass-border)]/50 text-[var(--text-secondary)]">
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2">Ventas Brutas</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono']">$15,200,000</td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2 text-[var(--danger)]">C.O.G.S. (Costo Ventas)</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono'] text-[var(--danger)]">($8,400,000)</td>
                    </tr>
                    <tr className="font-semibold text-[var(--text-primary)] bg-[var(--surface)] border-t border-[var(--glass-border)]">
                       <td className="py-2.5 px-2">Utilidad Bruta</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono']">$6,800,000</td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2 pl-6">↳ Gastos Administrativos</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono']">($1,850,000)</td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2 pl-6">↳ Gastos Marketing</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono']">($950,000)</td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2 pl-6">↳ Depreciación y Otros</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono']">($400,000)</td>
                    </tr>
                    <tr className="font-bold text-[var(--accent)] bg-[var(--accent-soft)]/20 border-t-2 border-[var(--accent)]/30">
                       <td className="py-3 px-2">EBITDA Operativo</td>
                       <td className="py-3 px-2 text-right font-['JetBrains_Mono'] text-[14px]">$3,600,000</td>
                    </tr>
                 </tbody>
              </table>
            </div>

            {/* Balance General Extracto */}
            <div className="space-y-3">
              <h3 className="text-[14px] font-semibold text-[var(--text-primary)] bg-[var(--surface)] p-2 rounded-[var(--r-sm)] border border-[var(--glass-border)] text-center tracking-wider uppercase">Balance General (Posición)</h3>
              <table className="w-full text-[12px]">
                 <tbody className="divide-y divide-[var(--glass-border)]/50 text-[var(--text-secondary)]">
                    <tr className="bg-[var(--surface)]/50">
                       <td className="py-2 px-2 font-medium text-[var(--text-primary)]">ACTIVOS</td>
                       <td className="py-2 px-2 text-right"></td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2 pl-6">Caja y Bancos</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono'] text-[var(--success)]">$3,250,000</td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2 pl-6">Inventarios</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono']">$1,450,000</td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2 pl-6">Planta, Eq. e Intangibles</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono']">$8,800,000</td>
                    </tr>
                    
                    <tr className="bg-[var(--surface)]/50 mt-2 border-t border-[var(--glass-border)]">
                       <td className="py-2 px-2 font-medium text-[var(--text-primary)] pt-4">PASIVOS Y PATRIMONIO</td>
                       <td className="py-2 px-2 text-right"></td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2 pl-6">Deudas Corto Plazo</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono'] text-[var(--danger)]">$850,000</td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors">
                       <td className="py-2.5 px-2 pl-6">Deudas Largo Plazo</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono'] text-[var(--danger)]">$4,200,000</td>
                    </tr>
                    <tr className="hover:bg-[var(--muted)]/50 transition-colors bg-[var(--muted)]/30">
                       <td className="py-2.5 px-2 pl-6 font-medium text-[var(--text-primary)]">Total Patrimonio (Equity)</td>
                       <td className="py-2.5 px-2 text-right font-['JetBrains_Mono'] font-medium text-[var(--text-primary)]">$8,450,000</td>
                    </tr>
                 </tbody>
              </table>
            </div>

          </div>
        </div>
      </GlassCard>
    </div>
  );
}
