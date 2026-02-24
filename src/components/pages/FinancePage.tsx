"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard, KPIStatCard } from "@/components/GlassComponents";
import { financialData } from "@/data/mockData";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area
} from "recharts";
import { 
  TrendingUp, DollarSign, PiggyBank, Calculator, Bot, ChevronRight, Play, LineChart as LineChartIcon,
  AlertTriangle, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data for DataGrid ---
const initialCashFlowGrid = [
  { id: 'ing_operativos', name: "Ingresos Operativos", values: [1200000, 1350000, 1500000, 1680000] },
  { id: 'costo_ventas', name: "( C.O.G.S. )", isNegative: true, values: [600000, 650000, 700000, 760000] },
  { id: 'gastos_admin', name: "( Gastos Admin y RRHH )", isNegative: true, values: [250000, 250000, 260000, 260000] },
  { id: 'gastos_mkt', name: "( Marketing )", isNegative: true, values: [150000, 150000, 180000, 200000] },
  { id: 'ebitda', name: "EBITDA Operativo", isTotal: true, values: [200000, 300000, 360000, 460000] },
];

export default function FinancePage() {
  const [gridData] = useState(initialCashFlowGrid);
  const [showAIPanel, setShowAIPanel] = useState(true);
  
  const scenarioChartData = financialData.scenarios.map(s => ({
    name: s.name,
    revenue: s.revenue / 1000000,
    profit: s.profit / 1000000,
    probability: s.probability * 100
  }));

  return (
    <div className="max-w-[1320px] mx-auto space-y-8 flex items-start gap-8">
      
      {/* LEFT COLUMN: Main Finance Workspace */}
      <div className={cn(
        "space-y-8 transition-all duration-500",
        showAIPanel ? "w-[calc(100%-340px)]" : "w-full"
      )}>
        
        {/* Page Title */}
        <div className="flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-[32px] font-semibold text-[var(--text-primary)] tracking-tight">
              Finanzas y Flujo de Caja
            </h1>
            <p className="text-[14px] text-[var(--text-secondary)]">
              Proyecciones interactivas, VPN y Estado de Resultados
            </p>
          </motion.div>
          
          {!showAIPanel && (
             <button 
               onClick={() => setShowAIPanel(true)}
               className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--r-full)] bg-[var(--accent-soft)] text-[var(--accent)] text-[12px] font-medium hover:bg-[var(--accent)]/20 transition-colors"
             >
                <Bot className="w-4 h-4" /> Mostrar Asesor xAI
             </button>
          )}
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-4 gap-6">
          <KPIStatCard
            title="Valor Actual Neto"
            value={financialData.metrics.van / 1000000}
            unit="M$"
            status="success"
            trend="up"
            delta={12.5}
          />
          <KPIStatCard
            title="T.I.R."
            value={financialData.metrics.tir}
            unit="%"
            status="success"
            trend="up"
            delta={2.1}
          />
          <KPIStatCard
            title="Payback"
            value={financialData.metrics.payback}
            unit="Años"
            status="warning"
          />
          <KPIStatCard
            title="WACC Acumulado"
            value={10.5}
            unit="%"
            status="neutral"
          />
        </div>

        {/* Interactive DataGrid (Cash Flow Simulator) */}
        <GlassCard className="p-0 overflow-hidden flex flex-col">
           <div className="p-6 border-b border-[var(--glass-border)] bg-[var(--surface)] flex justify-between items-center">
              <div>
                 <h2 className="text-[18px] font-medium text-[var(--text-primary)] flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[var(--accent)]" />
                    Estado de Resultados Pro-Forma
                 </h2>
                 <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                    Celdas calculadas automáticamente desde Mercado y RRHH
                 </p>
              </div>
              <button className="px-4 py-2 bg-[var(--accent)] text-white text-[13px] font-medium rounded-[var(--r-md)] hover:bg-[var(--accent-hover)] transition-colors flex items-center gap-2 shadow-sm">
                 <Play className="w-4 h-4" /> Correr Simulación Montecarlo
              </button>
           </div>
           
           <div className="overflow-x-auto w-full">
             <table className="w-full text-left border-collapse min-w-[700px]">
               <thead>
                 <tr className="border-b border-[var(--glass-border)] bg-[var(--surface)] text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                   <th className="p-4 font-normal w-[30%]">Concepto Operativo</th>
                   <th className="p-4 font-normal text-right">Q1 (Y1)</th>
                   <th className="p-4 font-normal text-right">Q2 (Y1)</th>
                   <th className="p-4 font-normal text-right">Q3 (Y1)</th>
                   <th className="p-4 font-normal text-right">Q4 (Y1)</th>
                 </tr>
               </thead>
               <tbody className="text-[13px] divide-y divide-[var(--glass-border)]">
                 {gridData.map((row, idx) => (
                   <tr key={row.id} className={cn(
                     "transition-colors hover:bg-[var(--muted)]/50",
                     row.isTotal ? "bg-[var(--surface)] font-semibold border-t-2 border-[var(--glass-border)]" : ""
                   )}>
                     <td className={cn(
                       "p-4 flex items-center gap-2",
                       row.isTotal ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                     )}>
                       {row.name}
                     </td>
                     {row.values.map((val, i) => (
                       <td key={i} className={cn(
                         "p-4 text-right font-['JetBrains_Mono'] tabular-nums",
                         row.isNegative ? "text-[var(--danger)]" : "text-[var(--text-primary)]",
                         row.isTotal && val > 0 && "text-[var(--success)]"
                       )}>
                         {row.isNegative ? `-$${val.toLocaleString()}` : `$${val.toLocaleString()}`}
                       </td>
                     ))}
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           <div className="bg-[var(--accent-soft)]/30 p-4 flex items-center gap-3 text-[12px] text-[var(--text-secondary)] border-t border-[var(--glass-border)]">
              <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
              <span>Validación cruzada completa: Las celdas de Gastos Admin coinciden con el módulo de RRHH.</span>
           </div>
        </GlassCard>

        {/* Risk & Scenario Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Scenario Analysis */}
          <GlassCard className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-[16px] font-medium text-[var(--text-primary)]">
                  Simulación de Escenarios (VAN)
                </h2>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={scenarioChartData} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} tickLine={false}
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} tickLine={false}
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}M`}
                  />
                  <Tooltip
                    cursor={{ fill: 'var(--muted)' }}
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--r-sm)', fontSize: '13px' }}
                    formatter={(value: any) => [`$${value}M`, 'Monto']}
                  />
                  <Bar dataKey="profit" name="Utilidad Neta" fill="var(--accent)" radius={[4, 4, 0, 0]} barSize={32} />
                  <Bar dataKey="revenue" name="Ingreso Bruto" fill="var(--success)" opacity={0.3} radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Cash Flow Timeline */}
          <GlassCard className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-[16px] font-medium text-[var(--text-primary)]">
                  Inyección de Capital vs Quema
                </h2>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={financialData.cashFlow} margin={{ left: -20, right: 10 }}>
                  <defs>
                   <linearGradient id="colorOp" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#0E9F6E" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#0E9F6E" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--r-sm)', fontSize: '13px' }}
                    formatter={(value: any) => `$${(value/1000).toFixed(0)}K`}
                  />
                  <Area type="monotone" dataKey="operational" name="Operativo" stroke="#0E9F6E" fillOpacity={1} fill="url(#colorOp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* RIGHT COLUMN: AI Sidebar Advisory Panel */}
      <AnimatePresence>
         {showAIPanel && (
           <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 50, width: 0 }}
             transition={{ type: "spring", bounce: 0, duration: 0.5 }}
             className="w-[340px] shrink-0 sticky top-8"
           >
              <GlassCard className="p-0 overflow-hidden h-[calc(100vh-64px)] flex flex-col border-[var(--accent)]/30 border">
                 
                 {/* AI Header */}
                 <div className="p-5 border-b border-[var(--glass-border)] bg-gradient-to-r from-[var(--accent-soft)] to-transparent flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white relative">
                          <Bot className="w-4 h-4" />
                          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[var(--success)] border-2 border-[var(--surface)]"></span>
                       </div>
                       <div>
                         <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">xAI Analyst</h3>
                         <p className="text-[11px] text-[var(--accent)]">En línea • Simulando escenarios</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setShowAIPanel(false)}
                      className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors p-1"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                 </div>

                 {/* AI Chat / Suggestions Area */}
                 <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-[var(--surface)]/50">
                    
                    {/* Message 1 */}
                    <div className="space-y-1.5">
                       <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)] ml-2">Alerta de Liquidez</span>
                       <div className="bg-[var(--glass)] border border-[var(--glass-border)] p-3.5 rounded-2xl rounded-tl-sm shadow-sm text-[13px] text-[var(--text-secondary)] leading-relaxed relative">
                          <p>
                             He detectado que el <strong>Gasto en Marketing (Q4)</strong> aumentará a $200k. Dado el flujo de caja actual, podrías entrar en déficit técnico si la elasticidad de la demanda no asimila este gasto.
                          </p>
                       </div>
                    </div>

                    {/* Message 2: Actionable Suggestion */}
                    <div className="space-y-1.5">
                       <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)] ml-2">Recomendación Táctica</span>
                       <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 p-3.5 rounded-2xl rounded-tl-sm shadow-sm text-[13px] text-[var(--text-primary)] leading-relaxed">
                          <p className="mb-3">
                             Para cubrir el Q4 sin pedir préstamos al 12% (Tasa vigente), recomiendo emitir Bonos Corporativos a Corto Plazo por <strong>$150,000</strong>.
                          </p>
                          <button className="w-full py-2 bg-[var(--accent)] text-white text-[12px] font-medium rounded-[var(--r-sm)] hover:bg-[var(--accent-hover)] transition-colors">
                             Liquidar Bonos Ahora
                          </button>
                       </div>
                    </div>

                    {/* Sensibility Analysis Snippet */}
                    <div className="space-y-1.5 pt-4 border-t border-[var(--glass-border)]">
                       <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)] ml-2">Sensibilidad (Spider Web)</span>
                       <div className="p-3 bg-[var(--muted)] rounded-[var(--r-md)]">
                          <div className="flex justify-between items-center text-[12px] mb-2">
                             <span className="text-[var(--text-secondary)]">Demanda ▼ 15%</span>
                             <span className="text-[var(--danger)] font-medium">VAN: -$50K</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-[var(--danger)] w-1/4 rounded-full"></div>
                          </div>

                          <div className="flex justify-between items-center text-[12px] mt-4 mb-2">
                             <span className="text-[var(--text-secondary)]">Costo Ventas ▲ 5%</span>
                             <span className="text-[var(--warning)] font-medium">VAN: $1.2M</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-[var(--warning)] w-2/3 rounded-full"></div>
                          </div>
                       </div>
                    </div>

                 </div>
                 
                 {/* Input (Fake) */}
                 <div className="p-4 bg-[var(--surface)] border-t border-[var(--glass-border)] shrink-0">
                    <div className="relative">
                       <input 
                         type="text" 
                         disabled
                         placeholder="Solicitar análisis custom..." 
                         className="w-full bg-[var(--muted)] border border-[var(--glass-border)] rounded-[var(--r-full)] py-2.5 px-4 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] cursor-not-allowed"
                       />
                       <div className="absolute right-2 top-1.5 p-1 rounded-full bg-[var(--glass-border)] text-white/50">
                          <LineChartIcon className="w-4 h-4" />
                       </div>
                    </div>
                 </div>

              </GlassCard>
           </motion.div>
         )}
      </AnimatePresence>

    </div>
  );
}
