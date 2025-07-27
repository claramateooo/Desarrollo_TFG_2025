/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import { CheckCircle } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import {
  EyeOff,
  UserCog,
  Volume2,
  Sparkles,
} from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import InfoTooltipIsland from "../InfoTooltipsIsland.tsx";

type Props = {
  axeResults: any;
};

type Check = {
  id: string;
  label: string;
};

const CHECKS_BY_PROFILE: Record<string, Check[]> = {
  lowVision: [
    { id: "color-contrast", label: "Contraste suficiente" },
    { id: "font-size-is-readable", label: "Tamaño de texto legible" },
    { id: "meta-viewport-large", label: "Tamaño de texto legible" },
    { id: "link-name", label: "Enlaces distinguibles" },
    { id: "link-in-text-block", label: "Enlaces distinguibles" },
    { id: "html-has-lang", label: "Idioma de la página definido" },
  ],
  senior: [
    { id: "font-size-is-readable", label: "Tamaño de texto adecuado" },
    { id: "meta-viewport-large", label: "Tamaño de texto adecuado" },
    { id: "touch-target-size", label: "Botones accesibles" },
    { id: "no-autoplay-audio", label: "Contenido sin distracciones" },
    { id: "scrollable-region-focusable", label: "Contenido sin distracciones" },
    { id: "html-has-lang", label: "Idioma de la página definido" },
  ],
  screenReader: [
    { id: "page-has-heading-one", label: "Encabezado principal definido" },
    { id: "landmark-one-main|region", label: "Estructura de regiones accesible" },
    { id: "aria-roles|aria-valid-attr", label: "Roles correctamente asignados" },
    { id: "html-has-lang", label: "Idioma de la página definido" },
  ],
};

export default function HeuristicUXModule({ axeResults }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const failedChecks = (profile: string) => {
    const checks = CHECKS_BY_PROFILE[profile] || [];
    return checks.filter((check) => {
      const ids = check.id.split("|");
      return axeResults?.violations?.some((v: any) => ids.includes(v.id));
    });
  };

  const getComplianceLevel = (profile: string): "A" | "AA" | "AAA" => {
    const total = CHECKS_BY_PROFILE[profile]?.length || 0;
    const failed = failedChecks(profile).length;
    const passedRatio = (total - failed) / total;
    if (passedRatio === 1) return "AAA";
    if (passedRatio >= 0.7) return "AA";
    return "A";
  };

  return (
    <section class="section" aria-labelledby="ux-diagnosis-title">
      <h2
        id="ux-diagnosis-title"
        class="section-title card"
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        Módulo 3: Diagnóstico heurístico UX {open ? "▲" : "▼"}
      </h2>

      {open && (
        <div class="card" role="region" aria-label="Contenido del módulo de diagnóstico heurístico">
          <p class="empty-message">
            Tras analizar detalladamente la estructura de la página, se han identificado posibles deficiencias heurísticas que afectan a ciertos perfiles de accesibilidad. Selecciona un perfil para ver su diagnóstico específico.
          </p>

          {/* Selector de perfiles */}
          <div class="selector-container" role="group" aria-label="Selector de perfiles de accesibilidad">
            <button
              class="selector-button"
              aria-label="Ver diagnóstico de baja visión"
              onClick={() => setSelected("lowVision")}
            >
              <EyeOff size={16} /> Baja visión
            </button>
            <button
              class="selector-button"
              aria-label="Ver diagnóstico de personas mayores"
              onClick={() => setSelected("senior")}
            >
              <UserCog size={16} /> Persona mayor
            </button>
            <button
              class="selector-button"
              aria-label="Ver diagnóstico de lector de pantalla"
              onClick={() => setSelected("screenReader")}
            >
              <Volume2 size={16} /> Lector de pantalla
            </button>
          </div>

          {/* Diagnóstico del perfil seleccionado */}
          {selected && (
            <div
              class="diagnostic-box"
              role="region"
              aria-label={`Diagnóstico para el perfil ${selected}`}
            >
              <div class="compliance-level">
                Nivel de Accesibilidad Detectado:
                <strong class={`badge-${getComplianceLevel(selected)}`}>
                  {getComplianceLevel(selected)}
                </strong>
                <InfoTooltipIsland label={getComplianceLevel(selected)} />
              </div>

              <h3 class="subsection-title">
                <Sparkles size={18} /> Diagnóstico para <strong>{selected}</strong>
              </h3>

              {failedChecks(selected).length === 0 ? (
                <div class="success-card">
                  <CheckCircle size={18} /> ¡Todo está correctamente estructurado para este perfil!
                </div>
              ) : (
                <ul class="hint-checklist" aria-label="Recomendaciones a mejorar">
                  {failedChecks(selected).map((check) => (
                    <li>
                      <span class="audit-status not-passed" />
                      {check.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
