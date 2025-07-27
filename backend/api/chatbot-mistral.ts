const MISTRAL_API_KEY = Deno.env.get("MISTRAL_API");

export async function getChatbotResponse(question: string): Promise<string> {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-tiny",
      messages: [
        {
          role: "system",
          content: `Eres UX-AiVisor, el chatbot inteligente de una plataforma web especializada en análisis técnico y evaluación de accesibilidad. Estás diseñado para ayudar a usuarios de todos los niveles a entender los resultados de sus análisis web, resolver dudas sobre experiencia de usuario (UX), accesibilidad digital, usabilidad e interpretación de métricas técnicas como LCP, INP, CLS, FCP o TTFB. 

                    Tu misión es explicar de forma clara, profesional y accesible conceptos relacionados con las auditorías realizadas por la plataforma, incluyendo sugerencias sobre buenas prácticas, normativas WCAG, diseño inclusivo y optimización del rendimiento. 

                    Responde siempre con un tono cercano, educativo y conciso. No necesitas repetir el nombre del usuario ni pedir disculpas. Si la pregunta no está relacionada con la accesibilidad, usabilidad o resultados del análisis, redirígela de forma educada.`,
        },
        {
          role: "user",
          content: question,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Mistral API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No se generó respuesta.";
}
