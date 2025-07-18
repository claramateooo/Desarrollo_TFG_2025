/** @jsxImportSource preact */
import { FunctionalComponent } from "preact";

type Props = {
  axeResults: any;
};

const LowVisionIsland: FunctionalComponent<Props> = ({ axeResults }) => {
  return (
    <div class="low-vision-hint-box">
      <h3>Requisitos clave para personas con baja visión</h3>
      <p class="hint-description">
        Las personas con baja visión pueden tener dificultades para leer textos pequeños, distinguir enlaces o percibir contrastes de color. Estos son los elementos esenciales para mejorar su experiencia.
      </p>
      <ul class="hint-checklist">
        <li>
          <span
            class={
              axeResults?.violations?.some((v: any) => v.id === "color-contrast")
                ? "audit-status not-passed"
                : "audit-status passed"
            }
          />
          Contraste suficiente
        </li>
        <li>
          <span
            class={
              axeResults?.violations?.some(
                (v: any) =>
                  v.id === "font-size-is-readable" || v.id === "meta-viewport-large"
              )
                ? "audit-status not-passed"
                : "audit-status passed"
            }
          />
          Tamaño de texto legible
        </li>
        <li>
          <span
            class={
              axeResults?.violations?.some(
                (v: any) => v.id === "link-name" || v.id === "link-in-text-block"
              )
                ? "audit-status not-passed"
                : "audit-status passed"
            }
          />
          Enlaces distinguibles
        </li>
        <li>
          <span
            class={
              axeResults?.violations?.some((v: any) => v.id === "html-has-lang")
                ? "audit-status not-passed"
                : "audit-status passed"
            }
          />
          Idioma de la página definido
        </li>
      </ul>
    </div>
  );
};

export default LowVisionIsland;
