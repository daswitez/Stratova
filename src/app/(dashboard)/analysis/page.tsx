"use client";

import dynamic from "next/dynamic";

const AnalysisPage = dynamic(() => import("@/components/pages/AnalysisPage"), {
  loading: () => null,
});

export default function Page() {
  return <AnalysisPage />;
}
