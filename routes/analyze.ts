import { Handlers } from "$fresh/server.ts";
import { fetchPageSpeedData } from "../backend/api/pagespeed.ts";

export const handler: Handlers = {
  async POST(req) {
    const { url } = await req.json();
    const result = await fetchPageSpeedData(url);
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
