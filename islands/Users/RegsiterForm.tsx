import { useState } from "preact/hooks";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form method="POST" class="auth-form" aria-label="Formulario de registro">
      <div>
        <label class="auth-label" htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          class="auth-input"
          required
          autoComplete="name"
          aria-required="true"
        />
      </div>

      <div>
        <label class="auth-label" htmlFor="email">Correo electrónico</label>
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
        <label class="auth-label" htmlFor="password">Contraseña</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          class="auth-input"
          required
          autoComplete="new-password"
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

      <button type="submit" class="auth-button" aria-label="Registrarse">
        Registrarse
      </button>
    </form>
  );
}
