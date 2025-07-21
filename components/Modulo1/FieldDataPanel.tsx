import { CheckCircle } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import InfoTooltipIsland from "../../islands/InfoTooltipsIsland.tsx";
import MetricBar from "./MetricBar.tsx";

export default function FieldDataPanel({ fieldData }: { fieldData: any }) {
  const format = (val: number | null) =>
    val !== null ? `${(val / 1000).toFixed(1)} s` : "No disponible";

  const isPassed = fieldData.lcp && fieldData.lcp / 1000 <= 2.5;
  const statusText = isPassed ? "Superada" : "No superada";
  const statusColor = isPassed ? "status-passed" : "status-failed";

  const thresholds = {
    lcp: [2500, 4000],
    fcp: [1800, 3000],
    inp: [200, 500],
    cls: [0.1, 0.25],
    ttfb: [800, 1800],
  };

  const distribution = {
    lcp: [96, 3, 1],
    fcp: [94, 4, 2],
    inp: [91, 5, 4],
    cls: [90, 6, 4],
    ttfb: [89, 7, 4],
  };

  return (
    <section class="section">
      <div class="metric-eval">
        <div class="icon-circle">
          <CheckCircle size={24} />
        </div>
        <span class="status-label">
          Evaluación de las Métricas web principales:
          <span class={`status-value ${statusColor}`}> {statusText}</span>
        </span>
      </div>

      <h2 class="section-title flex items-center gap-2 mt-4">
        Datos reales de usuarios (CrUX)
        <InfoTooltipIsland label="CrUX" />
      </h2>
      
      <div class="card metric-grid">
        <MetricBar label="LCP" val={fieldData.lcp} thresholds={thresholds.lcp} distribution={distribution.lcp} />
        <MetricBar label="INP" val={fieldData.inp} thresholds={thresholds.inp} distribution={distribution.inp} />
        <MetricBar label="CLS" val={fieldData.cls} thresholds={thresholds.cls} distribution={distribution.cls} />
        <MetricBar label="FCP" val={fieldData.fcp} thresholds={thresholds.fcp} distribution={distribution.fcp} />
        <MetricBar label="TTFB" val={fieldData.ttfb} thresholds={thresholds.ttfb} distribution={distribution.ttfb} />
      </div>
    </section>
  );
}
