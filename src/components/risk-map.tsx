// import type { Metadata } from "next";
import HVIMap from "@/components/HVIMap";

// export const metadata: Metadata = {
//   title: "Risk Map — Delhi's HeatShield",
//   description: "Live heat vulnerability index across 132 Delhi localities",
// };

export default function RiskMapPage() {
  return (
    <main className="h-[calc(100vh-52px)]">
      <HVIMap />
    </main>
  );
}