
import { h } from "preact";

interface Props {
  metrics: Record<string, string | number>;
}

export default function WebVitalsPanel({ metrics }: Props) {
  return (
    <div class="metric-panel">
      <h3 class="metric-header">Web Vitals</h3>
      <div class="metric-row">
        {Object.entries(metrics).map(([key, value]) => (
          <div class="metric-box" key={key}>
            <div class="value">{value}</div>
            <div class="label">{key.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
