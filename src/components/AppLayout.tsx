"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { 
  LayoutDashboard, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Settings, 
  FileText,
  Trophy,
  Clock,
  User,
  LogOut
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { CyclePill } from "./GlassComponents";
import { currentCycle, studentUser } from "@/data/mockData";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Workspace Ejecutivo", path: "/workspace", icon: LayoutDashboard },
  { name: "Centro de Decisiones", path: "/decisions", icon: Clock },
  { name: "Módulo Mercado", path: "/market", icon: TrendingUp },
  { name: "Módulo Finanzas", path: "/finance", icon: DollarSign },
  { name: "Módulo RRHH", path: "/hr", icon: Users },
  { name: "Módulo Operaciones", path: "/operations", icon: Settings },
  { name: "Análisis General", path: "/analysis", icon: FileText },
  { name: "Ranking", path: "/ranking", icon: Trophy },
];

export function AppLayout({ children }: { children?: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--bg)] font-['Inter']">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[280px] border-r border-[var(--glass-border)] bg-[var(--surface)] backdrop-blur-xl z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 border-b border-[var(--glass-border)]">
            <h1 className="text-[24px] font-semibold text-[var(--text-primary)]">
              Stratova
            </h1>
            <p className="text-[12px] text-[var(--text-tertiary)] mt-1">
              Simulación Empresarial
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path || (pathname === "/" && item.path === "/workspace");
              
              return (
                <Link key={item.path} href={item.path}>
                  <motion.div
                    whileHover={{ x: 2 }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-[var(--r-sm)] transition-all duration-200",
                      isActive
                        ? "bg-[var(--accent-soft)] text-[var(--accent)] border-l-2 border-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--muted)]"
                    )}
                  >
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                    <span className="text-[14px]">{item.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-[var(--glass-border)]">
            <div className="flex items-center gap-3 p-3 rounded-[var(--r-sm)] bg-[var(--muted)]">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[14px] font-medium">
                {studentUser.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[var(--text-primary)] truncate">
                  {studentUser.name}
                </p>
                <p className="text-[11px] text-[var(--text-tertiary)] truncate">
                  {studentUser.role}
                </p>
              </div>
              <button className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-[280px]">
        {/* Topbar */}
        <header className="sticky top-0 z-40 h-16 border-b border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl">
          <div className="flex items-center justify-between h-full px-8">
            <div className="flex items-center gap-6">
              <CyclePill
                cycle={currentCycle.number}
                status={currentCycle.status}
                timeRemaining={currentCycle.timeRemaining}
              />
              <div>
                <p className="text-[12px] text-[var(--text-tertiary)]">Equipo</p>
                <p className="text-[14px] font-medium text-[var(--text-primary)]">
                  {studentUser.team}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white"
                >
                  <User className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
