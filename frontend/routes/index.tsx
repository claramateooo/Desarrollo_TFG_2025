/** @jsxImportSource preact */

// futuros módulos:
// import VisualSimulationModule ...
// import UXHeuristicModule ...
// import AIRecommendationsModule ...
// import FinalResultModule ...

import FormIsland from "../islands/FormIsland.tsx";
import TechnicalAnalysisModule from "../islands/Modulo1/TechnicalAnalysisModule.tsx";
import UXAdvisorApp from "../islands/UXAdvisorApp.tsx";

export default function Home({ data }: { data: any }) {
  return (
    <main class="page">
       <UXAdvisorApp />
    </main>
  );
}

