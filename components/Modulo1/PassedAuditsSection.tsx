import { useState } from "preact/hooks";

export default function PassedAuditsSection({
  title,
  audits,
}: {
  title: string;
  audits: { title: string; passed: boolean }[];
}) {
  const [open, setOpen] = useState(false);

  if (!audits.length) return null;

  return (
    <section class="section">
      <h2
        class="section-title card"
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        {title} {open ? "▲" : "▼"}
      </h2>
      {open && (
        <ul class="audit-list">
          {audits.map((item) => (
            <li class="audit-row">
              <span
                class={`audit-status ${item.passed ? "passed" : "not-passed"}`}
              />
              <span class="audit-title">{item.title}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
