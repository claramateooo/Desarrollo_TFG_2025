/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import {
  Info,
  X,
  BarChart3,
  Wrench,
  Target,
} from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";

export default function WCAGInfoIsland() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        class="wcag-info-box"
        role="region"
        aria-label="Información sobre accesibilidad web"
      >
        <img
          src="/undraw_sync-files_64mj.svg"
          alt="Ilustración sobre accesibilidad web"
          class="wcag-image"
        />
        <div class="wcag-content">
          <h3 class="wcag-title">
            ¿Sabes qué son las WCAG?{" "}
            <Info
              size={18}
              aria-hidden="true"
              title="Guías de accesibilidad web"
            />
          </h3>
          <p class="wcag-description">
            Las Directrices de Accesibilidad para el Contenido Web (WCAG)
            ayudan a crear sitios más inclusivos. Aprende sobre los niveles A,
            AA y AAA, y cómo se miden.
          </p>
          <button
            class="leer-mas-button"
            onClick={() => setOpen(true)}
            aria-label="Abrir explicación detallada sobre las WCAG"
          >
            Leer más →
          </button>
        </div>
      </div>

      {open && (
        <div
          class="wcag-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-wcag-title"
          onClick={() => setOpen(false)}
        >
          <div
            class="wcag-modal"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <button
              class="wcag-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar explicación WCAG"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <h2 id="modal-wcag-title" class="modal-title">
              ¿Qué son las WCAG?
            </h2>
            <p>
              Las <strong>WCAG (Web Content Accessibility Guidelines)</strong>{" "}
              son un conjunto de pautas creadas por el W3C para asegurar que
              cualquier persona, incluidas personas con discapacidades, pueda
              acceder y usar el contenido web.
            </p>

            <h3 class="modal-subtitle">
              <span class="icon-title">
                <BarChart3 color="#2d4ecb" size={18} aria-hidden="true" />
                Niveles de conformidad
              </span>
            </h3>
            <p>Se dividen en tres niveles:</p>
            <ul class="modal-list">
              <li>
                <strong>Nivel A:</strong> Requisitos básicos. Por ejemplo, texto
                alternativo en imágenes, navegación con teclado o evitar
                parpadeos.
              </li>
              <li>
                <strong>Nivel AA:</strong> Estándar legal en muchos países.
                Mejora el contraste, uso claro del idioma y subtítulos.
              </li>
              <li>
                <strong>Nivel AAA:</strong> Nivel avanzado. Requiere máxima
                claridad, estructuras muy accesibles y contenidos fáciles de
                entender.
              </li>
            </ul>

            <h3 class="modal-subtitle">
              <span class="icon-title">
                <Wrench color="#2d4ecb" size={18} aria-hidden="true" />
                ¿Cómo se evalúan?
              </span>
            </h3>
            <p>
              Se agrupan bajo 4 principios:{" "}
              <em>Perceptible, Operable, Comprensible y Robusto (POUR)</em>. Se
              evalúan con herramientas como <code>axe-core</code>,{" "}
              <code>Lighthouse</code> o <code>WAVE</code>.
            </p>

            <h3 class="modal-subtitle">
              <span class="icon-title">
                <Target color="#2d4ecb" size={18} aria-hidden="true" />
                ¿Por qué son importantes?
              </span>
            </h3>
            <p>
              Mejoran la accesibilidad, el SEO, la usabilidad general y ayudan
              a cumplir con leyes de accesibilidad. Para sitios gubernamentales
              y esenciales, el nivel AA es obligatorio.
            </p>

            <p>
              Más información oficial en{" "}
              <a
                href="https://www.w3.org/WAI/standards-guidelines/wcag/es"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enlace a la página oficial de las WCAG en español"
              >
                www.w3.org/WAI
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
