/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { Eye, Star, X } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import TechnicalAnalysisModule from "../Modulo1/TechnicalAnalysisModule.tsx";
import SimulationModule from "../Modulo2/SimulationModule.tsx";
import HeuristicUXModule from "../Modulo3/HeuristicModule.tsx";
import RecommendationsModule from "../Modulo4/RecommendationsModule.tsx";
import FinalModule from "../Modulo5/FinalModule.tsx";

export default function FavoritesIsland() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [profile, setProfile] = useState<string>("default");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) return;

    setUserEmail(storedEmail);

    const favRaw = localStorage.getItem(`analysisFavorites_${storedEmail}`);
    if (favRaw) {
      try {
        const parsed = JSON.parse(favRaw);
        if (Array.isArray(parsed)) setFavorites(parsed);
      } catch {
        console.warn("Favoritos corruptos");
      }
    }

    const histRaw = localStorage.getItem(`analysisHistory_${storedEmail}`);
    if (histRaw) {
      try {
        const parsed = JSON.parse(histRaw);
        if (Array.isArray(parsed)) setHistory(parsed);
      } catch {
        console.warn("Historial corrupto");
      }
    }
  }, []);

  const favoritosCompletos = history.filter((h) => favorites.includes(h.url));

  const handleVerAnalisis = (entry: any) => setSelectedData(entry);

  const toggleFavorite = (url: string) => {
    if (!userEmail) return;

    const updated = favorites.includes(url)
      ? favorites.filter((f) => f !== url)
      : [url, ...favorites].slice(0, 10);

    setFavorites(updated);
    localStorage.setItem(`analysisFavorites_${userEmail}`, JSON.stringify(updated));
  };

  return (
    <div class="historial-container">
      {favoritosCompletos.length === 0 ? (
        <p role="status" style={{ marginTop: "1rem", color: "#6b7280" }}>
          Aún no tienes análisis guardados como favoritos.
        </p>
      ) : (
        <ul class="historial-list">
          {favoritosCompletos.map((entry, index) => (
            <li key={index} class="historial-item card">
              <div class="historial-info">
                <strong>Búsqueda:</strong> {entry.url}
              </div>
              <div class="historial-actions">
                <button
                  onClick={() => handleVerAnalisis(entry)}
                  class="historial-button"
                  aria-label={`Ver análisis de ${entry.url}`}
                >
                  Ver análisis <Eye size={18} color="#3b82f6" style={{ marginLeft: "0.3rem" }} />
                </button>
                <button
                  onClick={() => toggleFavorite(entry.url)}
                  class="historial-button"
                  aria-label="Quitar de favoritos"
                >
                  <Star
                    size={20}
                    color="#facc15"
                    fill="#facc15"
                    style={{ verticalAlign: "middle" }}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedData && (
        <div
          class="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div class="modal-content scrollable">
            <div class="modal-header">
              <h3 id="modal-title">Análisis para: {selectedData.url}</h3>
              <button
                onClick={() => setSelectedData(null)}
                class="close-button"
                aria-label="Cerrar análisis"
              >
                <X size={22} />
              </button>
            </div>

            <TechnicalAnalysisModule data={selectedData.pageSpeedResult} resetKey={0} />
            <SimulationModule
              data={selectedData.pageSpeedResult}
              axeResults={selectedData.axeResult}
              onProfileChange={setProfile}
            />
            <HeuristicUXModule axeResults={selectedData.axeResult} />
            <RecommendationsModule profile={profile} axeResults={selectedData.axeResult} />
            <FinalModule
              axeResults={selectedData.axeResult}
              lighthouseScore={Math.round(
                (selectedData.pageSpeedResult?.lighthouseResult?.categories?.performance?.score || 0) * 100
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
