/** @jsxImportSource preact */
import HistorialIsland from "../islands/Nav/HistorialIsland.tsx";
import {
  ArrowLeft,
  History,
  Star,
} from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import NavbarIsland from "../islands/Nav/NavbarIsland.tsx";

export default function HistorialPage() {
  return (
    <div class="page-wrapper">
      {/* Botón volver al inicio */}
      <a href="/" class="back-arrow" aria-label="Volver a inicio">
        <ArrowLeft size={24} />
      </a>

      {/* Contenido principal con landmark accesible */}
      <main role="main" aria-labelledby="historial-title">
        <div class="historial-header">
          <h1 id="historial-title" class="historial-main-title">
            <History size={28} style={{ marginRight: "0.5rem" }} />
            Historial de Análisis UX
          </h1>
          <p class="historial-subtitle">
            Aquí puedes consultar todos los análisis realizados con esta aplicación.  
            También puedes{" "}
            <span class="inline-icon">
              <Star size={16} color="#facc15" />
              <strong> guardarlos como favoritos</strong>
            </span>{" "}
            para acceder fácilmente desde la sección correspondiente.
          </p>
        </div>

        {/* Contenido dinámico */}
        <HistorialIsland />
      </main>

      <NavbarIsland />
    </div>
  );
}
