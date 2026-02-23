"use client";

import { motion } from "motion/react";
import { GlassCard, KPIStatCard } from "@/components/GlassComponents";
import { marketData, kpiData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export default function MarketPage() {
  const segmentChartData = marketData.segments.map(s => ({
    name: s.name,
    size: s.size,
    growth: s.growth
  }));

  const demandData = [
    { scenario: "Pesimista", value: marketData.demandPrediction.pessimistic },
    { scenario: "Base", value: marketData.demandPrediction.base },
    { scenario: "Optimista", value: marketData.demandPrediction.optimistic }
  ];

  const COLORS = ['#1D4ED8', '#0E9F6E', '#B45309'];

  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)]">
          Módulo Mercado
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Análisis de mercado, competencia y predicción de demanda
        </p>
      </motion.div>

      {/* Market KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPIStatCard
          title="Tamaño de Mercado"
          value={marketData.totalMarketSize / 1000000}
          unit="M$"
          delta={marketData.growth}
          trend="up"
          status="success"
        />
        <KPIStatCard
          title="Crecimiento Anual"
          value={marketData.growth}
          unit="%"
          delta={1.2}
          trend="up"
          status="success"
        />
        <KPIStatCard
          title="Tu Market Share"
          value={kpiData.find(k => k.id === "marketshare")!.value}
          unit="%"
          delta={1.2}
          trend="up"
          status="success"
        />
        <KPIStatCard
          title="Demanda Proyectada"
          value={marketData.demandPrediction.base / 1000}
          unit="K unidades"
          delta={5.8}
          trend="up"
          status="neutral"
        />
      </div>

      {/* Market Analysis Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Market Segmentation */}
        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Segmentación de Mercado
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Distribución y crecimiento por segmento
              </p>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={segmentChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                <XAxis 
                  dataKey="name" 
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
                <Bar dataKey="size" fill="var(--accent)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              {marketData.segments.map((segment) => (
                <div key={segment.name} className="flex items-center justify-between text-[13px]">
                  <div>
                    <span className="text-[var(--text-primary)] font-medium">{segment.name}</span>
                    <span className="text-[var(--text-tertiary)] ml-2">({segment.size}%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--success)]">+{segment.growth}%</span>
                    <span className="text-[11px] px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--text-secondary)]">
                      {segment.competition}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Demand Prediction */}
        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Predicción de Demanda (IA)
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Escenarios proyectados con {(marketData.demandPrediction.confidence * 100).toFixed(0)}% de confianza
              </p>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                <XAxis 
                  dataKey="scenario" 
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
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {demandData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="p-4 rounded-[var(--r-md)] bg-[var(--accent-soft)]">
              <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                <span className="text-[var(--accent)] font-medium">Recomendación IA:</span> El escenario base sugiere una demanda de {(marketData.demandPrediction.base / 1000).toFixed(0)}K unidades. 
                Considera ajustar producción e inventario para este nivel.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Competition Analysis */}
      <GlassCard className="p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
              Análisis de Competencia
            </h2>
            <p className="text-[12px] text-[var(--text-secondary)] mt-1">
              Principales competidores y estrategias identificadas
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {marketData.competitors.map((competitor) => (
              <motion.div
                key={competitor.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-[var(--r-md)] bg-[var(--muted)] space-y-3"
              >
                <div className="space-y-1">
                  <h3 className="text-[15px] font-medium text-[var(--text-primary)]">
                    {competitor.name}
                  </h3>
                  <p className="text-[11px] text-[var(--text-tertiary)]">
                    {competitor.strategy}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[var(--text-secondary)]">Market Share</p>
                  <p className="font-['JetBrains_Mono'] text-[24px] font-semibold text-[var(--text-primary)]">
                    {competitor.share.toFixed(1)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Strategic Insights */}
      <GlassCard className="p-8">
        <div className="space-y-4">
          <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
            Insights Estratégicos
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium text-[var(--accent)]">
                Oportunidades
              </h3>
              <ul className="space-y-2 text-[13px] text-[var(--text-secondary)] list-disc list-inside">
                <li>Segmento Premium muestra el mayor crecimiento (8.2%)</li>
                <li>Demanda proyectada en aumento para próximos ciclos</li>
                <li>Posibilidad de capturar share de competidores con estrategia diferenciada</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium text-[var(--warning)]">
                Riesgos
              </h3>
              <ul className="space-y-2 text-[13px] text-[var(--text-secondary)] list-disc list-inside">
                <li>Alta competencia en segmento económico</li>
                <li>Líder de mercado mantiene ventaja significativa</li>
                <li>Variabilidad en predicción de demanda (±15%)</li>
              </ul>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
