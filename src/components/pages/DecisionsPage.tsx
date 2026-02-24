"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { GlassCard, StatusBadge } from "@/components/GlassComponents";
import { 
  ArrowRight, Lock, Save, Send, Bot, TrendingUp, Users, Settings, 
  DollarSign, CheckCircle2, AlertTriangle, Fingerprint, Activity,
  ShieldCheck, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock integrated decisions payload
const decisionPayload = {
  market: { price: 1250, marketingBudget: 45000, model: "Premium" },
  hr: { newHires: 5, salaryIncrease: 3.5, training: true },
  operations: { extraShifts: 1, siliconOrder: 25, maintenance: false },
  finance: { requestedLoan: 0, loanTerm: 12, dividendPayout: 0 }
};

export default function DecisionsPage() {
  const [activeTab, setActiveTab] = useState<"review" | "ai_audit" | "submit">("review");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // AI Audit sequence state
  const [auditStep, setAuditStep] = useState(0);
  const aiSteps = [
    "Inicializando Sandbox Cuántico...",
    "Cruzando elasticidad de Precio vs Marketing...",
    "Verificando capacidad operativa (1 turno extra)...",
    "Calculando riesgo de liquidez y tesorería...",
    "Simulación Montecarlo (10,000 iteraciones)... completada."
  ];

  const runAIAudit = () => {
    setIsAuditing(true);
    setAuditStep(0);
    
    // Simulate steps
    const interval = setInterval(() => {
      setAuditStep(prev => {
        if (prev >= aiSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAuditing(false);
            setAuditComplete(true);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  // State for "Hold to Sign" button
  const [signProgress, setSignProgress] = useState(0);
  const signIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSigning = () => {
    if (isSubmitted) return;
    signIntervalRef.current = setInterval(() => {
      setSignProgress((p) => {
        if (p >= 100) {
          clearInterval(signIntervalRef.current!);
          setIsSubmitted(true);
          return 100;
        }
        return p + 2;
      });
    }, 30);
  };

  const stopSigning = () => {
    if (signIntervalRef.current) clearInterval(signIntervalRef.current);
    if (!isSubmitted) setSignProgress(0);
  };

  return (
    <div className="max-w-[1320px] mx-auto space-y-8 pb-20">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-2 flex justify-between items-end"
      >
         <div>
            <h1 className="text-[32px] font-semibold text-[var(--text-primary)] tracking-tight flex items-center gap-3">
               Centro de Decisiones <span className="text-[var(--accent)] text-[20px] bg-[var(--accent-soft)] px-3 py-1 rounded-full font-mono">Master Control</span>
            </h1>
            <p className="text-[14px] text-[var(--text-secondary)]">
               Revisión final, auditoría algorítmica y firma de la estrategia del Ciclo 03.
            </p>
         </div>
         <div className="flex items-center gap-4 bg-[var(--surface)] p-3 rounded-[var(--r-md)] border border-[var(--glass-border)] shadow-sm">
            <Activity className="w-5 h-5 text-[var(--text-tertiary)]" />
            <div className="flex flex-col">
               <span className="text-[10px] text-[var(--text-tertiary)] uppercase font-semibold tracking-wider">Servidor de Simulación</span>
               <span className="text-[13px] font-['JetBrains_Mono'] text-[var(--success)] flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]"></span>
                  </span>
                  ONLINE
               </span>
            </div>
         </div>
      </motion.div>

      {/* Workflow Tabs (Progressive) */}
      <div className="relative">
         <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--glass-border)] -z-10 -translate-y-1/2 rounded-full" />
         <div className="flex justify-between items-center px-12">
            {[
               { id: "review", label: "1. Chequeo de Borradores", icon: ShieldCheck },
               { id: "ai_audit", label: "2. Auditoría Pre-Vuelo", icon: Bot },
               { id: "submit", label: "3. Firma Ejecutiva", icon: Fingerprint }
            ].map((tab, idx) => {
               const Icon = tab.icon;
               const isPast = activeTab === "submit" && idx < 2 || activeTab === "ai_audit" && idx === 0;
               const isActive = activeTab === tab.id;
               
               return (
                  <motion.button 
                     key={tab.id}
                     onClick={() => !isSubmitted && setActiveTab(tab.id as any)}
                     disabled={isSubmitted && !isActive}
                     className="flex flex-col items-center gap-3 relative group"
                     whileHover={{ scale: isSubmitted ? 1 : 1.05 }}
                  >
                     <motion.div 
                        className={cn(
                           "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                           isActive ? "bg-[var(--accent)] text-white shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]" : 
                           isPast ? "bg-[var(--success)] text-white" : 
                           "bg-[var(--surface)] border-2 border-[var(--glass-border)] text-[var(--text-tertiary)]"
                        )}
                        whileTap={{ scale: 0.9 }}
                     >
                        {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                     </motion.div>
                     <span className={cn(
                        "text-[13px] font-medium transition-colors",
                        isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                     )}>
                        {tab.label}
                     </span>
                  </motion.button>
               )
            })}
         </div>
         {/* Animated connection line */}
         <motion.div 
            className="absolute top-1/2 left-12 h-0.5 bg-[var(--accent)] -z-10 -translate-y-1/2 rounded-full"
            initial={{ width: "0%" }}
            animate={{ 
               width: activeTab === "review" ? "0%" : activeTab === "ai_audit" ? "50%" : "calc(100% - 6rem)" 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
         />
      </div>

      <AnimatePresence mode="wait">
         {/* TAB 1: REVIEW */}
         {activeTab === "review" && (
            <motion.div 
               key="review"
               initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="grid grid-cols-2 gap-6 pt-4"
            >
               {/* Market Draft */}
               <GlassCard hover className="p-6 overflow-hidden relative group">
                  <div className="absolute -right-6 -top-6 w-32 h-32 bg-[var(--accent)] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity" />
                  <div className="flex items-center gap-3 mb-6 border-b border-[var(--glass-border)] pb-4">
                     <div className="p-2 bg-[var(--accent-soft)] rounded-[var(--r-sm)]">
                        <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
                     </div>
                     <h2 className="text-[16px] font-medium text-[var(--text-primary)]">Estrategia de Mercado</h2>
                  </div>
                  <div className="space-y-4 text-[13px] relative z-10">
                     <div className="flex justify-between items-center group/item hover:bg-[var(--muted)] p-3 rounded-[var(--r-sm)] transition-colors border border-[var(--glass-border)] hover:border-[var(--accent)]/30">
                        <span className="text-[var(--text-secondary)] group-hover/item:text-[var(--text-primary)] transition-colors">Precio de Venta (MSRP)</span>
                        <span className="font-['JetBrains_Mono'] font-bold text-[15px] group-hover/item:text-[var(--accent)] transition-colors">${decisionPayload.market.price}</span>
                     </div>
                     <div className="flex justify-between items-center group/item hover:bg-[var(--muted)] p-3 rounded-[var(--r-sm)] transition-colors border border-[var(--glass-border)] hover:border-[var(--accent)]/30">
                        <span className="text-[var(--text-secondary)] group-hover/item:text-[var(--text-primary)] transition-colors">Presupuesto Marketing</span>
                        <span className="font-['JetBrains_Mono'] font-bold text-[15px] group-hover/item:text-[var(--accent)] transition-colors">${decisionPayload.market.marketingBudget.toLocaleString()}</span>
                     </div>
                  </div>
               </GlassCard>

               {/* HR Draft */}
               <GlassCard hover className="p-6 overflow-hidden relative group">
                  <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#0E9F6E] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity" />
                  <div className="flex items-center gap-3 mb-6 border-b border-[var(--glass-border)] pb-4">
                     <div className="p-2 bg-[#0E9F6E]/10 rounded-[var(--r-sm)]">
                        <Users className="w-5 h-5 text-[#0E9F6E]" />
                     </div>
                     <h2 className="text-[16px] font-medium text-[var(--text-primary)]">Organización (RRHH)</h2>
                  </div>
                  <div className="space-y-4 text-[13px] relative z-10">
                     <div className="flex justify-between items-center p-3 rounded-[var(--r-sm)] border border-[var(--glass-border)] hover:border-[#0E9F6E]/30 transition-colors">
                        <span className="text-[var(--text-secondary)]">Nuevas Contrataciones</span>
                        <span className="font-['JetBrains_Mono'] font-bold text-[15px]">+{decisionPayload.hr.newHires} pax</span>
                     </div>
                     <div className="flex justify-between items-center p-3 rounded-[var(--r-sm)] border border-[var(--glass-border)] hover:border-[#0E9F6E]/30 transition-colors">
                        <span className="text-[var(--text-secondary)]">Ajuste Salarial Promedio</span>
                        <span className="font-['JetBrains_Mono'] font-bold text-[15px] text-[var(--success)]">+{decisionPayload.hr.salaryIncrease}%</span>
                     </div>
                  </div>
               </GlassCard>

               {/* Operations Draft */}
               <GlassCard hover className="p-6 overflow-hidden relative group">
                  <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#B45309] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity" />
                  <div className="flex items-center gap-3 mb-6 border-b border-[var(--glass-border)] pb-4">
                     <div className="p-2 bg-[#B45309]/10 rounded-[var(--r-sm)]">
                        <Settings className="w-5 h-5 text-[#B45309]" />
                     </div>
                     <h2 className="text-[16px] font-medium text-[var(--text-primary)]">Operaciones & Cadena</h2>
                  </div>
                  <div className="space-y-4 text-[13px] relative z-10">
                     <div className="flex justify-between items-center p-3 rounded-[var(--r-sm)] border border-[var(--glass-border)] hover:border-[#B45309]/30 transition-colors">
                        <span className="text-[var(--text-secondary)]">Turnos Asignados</span>
                        <span className="font-['JetBrains_Mono'] font-bold text-[15px] text-[var(--warning)]">+ {decisionPayload.operations.extraShifts} Extra</span>
                     </div>
                     <div className="flex justify-between items-center p-3 rounded-[var(--r-sm)] border border-[var(--glass-border)] hover:border-[#B45309]/30 transition-colors">
                        <span className="text-[var(--text-secondary)]">Pedido de Silicio</span>
                        <span className="font-['JetBrains_Mono'] font-bold text-[15px]">{decisionPayload.operations.siliconOrder} ton</span>
                     </div>
                  </div>
               </GlassCard>

               {/* Finance Draft */}
               <GlassCard hover className="p-6 overflow-hidden relative group">
                  <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#1D4ED8] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity" />
                  <div className="flex items-center gap-3 mb-6 border-b border-[var(--glass-border)] pb-4">
                     <div className="p-2 bg-[#1D4ED8]/10 rounded-[var(--r-sm)]">
                        <DollarSign className="w-5 h-5 text-[#1D4ED8]" />
                     </div>
                     <h2 className="text-[16px] font-medium text-[var(--text-primary)]">Finanzas Corporativas</h2>
                  </div>
                  <div className="space-y-4 text-[13px] relative z-10">
                     <div className="flex justify-between items-center bg-[var(--surface)] p-3 rounded-[var(--r-sm)] border border-[var(--glass-border)] text-[var(--text-tertiary)]">
                        <span className="text-[var(--text-secondary)]">Deuda Solicitada</span>
                        <span className="font-['JetBrains_Mono'] font-bold text-[15px]">$0</span>
                     </div>
                     <div className="flex justify-between items-center bg-[var(--surface)] p-3 rounded-[var(--r-sm)] border border-[var(--glass-border)] text-[var(--text-tertiary)]">
                        <span className="text-[var(--text-secondary)]">Reparto de Dividendos</span>
                        <span className="font-['JetBrains_Mono'] font-bold text-[15px]">0%</span>
                     </div>
                  </div>
               </GlassCard>

               <div className="col-span-2 flex justify-end mt-4">
                  <motion.button 
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => setActiveTab("ai_audit")}
                     className="px-8 py-3 bg-[var(--text-primary)] text-[var(--bg)] font-medium rounded-[var(--r-pill)] hover:bg-[var(--text-secondary)] transition-colors flex items-center gap-2"
                  >
                     Proceder a Auditoría Cuántica <ArrowRight className="w-4 h-4" />
                  </motion.button>
               </div>
            </motion.div>
         )}

         {/* TAB 2: AI AUDIT */}
         {activeTab === "ai_audit" && (
            <motion.div 
               key="ai_audit"
               initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -10 }}
               className="max-w-3xl mx-auto w-full pt-4"
            >
               <GlassCard className="p-10 text-center space-y-6 overflow-hidden relative">
                  {!isAuditing && !auditComplete && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--glass)] to-[var(--accent-soft)] rounded-[2rem] rotate-12 flex items-center justify-center border border-[var(--glass-border)] shadow-[0_20px_40px_rgba(var(--accent-rgb),0.1)] group hover:rotate-0 transition-transform duration-500">
                           <Bot className="w-10 h-10 text-[var(--accent)] -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                        <h2 className="text-[24px] font-medium text-[var(--text-primary)]">Sandbox de Validación</h2>
                        <p className="text-[15px] text-[var(--text-secondary)] mb-8 max-w-xl mx-auto leading-relaxed">
                           Antes de firmar, nuestra IA integrará las métricas de tus 4 dimensiones de decisión y simulará un estrés de mercado (Montecarlo) para buscar fisuras financieras o cuellos de botella.
                        </p>
                        <motion.button 
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={runAIAudit}
                           className="px-8 py-4 bg-[var(--accent)] text-white font-medium rounded-[var(--r-pill)] hover:bg-[var(--accent-hover)] transition-all flex items-center gap-2 mx-auto shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)]"
                        >
                           <Activity className="w-5 h-5" /> Iniciar Escaneo Algorítmico
                        </motion.button>
                     </motion.div>
                  )}

                  {isAuditing && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                           <motion.div 
                              animate={{ rotate: 360 }} 
                              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                              className="absolute inset-0 rounded-full border border-dashed border-[var(--text-tertiary)]"
                           />
                           <motion.div 
                              animate={{ rotate: -360 }} 
                              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                              className="absolute inset-2 rounded-full border-t-2 border-l-2 border-[var(--accent)]"
                           />
                           <Bot className="w-10 h-10 text-[var(--accent)] animate-pulse" />
                        </div>

                        <div className="h-6 overflow-hidden">
                           <AnimatePresence mode="popLayout">
                              <motion.p 
                                 key={auditStep}
                                 initial={{ y: 20, opacity: 0 }}
                                 animate={{ y: 0, opacity: 1 }}
                                 exit={{ y: -20, opacity: 0 }}
                                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                 className="text-[15px] font-['JetBrains_Mono'] text-[var(--text-primary)]"
                              >
                                 {aiSteps[auditStep]}
                              </motion.p>
                           </AnimatePresence>
                        </div>
                        
                        <div className="w-64 h-1.5 bg-[var(--muted)] rounded-full mt-6 overflow-hidden">
                           <motion.div 
                              className="h-full bg-[var(--accent)]"
                              initial={{ width: 0 }}
                              animate={{ width: `${((auditStep + 1) / aiSteps.length) * 100}%` }}
                           />
                        </div>
                     </motion.div>
                  )}

                  {auditComplete && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left space-y-6">
                        <h2 className="text-[20px] font-medium text-[var(--text-primary)] text-center mb-8">Resultados del Escaneo</h2>
                        
                        <motion.div 
                           initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                           className="flex items-start gap-4 p-5 rounded-[var(--r-md)] bg-[var(--success)]/10 border border-[var(--success)]/30 backdrop-blur-sm"
                        >
                           <div className="p-2 bg-[var(--success)] rounded-full text-white shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                              <CheckCircle2 className="w-6 h-6" />
                           </div>
                           <div className="pt-1">
                              <h3 className="font-semibold text-[16px] text-[var(--text-primary)]">Sincronía Operativa Excelente</h3>
                              <p className="text-[13px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                                 Tus incrementos en contrataciones (+5) y adición de turnos soportan matemáticamente el empuje proyectado por la inversión en marketing ($45k).
                              </p>
                           </div>
                        </motion.div>

                        <motion.div 
                           initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                           className="flex items-start gap-4 p-5 rounded-[var(--r-md)] bg-[var(--warning)]/10 border border-[var(--warning)]/30 backdrop-blur-sm relative overflow-hidden"
                        >
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--warning)] opacity-10 blur-2xl" />
                           <div className="p-2 bg-[var(--warning)] text-[var(--bg)] rounded-full shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                              <AlertTriangle className="w-6 h-6" />
                           </div>
                           <div className="pt-1 relative z-10">
                              <h3 className="font-semibold text-[16px] text-[var(--text-primary)]">Advertencia Financiera Ambar</h3>
                              <p className="text-[13px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                                 Simulación detecta un <strong>24.5%</strong> de probabilidad de déficit técnico al fin del mes. Tus costos salariales suben, pero el precio de venta es apenas moderado. Considera vigilar tu liquidez.
                              </p>
                           </div>
                        </motion.div>

                        <div className="pt-6 text-center">
                           <motion.button 
                              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                              onClick={() => setActiveTab("submit")}
                              className="px-8 py-3 bg-[var(--accent)] text-white font-medium rounded-[var(--r-pill)] hover:bg-[var(--accent-hover)] transition-all inline-flex items-center gap-2 shadow-[0_8px_20px_rgba(var(--accent-rgb),0.3)]"
                           >
                              Proceder a Firma Ejecutiva <ArrowRight className="w-4 h-4" />
                           </motion.button>
                        </div>
                     </motion.div>
                  )}
               </GlassCard>
            </motion.div>
         )}

         {/* TAB 3: SUBMIT */}
         {activeTab === "submit" && (
            <motion.div 
               key="submit"
               initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -10 }}
               className="max-w-2xl mx-auto w-full pt-4"
            >
               <GlassCard className="p-8">
                  {!isSubmitted ? (
                     <div className="text-center space-y-8">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--surface)] to-[var(--muted)] rounded-3xl border border-[var(--glass-border)] flex items-center justify-center shadow-lg relative cursor-default">
                           <Fingerprint className={cn("w-12 h-12 transition-colors", signProgress > 0 ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]")} />
                           {/* Pulse effect behind icon */}
                           {signProgress > 0 && <span className="absolute inset-0 rounded-3xl bg-[var(--accent)] opacity-20 animate-ping" />}
                        </div>
                        
                        <div>
                           <h2 className="text-[26px] font-semibold text-[var(--text-primary)] tracking-tight">Autorización Estratégica</h2>
                           <p className="text-[14px] text-[var(--text-secondary)] mt-3 max-w-sm mx-auto">
                              Declaro que los planes han sido consensuados. Los parámetros quedarán encriptados para el motor de la simulación.
                           </p>
                        </div>

                        {/* Interactive Hold Button */}
                        <div className="relative max-w-xs mx-auto">
                           <button 
                              onMouseDown={startSigning}
                              onMouseUp={stopSigning}
                              onMouseLeave={stopSigning}
                              onTouchStart={startSigning}
                              onTouchEnd={stopSigning}
                              className={cn(
                                 "w-full py-4 text-[15px] font-semibold rounded-[var(--r-pill)] transition-all overflow-hidden relative select-none",
                                 signProgress > 0 ? "text-white" : "text-[var(--text-primary)] border border-[var(--glass-border)] bg-[var(--surface)]"
                              )}
                              style={{ transform: `scale(${1 - (signProgress * 0.0005)})` }} // slight shrink when holding
                           >
                              {/* Background fill */}
                              <div 
                                 className="absolute top-0 left-0 bottom-0 bg-[var(--accent)] -z-10"
                                 style={{ width: `${signProgress}%`, transition: "width 0.05s linear" }}
                              />
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                 {signProgress > 0 ? (
                                    <>Autenticando... {signProgress}%</>
                                 ) : (
                                    <>Mantén pulsado para Firmar</>
                                 )}
                              </span>
                           </button>
                           {signProgress > 0 && signProgress < 100 && (
                              <p className="text-[11px] text-[var(--accent)] font-medium mt-3 animate-pulse">
                                 No sueltes el botón...
                              </p>
                           )}
                        </div>

                        <div className="flex items-start gap-3 p-4 border border-[var(--glass-border)] rounded-[var(--r-md)] bg-[var(--surface)]/50 mx-8">
                           <Lock className="w-5 h-5 text-[var(--text-tertiary)] shrink-0 mt-0.5" />
                           <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed text-left">
                              Al firmar, el bloque de decisiones no podrá modificarse hasta el siguiente ciclo.
                           </p>
                        </div>
                     </div>
                  ) : (
                     <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center space-y-6 py-10"
                     >
                        <motion.div 
                           initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                           className="w-24 h-24 mx-auto bg-[var(--success)] rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                        >
                           <ShieldCheck className="w-12 h-12" />
                        </motion.div>
                        <h3 className="text-[24px] font-semibold text-[var(--text-primary)] tracking-tight">Decisiones Aseguradas</h3>
                        <p className="text-[15px] text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                           Los datos se han transmitido al servidor de Stratova. Estás listo para avanzar. Podrás ver los resultados cuando el docente avance el reloj del mercado.
                        </p>
                        <button className="text-[13px] font-medium text-[var(--accent)] hover:underline mt-4 inline-flex items-center gap-1">
                           Volver al Workspace <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                     </motion.div>
                  )}
               </GlassCard>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
