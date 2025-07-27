/** @jsxImportSource preact */
import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import {
  Text,
  Touchpad,
  Volume2,
  Languages,
  Keyboard,
} from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";

type Props = {
  axeResults: any;
};

const SeniorVisionIsland: FunctionalComponent<Props> = ({ axeResults }) => {
  const [open, setOpen] = useState(false);

  const checks = [
    {
      id: "font-size-is-readable",
      label: "Tamaño de texto adecuado",
      icon: <Text size={18} class="icon-eye" />,
    },
    {
      id: "touch-target-size",
      label: "Botones accesibles",
      icon: <Touchpad size={18} class="icon-eye" />,
    },
    {
      id: "no-autoplay-audio",
      label: "Contenido sin distracciones",
      icon: <Volume2 size={18} class="icon-eye" />,
    },
    {
      id: "html-has-lang",
      label: "Idioma de la página definido",
      icon: <Languages size={18} class="icon-eye" />,
    },
    {
      id: "keyboard-navigation-check",
      label: "Navegación por teclado clara",
      icon: <Keyboard size={18} class="icon-eye" />,
    },
  ];

  const hasViolation = (ids: string[]) =>
    axeResults?.violations?.some((v: any) => ids.includes(v.id));

  return (
    <div class="low-vision-hint-box" role="region" aria-labelledby="senior-title">
      {/* Indicadores de cumplimiento */}
      <ul class="hint-checklist">
        <li>
          <span
            class={
              hasViolation(["font-size-is-readable", "meta-viewport-large"])
                ? "audit-status not-passed"
                : "audit-status passed"
            }
            aria-hidden="true"
          />
          Tamaño de texto adecuado
        </li>
        <li>
          <span
            class={
              hasViolation(["touch-target-size"])
                ? "audit-status not-passed"
                : "audit-status passed"
            }
            aria-hidden="true"
          />
          Botones accesibles
        </li>
        <li>
          <span
            class={
              hasViolation(["no-autoplay-audio", "scrollable-region-focusable"])
                ? "audit-status not-passed"
                : "audit-status passed"
            }
            aria-hidden="true"
          />
          Contenido sin distracciones
        </li>
        <li>
          <span
            class={
              hasViolation(["html-has-lang"])
                ? "audit-status not-passed"
                : "audit-status passed"
            }
            aria-hidden="true"
          />
          Idioma de la página definido
        </li>
        <li>
          <span class="audit-status passed" aria-hidden="true" />
          Navegación por teclado clara
        </li>
      </ul>

      {/* Caja desplegable de análisis */}
      <h3
        id="senior-title"
        class="section-title card"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(!open);
        }}
        style={{ cursor: "pointer", userSelect: "none" }}
        aria-expanded={open}
        role="button"
        tabIndex={0}
      >
        Análisis detallado para personas mayores {open ? "▲" : "▼"}
      </h3>

      {open && (
        <div class="card hint-detail-box">
          <p class="intro">
            Para personas mayores, es fundamental facilitar la interacción con la web mediante textos claros, botones visibles, y evitar estímulos innecesarios que puedan confundir o distraer.
          </p>

          <div class="hint-detail-content">
            <img
              src="https://www.shutterstock.com/image-vector/couple-elderly-people-have-problem-600nw-1960838005.jpg"
              alt="Ilustración personas mayores con problemas visuales"
              class="low-vision-image"
            />

            <div class="detail-list">
              <div class="detail-card">
                {checks[0].icon}
                <div>
                  <strong>Tamaño de texto adecuado</strong>: Las personas mayores se benefician de tamaños de letra grandes y escalables.  
                  <br />
                  <strong>Validación técnica:</strong> <code>font-size-is-readable</code>, <code>meta-viewport-large</code>.
                </div>
              </div>

              <div class="detail-card">
                {checks[1].icon}
                <div>
                  <strong>Botones accesibles</strong>: Botones grandes y bien espaciados facilitan la interacción.  
                  <br />
                  <strong>Validación técnica:</strong> <code>touch-target-size</code>.
                </div>
              </div>

              <div class="detail-card">
                {checks[2].icon}
                <div>
                  <strong>Contenido sin distracciones</strong>: Se debe evitar el autoplay de audio o regiones que se desplacen solas.  
                  <br />
                  <strong>Validación técnica:</strong> <code>no-autoplay-audio</code>, <code>scrollable-region-focusable</code>.
                </div>
              </div>

              <div class="detail-card">
                {checks[3].icon}
                <div>
                  <strong>Idioma de la página definido</strong>: Permite que los lectores y navegadores interpreten el contenido correctamente.  
                  <br />
                  <strong>Validación técnica:</strong> <code>html-has-lang</code>.
                </div>
              </div>

              <div class="detail-card">
                {checks[4].icon}
                <div>
                  <strong>Navegación por teclado clara</strong>: Es esencial que todos los elementos puedan usarse sin ratón, usando <code>tab</code>, <code>Enter</code> o <code>Space</code>.  
                  <br />
                  <strong>Validación técnica:</strong> Esta verificación se realiza manualmente, comprobando que elementos interactivos tengan <code>tabIndex</code> y estados <code>:focus</code>.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeniorVisionIsland;
