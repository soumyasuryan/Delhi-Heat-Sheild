import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Phone, Bell, Shield, ExternalLink } from "lucide-react"; // ⬅ add ExternalLink
import { Link } from "react-router-dom";                                          // ⬅ add Link
import { Button } from "@/components/ui/button";  

const alertFeatures = [
  {
    icon: MessageSquare,
    title: "WhatsApp Alerts",
    description: "Geo-targeted heat warnings delivered via WhatsApp to registered citizens in Critical and High risk zones.",
  },
  {
    icon: Phone,
    title: "SMS Notifications",
    description: "Multilingual SMS alerts (Hindi/English) sent to outdoor workers, street vendors, and construction crews.",
  },
  {
    icon: Bell,
    title: "Municipal Triggers",
    description: "Automated escalation to district officials when HVI crosses threshold, activating cooling shelters and water stations.",
  },
  {
    icon: Shield,
    title: "Health Advisories",
    description: "Customized health guidance based on vulnerability profile — elderly, children, and those with pre-existing conditions.",
  },
];

const AlertSystemSection = () => {
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
            Targeted <span className="gradient-text">Alert System</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            When HVI enters critical thresholds, automated multi-channel alerts reach the right people at the right time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {alertFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card-hover p-6 flex gap-5"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alert flow demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 glass-card p-6 md:p-8"
        >
          <div className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Sample Alert</div>
          <div className="glass-card p-4 border-l-4 border-l-hvi-critical">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-hvi-critical animate-pulse" />
              <span className="text-xs font-semibold text-hvi-critical">CRITICAL HEAT ALERT</span>
            </div>
            <p className="text-sm leading-relaxed">
              ⚠️ <strong>Extreme Heat Warning — Karol Bagh (HVI: 0.92)</strong>
              <br />
              Temperature expected to reach 47°C today. Avoid outdoor exposure between 11AM–4PM.
              Nearest cooling shelter: Community Hall, Gate No. 3.
              <br />
              <span className="text-muted-foreground">— Delhi HeatShield • IMD • Municipal Corp.</span>
            </p>
          </div>
          
        </motion.div>
        <div>
        <Link to="/subscribe" className="flex justify-center mt-5">
                    <Button
                      variant="outline"
                      size="lg"
                      className="inline-flex items-center bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 py-4 rounded-lg glow-primary py-7"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Subscribe Alerts
                    </Button>
                  </Link>
                  </div>
        
      </div>
      
    </section>
  );
};

export default AlertSystemSection;
