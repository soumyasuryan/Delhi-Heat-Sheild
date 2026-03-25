export function hviColor(v: number): string {
  const stops: [number, [number, number, number]][] = [
    [0.09, [46, 204, 113]],
    [0.35, [241, 196, 15]],
    [0.55, [230, 126, 34]],
    [0.72, [231, 76, 60]],
    [0.89, [142, 68, 173]],
  ];
  for (let i = 0; i < stops.length - 1; i++) {
    const [v0, c0] = stops[i];
    const [v1, c1] = stops[i + 1];
    if (v <= v1) {
      const t = (v - v0) / (v1 - v0);
      const r = Math.round(c0[0] + t * (c1[0] - c0[0]));
      const g = Math.round(c0[1] + t * (c1[1] - c0[1]));
      const b = Math.round(c0[2] + t * (c1[2] - c0[2]));
      return `rgb(${r},${g},${b})`;
    }
  }
  return "rgb(142,68,173)";
}

export const ROOF_COLORS: Record<string, string> = {
  "Metal Sheet":         "#e74c3c",
  "Asbestos Sheet":      "#e67e22",
  "Tarpaulin/Plastic":   "#9b59b6",
  "RCC Concrete":        "#3498db",
  "Clay Tiles":          "#27ae60",
  "Green Roof":          "#1abc9c",
  "Glass/Polycarbonate": "#95a5a6",
};

export function roofColor(material: string): string {
  return ROOF_COLORS[material] ?? "#7f8c8d";
}

export function hviLabel(v: number): string {
  if (v < 0.3) return "Low";
  if (v < 0.5) return "Moderate";
  if (v < 0.7) return "High";
  return "Critical";
}
