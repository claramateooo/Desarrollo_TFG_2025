import InfoTooltipIsland from "../../islands/InfoTooltipsIsland.tsx";

export default function MetricBar({
  label,
  val,
  thresholds,
  distribution,
}: {
  label: string;
  val: number | null;
  thresholds: number[];
  distribution: number[];
}) {
  const format = (v: number | null) =>
    v !== null ? `${(v / 1000).toFixed(1)} s` : "No disponible";

  const [good, medium] = thresholds;
  const actualVal = val ?? 0;

  const maxByMetric: Record<string, number> = {
    LCP: 6000,
    INP: 1000,
    CLS: 0.3,
    FCP: 5000,
    TTFB: 3000,
  };

  const maxValue = maxByMetric[label] ?? medium * 2;
  const greenWidth = (good / maxValue) * 100;
  const yellowWidth = ((medium - good) / maxValue) * 100;
  const redWidth = 100 - greenWidth - yellowWidth;

  const clampedVal = Math.min(actualVal, maxValue);
  const leftPercent = (clampedVal / maxValue) * 100;

  let indicatorColor = "#4ade80";
  if (actualVal > medium) {
    indicatorColor = "#ef4444";
  } else if (actualVal > good) {
    indicatorColor = "#facc15";
  }

  const f = (x: number) =>
    `${(x / 1000).toFixed(3).replace(/\.?0+$/, "")}s`;

  return (
    <div class="metric-block" role="group" aria-labelledby={`label-${label}`}>
      <div class="metric-label-with-info" id={`label-${label}`}>
        <strong>{label}:</strong> {format(val)}
        <InfoTooltipIsland label={label} />
      </div>

      <div
        class="metric-bar-container"
        role="img"
        aria-label={`Barra de rendimiento para ${label}, valor actual: ${format(val)}`}
      >
        <div
          class="metric-bar green"
          style={{ width: `${greenWidth}%` }}
          aria-hidden="true"
        />
        <div
          class="metric-bar yellow"
          style={{ width: `${yellowWidth}%` }}
          aria-hidden="true"
        />
        <div
          class="metric-bar red"
          style={{ width: `${redWidth}%` }}
          aria-hidden="true"
        />

        {val !== null && (
          <div
            class="metric-indicator-wrapper"
            style={{ left: `${leftPercent}%` }}
            aria-hidden="true"
          >
            <div
              class="metric-indicator-circle"
              style={{ borderColor: indicatorColor }}
            />
          </div>
        )}
      </div>

      <div class="metric-legend" role="presentation">
        <span class="legend-good">
          Bueno (≤ {f(good)}) — {distribution[0]}%
        </span>
        <span class="legend-medium">
          Necesita mejorar ({f(good)} - {f(medium)}) — {distribution[1]}%
        </span>
        <span class="legend-bad">
          Malo (≥ {f(medium)}) — {distribution[2]}%
        </span>
      </div>
    </div>
  );
}
