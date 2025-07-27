import { useEffect, useState } from "preact/hooks";

type Props = {
  isLoaded: boolean;
};

const phrases = [
  "Preparando análisis UX...",
  "Evaluando rendimiento...",
  "Revisando heurísticas...",
  "Extrayendo métricas clave...",
  "Generando sugerencias con IA...",
  "Casi listo...",
];

export default function LoadingDonut({ isLoaded }: Props) {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (isLoaded) return 100;
        if (p >= 97) return p;
        return Math.min(p + Math.random() * 2, 97);
      });
    }, 100);

    const phraseInterval = setInterval(() => {
      setPhraseIndex((i) => (i + 1 < phrases.length ? i + 1 : i));
    }, 1600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
    };
  }, [isLoaded]);

  return (
    <div
      class="loading-container text-center p-4 relative"
      role="status"
      aria-live="polite"
      aria-label={`Progreso de análisis: ${Math.floor(progress)} por ciento. ${phrases[phraseIndex]}`}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        class="mx-auto"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="#eee" stroke-width="10" />
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

      <p class="mt-4 text-lg font-semibold" aria-hidden="true">
        {phrases[phraseIndex]}
      </p>

      <div class="bubbles" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <div class="bubble" key={i}></div>
        ))}
      </div>
    </div>
  );
}
