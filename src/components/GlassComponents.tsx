"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-[var(--r-md)] border border-[var(--glass-border)]",
        "bg-[var(--glass)] backdrop-blur-xl",
        "shadow-[var(--shadow-sm)]",
        "before:absolute before:inset-0 before:rounded-[var(--r-md)]",
        "before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none",
        hover && "cursor-pointer transition-shadow hover:shadow-[var(--shadow-md)]",
        className
      )}
      style={{
        background: "var(--glass)",
      }}
    >
      {children}
    </motion.div>
  );
}

interface KPIStatCardProps {
  title: string;
  value: number;
  unit: string;
  delta?: number;
  trend?: "up" | "down" | "neutral";
  status?: "success" | "warning" | "danger" | "neutral";
  sparkline?: number[];
}

export function KPIStatCard({ title, value, unit, delta, trend, status = "neutral" }: KPIStatCardProps) {
  const formatValue = (val: number) => {
    if (unit === "$") {
      return `$${(val / 1000000).toFixed(2)}M`;
    }
    return val.toFixed(1);
  };

  const statusColors = {
    success: "text-[var(--success)]",
    warning: "text-[var(--warning)]",
    danger: "text-[var(--danger)]",
    neutral: "text-[var(--text-secondary)]"
  };

  return (
    <GlassCard hover className="p-6">
      <div className="space-y-3">
        <p className="text-[13px] text-[var(--text-secondary)]">{title}</p>
        <div className="flex items-baseline gap-2">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-['JetBrains_Mono'] text-[32px] text-[var(--text-primary)]"
          >
            {formatValue(value)}
          </motion.span>
          <span className="text-[18px] text-[var(--text-tertiary)]">{unit !== "$" ? unit : ""}</span>
        </div>
        {delta !== undefined && (
          <div className={cn("flex items-center gap-1.5 text-[13px]", statusColors[status])}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "→"}
            <span>{Math.abs(delta).toFixed(1)}{unit === "%" ? "pp" : "%"}</span>
            <span className="text-[var(--text-tertiary)]">vs anterior</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

interface AlertRibbonProps {
  type: "info" | "success" | "warning" | "danger";
  title: string;
  message: string;
  module?: string;
}

export function AlertRibbon({ type, title, message, module }: AlertRibbonProps) {
  const bgColors = {
    info: "bg-[var(--accent-soft)]",
    success: "bg-[var(--success-soft)]",
    warning: "bg-[var(--warning-soft)]",
    danger: "bg-[var(--danger-soft)]"
  };

  const textColors = {
    info: "text-[var(--accent)]",
    success: "text-[var(--success)]",
    warning: "text-[var(--warning)]",
    danger: "text-[var(--danger)]"
  };

  const borderColors = {
    info: "border-l-[var(--accent)]",
    success: "border-l-[var(--success)]",
    warning: "border-l-[var(--warning)]",
    danger: "border-l-[var(--danger)]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "rounded-[var(--r-sm)] border-l-2 p-4",
        bgColors[type],
        borderColors[type]
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h4 className={cn("text-[14px] font-medium", textColors[type])}>{title}</h4>
            {module && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[var(--text-tertiary)]">
                {module}
              </span>
            )}
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface StatusBadgeProps {
  status: "pending" | "draft" | "submitted" | "locked";
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const variants = {
    pending: {
      bg: "bg-[var(--text-tertiary)]/10",
      text: "text-[var(--text-secondary)]",
      label: "Pendiente"
    },
    draft: {
      bg: "bg-[var(--accent-soft)]",
      text: "text-[var(--accent)]",
      label: "En borrador"
    },
    submitted: {
      bg: "bg-[var(--success-soft)]",
      text: "text-[var(--success)]",
      label: "Enviado"
    },
    locked: {
      bg: "bg-[var(--text-tertiary)]/10",
      text: "text-[var(--text-secondary)]",
      label: "Bloqueado"
    }
  };

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-[12px] px-3 py-1"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        variants[status].bg,
        variants[status].text,
        sizeClasses[size]
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {variants[status].label}
    </span>
  );
}

interface CyclePillProps {
  cycle: number;
  status: "OPEN" | "CLOSED";
  timeRemaining?: string;
}

export function CyclePill({ cycle, status, timeRemaining }: CyclePillProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-[var(--r-pill)] bg-[var(--glass)] backdrop-blur-xl border border-[var(--glass-border)]">
      <span className="text-[13px] text-[var(--text-secondary)]">Ciclo {cycle}</span>
      <div className="w-px h-4 bg-[var(--glass-border)]" />
      {status === "OPEN" ? (
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
          <span className="text-[13px] font-medium text-[var(--text-primary)]">Abierto</span>
          {timeRemaining && (
            <>
              <div className="w-px h-4 bg-[var(--glass-border)]" />
              <span className="text-[12px] font-['JetBrains_Mono'] text-[var(--text-tertiary)]">
                {timeRemaining}
              </span>
            </>
          )}
        </motion.div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--text-tertiary)]" />
          <span className="text-[13px] font-medium text-[var(--text-secondary)]">Cerrado</span>
        </div>
      )}
    </div>
  );
}
