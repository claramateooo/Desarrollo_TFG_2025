import { useState, useEffect } from "preact/hooks";
import {
  Menu,
  Home,
  Heart,
  Clock,
  LogIn,
} from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";

export default function NavbarIsland() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const updateUser = () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="));
      const nameFromCookie = cookie?.split("=")[1];
      if (nameFromCookie) {
        setUser(decodeURIComponent(nameFromCookie));
      } else {
        const storedUser = localStorage.getItem("username");
        setUser(storedUser || null);
      }
    };

    updateUser();

    window.addEventListener("user-logout", updateUser);
    return () => {
      window.removeEventListener("user-logout", updateUser);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        class="navbar-toggle"
        aria-label="Abrir menú de navegación"
        aria-controls="main-navigation"
        aria-expanded={open}
      >
        <Menu size={28} />
      </button>

      {open && (
        <nav
          class="navbar-panel"
          id="main-navigation"
          role="navigation"
          aria-label="Menú principal"
        >
          <ul role="list" class="navbar-list">
            <li role="listitem">
              <a href="/" class="navbar-link">
                <Home size={20} class="navbar-icon" />
                Inicio
              </a>
            </li>

            <li role="listitem">
              {user ? (
                <a href="/favorites" class="navbar-link">
                  <Heart size={20} class="navbar-icon" />
                  Favoritos
                </a>
              ) : (
                <div
                  class="navbar-disabled"
                  aria-disabled="true"
                  tabIndex={-1}
                  title="Inicia sesión para acceder a esta funcionalidad"
                >
                  <Heart size={20} class="navbar-icon" />
                  Favoritos
                </div>
              )}
            </li>

            <li role="listitem">
              {user ? (
                <a href="/historial" class="navbar-link">
                  <Clock size={20} class="navbar-icon" />
                  Historial UX
                </a>
              ) : (
                <div
                  class="navbar-disabled"
                  aria-disabled="true"
                  tabIndex={-1}
                  title="Inicia sesión para acceder a esta funcionalidad"
                >
                  <Clock size={20} class="navbar-icon" />
                  Historial UX
                </div>
              )}
            </li>

            {!user && (
              <li role="listitem">
                <a href="/login" class="navbar-link">
                  <LogIn size={20} class="navbar-icon" />
                  Iniciar sesión
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
