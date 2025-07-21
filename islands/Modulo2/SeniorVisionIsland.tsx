import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import {
  Text,
  Touchpad,
  Volume2,
  LayoutGrid,
  Languages,
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
  ];

  const hasViolation = (ids: string[]) =>
    axeResults?.violations?.some((v: any) => ids.includes(v.id));

  return (
    <div class="low-vision-hint-box">
      {/* Indicadores de cumplimiento */}
      <ul class="hint-checklist">
        <li>
          <span
            class={
              hasViolation(["font-size-is-readable", "meta-viewport-large"])
                ? "audit-status not-passed"
                : "audit-status passed"
            }
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
          />
          Idioma de la página definido
        </li>
      </ul>

      {/* Caja desplegable de análisis */}
      <h3
        class="section-title card"
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer", userSelect: "none" }}
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
                  <strong>Tamaño de texto adecuado</strong>: Las personas mayores suelen beneficiarse de tamaños de letra grandes y escalables que no requieran zoom manual.  
                  <br />
                  <strong>Validación técnica:</strong> Axe Core lo evalúa con las reglas <strong>font-size-is-readable</strong> y <strong>meta-viewport-large</strong>.
                </div>
              </div>

              <div class="detail-card">
                {checks[1].icon}
                <div>
                  <strong>Botones accesibles</strong>: Es recomendable ofrecer botones grandes, con buen espaciado y claramente identificables.  
                  <br />
                  <strong>Validación técnica:</strong> Se analiza mediante <strong>touch-target-size</strong>, que mide el área clicable.
                </div>
              </div>

              <div class="detail-card">
                {checks[2].icon}
                <div>
                  <strong>Contenido sin distracciones</strong>: Evitar animaciones, sonidos automáticos o regiones de scroll inesperado mejora el enfoque de los usuarios mayores.  
                  <br />
                  <strong>Validación técnica:</strong> Axe Core usa reglas como <strong>no-autoplay-audio</strong> y <strong>scrollable-region-focusable</strong>.
                </div>
              </div>

              <div class="detail-card">
                {checks[3].icon}
                <div>
                  <strong>Idioma de la página definido</strong>: Es importante que los navegadores o asistentes puedan interpretar correctamente el idioma mostrado.  
                  <br />
                  <strong>Validación técnica:</strong> Evaluado con <strong>html-has-lang</strong>.
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
