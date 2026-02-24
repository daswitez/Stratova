"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { GlassCard, KPIStatCard } from "@/components/GlassComponents";
import { organizationalData } from "@/data/mockData";
import { Users, TrendingUp, DollarSign, AlertCircle, Briefcase, Plus, GripVertical } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from "@/lib/utils";

const initialNodes = [
  { id: '1', position: { x: 350, y: 50 }, data: { label: 'CEO / Dir. General' }, style: { background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: 'bold' } },
  { id: '2', position: { x: 150, y: 150 }, data: { label: 'Dir. Finanzas' }, style: { background: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px 20px' } },
  { id: '3', position: { x: 550, y: 150 }, data: { label: 'Dir. Operaciones' }, style: { background: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px 20px' } },
  { id: '4', position: { x: 350, y: 150 }, data: { label: 'Dir. RRHH' }, style: { background: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px 20px' } },
  { id: '5', position: { x: 550, y: 250 }, data: { label: 'Planta y Logística' }, style: { background: 'var(--glass)', color: 'var(--text-secondary)', border: '1px dashed var(--glass-border)', borderRadius: '8px', padding: '10px 20px' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'var(--accent)' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: 'var(--accent)' } },
  { id: 'e1-4', source: '1', target: '4', animated: true, style: { stroke: 'var(--accent)' } },
  { id: 'e3-5', source: '3', target: '5', style: { stroke: 'var(--text-tertiary)' } },
];

const employeesList = [
  { id: 1, name: "Carlos Mendoza", role: "Especialista Financiero", salary: 2500, avatar: "CM" },
  { id: 2, name: "Ana Torres", role: "Jefe de Planta", salary: 3200, avatar: "AT" },
  { id: 3, name: "Luis Vargas", role: "Analista de Datos", salary: 2100, avatar: "LV" },
  { id: 4, name: "Sofía Robles", role: "Coordinador de Marketing", salary: 2800, avatar: "SR" },
];

export default function HRPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hiringCount, setHiringCount] = useState(0);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'var(--accent)' } }, eds)),
    [setEdges],
  );

  const structureData = [
    { name: "Liderazgo", value: organizationalData.structure.leadership, color: "#1D4ED8" },
    { name: "Gerencia", value: organizationalData.structure.management, color: "#0E9F6E" },
    { name: "Operacional", value: organizationalData.structure.operational, color: "#B45309" },
    { name: "Soporte", value: organizationalData.structure.support, color: "#7C3AED" }
  ];

  const totalMonthlyPayroll = 1850000 / 12; // Base base approx
  const newHiresCost = hiringCount * 2500; // Estimated avg salary
  const totalProjected = totalMonthlyPayroll + newHiresCost;

  return (
    <div className="max-w-[1320px] mx-auto space-y-8">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-[32px] font-semibold text-[var(--text-primary)] tracking-tight">
          Módulo Organizacional (RRHH)
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Diseño de Estructura, Contrataciones y Simulación de Nómina
        </p>
      </motion.div>

      {/* HR KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPIStatCard
          title="Headcount Total"
          value={organizationalData.headcount + hiringCount}
          unit="personas"
          delta={5.2}
          trend="up"
          status="neutral"
        />
        <KPIStatCard
          title="Productividad Media"
          value={organizationalData.productivity}
          unit="%"
          delta={3.8}
          trend="up"
          status="success"
        />
        <KPIStatCard
          title="Costo Laboral Proyectado"
          value={totalProjected}
          unit="$"
          trend="up"
          status="warning"
        />
        <KPIStatCard
          title="Eficiencia Estructural"
          value={82.4}
          unit="pts"
          delta={1.2}
          trend="down"
          status="danger"
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Editor de Organigrama (React Flow) */}
        <GlassCard className="col-span-8 p-0 flex flex-col h-[600px] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-[var(--surface)] to-[var(--surface)]/0 pointer-events-none">
             <div className="flex items-center gap-2">
                 <Briefcase className="w-5 h-5 text-[var(--accent)]" />
                 <h2 className="text-[18px] font-medium text-[var(--text-primary)] pointer-events-auto">
                    Diseñador de Estructura (Drag & Drop)
                 </h2>
             </div>
             <p className="text-[13px] text-[var(--text-secondary)] mt-1 pointer-events-auto">
                Arrastra roles y conecta dependencias para reestructurar la empresa y optimizar ineficiencias.
             </p>
          </div>
          
          <div className="flex-1 w-full mt-12">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              attributionPosition="bottom-right"
              className="dark:bg-black/20"
            >
              <Background color="var(--glass-border)" gap={24} size={1} />
              <Controls className="fill-[var(--text-secondary)] text-white shadow-md rounded-[var(--r-md)] border-[var(--glass-border)] !bg-[var(--surface)] [&>button]:!bg-[var(--surface)] [&>button]:!border-b-[var(--glass-border)] hover:[&>button]:!bg-[var(--muted)]" />
            </ReactFlow>
          </div>
        </GlassCard>

        {/* Panel Lateral: Nómina y Empleados */}
        <div className="col-span-4 space-y-6 flex flex-col h-[600px]">
          
          {/* Calculador de Nómina */}
          <GlassCard className="p-6 border-l-4 border-l-[var(--accent)] shrink-0">
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <h3 className="text-[16px] font-medium text-[var(--text-primary)] flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[var(--accent)]" />
                      Calculador de Nómina
                   </h3>
                </div>
                
                <div className="space-y-3">
                   <div className="flex justify-between text-[13px]">
                      <span className="text-[var(--text-secondary)]">Sueldos vigentes (mensual)</span>
                      <span className="font-['JetBrains_Mono'] text-[var(--text-primary)]">${totalMonthlyPayroll.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                   </div>
                   <div className="flex justify-between text-[13px]">
                      <span className="text-[var(--text-secondary)] flex items-center gap-1">
                         <Plus className="w-3 h-3 text-[var(--warning)]" /> Proyección nuevas altas ({hiringCount})
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[var(--warning)]">${newHiresCost.toLocaleString()}</span>
                   </div>
                   <div className="h-px bg-[var(--glass-border)] w-full my-1" />
                   <div className="flex justify-between items-end">
                      <span className="text-[14px] font-medium text-[var(--text-primary)]">Gasto Est. Mes 1</span>
                      <span className="text-[20px] font-['JetBrains_Mono'] font-bold text-[var(--accent)]">
                         ${totalProjected.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                   </div>
                </div>

                {/* Simulador rápido de contratación */}
                <div className="pt-4 border-t border-[var(--glass-border)] flex items-center gap-3">
                   <button 
                     onClick={() => setHiringCount(Math.max(0, hiringCount - 1))}
                     className="w-8 h-8 rounded shrink-0 bg-[var(--muted)] hover:bg-[var(--glass-border)] flex items-center justify-center transition-colors text-[var(--text-primary)]"
                   >-</button>
                   <div className="flex-1 text-center text-[13px] text-[var(--text-secondary)] border border-[var(--glass-border)] rounded py-1.5 font-medium tracking-wide">
                      Contratar {hiringCount} pax
                   </div>
                   <button 
                     onClick={() => setHiringCount(hiringCount + 1)}
                     className="w-8 h-8 rounded shrink-0 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white flex items-center justify-center transition-colors shadow-sm"
                   >+</button>
                </div>
             </div>
          </GlassCard>

          {/* Plantilla Actual */}
          <GlassCard className="p-6 flex-1 flex flex-col overflow-hidden">
             <div className="mb-4">
                <h3 className="text-[16px] font-medium text-[var(--text-primary)] flex items-center gap-2">
                   <Users className="w-4 h-4 text-[var(--accent)]" />
                   Candidatos Sugeridos por IA
                </h3>
                <p className="text-[12px] text-[var(--text-tertiary)] mt-1">Arrastra al organigrama</p>
             </div>
             
             <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {employeesList.map((emp) => (
                   <motion.div 
                     whileHover={{ x: 2 }}
                     key={emp.id} 
                     className="p-3 rounded-[var(--r-sm)] border border-[var(--glass-border)] bg-[var(--surface)] hover:bg-[var(--muted)] cursor-grab transition-colors flex items-center gap-3 group"
                   >
                      <GripVertical className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors" />
                      <div className="w-8 h-8 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-[11px] font-bold shrink-0">
                         {emp.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                         <h4 className="text-[13px] font-medium text-[var(--text-primary)] truncate">{emp.name}</h4>
                         <p className="text-[11px] text-[var(--text-tertiary)] truncate">{emp.role}</p>
                      </div>
                      <div className="text-right shrink-0">
                         <span className="block text-[12px] font-['JetBrains_Mono'] text-[var(--text-primary)]">${emp.salary}/m</span>
                      </div>
                   </motion.div>
                ))}
             </div>
          </GlassCard>

        </div>
      </div>

       {/* Inefficiencies Detection (IA) & Static Graphs */}
       <div className="grid grid-cols-2 gap-6 mt-8">
        {/* Productivity Metrics */}
        <GlassCard className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                Desglose Estructural
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                Composición de los {organizationalData.headcount} empleados
              </p>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={structureData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {structureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--r-sm)',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* AI Inefficiencies Warning */}
        <GlassCard className="p-8 border-l-4 border-l-[var(--warning)] bg-gradient-to-br from-[var(--warning-soft)]/50 to-transparent">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--warning-soft)] flex items-center justify-center border border-[var(--warning)]/20 shadow-sm">
                <AlertCircle className="w-5 h-5 text-[var(--warning)]" />
              </div>
              <div>
                <h2 className="text-[18px] font-medium text-[var(--text-primary)]">
                  Detector de Ineficiencias (IA)
                </h2>
                <p className="text-[12px] text-[var(--warning)] font-medium">
                  {organizationalData.inefficiencies.length} alertas estructurales activas en el ciclo.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {organizationalData.inefficiencies.map((inefficiency, index) => (
                <div key={index} className="px-5 py-4 rounded-[var(--r-md)] bg-[var(--surface)] border border-[var(--glass-border)] shadow-sm">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[14px] font-semibold text-[var(--text-primary)] flex items-center gap-2">
                          <Users className="w-4 h-4 text-[var(--text-tertiary)]" />
                          {inefficiency.area}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--warning-soft)] text-[var(--warning)] font-medium uppercase tracking-wider">
                         xAI Detect
                      </span>
                   </div>
                   <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                       {inefficiency.issue}. <br/>
                       <span className="text-[var(--text-primary)] mt-1.5 inline-block font-medium">Impacto Estimado: {inefficiency.impact}</span>
                   </p>
                </div>
              ))}
            </div>
            
            <div className="pt-2">
              <button className="text-[13px] font-medium text-[var(--warning)] hover:text-amber-600 transition-colors flex items-center gap-1">
                 Aplicar solución automática recomendada sugerida →
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
