import FieldDataPanel from "../../components/Modulo1/FieldDataPanel.tsx";
import PerformanceDonut from "../../components/Modulo1/PerformanceDonut.tsx";
import WebVitalsPanel from "../../components/Modulo1/WebVitalsPanel.tsx";
import PassedAuditsSection from "../../components/Modulo1/PassedAuditsSection.tsx";
import InfoTooltipIsland from "../InfoTooltipsIsland.tsx";
import { useState } from "preact/hooks";

export default function ResultCard({ data }: { data: any }) {
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  return (
    <div class="result-wrapper">
      {/* Diagnostics */}
      {data.diagnostics?.length > 0 && (
        <section class="section">
          <h2
            class="section-title card"
            onClick={() => setDiagnosticsOpen(!diagnosticsOpen)}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            Diagnóstico <InfoTooltipIsland label="DIAG" />
            {diagnosticsOpen ? " ▲" : " ▼"}
          </h2>

          {diagnosticsOpen && (
            <ul class="diagnostics-list card">
              {data.diagnostics.map((item: any) => (
                <li class="diagnostic-item">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <FieldDataPanel fieldData={data.fieldData} />

      {/* Scores */}
      <section class="section">
        <h2 class="section-title">Puntuaciones</h2>
        <div class="score-donut-panel">
          <div class="score-cards-inside">
            {Object.entries(data.scores).map(([key, value]) => (
              <Score title={capitalize(key)} value={value as number | null} />
            ))}
          </div>
          <PerformanceDonut  score={data.scores.performance ?? 0} />
        </div>
      </section>

      {/* WebVitals Panel */}
      <section class="section">
        <h2 class="section-title">WebVitals Panel (Lighthouse)</h2>
        <div class="card">
          <WebVitalsPanel metrics={data.metrics} />
        </div>
      </section>

      {/* Screenshot */}
      {data.screenshot && (
        <section class="section">
          <h2 class="section-title">Captura de pantalla</h2>
          <div class="card">
            <img src={data.screenshot} alt="Final screenshot" class="screenshot" />
          </div>
        </section>
      )}

      {/* Opportunities */}
      {data.opportunities?.length > 0 && (
        <section class="section">
          <h2 class="section-title">Oportunidades de mejora</h2>
          <div class="opportunity-grid">
            {data.opportunities.map((item: any) => (
              <div class="opportunity-card">
                <div class="opportunity-title">{item.title}</div>
                <div class="opportunity-savings">{item.savings}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Passed Audits */}
      {data.allAuditsByCategory && (
        <section class="section">
          <h2 class="section-title">Auditorías</h2>
          <div class="card-2">
            <PassedAuditsSection title="Performance" audits={data.allAuditsByCategory.performance} />
            <PassedAuditsSection title="SEO" audits={data.allAuditsByCategory.seo} />
            <PassedAuditsSection title="Accessibility" audits={data.allAuditsByCategory.accessibility} />
            <PassedAuditsSection title="Best Practices" audits={data.allAuditsByCategory["best-practices"]} />
          </div>
        </section>
      )}
    </div>
  );
}

function Score({ title, value }: { title: string; value: number | null }) {
  const getColorClass = () => {
    if (value === null) return "score-gray";
    if (value >= 90) return "score-green";
    if (value >= 50) return "score-yellow";
    return "score-red";
  };

  return (
    <div class="score-card">
      <p class="score-title">{title}</p>
      <p class={`score-value ${getColorClass()}`}>
        {value !== null ? `${value}/100` : "–"}
      </p>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
