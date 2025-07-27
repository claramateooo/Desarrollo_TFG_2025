/** @jsxImportSource preact */
import FavoritesIsland from "../islands/Nav/FavoritesIsland.tsx";
import { Star, ArrowLeft } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import NavbarIsland from "../islands/Nav/NavbarIsland.tsx";

export default function FavoritosPage() {
  return (
    <div class="page-wrapper">
      {/* Botón volver al inicio */}
      <a href="/" class="back-arrow" aria-label="Volver a inicio">
        <ArrowLeft size={24} />
      </a>

      {/* Contenido principal con landmark accesible */}
      <main role="main" aria-labelledby="favorites-title">
        <div class="historial-header">
          <h1 id="favorites-title" class="historial-main-title">
            <Star size={28} style={{ marginRight: "0.5rem" }} />
            Análisis Favoritos
          </h1>
          <p class="historial-subtitle">
            Aquí puedes consultar los análisis que has marcado como favoritos. Puedes volver a verlos o quitarlos de la lista.
          </p>
        </div>

        {/* Contenido dinámico */}
        <FavoritesIsland />
      </main>

      <NavbarIsland />
    </div>
  );
}
