"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard } from "@/components/GlassComponents";
import { ShieldAlert, Users, TrendingUp, PlaySquare, PauseCircle, FastForward, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for Admin Panel
const adminTeamsData = [
  { id: 1, name: "Equipo Alpha", users: 4, isReady: true, lastLogin: "Hace 2 min" },
  { id: 2, name: "Innovadores X", users: 5, isReady: true, lastLogin: "Hace 14 min" },
  { id: 3, name: "Data Driven", users: 3, isReady: false, lastLogin: "Hace 1 hora" },
  { id: 4, name: "Strat Masters", users: 4, isReady: false, lastLogin: "Ayer" },
  { id: 5, name: "Futuristics", users: 5, isReady: true, lastLogin: "Hace 5 min" },
];

export default function AdminDashboardPage() {
  const [simulationState, setSimulationState] = useState<"running" | "paused">("running");

  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title & Critical Actions */}
      <div className="flex justify-between items-end">
         <motion.div
         initial={{ opacity: 0, y: -8 }}
         animate={{ opacity: 1, y: 0 }}
         className="space-y-2"
         >
         <h1 className="text-[32px] font-semibold text-[var(--text-primary)] flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-[var(--danger)]" />
            Panel de Control Docente
         </h1>
         <p className="text-[14px] text-[var(--text-secondary)]">
            Auditoría de simulaciones, control de tiempo e inyección de eventos macroeconómicos.
         </p>
         </motion.div>

         <div className="flex gap-3">
            <button className="px-4 py-2 bg-[var(--surface)] border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--muted)] transition-colors rounded-[var(--r-md)] text-[13px] font-medium">
               Exportar Calificaciones CSV
            </button>
            <button className="px-5 py-2 bg-[var(--danger)] text-white hover:bg-[#b91c1c] shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] transition-colors rounded-[var(--r-md)] text-[13px] font-bold flex items-center gap-2">
               <FastForward className="w-4 h-4" />
               Forzar Cierre de Ciclo
            </button>
         </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
         {/* Live Status Overview */}
         <div className="col-span-8 space-y-6">
            <GlassCard className="p-0 overflow-hidden">
               <div className="p-5 border-b border-[var(--glass-border)] bg-[var(--surface)] flex justify-between items-center">
                  <h2 className="text-[16px] font-medium text-[var(--text-primary)]">Estado de las Empresas</h2>
                  <span className="text-[12px] bg-[var(--accent-soft)] text-[var(--accent)] px-3 py-1 rounded-full font-medium">
                     Ciclo Actual: 03 - Etapa Competitiva
                  </span>
               </div>
               
               <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                     <tr className="border-b border-[var(--glass-border)] bg-[var(--surface)]/50 text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                        <th className="p-4 font-normal">Nombre de la Empresa</th>
                        <th className="p-4 font-normal">Miembros</th>
                        <th className="p-4 font-normal">Status Envío</th>
                        <th className="p-4 font-normal text-right">Última Actividad</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--glass-border)]">
                     {adminTeamsData.map((team) => (
                        <tr key={team.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                           <td className="p-4 font-medium text-[var(--text-primary)]">{team.name}</td>
                           <td className="p-4 text-[var(--text-secondary)] flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" /> {team.users}
                           </td>
                           <td className="p-4">
                              <span className={cn(
                                 "px-2 py-1 rounded-[var(--r-sm)] text-[11px] font-medium",
                                 team.isReady ? "bg-[var(--success-soft)] text-[var(--success)]" : "bg-[var(--warning-soft)] text-[var(--warning)]"
                              )}>
                                 {team.isReady ? "Decisiones Enviadas" : "Editando Borrador"}
                              </span>
                           </td>
                           <td className="p-4 text-right text-[var(--text-tertiary)]">{team.lastLogin}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </GlassCard>
         </div>

         {/* God Mode Tools */}
         <div className="col-span-4 space-y-6">
            <GlassCard className="p-6 border-t-4 border-t-[var(--accent)]">
               <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-4">
                  Control de Reloj (Servidor)
               </h3>
               <div className="flex flex-col items-center justify-center p-6 bg-[var(--surface)] border border-[var(--glass-border)] rounded-[var(--r-md)] mb-6">
                  <span className="font-['JetBrains_Mono'] text-[40px] font-bold tracking-widest text-[var(--text-primary)] leading-none">
                     14:32:05
                  </span>
                  <span className="text-[12px] text-[var(--text-tertiary)] mt-2 uppercase tracking-wide">Tiempo Restante Módulo</span>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                  <button 
                     onClick={() => setSimulationState("running")}
                     className={cn(
                        "py-3 rounded-[var(--r-sm)] font-medium flex justify-center items-center gap-2 text-[13px] transition-colors border",
                        simulationState === "running" ? "bg-[var(--success-soft)] text-[var(--success)] border-[var(--success)]/30" : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--glass-border)] hover:bg-[var(--muted)]"
                     )}>
                     <PlaySquare className="w-4 h-4" /> Ejecutando
                  </button>
                  <button 
                     onClick={() => setSimulationState("paused")}
                     className={cn(
                        "py-3 rounded-[var(--r-sm)] font-medium flex justify-center items-center gap-2 text-[13px] transition-colors border",
                        simulationState === "paused" ? "bg-[var(--danger-soft)] text-[var(--danger)] border-[var(--danger)]/30" : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--glass-border)] hover:bg-[var(--muted)]"
                     )}>
                     <PauseCircle className="w-4 h-4" /> Pausar
                  </button>
               </div>
            </GlassCard>

            <GlassCard className="p-6">
               <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[var(--accent)]" /> 
                  Inyector de Crisis (Mercado Macro)
               </h3>
               <p className="text-[12px] text-[var(--text-secondary)] mb-4 leading-relaxed">
                  Activa eventos globales que afectan instantáneamente los modelos matemáticos de todos los equipos.
               </p>

               <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 border border-[var(--glass-border)] rounded-[var(--r-md)] hover:bg-[var(--surface)] transition-colors cursor-pointer">
                     <span className="text-[13px] font-medium text-[var(--text-primary)]">Inflación Abrupta (+8%)</span>
                     <div className="w-10 h-5 bg-[var(--muted)] rounded-full relative shadow-inner">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                     </div>
                  </label>
                  
                  <label className="flex items-center justify-between p-3 border border-[var(--accent)]/30 bg-[var(--accent-soft)]/20 rounded-[var(--r-md)] hover:bg-[var(--accent-soft)]/40 transition-colors cursor-pointer">
                     <span className="text-[13px] font-medium text-[var(--accent)]">Huelga de Transportistas</span>
                     <div className="w-10 h-5 bg-[var(--accent)] rounded-full relative shadow-inner">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                     </div>
                  </label>

                  <label className="flex items-center justify-between p-3 border border-[var(--glass-border)] rounded-[var(--r-md)] hover:bg-[var(--surface)] transition-colors cursor-pointer">
                     <span className="text-[13px] font-medium text-[var(--text-primary)]">Boom Tecnológico</span>
                     <div className="w-10 h-5 bg-[var(--muted)] rounded-full relative shadow-inner">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                     </div>
                  </label>
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}
