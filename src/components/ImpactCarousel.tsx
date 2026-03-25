import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface ImpactZone {
  locality: string;
  district?: string;
  HVI: number;
  population_density_per_km2?: number;
  lst_celsius?: number;
  air_temp_celsius?: number;
  green_cover_pct?: number;
  roof_score?: number;
}

function hviToRisk(hvi: number): "Critical" | "High" {
  return hvi >= 0.85 ? "Critical" : "High";
}

const riskBadgeColors: Record<string, string> = {
  Critical: "bg-hvi-critical/20 text-hvi-critical border border-hvi-critical/30",
  High: "bg-hvi-high/20 text-hvi-high border border-hvi-high/30",
};

const riskTextColors: Record<string, string> = {
  Critical: "text-hvi-critical",
  High: "text-hvi-high",
};

const riskBarColors: Record<string, string> = {
  Critical: "bg-hvi-critical",
  High: "bg-hvi-high",
};

function buildTags(zone: ImpactZone): string[] {
  const tags: string[] = [];
  const temp = zone.lst_celsius ?? zone.air_temp_celsius;
  if (temp != null) tags.push(`${Math.round(temp)}°C`);
  if (zone.green_cover_pct != null) tags.push(`${Math.round(zone.green_cover_pct)}% green`);
  return tags;
}

// ── Component ─────────────────────────────────────────────────────────────────
const CARDS_PER_PAGE = 3;

const ImpactCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [zones, setZones] = useState<ImpactZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(zones.length / CARDS_PER_PAGE);
  const visibleZones = zones.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  const goNext = () => {
    if (page < totalPages - 1) {
      setDirection(1);
      setPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage((p) => p - 1);
    }
  };

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const { data: latestRow, error: dateErr } = await supabase
          .from("hvi_localities")
          .select("date")
          .order("date", { ascending: false })
          .limit(1)
          .single();

        if (dateErr || !latestRow) throw new Error("Could not determine latest date.");

        const { data, error: fetchErr } = await supabase
          .from("hvi_localities")
          .select(
            "locality, district, HVI, population_density_per_km2, lst_celsius, air_temp_celsius, green_cover_pct, roof_score"
          )
          .eq("date", latestRow.date)
          .gt("HVI", 0.80)
          .order("HVI", { ascending: false });

        if (fetchErr) throw new Error(fetchErr.message);
        setZones((data as ImpactZone[]) ?? []);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load impact zones. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);

  return (
    <section className="py-20 overflow-hidden" ref={ref} id="impact-zones">
      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Impact <span className="gradient-text">Zones</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Priority localities identified for immediate intervention based on HVI scoring.
          </p>
        </motion.div>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex justify-center items-center py-16 text-muted-foreground gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading impact zones…</span>
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <div className="flex justify-center items-center py-16 text-destructive gap-2">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && !error && zones.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-16">
          No high-risk localities found for the latest date.
        </p>
      )}

      {/* ── Carousel ── */}
      {!loading && !error && zones.length > 0 && (
        <div className="max-w-6xl mx-auto px-4">

          {/* Cards */}
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {visibleZones.map((zone, i) => {
                  const risk = hviToRisk(zone.HVI);
                  const tags = buildTags(zone);
                  const hvi = Math.round(zone.HVI * 100) / 100;
                  const hviPct = Math.round(zone.HVI * 100);

                  return (
                    <motion.div
                      key={zone.locality}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="glass-card-hover p-6 flex flex-col gap-4"
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${riskBadgeColors[risk]}`}>
                          {risk}
                        </span>
                        {zone.district && (
                          <span className="text-xs text-muted-foreground truncate max-w-[130px]">
                            {zone.district}
                          </span>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="font-display text-xl font-bold leading-tight">{zone.locality}</h3>

                      {/* HVI bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground">HVI Score</span>
                          <span className={`font-bold ${riskTextColors[risk]}`}>{hvi}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${riskBarColors[risk]}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${hviPct}%` }}
                            transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {/* Pop density */}
                      {zone.population_density_per_km2 != null && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Pop. Density: </span>
                          <span className="font-semibold">
                            {zone.population_density_per_km2.toLocaleString("en-IN")}/km²
                          </span>
                        </div>
                      )}

                      {/* Tags */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Maintain grid shape on last page */}
                {visibleZones.length < CARDS_PER_PAGE &&
                  Array.from({ length: CARDS_PER_PAGE - visibleZones.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="hidden md:block" />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Navigation ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={goPrev}
                disabled={page === 0}
                className="p-2 rounded-full border border-border bg-secondary/40 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === page
                        ? "w-6 h-2 bg-primary"
                        : "w-2 h-2 bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={page === totalPages - 1}
                className="p-2 rounded-full border border-border bg-secondary/40 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Count */}
          <p className="text-center text-xs text-muted-foreground mt-3">
            Showing {page * CARDS_PER_PAGE + 1}–{Math.min((page + 1) * CARDS_PER_PAGE, zones.length)} of {zones.length} high-risk localities
          </p>
        </div>
      )}
    </section>
  );
};

export default ImpactCarousel;
