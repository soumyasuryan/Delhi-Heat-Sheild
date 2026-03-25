import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Search, MapPin, Thermometer, TreePine, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";



// ── Supabase client (reads from your env vars) ────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface LocalityRow {
  locality: string;
  HVI: number;
  lst_celsius: number;
  air_temp_celsius: number;
  green_cover_pct: number;
  population_density_per_km2: number;
}

interface DisplayResult {
  hvi: number;
  risk: string;
  temp: string;
  greenCover: string;
  popDensity: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function hviToRisk(hvi: number): string {
  if (hvi >= 0.85) return "Critical";
  if (hvi >= 0.65) return "High";
  if (hvi >= 0.40) return "Moderate";
  return "Low";
}

function rowToDisplay(row: LocalityRow): DisplayResult {
  const hvi = Math.round(row.HVI * 100) / 100;
  // Prefer surface temp; fall back to air temp
  const tempC = row.lst_celsius ?? row.air_temp_celsius;
  return {
    hvi,
    risk: hviToRisk(hvi),
    temp: tempC != null ? `${Math.round(tempC)}°C` : "N/A",
    greenCover: row.green_cover_pct != null ? `${Math.round(row.green_cover_pct)}%` : "N/A",
    popDensity:
      row.population_density_per_km2 != null
        ? `${row.population_density_per_km2.toLocaleString("en-IN")}/km²`
        : "N/A",
  };
}

// ── Style maps ────────────────────────────────────────────────────────────────
const riskColorMap: Record<string, string> = {
  Low: "text-hvi-low",
  Moderate: "text-hvi-moderate",
  High: "text-hvi-high",
  Critical: "text-hvi-critical",
};

const riskBgMap: Record<string, string> = {
  Low: "bg-hvi-low/10 border-hvi-low/30",
  Moderate: "bg-hvi-moderate/10 border-hvi-moderate/30",
  High: "bg-hvi-high/10 border-hvi-high/30",
  Critical: "bg-hvi-critical/10 border-hvi-critical/30",
};

// ── Component ─────────────────────────────────────────────────────────────────
const SearchLocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DisplayResult | null>(null);
  const [matchedName, setMatchedName] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim().replace(/\s+/g, " ");
    if (!trimmed) return;

    setLoading(true);
    setSearched(false);
    setResult(null);
    setError(null);

    try {
      // Case-insensitive prefix search — ilike is fast with a trigram index,
      // but even without one it works fine for a handful of rows.
      const { data, error: sbError } = await supabase
        .from("hvi_localities")
        .select(
          "locality, HVI, lst_celsius, air_temp_celsius, green_cover_pct, population_density_per_km2"
        )
        .ilike("locality", `%${trimmed}%`)   // ✅ filter by search input
        .order("date", { ascending: false })
        .limit(1)
        .single();

      if (sbError || !data) {
        setResult(null);
      } else {
        setResult(rowToDisplay(data as LocalityRow));
        setMatchedName(data.locality);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, [query]);

  return (
    <section id="search-location" className="py-20 px-4" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Check Your <span className="gradient-text">Area's Risk</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Search for any Delhi locality to see its current Heat Vulnerability Index and
            environmental data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card p-6 md:p-8"
        >
          {/* ── Search bar ── */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="e.g. Karol Bagh, Dwarka, Rohini…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 font-semibold shrink-0 min-w-[96px]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
            </Button>
          </div>

          {/* ── Error state ── */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-destructive text-center"
            >
              {error}
            </motion.p>
          )}

          {/* ── Result card ── */}
          {searched && result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`mt-6 p-5 rounded-lg border ${riskBgMap[result.risk]}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className={`w-5 h-5 ${riskColorMap[result.risk]}`} />
                <span className="font-display font-bold text-lg capitalize">{matchedName}</span>
                <span
                  className={`ml-auto text-sm font-semibold px-3 py-1 rounded-full ${riskColorMap[result.risk]} bg-background/50`}
                >
                  {result.risk}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <div className={`font-display text-2xl font-bold ${riskColorMap[result.risk]}`}>
                    {result.hvi}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">HVI Score</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold flex items-center justify-center gap-1">
                    <Thermometer className="w-4 h-4 text-hvi-high" />
                    {result.temp}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Temperature</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold flex items-center justify-center gap-1">
                    <TreePine className="w-4 h-4 text-hvi-low" />
                    {result.greenCover}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Green Cover</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold">{result.popDensity}</div>
                  <div className="text-xs text-muted-foreground mt-1">Pop. Density</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── No result state ── */}
          {searched && !result && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center py-6 text-muted-foreground text-sm"
            >
              No data found for "{query}". Try searching for localities like Karol Bagh, Dwarka, or
              Rohini.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SearchLocationSection;
