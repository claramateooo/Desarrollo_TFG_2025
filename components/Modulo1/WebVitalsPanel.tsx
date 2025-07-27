import { h } from "preact";

interface Props {
  metrics: Record<string, string | number>;
}

export default function WebVitalsPanel({ metrics }: Props) {
  return (
    <section
      class="metric-panel"
      role="region"
      aria-labelledby="web-vitals-title"
    >
      <h3 id="web-vitals-title" class="metric-header">
        Web Vitals
      </h3>

      <div class="metric-row">
        {Object.entries(metrics).map(([key, value]) => (
          <div
            class="metric-box"
            key={key}
            role="group"
            aria-label={`Métrica ${key.toUpperCase()}: ${value}`}
          >
            <div class="value" aria-hidden="true">{value}</div>
            <div class="label" aria-hidden="true">{key.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
