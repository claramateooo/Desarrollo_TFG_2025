// backend/api/mistral.ts
const MISTRAL_API_KEY = Deno.env.get("MISTRAL_API");

export async function getMistralRecommendations(text: string): Promise<string> {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-tiny", // o mistral-medium / mistral-small
      messages: [
        {
          role: "system",
          content: "Eres un experto en accesibilidad web y usabilidad. A partir de errores heurísticos identificados, proporciona recomendaciones prácticas, claras y estructuradas para mejorar la experiencia de usuario.",
        },
        {
          role: "user",
          content: `Dado este análisis de problemas detectados: ${text}, ¿qué recomendaciones darías para mejorar la accesibilidad y experiencia de usuario?`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Mistral API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No se generaron recomendaciones.";
}
