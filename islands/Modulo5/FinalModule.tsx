import { useState, useEffect } from "preact/hooks";

type Props = {
  axeResults: any;
  lighthouseScore: number;
};

const explanations: Record<string, string> = {
  accesibilidad:
    "Se calcula a partir del porcentaje de comprobaciones accesibles que no generan errores en el análisis Axe.",
  interfaz:
    "Se basa directamente en el Lighthouse Score de rendimiento técnico multiplicado por 100.",
  adaptabilidad:
    "Penaliza la presencia de errores críticos de accesibilidad. Cada uno resta 15 puntos.",
};

export default function FinalModule({ axeResults, lighthouseScore }: Props) {
  const [open, setOpen] = useState(false);
  const [scores, setScores] = useState({
    accesibilidad: 0,
    interfaz: 0,
    adaptabilidad: 0,
  });

  useEffect(() => {
    if (!axeResults) return;

    const violations = axeResults.violations?.length || 0;
    const incomplete = axeResults.incomplete?.length || 0;
    const passes = axeResults.passes?.length || 0;
    const totalChecks = violations + incomplete + passes;

    const violationRatio = totalChecks > 0 ? violations / totalChecks : 0;
    const accesibilidad = Math.max(0, Math.round((1 - violationRatio) * 100));

    const criticalIssues =
      axeResults.violations?.filter((v: any) => v.impact === "critical")
        .length || 0;
    const adaptabilidad = Math.max(0, 100 - criticalIssues * 15);

    const interfaz = Math.round((lighthouseScore || 0.8) * 100);

    setScores({
      accesibilidad: Math.min(accesibilidad, 100),
      interfaz: Math.min(interfaz, 100),
      adaptabilidad: Math.min(adaptabilidad, 100),
    });
  }, [axeResults, lighthouseScore]);

  return (
    <section class="section" aria-labelledby="final-title">
      <h2
        id="final-title"
        class="section-title card"
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        Módulo 5: Resultado final {open ? "▲" : "▼"}
      </h2>

      {open && (
        <div
          class="card final-score-box"
          role="region"
          aria-labelledby="final-title"
          aria-describedby="final-summary"
        >
          <p class="ia-label" id="final-summary">📊 Evaluación UX Global</p>

          <div class="score-grid">
            {Object.entries(scores).map(([key, value]) => (
              <div class="score-card" key={key}>
                <div class="hover-container">
                  <p class="score-title" aria-describedby={`desc-${key}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                  <div id={`desc-${key}`} class="score-hover-box">
                    {explanations[key]}
                  </div>
                </div>
                <div
                  class={`score-circle ${key}-score`}
                  role="img"
                  aria-label={`${key} ${value} sobre 100`}
                >
                  <span>{value}/100</span>
                </div>
              </div>
            ))}
          </div>

          <p class="empty-message">
            Estas puntuaciones se calculan en base al análisis técnico (Lighthouse) y accesible (Axe).
          </p>
        </div>
      )}
    </section>
  );
}
