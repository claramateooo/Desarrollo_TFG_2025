// routes/api/mistral.ts
import { Handlers } from "$fresh/server.ts";
import { getMistralRecommendations } from "../../backend/api/mistral.ts";

export const handler: Handlers = {
  async POST(req) {
    const { profile, axeResults } = await req.json();

    const fallos = axeResults?.violations?.map((v: any) => `• ${v.description}`).join("\n") || "No se encontraron fallos específicos.";

    const textoParaIA = `
Perfil: ${profile}
Fallos detectados:
${fallos}

Instrucciones: Genera recomendaciones claras, prácticas y ordenadas para mejorar la accesibilidad, abordando los problemas concretos y añadiendo consejos adicionales útiles para este perfil. No repitas errores, sé útil y preciso.
`;

    const recommendation = await getMistralRecommendations(textoParaIA);

    return new Response(JSON.stringify({ recommendation }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
