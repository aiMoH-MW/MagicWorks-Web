// Renders contact details as inline SVG images so email/phone are visible to
// humans but not present as selectable DOM text (prevents bot harvesting).
export function ContactImage({
  text,
  href,
  color = "#5B3FBE",
}: {
  text: string;
  href?: string;
  color?: string;
}) {
  const w = Math.ceil(text.length * 8) + 16;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="22"><text x="0" y="16" font-family="ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace" font-size="13" fill="${color}">${text}</text></svg>`;
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const img = (
    <img
      src={src}
      alt={text}
      style={{ display: "inline-block", verticalAlign: "middle", height: "20px" }}
    />
  );
  if (href) {
    return (
      <a href={href} className="hover:opacity-75 transition-opacity">
        {img}
      </a>
    );
  }
  return img;
}
