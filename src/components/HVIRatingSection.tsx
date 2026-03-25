import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ratings = [
  {
    range: "0.00 – 0.25",
    label: "Low Risk",
    color: "bg-hvi-low",
    textColor: "text-hvi-low",
    borderColor: "border-hvi-low/30",
    description: "Adequate green cover, lower population density, and good ventilation. Minimal immediate risk from heat stress.",
    action: "Standard precautions — stay hydrated and limit midday exposure.",
  },
  {
    range: "0.26 – 0.50",
    label: "Moderate",
    color: "bg-hvi-moderate",
    textColor: "text-hvi-moderate",
    borderColor: "border-hvi-moderate/30",
    description: "Some heat-trapping surfaces, moderate density. Vulnerable groups like elderly and young children should take care.",
    action: "Advisories issued. Cooling shelters on standby.",
  },
  {
    range: "0.51 – 0.75",
    label: "High Risk",
    color: "bg-hvi-high",
    textColor: "text-hvi-high",
    borderColor: "border-hvi-high/30",
    description: "High surface temperatures, dense built environment, limited tree cover. Outdoor workers and street vendors are at significant risk.",
    action: "Targeted SMS/WhatsApp alerts. Municipal teams activated.",
  },
  {
    range: "0.76 – 1.00",
    label: "Critical",
    color: "bg-hvi-critical",
    textColor: "text-hvi-critical",
    borderColor: "border-hvi-critical/30",
    description: "Extreme heat island effect, minimal green cover, high population density with vulnerable demographics. Life-threatening conditions possible.",
    action: "Emergency response triggered. Cooling shelters open. Health teams deployed.",
  },
];

const HVIRatingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="hvi-rating" className="py-20 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Understanding the <span className="gradient-text">HVI Rating</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Heat Vulnerability Index ranges from 0 to 1. Here's what each level means and how the system responds.
          </p>
        </motion.div>

        <div className="space-y-4">
          {ratings.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-6 border-l-4 ${r.borderColor} flex flex-col md:flex-row md:items-start gap-5`}
            >
              <div className="flex items-center gap-3 md:w-48 shrink-0">
                <div className={`w-4 h-4 rounded-full ${r.color}`} />
                <div>
                  <div className={`font-display font-bold text-lg ${r.textColor}`}>{r.label}</div>
                  <div className="text-xs text-muted-foreground font-mono">{r.range}</div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground/80 leading-relaxed mb-2">{r.description}</p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground/70">Response:</span> {r.action}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* HVI scale bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 glass-card p-6"
        >
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">HVI Gradient Scale</div>
          <div className="h-4 rounded-full overflow-hidden flex">
            <div className="flex-1 bg-hvi-low" />
            <div className="flex-1 bg-hvi-moderate" />
            <div className="flex-1 bg-hvi-high" />
            <div className="flex-1 bg-hvi-critical" />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0.00</span>
            <span>0.25</span>
            <span>0.50</span>
            <span>0.75</span>
            <span>1.00</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HVIRatingSection;
