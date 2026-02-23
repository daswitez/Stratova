"use client";

import { motion } from "motion/react";
import { GlassCard } from "@/components/GlassComponents";
import { studentUser, currentCycle } from "@/data/mockData";
import { User, Mail, Building2, Briefcase, Calendar, Trophy } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)]">
          Perfil del Usuario
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Información personal y estadísticas de desempeño
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="col-span-1">
          <GlassCard className="p-8">
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/70 flex items-center justify-center text-white text-[32px] font-semibold mb-4">
                  {studentUser.avatar}
                </div>
                <h2 className="text-[20px] font-semibold text-[var(--text-primary)]">
                  {studentUser.name}
                </h2>
                <p className="text-[14px] text-[var(--text-secondary)] mt-1">
                  {studentUser.role}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[var(--glass-border)]">
                <div className="flex items-center gap-3 text-[13px]">
                  <Mail className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[var(--text-secondary)]">{studentUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-[13px]">
                  <Building2 className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[var(--text-secondary)]">{studentUser.institution}</span>
                </div>
                <div className="flex items-center gap-3 text-[13px]">
                  <Briefcase className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[var(--text-secondary)]">{studentUser.team}</span>
                </div>
                <div className="flex items-center gap-3 text-[13px]">
                  <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[var(--text-secondary)]">{studentUser.cohort}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Stats & Performance */}
        <div className="col-span-2 space-y-6">
          <GlassCard className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-[18px] font-medium text-[var(--text-primary)]">
                  Estadísticas de Simulación
                </h3>
                <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                  Desempeño en {currentCycle.name}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[var(--accent)]" />
                    <p className="text-[12px] text-[var(--text-tertiary)]">Posición Actual</p>
                  </div>
                  <p className="font-['JetBrains_Mono'] text-[32px] font-semibold text-[var(--text-primary)]">
                    #2
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)]">de 5 equipos</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[12px] text-[var(--text-tertiary)]">Ciclos Completados</p>
                  <p className="font-['JetBrains_Mono'] text-[32px] font-semibold text-[var(--text-primary)]">
                    {currentCycle.number - 1}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)]">de {currentCycle.totalCycles}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[12px] text-[var(--text-tertiary)]">Decisiones Enviadas</p>
                  <p className="font-['JetBrains_Mono'] text-[32px] font-semibold text-[var(--text-primary)]">
                    12
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)]">100% a tiempo</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="space-y-4">
              <h3 className="text-[18px] font-medium text-[var(--text-primary)]">
                Roles en Simulaciones
              </h3>
              
              <div className="space-y-3">
                <div className="p-4 rounded-[var(--r-md)] bg-[var(--accent-soft)] border-l-2 border-[var(--accent)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-medium text-[var(--text-primary)]">
                        {studentUser.cohort}
                      </p>
                      <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                        {studentUser.role} · {studentUser.team}
                      </p>
                    </div>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-[var(--success-soft)] text-[var(--success)]">
                      En Progreso
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-[var(--r-md)] bg-[var(--muted)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-medium text-[var(--text-primary)]">
                        MBA 2025 - Simulación Empresarial
                      </p>
                      <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                        Gerente de Marketing · Equipo Delta
                      </p>
                    </div>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-[var(--text-tertiary)]/10 text-[var(--text-secondary)]">
                      Completado
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[var(--glass-border)] flex gap-4 text-[11px]">
                    <span className="text-[var(--text-tertiary)]">Posición Final: #3</span>
                    <span className="text-[var(--text-tertiary)]">Puntaje: 84.2</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="space-y-4">
              <h3 className="text-[18px] font-medium text-[var(--text-primary)]">
                Logros y Badges
              </h3>
              
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: "🏆", name: "Top 3", desc: "Alcanzar top 3 en una simulación" },
                  { icon: "📈", name: "Crecimiento", desc: "Aumentar market share +5%" },
                  { icon: "💎", name: "Eficiencia", desc: "Lograr 85%+ eficiencia" },
                  { icon: "⚡", name: "Puntual", desc: "100% decisiones a tiempo" },
                ].map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-[var(--r-md)] bg-gradient-to-br from-[var(--accent-soft)] to-transparent border border-[var(--accent)]/20 text-center"
                  >
                    <div className="text-[32px] mb-2">{badge.icon}</div>
                    <p className="text-[12px] font-medium text-[var(--text-primary)]">
                      {badge.name}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-1">
                      {badge.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
