import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { Eye, Text, Link, Languages } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";

type Props = {
  axeResults: any;
};

const LowVisionIsland: FunctionalComponent<Props> = ({ axeResults }) => {
  const [open, setOpen] = useState(false);

  const checks = [
    {
      id: "color-contrast",
      label: "Contraste suficiente",
      icon: <Eye size={18} class="icon-eye" aria-hidden="true"/>,
    },
    {
      id: "font-size-is-readable",
      label: "Tamaño de texto legible",
      icon: <Text size={18} class="icon-eye" aria-hidden="true" />,
    },
    {
      id: "link-name",
      label: "Enlaces distinguibles",
      icon: <Link size={18} class="icon-eye" aria-hidden="true" />,
    },
    {
      id: "html-has-lang",
      label: "Idioma de la página definido",
      icon: <Languages size={18} class="icon-eye" aria-hidden="true"/>,
    },
  ];

  const hasViolation = (ids: string[]) =>
    axeResults?.violations?.some((v: any) => ids.includes(v.id));

  return (
     <div
      class="low-vision-hint-box"
      role="region"
      aria-label="Análisis para baja visión"
    >
      {/* Indicadores de cumplimiento */}
      <ul class="hint-checklist">
        <li>
          <span class={hasViolation(["color-contrast"]) ? "audit-status not-passed" : "audit-status passed"} />
          Contraste suficiente
        </li>
        <li>
          <span class={hasViolation(["font-size-is-readable", "meta-viewport-large"]) ? "audit-status not-passed" : "audit-status passed"} />
          Tamaño de texto legible
        </li>
        <li>
          <span class={hasViolation(["link-name", "link-in-text-block"]) ? "audit-status not-passed" : "audit-status passed"} />
          Enlaces distinguibles
        </li>
        <li>
          <span class={hasViolation(["html-has-lang"]) ? "audit-status not-passed" : "audit-status passed"} />
          Idioma de la página definido
        </li>
      </ul>

      {/* Caja desplegable de análisis */}
      <h3 class="section-title card" onClick={() => setOpen(!open)} style={{ cursor: "pointer", userSelect: "none" }}>
        Análisis detallado para baja visión {open ? "▲" : "▼"}
      </h3>

  {open && (
  <div class="card hint-detail-box">
    <p class="intro">
      Para personas con dificultades visuales, es fundamental que las aplicaciones web incorporen características específicas que faciliten la lectura, navegación y comprensión del contenido.
    </p>

    <div class="hint-detail-content">
      <img
        src="https://img.freepik.com/vector-premium/mujer-frustrada-gafas-entrecierra-ojos-texto-borroso-que-simboliza-desafios-problemas-vision-ella-busca-claridad-destacando-concepto-discapacidad-visual-ilustracion-vectores-personas-dibujos-animados_1016-17883.jpg"
        alt="Ilustración de dificultad visual"
        class="low-vision-image"
      />

      <div class="detail-list">
        <div class="detail-card">
          {checks[0].icon}
          <div>
            <strong>Contraste suficiente</strong>: Un contraste visual adecuado entre el texto y el fondo garantiza que el contenido sea legible en situaciones de baja visión o exposición lumínica.  
            <br /><strong>Validación técnica:</strong> Axe Core verifica este criterio mediante la regla <strong>color-contrast</strong>, que compara los valores hexadecimales y la relación de luminosidad.
          </div>
        </div>

        <div class="detail-card">
          {checks[1].icon}
          <div>
            <strong>Tamaño de texto legible</strong>: El texto debe tener un tamaño mínimo accesible y debe poder escalarse sin perder funcionalidad. Esto facilita la lectura sin necesidad de zoom excesivo.  
            <br /><strong>Validación técnica:</strong> Axe Core emplea las reglas <strong>font-size-is-readable</strong> y <strong>meta-viewport-large</strong> para evaluar si el contenido respeta las directrices de accesibilidad del texto.
          </div>
        </div>

        <div class="detail-card">
          {checks[2].icon}
          <div>
            <strong>Enlaces distinguibles</strong>: Los enlaces deben diferenciarse claramente del resto del texto mediante color, subrayado u otros estilos visuales que no dependan solo del color.  
            <br /><strong>Validación técnica:</strong> Este criterio se comprueba a través de las reglas <strong>link-name</strong> y <strong>link-in-text-block</strong>, que detectan si los enlaces son perceptibles y distinguibles en contexto.
          </div>
        </div>

        <div class="detail-card">
          {checks[3].icon}
          <div>
            <strong>Idioma de la página definido</strong>: Es imprescindible que el idioma principal esté especificado para que los lectores de pantalla interpreten correctamente el contenido.  
            <br /><strong>Validación técnica:</strong> Axe Core utiliza la regla <strong>html-has-lang</strong> para comprobar si el atributo `lang` está correctamente configurado en la etiqueta HTML principal.
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default LowVisionIsland;
