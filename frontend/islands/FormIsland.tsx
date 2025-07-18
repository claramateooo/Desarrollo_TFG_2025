/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { Clock } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import LoadingDonut from "./Modulo1/LoadingDonut.tsx";

type Props = {
  onResult: (data: { pageSpeedResult: any; axeResult: any }) => void;
};

export default function FormIsland({ onResult }: Props) {
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const raw = document.cookie.split("; ").find((c) => c.startsWith("history="));
    if (raw) {
      try {
        const parsed = JSON.parse(decodeURIComponent(raw.split("=")[1]));
        if (Array.isArray(parsed)) setHistory(parsed);
      } catch {
        console.warn("Historial corrupto, ignorado");
      }
    }
  }, []);

  const saveHistory = (urls: string[]) => {
    const value = encodeURIComponent(JSON.stringify(urls));
    document.cookie = `history=${value}; path=/; max-age=604800`;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setFocused(false);

    const newHistory = [url, ...history.filter((u) => u !== url)].slice(0, 8);
    setHistory(newHistory);
    saveHistory(newHistory);

    try {
      const [pageSpeedRes, axeRes] = await Promise.all([
        fetch("/api/pagespeedd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }).then((r) => r.json()),
        fetch("http://localhost:3001/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }).then((r) => r.json()),
      ]);

      onResult({ pageSpeedResult: pageSpeedRes, axeResult: axeRes });
    } catch (err) {
      console.error("❌ Error al analizar:", err);
      alert("Hubo un error al obtener los datos."+ (err instanceof Error ? err.message : "Desconocido"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container">
      <form onSubmit={handleSubmit} class="form-wrapper">
        <input
          type="url"
          value={url}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onInput={(e) => setUrl((e.target as HTMLInputElement).value)}
          placeholder="https://ejemplo.com"
          required
        />
        <button type="submit">Analizar</button>

        {focused && history.length > 0 && (
          <ul class="autocomplete-list">
            {history.map((item) => (
              <li
                class="autocomplete-item"
                onMouseDown={() => {
                  setUrl(item);
                  setFocused(false);
                }}
              >
                <Clock size={16} class="autocomplete-icon" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </form>

      {loading && (
        <div class="loading">
          <LoadingDonut />
        </div>
      )}
    </div>
  );
}
