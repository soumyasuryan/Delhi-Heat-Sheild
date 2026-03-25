import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const wards = [
  { name: "Karol Bagh", risk: "critical", x: 35, y: 30, hvi: 0.92 },
  { name: "Shahdara", risk: "high", x: 65, y: 25, hvi: 0.78 },
  { name: "Saket", risk: "moderate", x: 40, y: 65, hvi: 0.55 },
  { name: "Dwarka", risk: "low", x: 15, y: 55, hvi: 0.25 },
  { name: "Connaught Place", risk: "high", x: 42, y: 40, hvi: 0.81 },
  { name: "Lajpat Nagar", risk: "critical", x: 50, y: 52, hvi: 0.95 },
  { name: "Rohini", risk: "moderate", x: 30, y: 15, hvi: 0.48 },
  { name: "Nehru Place", risk: "high", x: 55, y: 58, hvi: 0.73 },
  { name: "Pitampura", risk: "low", x: 28, y: 20, hvi: 0.3 },
  { name: "Janakpuri", risk: "moderate", x: 18, y: 42, hvi: 0.52 },
];

const riskColors: Record<string, string> = {
  low: "bg-hvi-low",
  moderate: "bg-hvi-moderate",
  high: "bg-hvi-high",
  critical: "bg-hvi-critical",
};

const riskPulse: Record<string, string> = {
  low: "",
  moderate: "",
  high: "animate-pulse",
  critical: "animate-pulse",
};

const HeatMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="heat-map" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Heat Vulnerability <span className="gradient-text">Risk Map</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time ward-level heat vulnerability index across Delhi NCR, calculated from
            satellite imagery, weather stations, and demographic data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-6 md:p-8"
        >
          {/* Map area */}
          <div className="relative w-full aspect-[16/10] bg-secondary/50 rounded-lg overflow-hidden">
            {/* Simulated Delhi outline */}
            <svg viewBox="0 0 100 80" className="absolute inset-0 w-full h-full">
              <path
                d="M 20 10 Q 35 5, 50 8 Q 70 5, 80 15 Q 85 30, 82 45 Q 80 60, 65 70 Q 50 78, 35 72 Q 20 68, 15 50 Q 10 35, 20 10 Z"
                fill="hsl(var(--secondary))"
                stroke="hsl(var(--glass-border))"
                strokeWidth="0.5"
                opacity="0.6"
              />
              {/* Internal ward divisions */}
              <line x1="30" y1="10" x2="45" y2="70" stroke="hsl(var(--glass-border))" strokeWidth="0.3" opacity="0.4" />
              <line x1="55" y1="8" x2="60" y2="70" stroke="hsl(var(--glass-border))" strokeWidth="0.3" opacity="0.4" />
              <line x1="15" y1="35" x2="82" y2="35" stroke="hsl(var(--glass-border))" strokeWidth="0.3" opacity="0.4" />
              <line x1="18" y1="55" x2="75" y2="55" stroke="hsl(var(--glass-border))" strokeWidth="0.3" opacity="0.4" />
            </svg>

            {/* Ward markers */}
            {wards.map((ward, i) => (
              <motion.div
                key={ward.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="absolute group cursor-pointer"
                style={{ left: `${ward.x}%`, top: `${ward.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className={`w-4 h-4 rounded-full ${riskColors[ward.risk]} ${riskPulse[ward.risk]} shadow-lg`} />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity glass-card px-3 py-2 whitespace-nowrap z-10">
                  <div className="text-sm font-semibold">{ward.name}</div>
                  <div className="text-xs text-muted-foreground">HVI: {ward.hvi}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {[
              { label: "Low Risk", color: "bg-hvi-low" },
              { label: "Moderate", color: "bg-hvi-moderate" },
              { label: "High", color: "bg-hvi-high" },
              { label: "Critical", color: "bg-hvi-critical" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeatMapSection;
