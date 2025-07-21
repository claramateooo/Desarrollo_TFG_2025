import { Handlers } from "$fresh/server.ts";
import { fetchPageSpeedData } from "../../backend/api/pagespeed.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const { url } = await req.json();
      if (!url) return new Response("Missing URL", { status: 400 });

      const result = await fetchPageSpeedData(url);
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("❌ Error en PageSpeed:", error);
      return new Response(
        JSON.stringify({ error: "PageSpeed failed", details: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
