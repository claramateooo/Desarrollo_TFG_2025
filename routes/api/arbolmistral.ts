// routes/api/arbolmistral.ts
import { Handlers } from "$fresh/server.ts";
import { getArbolAccesibilidadConIA } from "../../backend/api/arbolmistral.ts"; // asegúrate de que la ruta es correcta

export const handler: Handlers = {
  async POST(req) {
    const { tree } = await req.json();

    try {
      const result = await getArbolAccesibilidadConIA(tree);
      return new Response(JSON.stringify({ tree: result }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error("Error IA:", e);
      const msg =
        (typeof e === "object" && e && "message" in e)
          ? (e as { message: string }).message
          : String(e);
      return new Response(
        JSON.stringify({ tree: "Error en IA: " + msg }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
