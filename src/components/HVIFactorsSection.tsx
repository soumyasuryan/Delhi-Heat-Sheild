import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Thermometer, Sun, TreePine, Home, Users, Flame } from "lucide-react";

const factors = [
  {
    icon: Thermometer,
    title: "Land Surface Temperature",
    description: "Satellite-derived LST data from Landsat/MODIS imagery capturing urban heat island intensity across settlements.",
  },
  {
    icon: Sun,
    title: "Current Temperature",
    description: "Real-time ambient temperature readings from IMD weather stations and IoT sensor networks across Delhi NCR.",
  },
  {
    icon: TreePine,
    title: "Green Cover",
    description: "NDVI-based vegetation density analysis measuring shade availability and natural cooling effects in each ward.",
  },
  {
    icon: Home,
    title: "Roof Material Type",
    description: "Classification of roofing materials (tin, asbestos, concrete) that directly impact indoor heat retention and exposure.",
  },
  {
    icon: Users,
    title: "Population Density",
    description: "Census-derived population metrics identifying overcrowded zones with limited heat-escape infrastructure.",
  },
  {
    icon: Flame,
    title: "Heat Exposure",
    description: "Composite exposure score factoring in outdoor worker density, lack of cooling access, and historical heat incidents.",
  },
];

const HVIFactorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-4" ref={ref} id="hvi-factors" >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            HVI <span className="gradient-text">Calculation Factors</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six critical data layers are fused to compute the Heat Vulnerability Index for every ward and settlement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {factors.map((factor, i) => (
            <motion.div
              key={factor.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-6 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <factor.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{factor.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{factor.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HVIFactorsSection;
