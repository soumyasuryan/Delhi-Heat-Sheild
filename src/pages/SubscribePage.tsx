import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, ShieldCheck, Thermometer, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    priceNote: "forever",
    features: ["Daily heat alerts via email", "Top 5 high-risk zones", "Weekly summary report"],
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹99",
    priceNote: "/ month",
    features: [
      "Real-time SMS + email alerts",
      "All 280+ wards monitored",
      "Custom locality watchlist",
      "Early warning push notifications",
    ],
    highlight: true,
  },
  {
    id: "org",
    name: "Organisation",
    price: "₹499",
    priceNote: "/ month",
    features: [
      "Everything in Pro",
      "API access to HVI data",
      "Multi-user dashboard",
      "Priority support",
    ],
    highlight: false,
  },
];

const SubscribePage = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    locality: "",
    orgName: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Payment not active yet — just show confirmation
    setSubmitted(true);
  };

  const isOrgPlan = selectedPlan === "org";

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-hvi-critical/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-5">
            <Bell className="w-3.5 h-3.5 text-hvi-critical" />
            Heat Alert Subscriptions
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Stay ahead of the <span className="gradient-text">heat.</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Get early warnings before dangerous heat events reach your area.
          </p>
        </motion.div>

        {submitted ? (
          // ── Success state ──
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-12 text-center max-w-lg mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-hvi-low/20 flex items-center justify-center mx-auto mb-5">
              <ShieldCheck className="w-7 h-7 text-hvi-low" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-3">You're registered!</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              We've saved your details. Payment will be activated soon — we'll notify you at <strong>{form.email}</strong> when billing goes live.
            </p>
            <Link to="/">
              <Button variant="outline" className="font-semibold">
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* ── Left: Plan selector ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <h2 className="font-display text-lg font-semibold mb-1">Choose a plan</h2>
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/8 shadow-md shadow-primary/10"
                      : "border-border bg-secondary/30 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedPlan === plan.id ? "border-primary" : "border-muted-foreground"
                      }`}>
                        {selectedPlan === plan.id && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <span className="font-display font-bold text-base">{plan.name}</span>
                      {plan.highlight && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-display font-bold text-lg">{plan.price}</span>
                      <span className="text-xs text-muted-foreground ml-1">{plan.priceNote}</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Thermometer className="w-3.5 h-3.5 text-hvi-high shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6 md:p-8"
            >
              <h2 className="font-display text-lg font-semibold mb-6">Your details</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Name */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Full Name *</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Priya Sharma"
                    className="w-full px-4 py-3 rounded-lg bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="priya@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  />
                </div>

                {/* Locality */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Your Locality *</label>
                  <input
                    name="locality"
                    required
                    value={form.locality}
                    onChange={handleChange}
                    placeholder="e.g. Karol Bagh, Dwarka…"
                    className="w-full px-4 py-3 rounded-lg bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  />
                </div>

                {/* Org name — only for org plan */}
                {isOrgPlan && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="text-xs text-muted-foreground mb-1.5 block">Organisation Name *</label>
                    <input
                      name="orgName"
                      required={isOrgPlan}
                      value={form.orgName}
                      onChange={handleChange}
                      placeholder="Delhi Municipal Corporation"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                    />
                  </motion.div>
                )}

                {/* Pay Now — disabled */}
                <div className="mt-2">
                  <Button
                    type="submit"
                    disabled
                    className="w-full py-6 font-semibold text-base opacity-50 cursor-not-allowed relative"
                    title="Payments coming soon"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Pay Now — Coming Soon
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2.5 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Payments not active yet. Submit to register your interest.
                  </p>
                </div>

                {/* Register interest fallback */}
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full font-semibold"
                >
                  Register Interest (Free)
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribePage;
