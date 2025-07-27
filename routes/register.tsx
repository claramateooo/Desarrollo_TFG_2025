/** @jsxImportSource preact */
import { Handlers, PageProps } from "$fresh/server.ts";
import { ArrowLeft } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import supabase from "../backend/db/supabaseClient.ts";
import RegisterForm from "../islands/Users/RegsiterForm.tsx";

interface Data {
  success?: boolean;
  error?: string;
}

export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    const form = await req.formData();
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString().trim();

    if (!name || !email || !password) {
      return ctx.render({ error: "Todos los campos son obligatorios" });
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      return ctx.render({ error: error.message });
    }

    const headers = new Headers();
    headers.set(
      "Set-Cookie",
      `username=${encodeURIComponent(name)}; Path=/;`
    );
    headers.set("Location", "/");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function RegisterPage({ data }: PageProps<Data>) {
  return (
    <>
      <head>
        <title>Registro</title>
        <link rel="stylesheet" href="/styles/auth.css" />
      </head>

      <body>
        <a href="/" class="back-arrow" aria-label="Volver a inicio">
          <ArrowLeft size={24} />
        </a>

        <main role="main" aria-label="Página de registro de usuario">
          <div class="auth-container">
            <div class="auth-box">
              <h2 class="auth-title">Crea tu cuenta</h2>

              {data?.success && (
                <p class="auth-message success"> Registro exitoso</p>
              )}
              {data?.error && (
                <p class="auth-message error">⚠️ {data.error}</p>
              )}

              <RegisterForm />

              <p class="auth-footer">
                ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
              </p>
            </div>
          </div>
        </main>
      </body>
    </>
  );
}
