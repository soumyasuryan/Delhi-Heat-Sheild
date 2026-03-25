import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, Phone, AlertTriangle, Handshake, MessageSquare, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const purposes = [
  {
    icon: MessageSquare,
    label: "General Inquiry",
    value: "general",
    description: "Questions about HeatShield",
  },
  {
    icon: AlertTriangle,
    label: "Report Heat Emergency",
    value: "emergency",
    description: "Report a critical heat situation",
  },
  {
    icon: Handshake,
    label: "Partnership",
    value: "partnership",
    description: "Collaborate with our team",
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    purpose: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      
      {/* ── BACKGROUND LAYER (Fixed Z-Index) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── CONTENT LAYER ── */}
      <div className="relative z-10 px-4 pt-8 pb-20 max-w-5xl mx-auto" ref={ref}>
        
        {/* Navigation - High Z-index and relative position */}
         <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mb-12"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Home
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <div className="text-center mb-16">
         
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Delhi NCR Support Hub
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-6"
          >
            Get in touch with <br />
            <span className="text-primary">HeatShield.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Our dedicated team monitors heat-related issues across the capital. 
            Whether reporting an emergency or seeking collaboration, we're here.
          </motion.p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left Column: Context & Selection */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-5 rounded-2xl bg-destructive/5 border border-destructive/20"
            >
              <div className="flex items-center gap-2 mb-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Immediate Danger?</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If someone is suffering from heatstroke or unconscious, call <span className="text-foreground font-bold">112</span> immediately.
              </p>
            </motion.div>

            {purposes.map((p, i) => (
              <motion.button
                key={p.value}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                onClick={() => setForm({ ...form, purpose: p.value })}
                className={`relative overflow-hidden p-4 rounded-2xl flex items-center gap-4 text-left w-full transition-all border
                  ${form.purpose === p.value
                    ? "bg-primary/10 border-primary shadow-lg shadow-primary/5"
                    : "bg-card/50 border-border hover:border-primary/50"
                  }`}
              >
                <div className={`p-3 rounded-xl transition-colors ${form.purpose === p.value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">{p.label}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{p.description}</div>
                </div>
                {form.purpose === p.value && (
                    <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-6 rounded-full bg-primary" />
                )}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="pt-4 grid grid-cols-1 gap-3"
            >
                <div className="flex items-center gap-3 text-sm text-muted-foreground p-2">
                    <Mail className="w-4 h-4 text-primary" /> contact@delhiheatshield.in
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground p-2">
                    <Phone className="w-4 h-4 text-primary" /> +91 11 2345 6789
                </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="bg-card border border-border rounded-3xl p-8 shadow-xl shadow-foreground/5 min-h-[500px] flex flex-col">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center flex-grow text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Message Received</h3>
                    <p className="text-muted-foreground">We'll respond to <b>{form.email}</b> within 24 hours.</p>
                  </div>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-full px-8">
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" value={form.name} onChange={handleChange} required className="bg-secondary/30 border-none h-12 rounded-xl focus-visible:ring-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required className="bg-secondary/30 border-none h-12 rounded-xl focus-visible:ring-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <div className="px-4 py-3 rounded-xl bg-primary/5 border border-primary/20 text-sm font-medium flex items-center justify-between">
                       <span>{purposes.find(p => p.value === form.purpose)?.label}</span>
                       <span className="text-[10px] text-primary/60 uppercase font-bold tracking-widest">Selected</span>
                    </div>
                  </div>

                  <div className="space-y-2 flex-grow">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you today?"
                      className="w-full rounded-xl bg-secondary/30 border-none p-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                    {loading ? "Transmitting..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { v: "24h", l: "Max Response" },
            { v: "100%", l: "Reach Rate" },
            { v: "Delhi", l: "HQ Base" },
            { v: "Live", l: "Monitoring" },
          ].map((s, i) => (
            <div key={i} className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl text-center">
              <div className="text-2xl font-display font-bold text-primary">{s.v}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;