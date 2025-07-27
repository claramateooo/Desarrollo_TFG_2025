import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { AlertCircle, HelpCircle, CheckCircle } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";

type Props = {
  axeResults: any;
};

const renderList = (items: any[]) => (
  <ul class="result-list">
    {items.map((item) => (
      <li key={item.id}>
        <strong>{item.id}</strong>: {item.description}
      </li>
    ))}
  </ul>
);

const ResultsAxe: FunctionalComponent<Props> = ({ axeResults }) => {
  const [open, setOpen] = useState(false);
  const violations = axeResults?.violations || [];
  const incomplete = axeResults?.incomplete || [];
  const passes = axeResults?.passes || [];

  return (
    <div class="results-axe-box" role="region" aria-label="Resultados de análisis AxeCore">
      <h2
        class="section-title card"
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: "pointer", userSelect: "none" }}
        aria-expanded={open}
        aria-controls="axe-results-panel"
      >
        Resultados AxeCore {open ? "▲" : "▼"}
      </h2>

      {open && (
        <div class="card axe-card" id="axe-results-panel">
          <div class="summary-section">
            <h4 class="summary-title error">
              <AlertCircle size={18} aria-hidden="true" /> Errores de accesibilidad
            </h4>
            {violations.length === 0 ? (
              <p>No se han detectado errores graves 🎉</p>
            ) : (
              <>
                <p>{violations.length} elementos con errores graves detectados:</p>
                {renderList(violations)}
              </>
            )}
          </div>

          <div class="summary-section">
            <h4 class="summary-title incomplete">
              <HelpCircle size={18} aria-hidden="true" /> Partes del análisis no concluyentes
            </h4>
            {incomplete.length === 0 ? (
              <p>Todo ha podido evaluarse correctamente.</p>
            ) : (
              <>
                <p>{incomplete.length} elementos no concluyentes:</p>
                {renderList(incomplete)}
              </>
            )}
          </div>

          <div class="summary-section">
            <h4 class="summary-title passes">
              <CheckCircle size={18} aria-hidden="true" /> Reglas cumplidas
            </h4>
            {passes.length === 0 ? (
              <p>No se han validado reglas exitosamente.</p>
            ) : (
              <>
                <p>{passes.length} criterios de accesibilidad se cumplen correctamente:</p>
                {renderList(passes)}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsAxe;
