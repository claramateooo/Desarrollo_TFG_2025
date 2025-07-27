/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import ProfileSelector from "../../components/Modulo2/ProfileSelector.tsx";
import ResultsAxe from "./ResultsAxe.tsx";
import LowVisionIsland from "./LowVisionIsland.tsx";
import { Sparkles } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import SeniorVisionIsland from "./SeniorVisionIsland.tsx";
import ScreenReaderIsland from "./ScreenReaderIsland.tsx";
import ScreenReaderSimulatorIsland from "./ScreenSimulatorIsland.tsx";
import ScreenSimulatorIsland from "./ScreenSimulatorIsland.tsx";

type SimulationModuleProps = {
  data: {
    screenshot: string;
  };
  onProfileChange: (profile: string) => void;
  axeResults?: any;
  url?: string;
};

export default function SimulationModule({
  data,
  onProfileChange,
  axeResults,
  url,
}: SimulationModuleProps) {
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("default");

  const handleChange = (value: string) => {
    setSelectedProfile(value);
    onProfileChange(value);
  };

  return (
    <section class="section" aria-labelledby="simulation-module-title">
      <h2
        id="simulation-module-title"
        class="section-title card"
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: "pointer", userSelect: "none" }}
        role="button"
        aria-expanded={open}
        tabIndex={0}
      >
        Módulo 2: Simulación visual {open ? "▲" : "▼"}
      </h2>

      {open && (
        <div class="card">
          <ProfileSelector selected={selectedProfile} onChange={handleChange} />

          <div class="simulated-image-box" role="region" aria-label="Simulación visual">
            <div class="simulated-image-wrapper">
              <img
                src={data.screenshot}
                alt={`Simulación para perfil ${selectedProfile}`}
                class={`simulated-image ${selectedProfile}`}
              />

              {selectedProfile === "lowVision" && (
                <div class="card simulated-zoom-card" role="region" aria-label="Vista aumentada para baja visión">
                  <div class="zoom-card">
                    <img
                      src={data.screenshot}
                      alt="Vista aumentada"
                      class="zoomed-snippet"
                    />
                  </div>
                  <div class="zoom-caption-box">
                    Asegúrate de que los componentes clave sean legibles: tipografía grande, alto contraste, fondo claro.
                  </div>
                </div>
              )}

              {selectedProfile === "senior" && (
                <div class="card simulated-zoom-card" role="region" aria-label="Recomendación visual para personas mayores">
                  <div class="zoom-caption-box">
                    Se recomienda utilizar <strong>tonos cálidos suaves</strong> (como crema o beige), que reducen la fatiga visual y mejoran la experiencia para personas mayores al crear un entorno visual más amigable y legible.
                  </div>
                </div>
              )}

              {selectedProfile === "screenReader" && (
                <div class="card simulated-zoom-card" role="region" aria-label="Recomendación para lector de pantalla">
                  <div class="zoom-caption-box">
                    Para usuarios de <strong>lectores de pantalla</strong>, es fundamental que la web esté correctamente estructurada: encabezados jerárquicos, etiquetas semánticas, roles ARIA y navegación clara sin depender de elementos visuales.
                  </div>
                </div>
              )}
            </div>
            <p class="simulated-label">
              Sugerencia visual <Sparkles size={18} class="sparkle-icon" />: <strong>{selectedProfile}</strong>
            </p>
          </div>

          {/* BLOQUE DINÁMICO PARA LOW VISION */}
          {selectedProfile === "lowVision" && axeResults && (
            <LowVisionIsland axeResults={axeResults} />
          )}

          {/* BLOQUE DINÁMICO PARA PERSONA MAYOR */}
          {selectedProfile === "senior" && axeResults && (
            <SeniorVisionIsland axeResults={axeResults} />
          )}

          {/* BLOQUE DINÁMICO PARA LECTOR DE PANTALLA */}
          {selectedProfile === "screenReader" && axeResults && url && (
            <>
              <ScreenReaderIsland axeResults={axeResults} />
              <ScreenSimulatorIsland axeResults={axeResults} url={url} />
            </>
          )}

          {/* BLOQUE FIJO GENERAL */}
          {axeResults && <ResultsAxe axeResults={axeResults} />}
        </div>
      )}
    </section>
  );
}
