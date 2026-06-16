const INDEXNOW_API = "https://api.indexnow.org/IndexNow";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://magicworksitsolutions.com";

export interface IndexNowResult {
  success: boolean;
  message: string;
  submitted?: number;
}

export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return { success: false, message: "INDEXNOW_KEY not configured" };

  const unique = [...new Set(urls)].slice(0, 10_000);

  try {
    const res = await fetch(INDEXNOW_API, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(BASE_URL).hostname,
        key,
        keyLocation: `${BASE_URL}/${key}.txt`,
        urlList: unique,
      }),
    });

    // IndexNow returns 200 or 202 on success
    if (res.ok || res.status === 202) {
      return { success: true, message: "Submitted", submitted: unique.length };
    }
    const text = await res.text().catch(() => "");
    return { success: false, message: `IndexNow ${res.status}: ${text}` };
  } catch (err) {
    return { success: false, message: String(err) };
  }
}
