"use client";

import dynamic from "next/dynamic";

const FinancePage = dynamic(() => import("@/components/pages/FinancePage"), {
  loading: () => null,
});

export default function Page() {
  return <FinancePage />;
}
