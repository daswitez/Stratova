"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard, StatusBadge } from "@/components/GlassComponents";
import { decisionModules } from "@/data/mockData";
import { ArrowRight, Lock, Save, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DecisionsPage() {
  const [activeModule, setActiveModule] = useState("market");
  const [justification, setJustification] = useState("");
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const currentModule = decisionModules.find(m => m.id === activeModule)!;
  const canSubmit = decisionModules.every(m => m.status !== "pending");

  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)]">
          Centro de Decisiones
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Análisis y toma de decisiones por módulo
        </p>
      </motion.div>

      {/* Module Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {decisionModules.map((module) => (
          <motion.button
            key={module.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModule(module.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-[var(--r-md)] border transition-all whitespace-nowrap",
              activeModule === module.id
                ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-[var(--shadow-md)]"
                : "bg-[var(--glass)] border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent)]"
            )}
          >
            <span className="text-[14px] font-medium">{module.name}</span>
            <StatusBadge status={module.status} size="sm" />
          </motion.button>
        ))}
      </div>

      {/* Decision Form */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <GlassCard className="p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-semibold text-[var(--text-primary)]">
                  {currentModule.name}
                </h2>
                <StatusBadge status={currentModule.status} />
              </div>

              <div className="space-y-4">
                {currentModule.decisions.map((decision) => (
                  <div key={decision.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[14px] font-medium text-[var(--text-primary)]">
                        {decision.label}
                      </label>
                      {decision.unit && (
                        <span className="text-[12px] text-[var(--text-tertiary)]">
                          {decision.unit}
                        </span>
                      )}
                    </div>
                    
                    {Array.isArray(decision.value) ? (
                      <div className="flex flex-wrap gap-2">
                        {decision.options?.map((option) => (
                          <button
                            key={option}
                            className={cn(
                              "px-4 py-2 rounded-[var(--r-sm)] text-[13px] transition-all",
                              decision.value.includes(option)
                                ? "bg-[var(--accent)] text-white"
                                : "bg-[var(--muted)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]"
                            )}
                            disabled={currentModule.status === "locked"}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="number"
                          defaultValue={decision.value as number}
                          min={decision.min}
                          max={decision.max}
                          readOnly={currentModule.status === "locked"}
                          className={cn(
                            "w-full px-4 py-3 rounded-[var(--r-md)] border border-[var(--glass-border)]",
                            "bg-[var(--surface)] text-[var(--text-primary)] font-['JetBrains_Mono']",
                            "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        />
                        {(decision.min !== undefined || decision.max !== undefined) && (
                          <p className="text-[11px] text-[var(--text-tertiary)] mt-1">
                            Rango: {decision.min?.toLocaleString()} - {decision.max?.toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Impact tag */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {decision.id === "price" && (
                        <span className="text-[11px] px-2 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                          Afecta: Demanda, Ingresos
                        </span>
                      )}
                      {decision.id === "marketing" && (
                        <span className="text-[11px] px-2 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                          Afecta: Market Share, Caja
                        </span>
                      )}
                      {decision.id === "investment" && (
                        <span className="text-[11px] px-2 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                          Afecta: Caja, Capacidad Futura
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {currentModule.status !== "locked" && (
                <div className="flex gap-3 pt-4 border-t border-[var(--glass-border)]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-[var(--r-pill)] bg-[var(--muted)] text-[var(--text-primary)] text-[14px] font-medium transition-colors hover:bg-[var(--accent-soft)]"
                  >
                    <Save className="w-4 h-4" />
                    Guardar borrador
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-[var(--r-pill)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors"
                  >
                    Confirmar decisiones del módulo
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}

              {currentModule.status === "locked" && (
                <div className="flex items-center gap-3 p-4 rounded-[var(--r-md)] bg-[var(--muted)] text-[var(--text-secondary)]">
                  <Lock className="w-5 h-5" />
                  <span className="text-[13px]">
                    Decisiones bloqueadas hasta el cierre del ciclo
                  </span>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Strategic Justification */}
          <GlassCard className="p-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
                  Justificación Estratégica
                </h3>
                <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                  Explica el razonamiento detrás de tus decisiones (evaluable con IA)
                </p>
              </div>

              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Describe la estrategia del equipo, análisis de mercado, supuestos y objetivos..."
                className="w-full h-32 px-4 py-3 rounded-[var(--r-md)] border border-[var(--glass-border)] bg-[var(--surface)] text-[var(--text-primary)] text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent placeholder:text-[var(--text-tertiary)]"
                disabled={currentModule.status === "locked"}
              />
            </div>
          </GlassCard>
        </div>

        {/* Impact Panel */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <div className="space-y-4">
              <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
                Impacto Estimado
              </h3>

              <div className="space-y-3">
                {[
                  { label: "Ingresos Proyectados", value: "+8.5%", trend: "up" },
                  { label: "Costos Totales", value: "+3.2%", trend: "up" },
                  { label: "Margen Neto", value: "+2.1pp", trend: "up" },
                  { label: "Liquidez", value: "-0.3x", trend: "down" },
                  { label: "Market Share", value: "+0.8pp", trend: "up" }
                ].map((impact) => (
                  <div key={impact.label} className="flex items-center justify-between text-[13px]">
                    <span className="text-[var(--text-secondary)]">{impact.label}</span>
                    <span
                      className={cn(
                        "font-['JetBrains_Mono'] font-medium",
                        impact.trend === "up" ? "text-[var(--success)]" : "text-[var(--warning)]"
                      )}
                    >
                      {impact.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[var(--glass-border)]">
                <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
                  Estos son estimados basados en el modelo de simulación y pueden variar según eventos externos
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="space-y-4">
              <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
                Recomendación IA
              </h3>
              <div className="space-y-2">
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  Basado en tu estrategia actual y las condiciones del mercado, considera:
                </p>
                <ul className="space-y-2 text-[12px] text-[var(--text-secondary)] list-disc list-inside">
                  <li>Aumentar inversión en marketing para capturar mayor participación</li>
                  <li>Monitorear liquidez ante incremento de inversiones</li>
                  <li>Evaluar impacto de nueva regulación laboral en costos</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Submit Bar */}
      {!showSubmitConfirm && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="sticky bottom-8 left-0 right-0"
        >
          <GlassCard className="p-6 mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-[var(--text-primary)]">
                  ¿Listo para enviar todas las decisiones?
                </p>
                <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                  Una vez enviadas, las decisiones quedarán bloqueadas hasta el cierre del ciclo
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSubmitConfirm(true)}
                disabled={!canSubmit}
                className={cn(
                  "flex items-center gap-2 px-8 py-4 rounded-[var(--r-pill)] text-[15px] font-medium transition-all",
                  canSubmit
                    ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-[var(--shadow-md)]"
                    : "bg-[var(--muted)] text-[var(--text-tertiary)] cursor-not-allowed"
                )}
              >
                <Send className="w-5 h-5" />
                Enviar decisiones
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowSubmitConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <GlassCard className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-[20px] font-semibold text-[var(--text-primary)]">
                  Confirmar envío
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  Al enviar, tus decisiones quedarán bloqueadas hasta el cierre del ciclo. 
                  No podrás modificarlas después de confirmar.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 px-6 py-3 rounded-[var(--r-pill)] bg-[var(--muted)] text-[var(--text-primary)] text-[14px] font-medium transition-colors hover:bg-[var(--accent-soft)]"
                >
                  Cancelar
                </button>
                <button
                  className="flex-1 px-6 py-3 rounded-[var(--r-pill)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors"
                >
                  Confirmar envío
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
