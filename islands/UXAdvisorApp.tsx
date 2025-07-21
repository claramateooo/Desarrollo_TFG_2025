
import { useState, useEffect } from "preact/hooks";
import FormIsland from "./FormIsland.tsx";
import TechnicalAnalysisModule from "./Modulo1/TechnicalAnalysisModule.tsx";
import SimulationModule from "./Modulo2/SimulationModule.tsx";
import FinalModule from "./Modulo5/FinalModule.tsx";
import RecommendationsModule from "./Modulo4/RecommendationsModule.tsx";
import HeuristicUXModule from "./Modulo3/HeuristicModule.tsx";

const images = [
  "/undraw_just-browsing_0rpb.svg",
  "/undraw_experience-design_d4md.svg",
  "/undraw_pair-programming_9jyg.svg",
  "/undraw_website-builder_4go7.svg",
   "/undraw_website_zbig.svg",
];

export default function UXAdvisorApp() {
  const [data, setData] = useState<any>(null);
  const [profile, setProfile] = useState<string>("default");
  const [axeResults, setAxeResults] = useState<any>(null);
  const lighthouseScore = Math.round((data?.lighthouseResult?.categories?.performance?.score || 0) * 100);
  const [resetKey, setResetKey] = useState(0);

  const [imageIndex, setImageIndex] = useState(0);

  // Cambia de imagen cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 class="app-title">
        UX-<span class="highlight-ai">Ai</span>Visor
      </h1>
        <FormIsland
          onResult={(result: { pageSpeedResult: any; axeResult: any }) => {
            setData(result.pageSpeedResult);
            setAxeResults(result.axeResult);
          }}
            isLoaded={data !== null}
        />
      </div>

      {!data && (
  <div class="landing-wrapper">
    <div class="landing-text">
      <h2 class="landing-title">
        Evalúa la accesibilidad, el rendimiento y la experiencia de usuario de tu web
      </h2>
      <p class="landing-description">
        Con UX-AiVisor puedes analizar tu interfaz desde distintos perfiles y dispositivos
        para comprobar si tu sitio está al día con los estándares modernos.
      </p>
    </div>

    <div class="landing-image-wrapper">
      <img
        src={images[imageIndex]}
        alt="Ilustración de análisis UX"
        class="landing-image"
        loading="lazy"
      />
    </div>
  </div>
)}

      {data && (
        <>
          <TechnicalAnalysisModule data={data} resetKey={resetKey} />
          <SimulationModule
            data={data}
            axeResults={axeResults}
            onProfileChange={setProfile}
          />
          <HeuristicUXModule axeResults={axeResults} />
          <RecommendationsModule profile={profile} axeResults={axeResults} />
          <FinalModule axeResults={axeResults} lighthouseScore={lighthouseScore} />
        </>
      )}
    </div>
  );
}
