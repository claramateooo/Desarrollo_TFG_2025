/** @jsxImportSource preact */
import { Handlers, PageProps } from "$fresh/server.ts";
import supabase from "../backend/db/supabaseClient.ts";
import LoginForm from "../islands/Users/LoginForm.tsx";
import { ArrowLeft } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";

interface Data {
  success?: boolean;
  error?: string;
}

export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString().trim();

    if (!email || !password) {
      return ctx.render({ error: "Usuario y contraseña son obligatorios" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.user) {
      return ctx.render({ error: "Credenciales incorrectas" });
    }

    const name = data.user.user_metadata?.name || email;

    const headers = new Headers();
    headers.append("Set-Cookie", `username=${encodeURIComponent(name)}; Path=/`);
    headers.append("Set-Cookie", `userEmail=${encodeURIComponent(email)}; Path=/`);
    headers.set("Location", "/");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function LoginPage({ data }: PageProps<Data>) {
  return (
    <>
      <head>
        <title>Login</title>
        <link rel="stylesheet" href="/styles/auth.css" />
      </head>

      <body>
        <a href="/" class="back-arrow" aria-label="Volver a inicio">
          <ArrowLeft size={24} />
        </a>

        <main role="main" aria-label="Página de inicio de sesión">
          <div class="auth-container">
            <div class="auth-box">
              <h2 class="auth-title">Iniciar sesión</h2>

              {data?.success && (
                <p class="auth-message success"> Inicio de sesión exitoso</p>
              )}
              {data?.error && (
                <p class="auth-message error">⚠️ {data.error}</p>
              )}

              <LoginForm />

              <p class="auth-footer">
                ¿No tienes cuenta? <a href="/register">Regístrate</a>
              </p>
            </div>
          </div>
        </main>
      </body>
    </>
  );
}
