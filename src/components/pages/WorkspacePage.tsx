"use client";

import { motion } from "motion/react";
import { GlassCard, KPIStatCard, AlertRibbon } from "@/components/GlassComponents";
import { kpiData, alerts, teamData, decisionModules, currentCycle } from "@/data/mockData";
import { ArrowRight, CheckCircle, Clock, AlertCircle, Trophy, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function WorkspacePage() {
  const completedModules = decisionModules.filter(m => m.status === "submitted").length;
  const totalModules = decisionModules.length;

  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)] tracking-tight">
          Workspace Ejecutivo
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Panel de control y métricas clave para {teamData.name}
        </p>
      </motion.div>

      {/* Giant Countdown Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative overflow-hidden rounded-[24px] border border-[var(--glass-border)] bg-gradient-to-br from-[var(--glass)] to-[var(--accent-soft)] backdrop-blur-2xl p-8 shadow-[var(--shadow-lg)] group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[120px] opacity-10 translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700" />
          
          <div className="relative flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-white text-[12px] font-medium tracking-wide">
                  {currentCycle.name.toUpperCase()}
                </span>
                <span className="flex items-center gap-2 text-[14px] font-medium text-[var(--text-secondary)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]"></span>
                  </span>
                  Recibiendo decisiones
                </span>
              </div>
              
              <h2 className="text-[48px] md:text-[56px] font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight">
                Cierre en <span className="font-['JetBrains_Mono'] text-[var(--accent)]">{currentCycle.timeRemaining}</span>
              </h2>
              
              <p className="text-[15px] text-[var(--text-secondary)] max-w-xl leading-relaxed">
                El motor de simulación procesará las estrategias al finalizar. Actualmente tu equipo ha completado <span className="font-medium text-[var(--text-primary)]">{completedModules} de {totalModules}</span> módulos obligatorios.
              </p>
            </div>
            
            {/* Quick Summary of last round */}
            <div className="w-[340px] bg-white/40 dark:bg-black/20 rounded-[16px] p-5 border border-white/20 dark:border-white/5 backdrop-blur-md shadow-sm">
              <h3 className="text-[13px] font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[var(--accent)]" />
                Resumen Ciclo Anterior
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center group/kpi">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[var(--success-soft)] flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5 text-[var(--success)]" />
                    </div>
                    <span className="text-[14px] text-[var(--text-primary)] font-medium">Rentabilidad</span>
                  </div>
                  <span className="text-[14px] font-['JetBrains_Mono'] text-[var(--success)] group-hover:scale-110 transition-transform cursor-default">+2.3%</span>
                </div>
                
                <div className="flex justify-between items-center group/kpi">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[var(--success-soft)] flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5 text-[var(--success)]" />
                    </div>
                    <span className="text-[14px] text-[var(--text-primary)] font-medium">Cuota Mrc.</span>
                  </div>
                  <span className="text-[14px] font-['JetBrains_Mono'] text-[var(--success)] group-hover:scale-110 transition-transform cursor-default">+1.2%</span>
                </div>
                
                <div className="h-px w-full bg-black/5 dark:bg-white/5" />
                
                <div className="flex justify-between items-end">
                  <span className="text-[12px] text-[var(--text-tertiary)]">Posición Actual</span>
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[var(--warning)]" />
                    <span className="text-[18px] font-bold text-[var(--text-primary)]">#2</span>
                    <span className="text-[12px] font-medium text-[var(--success)] ml-1">↑ 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-3 gap-6">
        {kpiData.slice(0, 6).map((kpi, index) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <KPIStatCard
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              delta={kpi.delta}
              trend={kpi.trend}
              status={kpi.status}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Alerts Section */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
            Alertas Críticas
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertRibbon
                key={alert.id}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                module={alert.module}
              />
            ))}
          </div>
        </div>

        {/* Team Progress */}
        <GlassCard className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
              Progreso del Equipo
            </h3>
            <p className="text-[13px] text-[var(--text-secondary)]">
              {completedModules} de {totalModules} módulos completados
            </p>
          </div>

          <div className="space-y-3">
            {decisionModules.map((module) => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[var(--text-primary)]">
                    {module.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {module.status === "submitted" ? (
                      <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                    ) : module.status === "draft" ? (
                      <Clock className="w-4 h-4 text-[var(--accent)]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[var(--text-tertiary)]" />
                    )}
                  </div>
                </div>
                <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full",
                      module.status === "submitted" ? "bg-[var(--success)]" :
                      module.status === "draft" ? "bg-[var(--accent)]" :
                      "bg-[var(--text-tertiary)]"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link href="/decisions">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 rounded-[var(--r-pill)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors flex items-center justify-center gap-2"
            >
              Centro de Decisiones
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </GlassCard>
      </div>

      {/* Module Summary Grid */}
      <div className="space-y-4">
        <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
          Resumen por Módulo
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {decisionModules.map((module) => (
            <Link key={module.id} href={`/${module.id}`}>
              <GlassCard hover className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-medium text-[var(--text-primary)]">
                    {module.name}
                  </h3>
                  {module.status === "submitted" ? (
                    <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                  ) : module.status === "draft" ? (
                    <Clock className="w-5 h-5 text-[var(--accent)]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[var(--text-tertiary)]" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[12px]">
                    <span className="text-[var(--text-secondary)]">Progreso</span>
                    <span className="font-['JetBrains_Mono'] text-[var(--text-primary)]">
                      {module.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent)] rounded-full"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[12px] text-[var(--accent)] font-medium">
                  Abrir módulo
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
