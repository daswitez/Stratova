import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Stratova — Simulación Empresarial",
  description: "Plataforma de simulación empresarial para estudiantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
