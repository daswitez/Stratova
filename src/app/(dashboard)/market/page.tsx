"use client";

import dynamic from "next/dynamic";

const MarketPage = dynamic(() => import("@/components/pages/MarketPage"), {
  loading: () => null,
});

export default function Page() {
  return <MarketPage />;
}
