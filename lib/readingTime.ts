// Estimates reading time from a PortableText body array (220 wpm average)
export function estimateReadingTime(body: unknown[]): number {
  if (!body?.length) return 1;
  let text = "";
  for (const block of body) {
    if (!block || typeof block !== "object") continue;
    const b = block as Record<string, unknown>;
    if (b._type === "block" && Array.isArray(b.children)) {
      for (const child of b.children) {
        const c = child as Record<string, unknown>;
        if (typeof c.text === "string") text += c.text + " ";
      }
    } else if (b._type === "callout") {
      if (typeof b.body === "string") text += b.body + " ";
      if (Array.isArray(b.items)) {
        for (const item of b.items) {
          if (typeof item === "string") text += item + " ";
        }
      }
    } else if (b._type === "pullquote" && typeof b.text === "string") {
      text += b.text + " ";
    }
  }
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}
