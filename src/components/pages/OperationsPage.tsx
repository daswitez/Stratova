"use client";

import { motion } from "motion/react";
import { GlassCard, KPIStatCard } from "@/components/GlassComponents";
import { Settings, Package, Truck, AlertTriangle, Zap, Wrench } from "lucide-react";

export default function OperationsPage() {
  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)]">
          Módulo Operaciones y Logística
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Gestión de capacidad instalada, inventarios y cadena de suministro
        </p>
      </motion.div>

      {/* Production KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPIStatCard
          title="Capacidad de Producción"
          value={85000}
          unit="uds/mes"
          status="success"
          trend="up"
          delta={2.5}
        />
        <KPIStatCard
          title="Ocupación de Planta"
          value={92.4}
          unit="%"
          status="warning"
          trend="up"
          delta={4.1}
        />
        <KPIStatCard
          title="Inventario Terminado"
          value={12400}
          unit="uds"
          status="danger"
          trend="down"
          delta={15.2}
        />
        <KPIStatCard
          title="Costo Unitario Prod."
          value={45.20}
          unit="$"
          status="success"
          trend="down"
          delta={1.5}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
         {/* Production Line Control */}
         <GlassCard className="col-span-8 p-6 space-y-6">
            <div className="flex justify-between items-center">
               <div>
                  <h2 className="text-[18px] font-medium text-[var(--text-primary)] flex items-center gap-2">
                     <Settings className="w-5 h-5 text-[var(--accent)]" />
                     Control de Línea de Ensamblaje
                  </h2>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                     Asignación de turnos y mantenimiento preventivo
                  </p>
               </div>
               <button className="px-4 py-2 bg-[var(--accent)] text-white text-[13px] font-medium rounded-[var(--r-md)] hover:bg-[var(--accent-hover)] transition-colors">
                  Añadir Turno Extra
               </button>
            </div>

            <div className="space-y-4">
               {/* Line 1 */}
               <div className="p-4 rounded-[var(--r-md)] border border-[var(--glass-border)] bg-[var(--surface)] hover:bg-[var(--muted)]/50 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                     <span className="font-medium text-[var(--text-primary)] flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[var(--warning)]" />
                        Línea Automatizada A
                     </span>
                     <span className="text-[11px] px-2 py-0.5 rounded text-[var(--success)] bg-[var(--success-soft)] font-medium">98% Eficiencia</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                     <div className="h-full bg-[var(--success)] w-[98%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-[12px] text-[var(--text-secondary)]">
                     <span>Producción: 45,000 uds/m</span>
                     <span>Mantenimiento en: 14 días</span>
                  </div>
               </div>

               {/* Line 2 */}
               <div className="p-4 rounded-[var(--r-md)] border border-[var(--glass-border)] bg-[var(--surface)] hover:bg-[var(--muted)]/50 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                     <span className="font-medium text-[var(--text-primary)] flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-[var(--accent)]" />
                        Línea Manual B
                     </span>
                     <span className="text-[11px] px-2 py-0.5 rounded text-[var(--warning)] bg-[var(--warning-soft)] font-medium">76% Eficiencia</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                     <div className="h-full bg-[var(--warning)] w-[76%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-[12px] text-[var(--text-secondary)]">
                     <span>Producción: 22,000 uds/m</span>
                     <span className="text-[var(--danger)]">Requiere ajustes de UI/UX ergonómicos</span>
                  </div>
               </div>
            </div>
         </GlassCard>

         {/* Inventory & Supply Chain */}
         <div className="col-span-4 space-y-6 flex flex-col h-full">
            <GlassCard className="p-6 flex-1 border-t-4 border-t-[var(--accent)]">
               <h3 className="text-[16px] font-medium text-[var(--text-primary)] flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-[var(--accent)]" />
                  Materia Prima
               </h3>
               
               <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                     <div className="flex justify-between text-[13px]">
                        <span className="text-[var(--text-secondary)]">Silicio y Semiconductores</span>
                        <span className="font-medium text-[var(--text-primary)]">14 Ton</span>
                     </div>
                     <div className="w-full h-1.5 bg-[var(--danger-soft)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--danger)] w-[15%] rounded-full"></div>
                     </div>
                     <span className="text-[10px] text-[var(--danger)] mt-0.5 ml-1">Stock Crítico (3 días de prod.)</span>
                  </div>

                  <div className="flex flex-col gap-1">
                     <div className="flex justify-between text-[13px]">
                        <span className="text-[var(--text-secondary)]">Materiales de Ensamblaje</span>
                        <span className="font-medium text-[var(--text-primary)]">42 Ton</span>
                     </div>
                     <div className="w-full h-1.5 bg-[var(--success-soft)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--success)] w-[65%] rounded-full"></div>
                     </div>
                  </div>
               </div>

               <button className="w-full py-2.5 mt-6 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors rounded-[var(--r-md)] text-[13px] font-medium flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" /> Ejecutar Pedido de Emergencia
               </button>
            </GlassCard>

            <GlassCard className="p-6 bg-gradient-to-br from-[var(--warning-soft)]/40 to-transparent border border-[var(--warning)]/20">
               <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[var(--warning)] shrink-0 mt-0.5" />
                  <div>
                     <h4 className="text-[14px] font-medium text-[var(--text-primary)]">Cuello de Botella Detectado</h4>
                     <p className="text-[12px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                        El ritmo de la Línea A excede la capacidad de empacado. Se recomienda invertir $45,000 en el módulo de empaquetado automático para el próximo trimestre.
                     </p>
                  </div>
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}
