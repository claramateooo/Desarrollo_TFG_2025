/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import LowVisionIsland from "./LowVisionIsland.tsx";
import ProfileSelector from "../../frontend/components/Modulo2/ProfileSelector.tsx";
import ResultsAxe from "./ResultsAxe.tsx";

type SimulationModuleProps = {
  data: {
    screenshot: string;
  };
  onProfileChange: (profile: string) => void;
  axeResults?: any;
};

export default function SimulationModule({ data, onProfileChange, axeResults }: SimulationModuleProps) {
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("default");

  const handleChange = (value: string) => {
    setSelectedProfile(value);
    onProfileChange(value);
  };

  return (
    <section class="section">
      <h2
        class="section-title card"
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        Módulo 2: Simulación visual {open ? "▲" : "▼"}
      </h2>

      {open && (
        <div class="card">
          <ProfileSelector selected={selectedProfile} onChange={handleChange} />

          <div class="simulated-image-box">
            <div class="simulated-image-wrapper">
              <img
                src={data.screenshot}
                alt={`Simulación para perfil ${selectedProfile}`}
                class={`simulated-image ${selectedProfile}`}
              />
              {selectedProfile === "lowVision" && (
                <div class="card simulated-zoom-card">
                  <div class="zoom-card">
                    <img src={data.screenshot} alt="Vista aumentada" class="zoomed-snippet" />
                  </div>
                  <div class="zoom-caption-box">
                    Asegúrate de que los componentes clave sean legibles: tipografía grande, alto contraste, fondo claro.
                  </div>
                </div>
              )}
            </div>
            <p class="simulated-label">
              Simulación visual para: <strong>{selectedProfile}</strong>
            </p>
          </div>

          {/* BLOQUE FIJO GENERAL */}
          {axeResults && (
          <ResultsAxe axeResults={axeResults} />
)}

          {/* BLOQUE DINÁMICO PARA LOW VISION */}
            {selectedProfile === "lowVision" && axeResults && (
            <LowVisionIsland axeResults={axeResults} />
          )}
        </div>
      )}
    </section>
  );
}
