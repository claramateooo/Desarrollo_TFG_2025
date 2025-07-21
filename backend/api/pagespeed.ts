import "https://deno.land/std@0.224.0/dotenv/load.ts";

const API_KEY = Deno.env.get("API_KEY");

function normalizeUrl(url: string): string {
  if (url.includes("youtube.com")) return "https://wwwm.youtube.com/";
  return url;
}

export async function fetchPageSpeedData(originalUrl: string) {
  if (!API_KEY) throw new Error("Falta la API_KEY");

  let url = originalUrl;
  let json;

  const attemptFetch = async (targetUrl: string) => {
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&key=${API_KEY}&strategy=mobile&category=performance&category=accessibility&category=seo&category=best-practices`;
    const res = await fetch(endpoint);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error en la API: ${res.status} - ${text}`);
    }
    return res.json();
  };

  try {
    json = await attemptFetch(url);
  } catch (err) {
    const fallback = normalizeUrl(url);
    if (fallback !== url) {
      url = fallback;
      json = await attemptFetch(url);
    } else {
      throw err;
    }
  }

  const lighthouse = json.lighthouseResult || {};
  const categories = lighthouse.categories || {};
  const audits = lighthouse.audits || {};
  const crux = json.loadingExperience?.metrics || {};

  const getMs = (val?: number | null) =>
    typeof val === "number" ? Math.round(val) : null;

  // Paso 1: Mapeamos auditorías a categorías
  const categoryMap: Record<string, string[]> = {};
  for (const [categoryKey, categoryObj] of Object.entries(categories)) {
    const auditRefs = (categoryObj as { auditRefs?: any[] }).auditRefs || [];
    for (const ref of auditRefs) {
      if (!categoryMap[ref.id]) categoryMap[ref.id] = [];
      categoryMap[ref.id].push(categoryKey);
    }
  }

  // Paso 2: Inicializamos categorías
  const allAuditsByCategory: Record<string, { title: string; passed: boolean }[]> = {
    performance: [],
    accessibility: [],
    seo: [],
    "best-practices": [],
  };

  for (const [key, audit] of Object.entries(audits) as [string, any][]) {
    if (!categoryMap[key]) continue;
    const title = audit.title || key;
    const passed = audit.score === 1;

    for (const category of categoryMap[key]) {
      if (allAuditsByCategory[category]) {
        allAuditsByCategory[category].push({ title, passed });
      }
    }
  }

  return {
    scores: {
      performance: categories["performance"]?.score !== undefined
        ? Math.round(categories["performance"].score * 100)
        : null,
      accessibility: categories["accessibility"]?.score !== undefined
        ? Math.round(categories["accessibility"].score * 100)
        : null,
      "best-practices": categories["best-practices"]?.score !== undefined
        ? Math.round(categories["best-practices"].score * 100)
        : null,
      seo: categories["seo"]?.score !== undefined
        ? Math.round(categories["seo"].score * 100)
        : null,
    },
    metrics: {
      fcp: audits["first-contentful-paint"]?.displayValue,
      lcp: audits["largest-contentful-paint"]?.displayValue,
      cls: audits["cumulative-layout-shift"]?.displayValue,
      tbt: audits["total-blocking-time"]?.displayValue,
      si: audits["speed-index"]?.displayValue,
      inp: audits["interactive"]?.displayValue,
      ttfb: audits["server-response-time"]?.displayValue,
    },
    fieldData: {
      lcp: getMs(crux["LARGEST_CONTENTFUL_PAINT_MS"]?.percentile),
      fcp: getMs(crux["FIRST_CONTENTFUL_PAINT_MS"]?.percentile),
      cls: crux["CUMULATIVE_LAYOUT_SHIFT_SCORE"]?.percentile ?? null,
      inp: getMs(crux["INTERACTION_TO_NEXT_PAINT"]?.percentile),
      ttfb: getMs(crux["EXPERIMENTAL_TIME_TO_FIRST_BYTE"]?.percentile),
    },
    screenshot: audits["final-screenshot"]?.details?.data ?? null,
    opportunities: Object.values(audits)
      .filter((a: any) => a.details?.type === "opportunity")
      .map((a: any) => ({
        title: a.title,
        savings: a.displayValue,
      })),
    diagnostics: Object.values(audits)
      .filter((a: any) => a.score !== null && a.score < 1 && a.scoreDisplayMode === "numeric")
      .map((a: any) => ({
        title: a.title,
        description: a.description,
      })),
    allAuditsByCategory, // <-- para frontend visual como PageSpeed
  };
}
