import { useState } from "preact/hooks";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form method="POST" class="auth-form" aria-label="Formulario de inicio de sesión">
      <div>
        <label class="auth-label" htmlFor="email">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          class="auth-input"
          required
          autoComplete="email"
          aria-required="true"
        />
      </div>

      <div>
        <label class="auth-label" htmlFor="password">
          Contraseña
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          class="auth-input"
          required
          autoComplete="current-password"
          aria-required="true"
        />
        <label class="auth-checkbox" htmlFor="show-password">
          <input
            id="show-password"
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
            aria-controls="password"
            aria-label="Mostrar u ocultar contraseña"
          />
          Mostrar contraseña
        </label>
      </div>

      <button type="submit" class="auth-button" aria-label="Iniciar sesión">
        Iniciar sesión
      </button>
    </form>
  );
}
