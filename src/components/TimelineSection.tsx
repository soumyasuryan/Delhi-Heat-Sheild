import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Calculator, BarChart3, Zap } from "lucide-react";

const stages = [
  {
    icon: Database,
    title: "Data Inputs",
    subtitle: "Static & Dynamic",
    items: ["Satellite imagery (Landsat/MODIS)", "IMD weather feeds", "Census demographics", "IoT sensor data"],
  },
  {
    icon: Calculator,
    title: "HVI Calculation",
    subtitle: "Multi-Factor Analysis",
    items: ["Weighted factor scoring", "Spatial interpolation", "Temporal normalization", "ML-based calibration"],
  },
  {
    icon: BarChart3,
    title: "Risk Classification",
    subtitle: "Ward-Level Mapping",
    items: ["4-tier risk categorization", "Geographic clustering", "Vulnerability profiling", "Threshold detection"],
  },
  {
    icon: Zap,
    title: "Action & Outputs",
    subtitle: "Targeted Response",
    items: ["SMS/WhatsApp alerts", "Municipal escalation", "Cooling shelter activation", "Dashboard reporting"],
  },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Implementation <span className="gradient-text">Flow</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From raw data to life-saving action — the full HeatShield pipeline.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center relative z-10">
                    <stage.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Step {i + 1}
                  </div>
                </div>

                <div className="glass-card-hover p-5">
                  <h3 className="font-display text-lg font-bold mb-1">{stage.title}</h3>
                  <p className="text-xs text-primary font-medium mb-3">{stage.subtitle}</p>
                  <ul className="space-y-2">
                    {stage.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
