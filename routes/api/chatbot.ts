// routes/api/chatbot.ts
import { Handlers } from "$fresh/server.ts";
import { getChatbotResponse } from "../../backend/api/chatbot-mistral.ts";

export const handler: Handlers = {
  async POST(req) {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response("Mensaje no válido", { status: 400 });
    }

    try {
      const response = await getChatbotResponse(message);
      return new Response(JSON.stringify({ response }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      console.error("Error en el chatbot:", error);
      return new Response("Error interno", { status: 500 });
    }
  },
};
