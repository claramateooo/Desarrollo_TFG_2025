/** @jsxImportSource preact */
import { useState, useEffect } from "preact/hooks";
import FormIsland from "./FormIsland.tsx";
import TechnicalAnalysisModule from "./Modulo1/TechnicalAnalysisModule.tsx";
import SimulationModule from "./Modulo2/SimulationModule.tsx";
import FinalModule from "./Modulo5/FinalModule.tsx";
import RecommendationsModule from "./Modulo4/RecommendationsModule.tsx";
import HeuristicUXModule from "./Modulo3/HeuristicModule.tsx";
import ChatBotIsland from "./ChatBotIsland.tsx";
import { User } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import NavbarIsland from "./Nav/NavbarIsland.tsx";
import WCAGInfoIsland from "./WCAGInfoIsland.tsx";

const images = [
  "/undraw_just-browsing_0rpb.svg",
  "/undraw_experience-design_d4md.svg",
  "/undraw_pair-programming_9jyg.svg",
  "/undraw_website-builder_4go7.svg",
  "/undraw_website_zbig.svg",
];

export default function UXAdvisorApp() {
  const [data, setData] = useState<any>(null);
  const [profile, setProfile] = useState<string>("default");
  const [axeResults, setAxeResults] = useState<any>(null);
  const [resetKey, setResetKey] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [user, setUser] = useState<string | null>(null);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cookieName = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="));
    const nameFromCookie = cookieName?.split("=")[1];

    if (nameFromCookie) {
      const decodedName = decodeURIComponent(nameFromCookie);
      localStorage.setItem("username", decodedName);
      setUser(decodedName);
    } else {
      const storedUser = localStorage.getItem("username");
      if (storedUser) setUser(storedUser);
    }

    const cookieEmail = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userEmail="));
    const emailFromCookie = cookieEmail?.split("=")[1];

    if (emailFromCookie) {
      const decodedEmail = decodeURIComponent(emailFromCookie);
      localStorage.setItem("userEmail", decodedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    document.cookie = "username=; Max-Age=0; Path=/";
    setUser(null);
    window.dispatchEvent(new Event("user-logout"));
  };

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {/* Barra superior */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
          aria-label="Barra de usuario"
        >
          <User size={20} aria-hidden="true" />
          {user ? (
            <>
              <span aria-live="polite">Hola, {user}</span>
              <a
                onClick={handleLogout}
                style={{ color: "#6c3df4", fontWeight: "bold" }}
                role="button"
                tabIndex={0}
              >
                Cerrar sesión
              </a>
            </>
          ) : (
            <a
              href="/login"
              style={{ color: "#6c3df4", fontWeight: "bold" }}
              aria-label="Iniciar sesión"
            >
              Iniciar sesión
            </a>
          )}
        </div>
      </div>

      <NavbarIsland />

      <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 class="app-title">
          UX-<span class="highlight-ai">AI</span>visor
        </h1>
        <FormIsland
          onResult={(result: { pageSpeedResult: any; axeResult: any; url: string }) => {
            setData(result.pageSpeedResult);
            setAxeResults(result.axeResult);
            setTargetUrl(result.url);
            console.log(result.url);
          }}
          isLoaded={data !== null}
        />
      </div>

      {!data && (
        <>
          <div class="landing-wrapper" role="region" aria-label="Sección de bienvenida">
            <div class="landing-text">
              <h2 class="landing-title">
                Evalúa la accesibilidad, el rendimiento y la experiencia de usuario de tu web
              </h2>
              <p class="landing-description">
                Con UX-AiVisor puedes analizar tu interfaz desde distintos perfiles y dispositivos
                para comprobar si tu sitio está al día con los estándares modernos.
              </p>
            </div>

            <div class="landing-image-wrapper">
              <img
                src={images[imageIndex]}
                alt="Ilustración de análisis UX"
                class="landing-image"
                loading="lazy"
              />
            </div>

            {!user && (
              <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                ¿No tienes cuenta?{" "}
                <a href="/register" class="register-link" aria-label="Registrarse">
                  Regístrate
                </a>{" "}
                para guardar tus análisis.
              </p>
            )}
          </div>
          <WCAGInfoIsland />
        </>
      )}

      {data && (
        <>
          <div class="back-button-wrapper right-align">
            <a
              href="#"
              class="back-button"
              onClick={(e) => {
                e.preventDefault();
                setData(null);
                setAxeResults(null);
                setTargetUrl(null);
                setProfile("default");
                setResetKey((prev) => prev + 1);
              }}
              role="button"
              tabIndex={0}
              aria-label="Volver al formulario"
            >
              ← Atrás
            </a>
          </div>
          <TechnicalAnalysisModule data={data} resetKey={resetKey} />
          <SimulationModule
            data={data}
            axeResults={axeResults}
            onProfileChange={setProfile}
            url={targetUrl ?? undefined}
          />
          <HeuristicUXModule axeResults={axeResults} />
          <RecommendationsModule profile={profile} axeResults={axeResults} />
          <FinalModule
            axeResults={axeResults}
            lighthouseScore={Math.round(
              (data?.lighthouseResult?.categories?.performance?.score || 0) * 100
            )}
          />
        </>
      )}

      <ChatBotIsland />
    </div>
  );
}
