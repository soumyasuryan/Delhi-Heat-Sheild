import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,hsl(28_30%_92%)_0%,transparent_60%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-hvi-critical animate-pulse" />
            Live Heat Monitoring — Delhi NCR
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          Identifying who is at risk
          <br />
          <span className="gradient-text">before heat turns fatal.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Delhi's HeatShield maps vulnerability across settlements using real-time
          climate data, satellite imagery, and demographic indicators to protect
          those most exposed to extreme heat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/map.html"
            className="inline-flex items-center bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 py-4 rounded-lg glow-primary"
          >
            <MapPin className="w-5 h-5 mr-2" />
            View Risk Map
          </a>

          {/* ✅ Now routes to /subscribe */}
          <Link to="/subscribe">
            <Button
              variant="outline"
              size="lg"
              className="border-glass-border text-foreground hover:bg-secondary hover:text-black font-semibold text-base px-8 py-7"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Subscribe Alerts
            </Button>
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "11",        label: "Districts Monitored" },
            { value: "280+",      label: "Wards Analyzed" },
            { value: "3.2M",      label: "Citizens Protected" },
            { value: "Real-time", label: "Alert Frequency" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
