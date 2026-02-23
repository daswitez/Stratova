"use client";

import dynamic from "next/dynamic";

const DecisionsPage = dynamic(
  () => import("@/components/pages/DecisionsPage"),
  { loading: () => null }
);

export default function Page() {
  return <DecisionsPage />;
}
