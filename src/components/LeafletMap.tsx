"use client";

// This file is ONLY ever imported via dynamic() with ssr:false
// so window / document are always available here.

import { useEffect, useRef } from "react";
import type { LocalityData, LayerType } from "@/types/hvi";
import { hviColor, roofColor } from "@/lib/hviColors";

// Leaflet CSS — must be imported here (not in layout) to avoid SSR mismatch
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon broken by webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TILE_URLS: Record<LayerType, string> = {
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  street:    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  hybrid:    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
};

const LABEL_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png";

interface LeafletMapProps {
  data:     LocalityData[];   // filtered (visible) localities
  allData:  LocalityData[];   // full dataset for marker management
  layer:    LayerType;
  selected: string | null;
  onSelect: (name: string) => void;
}

export default function LeafletMap({ data, allData, layer, selected, onSelect }: LeafletMapProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const mapRef        = useRef<L.Map | null>(null);
  const tileRef       = useRef<L.TileLayer | null>(null);
  const labelRef      = useRef<L.TileLayer | null>(null);
  const markersRef    = useRef<Map<string, L.CircleMarker>>(new Map());
  const popupsRef     = useRef<Map<string, L.Popup>>(new Map());

  // ── Init map once ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [28.64, 77.19],
      zoom:   11,
      zoomControl: true,
    });

    tileRef.current = L.tileLayer(TILE_URLS.satellite, {
      attribution: "Esri, Maxar, Earthstar Geographics",
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // ── Render markers when allData changes ─────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !allData.length) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();
    popupsRef.current.clear();

    allData.forEach((d) => {
      const hvi  = d.HVI;
      const col  = hviColor(hvi);
      const rc   = roofColor(d.dominant_roof_material);
      const pct  = (((hvi - 0.09) / (0.89 - 0.09)) * 100).toFixed(0);

      const marker = L.circleMarker([+d.latitude, +d.longitude], {
        radius:      5 + hvi * 11,
        fillColor:   col,
        color:       rc,
        weight:      1.5,
        opacity:     0.9,
        fillOpacity: 0.75,
      });

      const popup = L.popup({ maxWidth: 230, className: "hvi-popup" }).setContent(`
        <div class="hvi-pu-head">
          <div class="hvi-pu-name">${d.locality}</div>
          <div class="hvi-pu-dist">${d.district}</div>
          <div class="hvi-pu-hvi-row">
            <div class="hvi-bar-bg">
              <div class="hvi-bar-fill" style="width:${pct}%;background:${col}"></div>
            </div>
            <div class="hvi-hvi-num" style="color:${col}">HVI ${hvi.toFixed(3)}</div>
          </div>
        </div>
        <div class="hvi-grid">
          <div class="hvi-cell"><div class="hvi-cl">LST</div><div class="hvi-cv">${d.lst_celsius}°C</div></div>
          <div class="hvi-cell"><div class="hvi-cl">Air Temp</div><div class="hvi-cv">${d.air_temp_celsius}°C</div></div>
          <div class="hvi-cell"><div class="hvi-cl">UHI</div><div class="hvi-cv">+${d.urban_heat_intensity}°C</div></div>
          <div class="hvi-cell"><div class="hvi-cl">Green Cover</div><div class="hvi-cv">${d.green_cover_pct}%</div></div>
          <div class="hvi-cell"><div class="hvi-cl">Pop Density</div><div class="hvi-cv">${(+d.population_density_per_km2).toLocaleString()}/km²</div></div>
          <div class="hvi-cell"><div class="hvi-cl">Type</div><div class="hvi-cv hvi-type">${d.locality_type}</div></div>
        </div>
        <div class="hvi-roof">
          <div class="hvi-cl">Dominant Roof Material</div>
          <div class="hvi-roof-val">
            <span class="hvi-roof-dot" style="background:${rc}"></span>
            ${d.dominant_roof_material}
          </div>
        </div>
      `);

      marker.bindPopup(popup);
      marker.on("click", () => onSelect(d.locality));
      marker.addTo(map);

      markersRef.current.set(d.locality, marker);
      popupsRef.current.set(d.locality, popup);
    });
  }, [allData, onSelect]);

  // ── Show/fade markers based on filter ───────────────────────────────────────
  useEffect(() => {
    const visibleNames = new Set(data.map((d) => d.locality));
    markersRef.current.forEach((marker, name) => {
      marker.setStyle(
        visibleNames.has(name)
          ? { opacity: 0.9, fillOpacity: 0.75 }
          : { opacity: 0.04, fillOpacity: 0.03 }
      );
    });
  }, [data]);

  // ── Fly to selected + open popup ────────────────────────────────────────────
  useEffect(() => {
    if (!selected || !mapRef.current) return;
    const marker = markersRef.current.get(selected);
    if (!marker) return;
    const latlng = marker.getLatLng();
    mapRef.current.flyTo(latlng, 14, { duration: 0.7, easeLinearity: 0.3 });
    setTimeout(() => marker.openPopup(), 750);
  }, [selected]);

  // ── Swap tile layer ─────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileRef.current) map.removeLayer(tileRef.current);
    if (labelRef.current) { map.removeLayer(labelRef.current); labelRef.current = null; }

    tileRef.current = L.tileLayer(TILE_URLS[layer], {
      attribution: layer === "street" ? "&copy; OSM &copy; CARTO" : "Esri",
      maxZoom: 19,
    }).addTo(map);

    if (layer === "hybrid") {
      labelRef.current = L.tileLayer(LABEL_URL, {
        subdomains: "abcd",
        maxZoom: 19,
        opacity: 0.85,
      }).addTo(map);
    }
  }, [layer]);

  return (
    <>
      {/* Popup styles injected into <head> once */}
      <style>{`
        .hvi-popup .leaflet-popup-content-wrapper {
          background: #fff !important;
          border: 1px solid #ddd8d0 !important;
          border-radius: 10px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,.12) !important;
          padding: 0 !important;
        }
        .hvi-popup .leaflet-popup-content { margin: 0 !important; width: 230px !important; }
        .hvi-popup .leaflet-popup-tip { background: #fff !important; }
        .hvi-pu-head { padding: 11px 13px 9px; border-bottom: 1px solid #e8e3dc; }
        .hvi-pu-name { font-size: 13px; font-weight: 700; color: #1a1a1a; font-family: Inter, sans-serif; }
        .hvi-pu-dist { font-size: 10px; color: #9b948c; margin-top: 2px; font-family: Inter, sans-serif; }
        .hvi-pu-hvi-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
        .hvi-bar-bg { flex: 1; height: 5px; background: #e8e3dc; border-radius: 3px; overflow: hidden; }
        .hvi-bar-fill { height: 100%; border-radius: 3px; }
        .hvi-hvi-num { font-size: 12px; font-weight: 700; flex-shrink: 0; font-family: Inter, sans-serif; }
        .hvi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e8e3dc; }
        .hvi-cell { background: #fff; padding: 7px 12px; }
        .hvi-cl { font-size: 9px; text-transform: uppercase; letter-spacing: .7px; color: #9b948c; font-weight: 600; font-family: Inter, sans-serif; }
        .hvi-cv { font-size: 13px; font-weight: 600; margin-top: 2px; color: #1a1a1a; font-family: Inter, sans-serif; }
        .hvi-type { font-size: 10px !important; text-transform: capitalize; }
        .hvi-roof { padding: 8px 12px; background: #f5f2ee; border-top: 1px solid #e8e3dc; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; }
        .hvi-roof-val { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; color: #1a1a1a; margin-top: 3px; font-family: Inter, sans-serif; }
        .hvi-roof-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; border: 1px solid rgba(0,0,0,.1); }
      `}</style>
      <div ref={containerRef} className="absolute inset-0" />
    </>
  );
}
