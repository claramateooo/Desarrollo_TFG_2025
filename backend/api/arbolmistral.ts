// backend/api/arbolmistral.ts

const MISTRAL_API_KEY = Deno.env.get("MISTRAL_API");

function flattenRoles(node: any, acc: string[] = [], nivel = 0): string[] {
  if (!node) return acc;
  acc.push(
    "-".repeat(nivel) +
      node.role +
      (node.name ? ` ("${node.name}")` : "")
  );
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      flattenRoles(child, acc, nivel + 1);
    }
  }
  return acc;
}

export async function getArbolAccesibilidadConIA(tree: any): Promise<string> {
  const roles = flattenRoles(tree);
  const structureResumen = roles.join("\n");

  const prompt = `
Analiza el siguiente árbol de accesibilidad detectado en una página web:

${structureResumen}

1. Indica qué elementos clave de accesibilidad faltan o mejorarías (por ejemplo: nav, main, header, footer, h1, botones, listas…).
2. Propón un **árbol de accesibilidad mejorado**, en visual tipo árbol:
├── html
│   ├── head
│   ├── body
│       ├── main
│       ├── footer
...usando líneas (├──, │, └──). 

3. Para cada etiqueta, añade una breve descripción funcional EN LA LÍNEA SIGUIENTE del árbol (por ejemplo: “Indica la navegación principal para el usuario del lector de pantalla”).

4. Al final, escribe una pequeña explicación de las mejoras propuestas y por qué ayudan a la accesibilidad de la web.

Todo en **Markdown** sin numeraciones tipo “1.1.1”.
`;

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-medium",
      messages: [
        {
          role: "system",
          content:
            "Eres un experto en accesibilidad web. Dado un árbol real de accesibilidad, analiza, mejora y justifica las mejoras en la estructura accesible óptima.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Error Mistral: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No se pudo generar el árbol mejorado.";
}
