"use client";

import { motion } from "motion/react";
import { GlassCard } from "@/components/GlassComponents";
import { rankingData } from "@/data/mockData";
import { Trophy, TrendingUp, TrendingDown, Medal, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RankingPage() {
  const top3 = rankingData.slice(0, 3).sort((a, b) => a.rank - b.rank);
  const others = rankingData.slice(3);

  return (
    <div className="max-w-[1320px] mx-auto space-y-12">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2 text-center pt-4"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)]">
          Ranking Global
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Posición competitiva final y resultados acumulados del simulador
        </p>
      </motion.div>

      {/* Visual Podium */}
      <div className="flex justify-center items-end gap-6 h-[280px] mt-8 mb-16">
        
        {/* 2nd Place */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="mb-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E0E0E0] to-[#A0A0A0] flex items-center justify-center text-white shadow-lg border-2 border-white/20 z-10">
               <span className="font-bold text-[18px]">2</span>
            </div>
            <h3 className="text-[15px] font-medium text-[var(--text-primary)] mt-3">
              {top3[1]?.team || "---"}
            </h3>
            <p className="font-['JetBrains_Mono'] text-[14px] font-semibold text-[var(--text-secondary)]">
              {top3[1]?.score.toFixed(1)} pts
            </p>
          </div>
          <div className="w-[140px] h-[140px] bg-gradient-to-t from-[#B0B0B0]/40 to-[#E0E0E0]/20 rounded-t-xl border border-b-0 border-[#C0C0C0]/30 backdrop-blur-sm relative overflow-hidden flex flex-col items-center justify-start pt-4">
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
             <p className="text-[11px] text-[#A0A0A0] uppercase tracking-wider font-semibold">Plata</p>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="flex flex-col items-center z-20"
        >
          <div className="mb-4 flex flex-col items-center relative">
            <motion.div 
               animate={{ rotate: [0, 5, -5, 0] }}
               transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
               className="absolute -top-8 text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
            >
               <Trophy className="w-8 h-8" fill="currentColor" />
            </motion.div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFE866] to-[#D4AF37] flex items-center justify-center text-[#5C4000] shadow-[0_0_30px_rgba(212,175,55,0.4)] border-2 border-white/30 z-10 mt-2">
               <span className="font-bold text-[24px]">1</span>
            </div>
            <h3 className="text-[18px] font-bold text-[var(--text-primary)] mt-3">
              {top3[0]?.team || "---"}
            </h3>
            <p className="font-['JetBrains_Mono'] text-[16px] font-bold text-[var(--accent)]">
              {top3[0]?.score.toFixed(1)} pts
            </p>
          </div>
          <div className="w-[160px] h-[180px] bg-gradient-to-t from-[#D4AF37]/40 to-[#FFE866]/20 rounded-t-xl border border-b-0 border-[#D4AF37]/40 backdrop-blur-md relative overflow-hidden flex flex-col items-center justify-start pt-6 shadow-[0_-10px_40px_rgba(212,175,55,0.15)]">
             <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
             <p className="text-[12px] text-[#D4AF37] uppercase tracking-wider font-bold drop-shadow-sm">Oro</p>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="mb-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E2A677] to-[#B06D3E] flex items-center justify-center text-white shadow-lg border-2 border-white/20 z-10">
               <span className="font-bold text-[18px]">3</span>
            </div>
            <h3 className="text-[15px] font-medium text-[var(--text-primary)] mt-3">
              {top3[2]?.team || "---"}
            </h3>
            <p className="font-['JetBrains_Mono'] text-[14px] font-semibold text-[var(--text-secondary)]">
              {top3[2]?.score.toFixed(1)} pts
            </p>
          </div>
          <div className="w-[140px] h-[110px] bg-gradient-to-t from-[#B06D3E]/40 to-[#E2A677]/20 rounded-t-xl border border-b-0 border-[#CD7F32]/30 backdrop-blur-sm relative overflow-hidden flex flex-col items-center justify-start pt-4">
             <p className="text-[11px] text-[#C07030] uppercase tracking-wider font-semibold shadow-sm">Bronce</p>
          </div>
        </motion.div>

      </div>

      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-8">
            {/* Full Ranking Table */}
            <GlassCard className="overflow-hidden">
               <div className="p-5 border-b border-[var(--glass-border)] bg-[var(--surface)]">
                  <h2 className="text-[16px] font-medium text-[var(--text-primary)] font-['Inter']">Tabla de Posiciones</h2>
               </div>
               <div className="p-4 border-b border-[var(--glass-border)] bg-[var(--surface)]/50">
               <div className="grid grid-cols-5 gap-4 text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)] px-2">
                  <div className="col-span-1">Posición</div>
                  <div className="col-span-1">Equipo</div>
                  <div>Puntaje</div>
                  <div>Rentabilidad</div>
                  <div>Share</div>
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
                     transition={{ delay: 0.5 + (index * 0.05) }}
                     className={cn(
                        "grid grid-cols-5 gap-4 p-5 hover:bg-[var(--muted)] transition-colors items-center",
                        isCurrentTeam ? "bg-[var(--accent-soft)]/50 relative overflow-hidden" : ""
                     )}
                     >
                     {isCurrentTeam && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)]" />}
                     
                     <div className="col-span-1 flex items-center gap-3 pl-2">
                        <div
                           className={cn(
                           "w-8 h-8 rounded-full flex items-center justify-center font-['JetBrains_Mono'] text-[13px] font-bold border",
                           team.rank === 1 && "bg-[#FFEF99] text-[#8B6914] border-[#D4AF37]",
                           team.rank === 2 && "bg-[#F0F0F0] text-[#666666] border-[#B0B0B0]",
                           team.rank === 3 && "bg-[#F5D0B5] text-[#A0522D] border-[#CD7F32]",
                           team.rank > 3 && "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--glass-border)]"
                           )}
                        >
                           {team.rank}
                        </div>
                        {team.change !== 0 && (
                           <div
                           className={cn(
                              "flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded-full",
                              team.change > 0 ? "bg-[var(--success-soft)] text-[var(--success)]" : "bg-[var(--danger-soft)] text-[var(--danger)]"
                           )}
                           >
                           {team.change > 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                           {Math.abs(team.change)}
                           </div>
                        )}
                     </div>

                     <div className="col-span-1">
                        <p className={cn(
                           "text-[14px] font-medium",
                           isCurrentTeam ? "text-[var(--accent)] font-bold" : "text-[var(--text-primary)]"
                        )}>
                           {team.team}
                           {isCurrentTeam && <span className="ml-2 text-[10px] bg-[var(--accent)] text-white px-1.5 py-0.5 rounded-full">TÚ</span>}
                        </p>
                     </div>

                     <div>
                        <p className="font-['JetBrains_Mono'] text-[15px] font-semibold text-[var(--text-primary)]">
                           {team.score.toFixed(1)}
                        </p>
                     </div>

                     <div>
                        <p className="font-['JetBrains_Mono'] text-[14px] text-[var(--text-secondary)]">
                           {team.profitability.toFixed(1)}%
                        </p>
                     </div>

                     <div>
                        <p className="font-['JetBrains_Mono'] text-[14px] text-[var(--text-secondary)]">
                           {team.marketShare.toFixed(1)}%
                        </p>
                     </div>
                     </motion.div>
                  );
               })}
               </div>
            </GlassCard>
         </div>

         <div className="col-span-4 space-y-6">
            {/* Performance Comparison */}
            <GlassCard className="p-6 space-y-4 border-t-4 border-t-[var(--accent)] bg-gradient-to-b from-[var(--accent-soft)]/30 to-transparent">
               <div className="flex justify-between items-start">
                  <h3 className="text-[16px] font-medium text-[var(--text-primary)]">
                  Tu Posición
                  </h3>
                  <div className="p-2 bg-[var(--surface)] rounded-full shadow-sm">
                     <Star className="w-4 h-4 text-[var(--accent)]" />
                  </div>
               </div>
               <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                  <span className="font-['JetBrains_Mono'] text-[46px] font-bold text-[var(--accent)] leading-none">
                     2<span className="text-[20px] text-[var(--text-tertiary)] font-normal ml-1">/ 5</span>
                  </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[var(--success)] font-medium mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Subiste 1 posición frente al C1</span>
                  </div>
               </div>
            </GlassCard>

            <GlassCard className="p-6 space-y-4">
               <h3 className="text-[15px] font-medium text-[var(--text-secondary)]">
                  Brecha con el Líder
               </h3>
               <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                  <span className="font-['JetBrains_Mono'] text-[32px] font-semibold text-[var(--text-primary)] leading-none">
                     4.5
                  </span>
                  <span className="text-[13px] text-[var(--text-tertiary)]">puntos</span>
                  </div>
                  <div className="w-full bg-[var(--muted)] h-1.5 rounded-full overflow-hidden mt-3">
                     <div className="bg-[var(--accent)] h-full w-[85%] rounded-full"></div>
                  </div>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-2 leading-relaxed pt-2">
                  Estás a un <strong>85%</strong> de presionar al líder. Optimiza tu C.O.G.S. para cerrar el gap de rentabilidad.
                  </p>
               </div>
            </GlassCard>

            <GlassCard className="p-6 space-y-4">
               <h3 className="text-[15px] font-medium text-[var(--text-secondary)]">
                  Promedio de la Industria
               </h3>
               <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                  <span className="font-['JetBrains_Mono'] text-[32px] font-semibold text-[var(--text-primary)] leading-none">
                     86.8
                  </span>
                  <span className="text-[13px] text-[var(--text-tertiary)]">puntos</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[var(--success)] bg-[var(--success-soft)] px-2 py-1 rounded inline-flex mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="font-medium">+3.3% vs Promedio</span>
                  </div>
               </div>
            </GlassCard>
         </div>
      </div>

    </div>
  );
}
