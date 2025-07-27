import { useState } from "preact/hooks";
import InfoTooltipIsland from "../../islands/InfoTooltipsIsland.tsx";

const segments = [
  { label: "FCP", color: "#00c853" },
  { label: "LCP", color: "#00c853" },
  { label: "CLS", color: "#00c853" },
  { label: "TBT", color: "#00c853" },
  { label: "SI",  color: "#00c853" },
];

export default function PerformanceDonut({ score }: { score: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      class="card metric-grid"
      role="region"
      aria-label="Gráfico de rendimiento web"
    >
      <div class="score-wrapper">
        <div
          class="donut-container"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-hidden="true"
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 140 140"
            style="overflow: visible;"
            role="img"
            aria-label={`Puntuación de rendimiento ${score} sobre 100`}
          >
            <title>{`Puntuación de rendimiento: ${score}`}</title>
            <desc>
              {hovered
                ? "Segmentos individuales con etiquetas: FCP, LCP, CLS, TBT y SI"
                : "Anillo con porcentaje de puntuación general"}
            </desc>

            <circle
              cx="70"
              cy="70"
              r="50"
              class="donut-background"
              fill="rgba(0, 200, 83, 0.1)"
            />

            {hovered ? (
              <>
                {segments.map((s, i) => {
                  const angle = (360 / segments.length) * i;
                  return (
                    <circle
                      key={i}
                      cx="70"
                      cy="70"
                      r="50"
                      fill="none"
                      stroke={s.color}
                      strokeWidth="8"
                      strokeDasharray="62.8 251.2"
                      transform={`rotate(${angle - 90} 70 70)`}
                      strokeLinecap="round"
                      aria-hidden="true"
                    />
                  );
                })}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#00c853"
                  strokeWidth="2"
                  aria-hidden="true"
                />
                {segments.map((s, i) => {
                  const angle = (2 * Math.PI * i) / segments.length;
                  const x = 70 + Math.cos(angle) * 60;
                  const y = 70 + Math.sin(angle) * 60;
                  return (
                    <text
                      key={i}
                      x={x}
                      y={y}
                      text-anchor="middle"
                      dominant-baseline="middle"
                      class="donut-label"
                      fill="#00c853"
                      font-weight="bold"
                      font-size="10"
                      aria-hidden="true"
                    >
                      {s.label}
                    </text>
                  );
                })}
              </>
            ) : (
              <circle
                cx="70"
                cy="70"
                r="50"
                fill="none"
                stroke="#00c853"
                strokeWidth="8"
                strokeDasharray={`${(score / 100) * 314}, 314`}
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
              />
            )}

            <text
              x="70"
              y="73"
              text-anchor="middle"
              dominant-baseline="middle"
              class="donut-score"
            >
              {score}
            </text>
          </svg>
        </div>

        <h2 class="score-title">Rendimiento</h2>

        <p class="score-description">
          Los valores son estimaciones y pueden variar.{" "}
          <a
            href="https://developer.chrome.com/docs/lighthouse/performance/performance-scoring?utm_source=lighthouse&utm_medium=lr&hl=es-419"
            target="_blank"
            rel="noopener noreferrer"
          >
            La puntuación del rendimiento se calcula
          </a>{" "}
          a partir de métricas como FCP, LCP o TBT.{" "}
          <a
            href="https://googlechrome.github.io/lighthouse/scorecalc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver calculadora
          </a>
          <InfoTooltipIsland label="CALC" />
        </p>

        <div class="score-legend">
          <span class="legend-item">
            <span class="legend-dot red" aria-hidden="true" /> 0–49
          </span>
          <span class="legend-item">
            <span class="legend-dot yellow" aria-hidden="true" /> 50–89
          </span>
          <span class="legend-item">
            <span class="legend-dot green" aria-hidden="true" /> 90–100
          </span>
        </div>
      </div>
    </div>
  );
}
