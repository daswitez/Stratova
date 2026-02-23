"use client";

import { motion } from "motion/react";
import { GlassCard } from "@/components/GlassComponents";
import { rankingData } from "@/data/mockData";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RankingPage() {
  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)]">
          Ranking de Equipos
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Posición competitiva y comparación de desempeño
        </p>
      </motion.div>

      {/* Ranking Table */}
      <GlassCard className="overflow-hidden">
        <div className="p-6 border-b border-[var(--glass-border)]">
          <div className="grid grid-cols-5 gap-4 text-[12px] font-medium text-[var(--text-secondary)]">
            <div className="col-span-1">Posición</div>
            <div className="col-span-1">Equipo</div>
            <div>Puntaje General</div>
            <div>Rentabilidad</div>
            <div>Market Share</div>
          </div>
        </div>

        <div className="divide-y divide-[var(--glass-border)]">
          {rankingData.map((team, index) => {
            const isCurrentTeam = team.team === "Equipo Alpha";
            
            return (
              <motion.div
                key={team.team}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={cn(
                  "grid grid-cols-5 gap-4 p-6 hover:bg-[var(--muted)] transition-colors",
                  isCurrentTeam && "bg-[var(--accent-soft)]"
                )}
              >
                <div className="col-span-1 flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-['JetBrains_Mono'] text-[16px] font-semibold",
                      team.rank === 1 && "bg-[#FFD700] text-[#8B6914]",
                      team.rank === 2 && "bg-[#C0C0C0] text-[#666666]",
                      team.rank === 3 && "bg-[#CD7F32] text-white",
                      team.rank > 3 && "bg-[var(--muted)] text-[var(--text-secondary)]"
                    )}
                  >
                    {team.rank === 1 && <Trophy className="w-5 h-5" />}
                    {team.rank !== 1 && team.rank}
                  </div>
                  {team.change !== 0 && (
                    <div
                      className={cn(
                        "flex items-center text-[11px] font-medium",
                        team.change > 0 ? "text-[var(--success)]" : "text-[var(--danger)]"
                      )}
                    >
                      {team.change > 0 ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  )}
                </div>

                <div className="col-span-1">
                  <p className={cn(
                    "text-[14px] font-medium",
                    isCurrentTeam ? "text-[var(--accent)]" : "text-[var(--text-primary)]"
                  )}>
                    {team.team}
                  </p>
                </div>

                <div>
                  <p className="font-['JetBrains_Mono'] text-[16px] font-semibold text-[var(--text-primary)]">
                    {team.score.toFixed(1)}
                  </p>
                  <p className="text-[11px] text-[var(--text-tertiary)]">puntos</p>
                </div>

                <div>
                  <p className="font-['JetBrains_Mono'] text-[14px] text-[var(--text-primary)]">
                    {team.profitability.toFixed(1)}%
                  </p>
                </div>

                <div>
                  <p className="font-['JetBrains_Mono'] text-[14px] text-[var(--text-primary)]">
                    {team.marketShare.toFixed(1)}%
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Performance Comparison */}
      <div className="grid grid-cols-3 gap-6">
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
            Tu Posición
          </h3>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="font-['JetBrains_Mono'] text-[40px] font-semibold text-[var(--accent)]">
                2
              </span>
              <span className="text-[14px] text-[var(--text-tertiary)]">de 5 equipos</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--success)]">
              <TrendingUp className="w-4 h-4" />
              <span>Subiste 1 posición</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 space-y-4">
          <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
            Distancia al Líder
          </h3>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="font-['JetBrains_Mono'] text-[40px] font-semibold text-[var(--text-primary)]">
                4.5
              </span>
              <span className="text-[14px] text-[var(--text-tertiary)]">puntos</span>
            </div>
            <p className="text-[12px] text-[var(--text-secondary)]">
              Mejora en eficiencia y market share para alcanzar el liderazgo
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-6 space-y-4">
          <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
            Promedio de Cohorte
          </h3>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="font-['JetBrains_Mono'] text-[40px] font-semibold text-[var(--text-primary)]">
                86.8
              </span>
              <span className="text-[14px] text-[var(--text-tertiary)]">puntos</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--success)]">
              <TrendingUp className="w-4 h-4" />
              <span>3.3% por encima</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
