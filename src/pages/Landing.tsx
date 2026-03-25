import { motion } from "framer-motion";
import { MapPin, Shield, Bell, ArrowRight, Thermometer, Users, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Thermometer,
    title: "Real-Time Heat Mapping",
    description: "Monitor surface and ambient temperatures across Delhi's wards with satellite-driven thermal data.",
  },
  {
    icon: Shield,
    title: "Vulnerability Index",
    description: "A composite score measuring exposure, sensitivity, and adaptive capacity for every settlement.",
  },
  {
    icon: Bell,
    title: "Smart Alert System",
    description: "Automated warnings triggered when heat thresholds exceed safe limits in vulnerable zones.",
  },
  {
    icon: Users,
    title: "Community Protection",
    description: "Identify at-risk populations — elderly, outdoor workers, and underserved communities.",
  },
  {
    icon: Satellite,
    title: "Satellite Imagery",
    description: "Leverage NDVI, land-use, and impervious surface data for granular vulnerability assessment.",
  },
  {
    icon: MapPin,
    title: "Ward-Level Search",
    description: "Look up any Delhi ward to instantly view its heat vulnerability score and risk factors.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
          <span className="font-display text-lg font-bold tracking-tight">
            Delhi's <span className="text-primary">HeatShield</span>
          </span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-sm font-medium" onClick={() => navigate("/auth")}>
              Log in
            </Button>
            <Button size="sm" className="text-sm font-semibold" onClick={() => navigate("/auth?mode=signup")}>
              Sign up
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,hsl(28_30%_92%)_0%,transparent_60%)]" />
        </div>

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Protecting Delhi from Extreme Heat
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
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
            climate data, satellite imagery, and demographic indicators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 py-6"
              onClick={() => navigate("/auth?mode=signup")}
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary hover:text-black font-semibold text-base px-8 py-6"
              onClick={() => navigate("/auth")}
            >
              Log in to Dashboard
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How HeatShield Protects Delhi
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A comprehensive platform combining climate science with community data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass-card p-6 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center glass-card p-12"
        >
          <h2 className="font-display text-3xl font-bold mb-4">Ready to explore?</h2>
          <p className="text-muted-foreground mb-8">
            Sign up to access the full dashboard — heat maps, vulnerability scores, and real-time alerts.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6"
            onClick={() => navigate("/auth?mode=signup")}
          >
            Create Free Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© 2026 Delhi's HeatShield</span>
          <span>Built for climate resilience</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
