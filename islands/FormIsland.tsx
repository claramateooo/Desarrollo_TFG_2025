import { useEffect, useState } from "preact/hooks";
import { Clock } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import LoadingDonut from "./Modulo1/LoadingDonut.tsx";

const BACKEND_URL = "https://microservicionode-production.up.railway.app";

type Props = {
  onResult: (data: { pageSpeedResult: any; axeResult: any }) => void;
    isLoaded: boolean; 
};

export default function FormIsland({ onResult,isLoaded }: Props) {
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState<null | "heavy">();
  const [loadingKey, setLoadingKey] = useState(0);
  const [isLoadedInternal, setIsLoadedInternal] = useState(false);

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
    setLoadingKey((prev) => prev + 1)
    setLoading(true);
    setIsLoadedInternal(false); 
    setFocused(false);
    setErrorType(null);

    const newHistory = [url, ...history.filter((u) => u !== url)].slice(0, 8);
    setHistory(newHistory);
    saveHistory(newHistory);

    try {
      new URL(url);
    } catch {
      alert("La URL introducida no es válida.");
      setLoading(false);
      return;
    }

    const fetchAxeData = async (): Promise<any> => {
      const res = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const text = await res.text();
      console.log("Respuesta cruda de /analyze:", text);

      if (!res.ok) {
        throw new Error(`Servidor respondió con error ${res.status}`);
      }

      try {
        return JSON.parse(text);
      } catch (err) {
        console.error("Error parseando JSON:", err);
        throw new Error("Respuesta no válida del servidor de accesibilidad");
      }
    };

    try {
      console.log("Enviando URL a analizar:", url);

      const [pageSpeedRes, axeRes] = await Promise.all([
        fetch("/api/pagespeedd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }).then(async (r) => {
          const text = await r.text();
          try {
            return JSON.parse(text);
          } catch {
            throw new Error("Respuesta no válida del servidor de rendimiento");
          }
        }),
        (async () => {
          try {
            return await fetchAxeData();
          } catch (err) {
            console.warn("Primer intento fallido, reintentando...");
            await new Promise((r) => setTimeout(r, 2000));
            return await fetchAxeData();
          }
        })(),
      ]);

      onResult({ pageSpeedResult: pageSpeedRes, axeResult: axeRes });
      setIsLoadedInternal(true);
    } catch (err) {
      console.error("Error al analizar:", err);
      setErrorType("heavy");
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
          onInput={(e) => {
            setUrl((e.target as HTMLInputElement).value);
            setErrorType(null);
          }}
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
          <LoadingDonut   key={loadingKey} isLoaded={isLoadedInternal} />
        </div>
      )}

      {errorType === "heavy" && (
        <div class="error-box">
          <p>
            Esta web no ha podido analizarse correctamente, probablemente por su tamaño o por bloqueos del servidor.
          </p>
          <ul>
            <li>
              Puedes probar <a href="https://pagespeed.web.dev/" target="_blank">PageSpeed Web</a> directamente.
            </li>
            <li>
              También puedes comprobar su rendimiento manualmente usando las DevTools de tu navegador.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
