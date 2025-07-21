import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import {
  Heading,
  Landmark,
  MousePointerClick,
  Languages,
} from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";

type Props = {
  axeResults: any;
};

const ScreenReaderIsland: FunctionalComponent<Props> = ({ axeResults }) => {
  const [open, setOpen] = useState(false);

  const checks = [
    {
      id: "page-has-heading-one",
      label: "Encabezado principal definido",
      icon: <Heading size={18} class="icon-eye" />,
    },
    {
      id: "landmark-one-main",
      label: "Estructura de regiones accesible",
      icon: <Landmark size={18} class="icon-eye" />,
    },
    {
      id: "aria-roles",
      label: "Roles correctamente asignados",
      icon: <MousePointerClick size={18} class="icon-eye" />,
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
              hasViolation(["page-has-heading-one"])
                ? "audit-status not-passed"
                : "audit-status passed"
            }
          />
          Encabezado principal definido
        </li>
        <li>
          <span
            class={
              hasViolation(["landmark-one-main", "region"])
                ? "audit-status not-passed"
                : "audit-status passed"
            }
          />
          Estructura de regiones accesible
        </li>
        <li>
          <span
            class={
              hasViolation(["aria-roles", "aria-valid-attr"])
                ? "audit-status not-passed"
                : "audit-status passed"
            }
          />
          Roles correctamente asignados
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
        Análisis detallado para lector de pantalla {open ? "▲" : "▼"}
      </h3>

      {open && (
        <div class="card hint-detail-box">
          <p class="intro">
            Para personas ciegas o con baja visión que utilizan lectores de pantalla, es esencial que la página tenga una estructura semántica clara, con etiquetas adecuadas, encabezados correctos y navegación lógica.
          </p>

          <div class="hint-detail-content">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/personas-ciegas-usan-lector-de-pantalla-11804670-9676514.png"
              alt="Ilustración uso lector de pantalla"
              class="low-vision-image"
            />

            <div class="detail-list">
              <div class="detail-card">
                {checks[0].icon}
                <div>
                  <strong>Encabezado principal definido</strong>: Toda página debe incluir un único encabezado principal (H1) para guiar la navegación estructurada.  
                  <br />
                  <strong>Validación técnica:</strong> Axe Core lo evalúa con la regla <strong>page-has-heading-one</strong>.
                </div>
              </div>

              <div class="detail-card">
                {checks[1].icon}
                <div>
                  <strong>Estructura de regiones accesible</strong>: El contenido debe estar dividido en regiones o "landmarks" (<code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, etc.) para una navegación eficiente.  
                  <br />
                  <strong>Validación técnica:</strong> Validado por <strong>landmark-one-main</strong> y <strong>region</strong>.
                </div>
              </div>

              <div class="detail-card">
                {checks[2].icon}
                <div>
                  <strong>Roles correctamente asignados</strong>: Los elementos deben tener roles ARIA apropiados para ser interpretados correctamente por los lectores.  
                  <br />
                  <strong>Validación técnica:</strong> Reglas <strong>aria-roles</strong> y <strong>aria-valid-attr</strong>.
                </div>
              </div>

              <div class="detail-card">
                {checks[3].icon}
                <div>
                  <strong>Idioma de la página definido</strong>: Ayuda a que los lectores de pantalla usen la voz adecuada para el idioma.  
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

export default ScreenReaderIsland;
