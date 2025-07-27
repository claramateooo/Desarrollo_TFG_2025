import { useState } from "preact/hooks";

export default function InfoTooltipIsland({ label }: { label: string }) {
  const descriptions: Record<string, string> = {
    "LCP": "Largest Contentful Paint mide cuánto tarda en cargarse el elemento visual más grande.",
    "INP": "Interaction to Next Paint evalúa la capacidad de respuesta del sitio a interacciones del usuario.",
    "CLS": "Cumulative Layout Shift mide el desplazamiento inesperado del contenido visual.",
    "FCP": "First Contentful Paint mide cuándo aparece el primer contenido DOM.",
    "TTFB": "Time to First Byte mide cuánto tarda el navegador en recibir el primer byte del servidor.",
    "CrUX": "Estas métricas se obtienen del informe de experiencia de usuario de Chrome y reflejan datos reales.",
    "CALC": "La calculadora de rendimiento permite estimar la puntuación global en base a métricas como FCP, LCP, SI, TBT y CLS, aplicando su ponderación relativa.",
    "DIAG": "Los diagnósticos indican aspectos técnicos detectados por Lighthouse que afectan el rendimiento, interactividad o carga visual. Pueden incluir tiempos, reflows, cadenas críticas, etc.",
    "A": "El nivel A es el mínimo exigido por las WCAG. Asegura accesibilidad básica en elementos clave de la web.",
    "AA": "El nivel AA es el estándar recomendado. Mejora la usabilidad general y cubre una mayor diversidad de usuarios.",
    "AAA": "El nivel AAA representa el máximo nivel de accesibilidad, cubriendo necesidades avanzadas. Es exigente y no siempre alcanzable.",
  };

  const [show, setShow] = useState(false);

  return (
    <span class="info-button-wrapper" onClick={() => setShow(!show)}>
      <button
        class="info-icon"
        aria-label={`Mostrar información sobre ${label}`}
        aria-expanded={show}
        aria-describedby={show ? `tooltip-${label}` : undefined}
      >
        i
      </button>

      {show && (
        <div
          class="tooltip"
          id={`tooltip-${label}`}
          role="tooltip"
        >
          {descriptions[label] ?? "Sin descripción"}
        </div>
      )}
    </span>
  );
}
