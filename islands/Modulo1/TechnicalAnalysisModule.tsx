import { useEffect, useState } from "preact/hooks";
import ResultCard from "./ResultCard.tsx";

export default function TechnicalAnalysisModule({ data, resetKey }: { data: any; resetKey: number }) {
  const [open, setOpen] = useState(false);
    useEffect(() => {
      setOpen(false);
    }, [resetKey]);

  return (
      <section
      class="section"
      role="region"
      aria-label="Módulo 1: Análisis técnico"
    >
      <h2
        class="section-title card"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        Módulo 1: Análisis técnico {open ? "▲" : "▼"}
      </h2>

      {open && (
        <div class="card">
          <ResultCard data={data} />
        </div>
      )}
    </section>
  );
}
