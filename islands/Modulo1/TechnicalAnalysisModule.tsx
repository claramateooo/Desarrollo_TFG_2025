/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import ResultCard from "./ResultCard.tsx";

export default function TechnicalAnalysisModule({ data }: { data: any }) {
  const [open, setOpen] = useState(false);

  return (
    <section class="section">
      <h2
        class="section-title card"
        onClick={() => setOpen((o) => !o)}
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
