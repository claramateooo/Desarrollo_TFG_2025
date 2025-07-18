/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";

const phrases = [
  " Preparando análisis UX...",
  " Evaluando rendimiento...",
  " Revisando heurísticas...",
  " Extrayendo métricas clave...",
  " Generando sugerencias con IA...",
  " Casi listo...",
];

export default function LoadingDonut() {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 1 + Math.random(); // Simula una carga variable
      });
    }, 100);

    const phraseInterval = setInterval(() => {
      setPhraseIndex((i) => (i + 1 < phrases.length ? i + 1 : i));
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <div class="loading-container text-center p-4">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#eee"
          stroke-width="10"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#00c853"
          stroke-width="10"
          stroke-dasharray={`${(progress / 100) * 283}, 283`}
          transform="rotate(-90 50 50)"
        />
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dy=".3em"
          font-size="18"
          fill="#333"
        >
          {Math.floor(progress)}%
        </text>
      </svg>
      <p class="mt-4 text-lg font-semibold">{phrases[phraseIndex]}</p>
    </div>
  );
}
