/** @jsxImportSource preact */
import { JSX } from "preact";
import FieldDataPanel from "../../frontend/components/Modulo1/FieldDataPanel.tsx";
import PerformanceDonut from "../../frontend/components/Modulo1/PerformanceDonut.tsx";
import WebVitalsPanel from "../../frontend/components/Modulo1/WebVitalsPanel.tsx";
import PassedAuditsSection from "../../frontend/components/Modulo1/PassedAuditsSection.tsx";

export default function ResultCard({ data }: { data: any }) {
  return (
    <div class="result-wrapper">
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
    <PerformanceDonut score={100} />
  </div>
</section>

       {/* WwebVitalsPanel */}
      {(
        <section class="section">
          <div class="card">
          <WebVitalsPanel metrics={data.metrics} />
          </div>
        </section>
      )}

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


      {/* Diagnostics */}
      {data.diagnostics?.length > 0 && (
        <section class="section">
          <h2 class="section-title card red">Diagnóstico</h2>
          <ul class="card red">
            {data.diagnostics.map((item: any) => (
              <li>
                <strong>{item.title}</strong>: {item.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Passed Audits */}
     {data.allAuditsByCategory && (
        <>
           <section class="section">
          <h2 class="section-title">Auditorías</h2>
          <div class="card-2">
          <PassedAuditsSection title="Performance" audits={data.allAuditsByCategory.performance} />
          <PassedAuditsSection title="SEO" audits={data.allAuditsByCategory.seo} />
          <PassedAuditsSection title="Accessibility" audits={data.allAuditsByCategory.accessibility} />
          <PassedAuditsSection title="Best Practices" audits={data.allAuditsByCategory["best-practices"]} />
              </div>
           </section>
        </>
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
