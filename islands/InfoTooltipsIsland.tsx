/** @jsxImportSource preact */
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

  };

  const [show, setShow] = useState(false);

  return (
    <span class="info-button-wrapper" onClick={() => setShow(!show)}>
      <button class="info-icon">i</button>
      {show && (
        <div class="tooltip">{descriptions[label] ?? "Sin descripción"}</div>
      )}
    </span>
  );
}
