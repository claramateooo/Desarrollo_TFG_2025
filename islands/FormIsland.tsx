/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { Clock } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import LoadingDonut from "./Modulo1/LoadingDonut.tsx";

const BACKEND_URL = "https://microservicionode-production.up.railway.app";

type Props = {
  onResult: (data: { pageSpeedResult: any; axeResult: any; url: string }) => void;
  isLoaded: boolean;
};

export default function FormIsland({ onResult, isLoaded }: Props) {
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorType, setErrorType] = useState<null | "heavy">(null);
  const [loadingKey, setLoadingKey] = useState(0);
  const [isLoadedInternal, setIsLoadedInternal] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const saveHistory = (urls: string[]) => {
    if (!userEmail) return;
    localStorage.setItem(`history_${userEmail}`, JSON.stringify(urls));
  };

  useEffect(() => {
    if (!userEmail) return;
    try {
      const raw = localStorage.getItem(`history_${userEmail}`);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setHistory(parsed);
    } catch {
      console.warn("Historial corrupto o no disponible");
    }
  }, [userEmail]);

  const saveAnalysisToLocalStorage = (
    url: string,
    pageSpeedResult: any,
    axeResult: any
  ) => {
    if (!userEmail) return;

    const key = `analysis_${userEmail}_${url}`;
    const data = {
      url,
      pageSpeedResult,
      axeResult,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(data));

    let prevHistory: any[] = [];
    try {
      const raw = localStorage.getItem(`analysisHistory_${userEmail}`);
      prevHistory = raw ? JSON.parse(raw) : [];
    } catch {
      console.warn("Historial previo corrupto");
    }

    const updatedHistory = [
      data,
      ...prevHistory.filter((entry) => entry.url !== url),
    ].slice(0, 10);

    localStorage.setItem(`analysisHistory_${userEmail}`, JSON.stringify(updatedHistory));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoadingKey((prev) => prev + 1);
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

    const fetchFullAnalysis = async (): Promise<any> => {
      const res = await fetch(`${BACKEND_URL}/full-analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const text = await res.text();
      if (!res.ok) {
        throw new Error(`Servidor respondió con error ${res.status}`);
      }

      try {
        return JSON.parse(text);
      } catch (err) {
        console.error("Error parseando JSON:", err);
        throw new Error("Respuesta no válida del servidor");
      }
    };

    try {
      const [pageSpeedRes, fullRes] = await Promise.all([
        fetch("/api/pagespeedd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }).then((r) => r.json()),
        (async () => {
          try {
            return await fetchFullAnalysis();
          } catch {
            await new Promise((r) => setTimeout(r, 2000));
            return await fetchFullAnalysis();
          }
        })(),
      ]);

      const axeRes = fullRes.axeResults;

      saveAnalysisToLocalStorage(url, pageSpeedRes, axeRes);
      onResult({ pageSpeedResult: pageSpeedRes, axeResult: axeRes, url });
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
      <form onSubmit={handleSubmit} class="form-wrapper" aria-label="Formulario de análisis de URL">
        <label for="url-input" class="sr-only">Introduce la URL que deseas analizar</label>
        <input
          id="url-input"
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
          aria-label="Campo para introducir URL a analizar"
        />
        <button type="submit" aria-label="Enviar análisis de la URL">
          Analizar
        </button>

        {focused && history.length > 0 && (
          <ul class="autocomplete-list" role="listbox" aria-label="Historial de URLs recientes">
            {history.map((item) => (
              <li
                key={item}
                class="autocomplete-item"
                role="option"
                onMouseDown={() => {
                  setUrl(item);
                  setFocused(false);
                }}
              >
                <Clock size={16} class="autocomplete-icon" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </form>

      {loading && (
        <div class="loading" role="status" aria-live="polite">
          <LoadingDonut key={loadingKey} isLoaded={isLoadedInternal} />
        </div>
      )}

      {errorType === "heavy" && (
        <div class="error-box" role="alert">
          <p>
            Esta web no ha podido analizarse correctamente, probablemente por su
            tamaño o por bloqueos del servidor.
          </p>
          <ul>
            <li>
              Puedes probar{" "}
              <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer">
                PageSpeed Web
              </a>{" "}
              directamente.
            </li>
            <li>
              También puedes comprobar su rendimiento manualmente usando las
              DevTools de tu navegador.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
