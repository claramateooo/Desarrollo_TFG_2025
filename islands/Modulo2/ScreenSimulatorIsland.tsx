/** @jsxImportSource preact */
import { useState, useEffect } from "preact/hooks";
import {
  MonitorSpeaker,
  Volume2,
  Pause,
  ListTree,
  X,
  Loader2,
  Eye,
  ChevronDown,
  ChevronUp,
} from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import { marked } from "https://esm.sh/marked@9.1.6";

type Props = {
  axeResults: any;
  url: string;
};

const BACKEND_URL = "https://microservicionode-production.up.railway.app";

export default function ScreenReaderSimulatorIsland({ axeResults, url }: Props) {
  const [open, setOpen] = useState(false);
  const [audio] = useState(new SpeechSynthesisUtterance());
  const [treeItems, setTreeItems] = useState<string[]>([]);
  const [iaTree, setIaTree] = useState<string | null>(null);
  const [loadingIA, setLoadingIA] = useState(false);
  const [iaVisible, setIaVisible] = useState(true);
  const [loadingTree, setLoadingTree] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [accessibilitySnapshot, setAccessibilitySnapshot] = useState<any>(null);

  function renderTree(node: any, prefix = "├── "): string[] {
    if (!node) return [];
    const label = node.role + (node.name ? `: "${node.name}"` : "");
    const lines = [prefix + label];

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const subLines = renderTree(child, prefix.replace(/├──/g, "│   ") + "├── ");
        lines.push(...subLines);
      }
    }

    return lines;
  }

  useEffect(() => {
    if (!open || !url) return;

    const fetchTree = async () => {
      try {
        setLoadingTree(true);
        const res = await fetch(`${BACKEND_URL}/full-analysis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("Error al obtener árbol de accesibilidad:", errText);
          setTreeItems(["(No se pudo cargar el árbol de accesibilidad)"]);
          setLoadingTree(false);
          return;
        }

        const data = await res.json();
        const snapshot = data.snapshot;
        setAccessibilitySnapshot(snapshot);
        const lines = renderTree(snapshot);
        setTreeItems(
          lines.length === 0
            ? [
                "⚠️ No se ha podido generar el árbol de accesibilidad. Es posible que el contenido esté protegido, cargado dinámicamente o que no sea accesible mediante Puppeteer.",
              ]
            : lines
        );
      } catch (err) {
        console.error("Error al obtener el árbol accesible:", err);
        setTreeItems(["(No se pudo cargar el árbol de accesibilidad)"]);
      } finally {
        setLoadingTree(false);
      }
    };

    fetchTree();
  }, [open, url]);

  const getReadableTreeText = () =>
    treeItems.join(". ").replace(/├──/g, "").replace(/│/g, "");

  const handlePlay = () => {
    const text = getReadableTreeText();
    audio.text = text;
    audio.lang = "es-ES";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(audio);
    setIsPlaying(true);
  };

  const handlePause = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const fetchIAData = async () => {
    if (!accessibilitySnapshot) {
      setIaTree("No se ha generado el árbol de accesibilidad aún.");
      return;
    }
    setLoadingIA(true);
    const res = await fetch("/api/arbolmistral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tree: accessibilitySnapshot }),
    });

    if (res.status === 429) {
      setIaTree("Has alcanzado el límite de uso de la IA. Intenta de nuevo en unos minutos.");
    } else if (!res.ok) {
      const errText = await res.text();
      console.error("Error IA:", errText);
      setIaTree("Error al generar el árbol con IA.");
    } else {
      const data = await res.json();
      setIaTree(data.tree || "No se pudo generar el árbol simulado.");
    }

    setLoadingIA(false);
    setIaVisible(true);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div class="card screenreader-box" role="region" aria-labelledby="screenreader-title">
      <h3 id="screenreader-title" class="section-title2 icon-row">
        <MonitorSpeaker size={20} aria-hidden="true" />
        Simulador de lector de pantalla
      </h3>
      <p class="intro">
        Este módulo simula cómo un lector de pantalla puede interpretar la página.
        Puedes escuchar una lectura secuencial de los elementos accesibles y ver la estructura real detectada.
      </p>
      <button
        aria-label="Abrir detalles de simulación de pantalla"
        class="historial-button"
        onClick={() => setOpen(true)}
      >
        Ver detalles simulación <Eye size={18} aria-hidden="true" style={{ marginLeft: "0.5rem" }} />
      </button>

      {open && (
        <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal-content scrollable">
            <div class="modal-header">
              <h3 id="modal-title" class="section-title2 icon-row">
                <Volume2 size={20} aria-hidden="true" />
                Lectura simulada del contenido
              </h3>
              <button aria-label="Cerrar modal de lector de pantalla" onClick={() => setOpen(false)} class="close-button">
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <button
              aria-label={isPlaying ? "Pausar lectura del árbol" : "Iniciar lectura del árbol"}
              class="historial-button"
              onClick={isPlaying ? handlePause : handlePlay}
              style={{ marginTop: "1rem" }}
            >
              {isPlaying ? "Pausar lectura" : "Escuchar simulación lector de pantalla"}
              {isPlaying ? (
                <Pause size={18} aria-hidden="true" style={{ marginLeft: "0.5rem", marginTop: "-2px" }} />
              ) : (
                <Volume2 size={18} aria-hidden="true" style={{ marginLeft: "0.5rem", marginTop: "-2px" }} />
              )}
            </button>

            <div class="accessibility-tree" role="region" aria-labelledby="tree-label">
              <div class="tree-header">
                <div class="icon-row">
                  <ListTree size={20} aria-hidden="true" />
                  <span id="tree-label" class="tree-label">
                    Estructura accesible detectada:
                  </span>
                </div>
                <button
                  aria-label="Mostrar estructura mejorada generada por IA"
                  onClick={fetchIAData}
                  class="ia-button"
                >
                  Ver mejora propuesta por IA
                  {loadingIA && <Loader2 size={16} class="loading-spinner" aria-hidden="true" />}
                </button>
              </div>

              {loadingTree ? (
                <div class="loading-tree" aria-live="polite">
                  <Loader2 size={20} class="loading-spinner" aria-hidden="true" />
                  <span style={{ marginLeft: "0.5rem" }}>Cargando estructura accesible...</span>
                </div>
              ) : (
                <ul class="tree-list">
                  {treeItems.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}

              {iaTree && (
                <div class="ia-output" role="region" aria-labelledby="ia-title">
                  <div class="ia-header" onClick={() => setIaVisible(!iaVisible)} style={{ cursor: "pointer" }}>
                    <h4 id="ia-title" class="section-title">
                      Estructura mejorada (IA)
                    </h4>
                    {iaVisible ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
                  </div>
                  {iaVisible && (
                    <div
                      class="generated-text1"
                      dangerouslySetInnerHTML={{ __html: marked(iaTree) }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
