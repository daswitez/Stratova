"use client";

import dynamic from "next/dynamic";

const HRPage = dynamic(() => import("@/components/pages/HRPage"), {
  loading: () => null,
});

export default function Page() {
  return <HRPage />;
}
