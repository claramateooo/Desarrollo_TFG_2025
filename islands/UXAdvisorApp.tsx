/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import FormIsland from "./FormIsland.tsx";
import TechnicalAnalysisModule from "./Modulo1/TechnicalAnalysisModule.tsx";
import SimulationModule from "./Modulo2/SimulationModule.tsx";

export default function UXAdvisorApp() {
  const [data, setData] = useState<any>(null);
  const [profile, setProfile] = useState<string>("default");
  const [axeResults, setAxeResults] = useState<any>(null);

  return (
    <div>
      <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 class="app-title">UX-AiVisor</h1>
        <FormIsland
          onResult={(result: { pageSpeedResult: any; axeResult: any }) => {
            console.log("✅ Resultado recibido:", result);
            setData(result.pageSpeedResult);      // Datos PageSpeed
            setAxeResults(result.axeResult);      // Datos Axe
          }}
        />
      </div>

      {data && (
        <>
          <TechnicalAnalysisModule data={data} />
          <SimulationModule
            data={data}
            axeResults={axeResults}
            onProfileChange={setProfile}
          />
        </>
      )}
    </div>
  );
}
