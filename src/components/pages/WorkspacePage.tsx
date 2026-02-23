"use client";

import { motion } from "motion/react";
import { GlassCard, KPIStatCard, AlertRibbon } from "@/components/GlassComponents";
import { kpiData, alerts, teamData, decisionModules } from "@/data/mockData";
import { ArrowRight, CheckCircle, Clock, AlertCircle } from "lucide-react";
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
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)]">
          Workspace Ejecutivo
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Panel de control y métricas clave para {teamData.name}
        </p>
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
