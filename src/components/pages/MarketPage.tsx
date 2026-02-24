"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { GlassCard, KPIStatCard } from "@/components/GlassComponents";
import { marketData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from "recharts";
import { Bot, TrendingUp, AlertCircle, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarketPage() {
  // --- UI STATE ---
  const [price, setPrice] = useState(1250);
  const [marketing, setMarketing] = useState(450000);
  const [isUploading, setIsUploading] = useState(false);
  
  // --- MOCK AI LOGIC ---
  const predictedDemand = useMemo(() => {
    // Faux AI regression formula
    const baseDemand = marketData.demandPrediction.base;
    const priceFactor = (1250 / price); // Inverse proportional
    const marketingFactor = 1 + (marketing / 2000000); // Up to 50% boost if spending 1M
    
    const calculated = baseDemand * priceFactor * marketingFactor;
    return {
      optimistic: Math.round(calculated * 1.15),
      base: Math.round(calculated),
      pessimistic: Math.round(calculated * 0.85),
    };
  }, [price, marketing]);

  const demandData = [
    { scenario: "Pesimista", value: predictedDemand.pessimistic },
    { scenario: "Base", value: predictedDemand.base },
    { scenario: "Optimista", value: predictedDemand.optimistic }
  ];

  const segmentChartData = marketData.segments.map(s => ({
    name: s.name,
    size: s.size,
    growth: s.growth
  }));

  const COLORS = ['#1D4ED8', '#0E9F6E', '#B45309'];

  const handleFakeUpload = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  };

  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title & Actions */}
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-[32px] font-semibold text-[var(--text-primary)] tracking-tight">
            Módulo Mercado
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            Simulación de Demanda, Análisis Competitivo e Ingesta de Datos (IA)
          </p>
        </motion.div>
        
        {/* CSV Upload Dropzone button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFakeUpload}
          disabled={isUploading}
          className="px-4 py-2.5 rounded-[var(--r-md)] bg-[var(--surface)] border border-[var(--glass-border)] hover:bg-[var(--muted)] text-[var(--text-primary)] text-[14px] font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          {isUploading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Bot className="w-5 h-5 text-[var(--accent)]" />
            </motion.div>
          ) : (
            <FileSpreadsheet className="w-5 h-5 text-[var(--text-secondary)]" />
          )}
          {isUploading ? "Procesando CSV..." : "Ingestar Estudio (CSV)"}
        </motion.button>
      </div>

      {/* Market KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPIStatCard
          title="Tamaño del Mercado (SAM)"
          value={marketData.totalMarketSize / 1000000}
          unit="M$"
          delta={marketData.growth}
          trend="up"
          status="success"
        />
        <KPIStatCard
          title="Presupuesto Competitivo"
          value={marketing}
          unit="$"
          status="neutral"
        />
        <KPIStatCard
          title="Elasticidad Proyectada"
          value={-1.2}
          unit="β"
          status="warning"
        />
        <KPIStatCard
          title="Forecast Base"
          value={predictedDemand.base / 1000}
          unit="K unds"
          trend={predictedDemand.base > marketData.demandPrediction.base ? "up" : "down"}
          status={predictedDemand.base >= marketData.demandPrediction.base ? "success" : "danger"}
          delta={Math.abs((predictedDemand.base / marketData.demandPrediction.base - 1) * 100)}
        />
      </div>

      {/* Main Interactive Modeler */}
      <div className="grid grid-cols-12 gap-6">
        {/* Controls - 4 cols */}
        <GlassCard className="col-span-4 p-8 flex flex-col h-full">
          <div className="space-y-6 flex-1">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Bot className="w-5 h-5 text-[var(--accent)]" />
                <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                  Simulador de Precios
                </h2>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                Ajusta las variables. El motor de IA (Clustering & Regresión) calculará la cuota estimada instantáneamente.
              </p>
            </div>

            <div className="space-y-8 mt-8">
              {/* Product Price Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-[14px] font-medium text-[var(--text-primary)]">
                    Precio de Venta
                  </label>
                  <span className="font-['JetBrains_Mono'] text-[16px] font-semibold text-[var(--accent)]">
                    ${price.toLocaleString()}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="800" 
                  max="2000" 
                  step="10"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                />
                <div className="flex justify-between text-[11px] text-[var(--text-tertiary)] font-['JetBrains_Mono']">
                  <span>$800</span>
                  <span>$2,000</span>
                </div>
              </div>

              {/* Marketing Budget Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label className="text-[14px] font-medium text-[var(--text-primary)]">
                    Presupuesto Marketing
                  </label>
                  <span className="font-['JetBrains_Mono'] text-[16px] font-semibold text-[var(--accent)]">
                    ${marketing.toLocaleString()}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000000" 
                  step="10000"
                  value={marketing}
                  onChange={(e) => setMarketing(Number(e.target.value))}
                  className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                />
                <div className="flex justify-between text-[11px] text-[var(--text-tertiary)] font-['JetBrains_Mono']">
                  <span>$0</span>
                  <span>$1.0M</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[var(--glass-border)]">
             <button className="w-full py-3 rounded-[var(--r-md)] bg-[var(--accent)] text-white text-[14px] font-medium hover:bg-[var(--accent-hover)] transition-colors shadow-sm">
                Guardar Decisión de Mercado
            </button>
            <p className="text-center text-[11px] text-[var(--text-tertiary)] mt-3 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Impactará módulo Financiero
            </p>
          </div>
        </GlassCard>

        {/* AI Forecast Chart - 8 cols */}
        <GlassCard className="col-span-8 p-8 flex flex-col h-full relative overflow-hidden">
          {/* Subtle background glow depending on output */}
          <div className={cn(
            "absolute inset-0 opacity-[0.03] transition-colors duration-1000",
            predictedDemand.base > marketData.demandPrediction.base ? "bg-[var(--success)]" : "bg-[var(--danger)]"
          )} />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                  Proyección de Demanda
                </h2>
                <p className="text-[13px] text-[var(--text-secondary)] mt-1">
                  Distribución probabilística para el ciclo actual basado en elasticidad precio-demanda.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--glass-border)] transition-colors">
                 <TrendingUp className={cn(
                   "w-4 h-4", 
                   predictedDemand.base > marketData.demandPrediction.base ? "text-[var(--success)]" : "text-[var(--danger)]"
                 )} />
                 <span className="text-[12px] font-medium text-[var(--text-primary)]">
                    Confianza: {(marketData.demandPrediction.confidence * 100).toFixed(0)}%
                 </span>
              </div>
            </div>

            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={demandData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                  <XAxis 
                    dataKey="scenario" 
                    tick={{ fill: 'var(--text-secondary)', fontSize: 13 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    tick={{ fill: 'var(--text-tertiary)', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${(value / 1000)}k`}
                    domain={[0, 'auto']}
                  />
                  <Tooltip
                    cursor={{ stroke: 'var(--glass-border)', strokeWidth: 1, strokeDasharray: '5 5' }}
                    contentStyle={{
                      backgroundColor: 'var(--glass)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 'var(--r-md)',
                      boxShadow: 'var(--shadow-lg)',
                      color: 'var(--text-primary)',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '13px'
                    }}
                    formatter={(value: number) => [value.toLocaleString() + ' unds', 'Demanda Estimada']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--accent)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    activeDot={{ r: 6, strokeWidth: 0, fill: "var(--accent)" }}
                    isAnimationActive={true}
                    animationDuration={800}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* AI Explanation Bar */}
            <div className="mt-4 p-4 rounded-[var(--r-md)] bg-[var(--accent-soft)]/50 border border-[var(--accent)]/10 flex items-start gap-3">
               <Bot className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
               <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  <strong className="text-[var(--text-primary)] font-medium">Nota del Modelo (xAI):</strong> 
                  {" "}Dada tu estrategia de precios de <span className="text-[var(--accent)] font-['JetBrains_Mono']">${price.toLocaleString()}</span> y esfuerzo de marketing, 
                  es altamente probable canibalizar cuota del mercado <em>Económico</em> de la competencia. 
                  Recomendamos preparar una capacidad operativa mínima de {(predictedDemand.pessimistic / 1000).toFixed(1)}k unidades para evitar desabastecimiento (Stockout).
               </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Secondary Data Grid */}
      <div className="grid grid-cols-2 gap-6">
         {/* Market Segmentation (Static for now) */}
         <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Clustering del Consumidor
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Segmentación detectada para la industria Retail
              </p>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={segmentChartData} layout="vertical" margin={{ left: -20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--glass-border)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fill: 'var(--text-primary)', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'var(--muted)' }} 
                  contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: '8px', fontSize: '13px' }} 
                  formatter={(value: number) => [`${value}%`, 'Tamaño del Segmento']}
                />
                <Bar dataKey="size" fill="var(--accent)" radius={[0, 4, 4, 0]} barSize={28}>
                  {segmentChartData.map((_, index) => <Cell key={index} fill={COLORS[index]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Competitor Analysis */}
        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Radar de Competencia
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Top 3 rivales en simulación actual
              </p>
            </div>

            <div className="space-y-4">
              {marketData.competitors.map((comp, idx) => (
                <div key={comp.name} className="p-5 rounded-[var(--r-md)] border border-[var(--glass-border)] bg-[var(--surface)] hover:bg-[var(--muted)] transition-colors flex justify-between items-center group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] flex items-center justify-center font-bold text-[var(--text-secondary)]">
                         #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-medium text-[var(--text-primary)]">{comp.name}</h4>
                        <p className="text-[12px] text-[var(--text-tertiary)]">{comp.strategy}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="block text-[18px] font-['JetBrains_Mono'] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{comp.share}%</span>
                      <span className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">Share</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
