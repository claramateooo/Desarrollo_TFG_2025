import { Sparkles } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import { useState, useEffect } from "preact/hooks";
import { marked } from "https://esm.sh/marked@9.1.6";

type Props = {
  profile: string;
  axeResults: any;
};

export default function RecommendationsModule({ profile, axeResults }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const fetchRecommendation = async () => {
    setLoading(true);
    setRecommendation(null);
    try {
      const res = await fetch("/api/mistrall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, axeResults }),
      });
      const data = await res.json();
      setRecommendation(data.recommendation);
    } catch (err) {
      setRecommendation("❌ Error al generar las recomendaciones.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    const nextState = !open;
    setOpen(nextState);
    if (nextState) fetchRecommendation(); // al abrir por primera vez
  };

  // 🔁 Regenerar si cambia el análisis y ya está abierto
  useEffect(() => {
    if (open) {
      fetchRecommendation();
    }
  }, [axeResults, profile]);
   useEffect(() => {
    setOpen(false);
    setRecommendation(null);
  }, [axeResults, profile]);

  return (
    <section class="section">
      <h2
        class="section-title card"
        onClick={handleToggle}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        Módulo 4: Recomendaciones con IA {open ? "▲" : "▼"}
      </h2>

      {open && (
        <div class="card recommendation-box">
          <p class="ia-label">
            <Sparkles size={18} class="sparkle-icon" /> Recomendaciones creadas con IA
          </p>
          {loading ? (
            <p class="loading-message">Generando recomendaciones...</p>
          ) : (
            <div
              class="generated-text"
              dangerouslySetInnerHTML={{ __html: marked(recommendation || "") }}
            />
          )}
        </div>
      )}
    </section>
  );
}
