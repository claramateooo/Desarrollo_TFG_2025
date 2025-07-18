/** @jsxImportSource preact */
import { FunctionalComponent } from "preact";

type Props = {
  axeResults: any;
};

const ResultsAxe: FunctionalComponent<Props> = ({ axeResults }) => {
      console.log("DEBUG axeResults in ResultsAxe:", axeResults); // ← Añade esto
  return (
    <div class="accessibility-summary">
      <h3>Resultados generales de accesibilidad</h3>

      <div class="summary-section">
        <strong>Errores de accesibilidad (violations):</strong>
        <p>{axeResults?.violations?.length || 0} elementos con errores graves detectados.</p>
      </div>

      <div class="summary-section">
        <strong>Partes del análisis no concluyentes (incomplete):</strong>
        <p>{axeResults?.incomplete?.length || 0} elementos no pudieron ser evaluados con certeza.</p>
      </div>

      <div class="summary-section">
        <strong>Reglas cumplidas (passes):</strong>
        <p>{axeResults?.passes?.length || 0} criterios de accesibilidad se cumplen correctamente.</p>
      </div>
    </div>
  );
};

export default ResultsAxe;
