"use client";

import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface EducationalTooltipProps {
  term: string;
  definition: string;
  children?: ReactNode;
}

export function EducationalTooltip({ term, definition, children }: EducationalTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children || (
            <span className="inline-flex items-center gap-1.5 text-[var(--accent)] cursor-help border-b border-dashed border-[var(--accent)]">
              {term}
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-[280px] p-3 bg-[var(--surface)] border border-[var(--glass-border)] text-[12px] leading-relaxed text-[var(--text-secondary)]"
          side="top"
        >
          <p className="font-medium text-[var(--text-primary)] mb-1">{term}</p>
          <p>{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Common business terms definitions
export const businessTerms = {
  van: {
    term: "VAN (Valor Actual Neto)",
    definition: "Mide el valor presente de los flujos de caja futuros de un proyecto. Un VAN positivo indica que el proyecto genera valor."
  },
  tir: {
    term: "TIR (Tasa Interna de Retorno)",
    definition: "Rentabilidad esperada del proyecto. Si es mayor al costo de capital, el proyecto es viable."
  },
  liquidez: {
    term: "Ratio de Liquidez",
    definition: "Capacidad de la empresa para pagar sus obligaciones de corto plazo. Se calcula dividiendo activos corrientes por pasivos corrientes."
  },
  marketShare: {
    term: "Participación de Mercado",
    definition: "Porcentaje de las ventas totales del mercado que captura tu empresa. Indicador clave de posición competitiva."
  },
  eficiencia: {
    term: "Eficiencia Operacional",
    definition: "Medida de qué tan bien la empresa utiliza sus recursos para generar resultados. Mayor eficiencia significa menos desperdicio."
  },
  payback: {
    term: "Período de Recuperación",
    definition: "Tiempo necesario para que los flujos de caja del proyecto recuperen la inversión inicial."
  }
};
