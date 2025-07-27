/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { Eye, Star, X } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";

import TechnicalAnalysisModule from "../Modulo1/TechnicalAnalysisModule.tsx";
import SimulationModule from "../Modulo2/SimulationModule.tsx";
import HeuristicUXModule from "../Modulo3/HeuristicModule.tsx";
import RecommendationsModule from "../Modulo4/RecommendationsModule.tsx";
import FinalModule from "../Modulo5/FinalModule.tsx";

export default function HistorialIsland() {
  const [history, setHistory] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [profile, setProfile] = useState<string>("default");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) return;

    setUserEmail(storedEmail);

    const rawHistory = localStorage.getItem(`analysisHistory_${storedEmail}`);
    if (rawHistory) {
      try {
        const parsed = JSON.parse(rawHistory);
        if (Array.isArray(parsed)) setHistory(parsed);
      } catch {
        console.warn("Historial corrupto");
      }
    }

    const rawFavs = localStorage.getItem(`analysisFavorites_${storedEmail}`);
    if (rawFavs) {
      try {
        const parsed = JSON.parse(rawFavs);
        if (Array.isArray(parsed)) setFavorites(parsed);
      } catch {
        console.warn("Favoritos corruptos");
      }
    }
  }, []);

  const handleVerAnalisis = (entry: any) => setSelectedData(entry);

  const toggleFavorite = (url: string) => {
    if (!userEmail) return;

    let updated = [...favorites];
    const idx = updated.indexOf(url);
    if (idx !== -1) {
      updated.splice(idx, 1);
    } else {
      updated = [url, ...updated].slice(0, 10);
    }

    localStorage.setItem(`analysisFavorites_${userEmail}`, JSON.stringify(updated));
    setFavorites(updated);
  };

  const isFavorito = (url: string) => favorites.includes(url);

  return (
    <div class="historial-container">
      <h2 id="historial-title" class="section-title">Búsquedas Recientes</h2>

      {history.length === 0 ? (
        <p role="status" style={{ marginTop: "1rem", color: "#555" }}>
          No hay historial disponible. Analiza una web para empezar.
        </p>
      ) : (
        <ul class="historial-list">
          {history.map((entry, index) => (
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
                  Ver análisis{" "}
                  <Eye size={18} color="#3b82f6" style={{ marginLeft: "0.3rem" }} />
                </button>
                <button
                  onClick={() => toggleFavorite(entry.url)}
                  class="historial-button"
                  aria-label={
                    isFavorito(entry.url)
                      ? `Eliminar ${entry.url} de favoritos`
                      : `Añadir ${entry.url} a favoritos`
                  }
                >
                  <Star
                    size={20}
                    color={isFavorito(entry.url) ? "#facc15" : "#d1d5db"}
                    fill={isFavorito(entry.url) ? "#facc15" : "none"}
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
          aria-labelledby="modal-analysis-title"
        >
          <div class="modal-content scrollable">
            <div class="modal-header">
              <h3 id="modal-analysis-title">
                <span class="section-heading">Análisis para:</span>{" "}
                <span class="section-title">{selectedData.url}</span>
              </h3>
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
