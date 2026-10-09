#!/usr/bin/env python3
"""
Converts the four "Same War, New Weapons" Phase 2 Word articles by Anjali
Kalaskar into Sanity Portable Text JSON (one file per article, next to this
script). Re-run only if a .docx changes:

    python3 scripts/anjali-p2/_convert.py

Output per article: NN.json containing
  { id, slug, title, seoTitle, excerpt, tags, imageAlt, infographicAlt,
    chartAlt, folder, download, body[], faq[] }

The Sanity create script (scripts/create-anjali-phase2-drafts.mjs) reads these.
"""
import json, os, re, subprocess, sys, glob

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SRC = os.path.join(ROOT, "Docs", "Blogs", "Anjali")
OUT = os.path.dirname(os.path.abspath(__file__))

ARTICLES = [
    # id, folder-prefix, short title for ids
    ("08", "MagicWorks_SWNW_P2_08"),
    ("09", "MagicWorks_SWNW_P2_09"),
    ("10", "MagicWorks_SWNW_P2_10"),
    ("11", "MagicWorks_SWNW_P2_11"),
]

SITE = "https://magicworksitsolutions.com"


# ---------------------------------------------------------------- pandoc AST
def load_ast(path):
    out = subprocess.check_output(["pandoc", "-f", "docx", "-t", "json", path])
    return json.loads(out)["blocks"]


def text_of(inlines):
    s = ""
    for i in inlines:
        t = i["t"]
        if t == "Str":
            s += i["c"]
        elif t in ("Space", "SoftBreak"):
            s += " "
        elif t == "LineBreak":
            s += "\n"
        elif t in ("Strong", "Emph", "Span", "Underline", "SmallCaps"):
            s += text_of(i["c"][-1] if t == "Span" else i["c"])
        elif t == "Link":
            s += text_of(i["c"][1])
        elif t == "Quoted":
            s += text_of(i["c"][1])
        elif t == "Code":
            s += i["c"][1]
        elif t == "Image":
            pass
    return s


def blocks_text(blocks):
    parts = []
    for b in blocks:
        if b["t"] in ("Para", "Plain"):
            parts.append(text_of(b["c"]))
        elif b["t"] in ("BulletList", "OrderedList"):
            items = b["c"] if b["t"] == "BulletList" else b["c"][1]
            for it in items:
                parts.append(blocks_text(it))
    return "\n".join(parts)


# ------------------------------------------------------------- portable text
class PT:
    def __init__(self, prefix):
        self.n = 0
        self.prefix = prefix

    def k(self):
        self.n += 1
        return f"{self.prefix}{self.n:03d}"

    def rel(self, href):
        if href.startswith(SITE):
            href = href[len(SITE):] or "/"
        return href

    def spans(self, inlines, marks=None, defs=None, strong_force=False):
        """Flatten pandoc inlines to (children, markDefs)."""
        marks = marks or []
        defs = defs if defs is not None else []
        kids = []

        def emit(text, m):
            if text == "":
                return
            if kids and kids[-1]["marks"] == m:
                kids[-1]["text"] += text
            else:
                kids.append({"_type": "span", "_key": self.k(), "text": text, "marks": list(m)})

        def walk(items, m):
            for i in items:
                t = i["t"]
                if t == "Str":
                    emit(i["c"], m)
                elif t in ("Space", "SoftBreak"):
                    emit(" ", m)
                elif t == "LineBreak":
                    emit("\n", m)
                elif t == "Strong":
                    walk(i["c"], m + ["strong"] if "strong" not in m else m)
                elif t == "Emph":
                    walk(i["c"], m + ["em"] if "em" not in m else m)
                elif t == "Span":
                    walk(i["c"][1], m)
                elif t == "Underline":
                    walk(i["c"], m)
                elif t == "Quoted":
                    q = '"' if i["c"][0]["t"] == "DoubleQuote" else "'"
                    emit(q, m); walk(i["c"][1], m); emit(q, m)
                elif t == "Link":
                    key = self.k()
                    defs.append({"_key": key, "_type": "link", "href": self.rel(i["c"][2][0])})
                    walk(i["c"][1], m + [key])
                elif t == "Code":
                    emit(i["c"][1], m)

        walk(inlines, marks)
        # drop trailing/leading whitespace-only noise
        if kids:
            kids[0]["text"] = kids[0]["text"].lstrip()
            kids[-1]["text"] = kids[-1]["text"].rstrip()
        kids = [c for c in kids if c["text"] != ""]
        return kids, defs

    def block(self, style, inlines, list_item=None):
        kids, defs = self.spans(inlines)
        if not kids:
            return None
        b = {"_type": "block", "_key": self.k(), "style": style, "markDefs": defs, "children": kids}
        if list_item:
            b["listItem"] = list_item
            b["level"] = 1
        return b


def only_strong(inlines):
    inl = [i for i in inlines if i["t"] not in ("Space",)]
    return len(inl) > 0 and all(i["t"] == "Strong" for i in inl)


def plain_short(inlines, maxlen=100):
    """A short plain-text line that reads as a heading (no marks, no end punctuation)."""
    if any(i["t"] in ("Strong", "Emph", "Link") for i in inlines):
        return False
    t = text_of(inlines).strip()
    if not t or len(t) > maxlen:
        return False
    return t[-1] not in ".?!:;,"


def table_rows(tbl):
    """Return list of rows, each a list of cell-block-lists."""
    # pandoc 2.9 JSON: [caption, aligns, widths, headerCells, bodyRows]
    c = tbl["c"]
    rows = []
    head = c[3]
    if any(len(cell) for cell in head):
        rows.append(list(head))
    for row in c[4]:
        rows.append(list(row))
    return rows


# ------------------------------------------------------------------ convert
def convert(aid, folder_prefix):
    folder = glob.glob(os.path.join(SRC, folder_prefix + "*"))[0]
    inner = [d for d in glob.glob(os.path.join(folder, "*")) if os.path.isdir(d)][0]
    docx = glob.glob(os.path.join(inner, "*.docx"))[0]
    imgdir = os.path.join(inner, "images")
    dldir = os.path.join(inner, "downloadable")
    blocks = load_ast(docx)

    pt = PT(f"p{aid}_")
    body = []
    faq = []
    backend = {}

    # split at FAQ heading and backend heading
    def para_text(b):
        return text_of(b["c"]).strip() if b["t"] in ("Para", "Plain") else ""

    idx_faq = next(i for i, b in enumerate(blocks) if para_text(b) == "Frequently asked questions")
    idx_back = next(i for i, b in enumerate(blocks) if para_text(b).startswith("FOR DEVELOPER"))

    article = blocks[:idx_faq]
    faq_blocks = blocks[idx_faq + 1: idx_back]
    back_blocks = blocks[idx_back + 1:]

    # ---- backend fields (first table)
    for b in back_blocks:
        if b["t"] == "Table":
            for row in table_rows(b):
                if len(row) == 2:
                    backend[blocks_text(row[0]).strip()] = blocks_text(row[1]).strip()
            break

    title = text_of(article[1]["c"]).strip()

    # ---- article body
    i = 4  # skip eyebrow, title, byline, keyword line
    n = len(article)
    prev_was_eyebrow = False
    download = None
    image_files = {
        "png": next(iter(glob.glob(os.path.join(imgdir, "*.png"))), None),
        "jpg": next((f for f in glob.glob(os.path.join(imgdir, "*.jpg"))), None),
    }
    infographic_alt = ""
    chart_alt = ""

    while i < n:
        b = article[i]
        t = b["t"]

        if t == "Para":
            inl = b["c"]
            if any(x["t"] == "Image" for x in inl):
                img = next(x for x in inl if x["t"] == "Image")
                src = img["c"][2][0]
                alt = text_of(img["c"][1]).strip()
                kind = "png" if src.lower().endswith(".png") else "jpg"
                path = image_files[kind]
                if kind == "png":
                    chart_alt = alt
                else:
                    infographic_alt = alt
                if path:
                    body.append({
                        "_type": "image", "_key": pt.k(),
                        "__file": os.path.relpath(path, ROOT).replace("\\", "/"),
                        "alt": alt,
                    })
                prev_was_eyebrow = False
            elif only_strong(inl):
                blk = pt.block("normal", inl)
                if blk:
                    body.append(blk)
                prev_was_eyebrow = True
            else:
                txt = text_of(inl).strip()
                nxt = article[i + 1] if i + 1 < n else None
                nxt_ok = nxt is not None and nxt["t"] in ("Para", "BulletList", "OrderedList", "Table", "BlockQuote")
                if prev_was_eyebrow:
                    blk = pt.block("h2", inl)
                    if blk: body.append(blk)
                elif plain_short(inl) and nxt_ok:
                    blk = pt.block("h3", inl)
                    if blk: body.append(blk)
                else:
                    blk = pt.block("normal", inl)
                    if blk: body.append(blk)
                prev_was_eyebrow = False

        elif t in ("BulletList", "OrderedList"):
            items = b["c"] if t == "BulletList" else b["c"][1]
            kind = "bullet" if t == "BulletList" else "number"
            for it in items:
                for sub in it:
                    if sub["t"] in ("Para", "Plain"):
                        blk = pt.block("normal", sub["c"], list_item=kind)
                        if blk: body.append(blk)
            prev_was_eyebrow = False

        elif t == "BlockQuote":
            for sub in b["c"]:
                if sub["t"] in ("Para", "Plain"):
                    blk = pt.block("blockquote", sub["c"])
                    if blk: body.append(blk)
            prev_was_eyebrow = False

        elif t == "Table":
            rows = table_rows(b)
            ncols = len(rows[0]) if rows else 0
            if ncols == 1:
                cell = rows[0][0]
                first = text_of(cell[0]["c"]).strip() if cell and cell[0]["t"] in ("Para", "Plain") else ""
                rest = [x for x in cell[1:] if x["t"] in ("Para", "Plain")]
                if first.upper().startswith("IMAGE SLOT"):
                    pass  # feature image slot (supplied separately)
                elif first.upper() == "FREE DOWNLOAD":
                    p0 = rest[0]["c"]
                    link = next((x for x in p0 if x["t"] == "Link"), None)
                    href = pt.rel(link["c"][2][0]) if link else None
                    ltxt = text_of(link["c"][1]).strip() if link else ""
                    desc = ""
                    after = False
                    for x in p0:
                        if after:
                            if x["t"] == "Str":
                                desc += x["c"]
                            elif x["t"] in ("Space", "SoftBreak"):
                                desc += " "
                            elif x["t"] in ("Strong", "Emph"):
                                desc += text_of(x["c"])
                        if x is link:
                            after = True
                    desc = desc.strip()
                    download = {"label": ltxt, "href": href}
                    body.append({"_type": "callout", "_key": pt.k(),
                                 "title": "Free download: " + ltxt, "body": desc, "variant": "info"})
                    # real link line below the callout
                    k = pt.k()
                    body.append({"_type": "block", "_key": pt.k(), "style": "normal",
                                 "markDefs": [{"_key": k, "_type": "link", "href": href}],
                                 "children": [{"_type": "span", "_key": pt.k(), "text": "Download: ", "marks": []},
                                              {"_type": "span", "_key": pt.k(), "text": ltxt, "marks": [k, "strong"]}]})
                elif first.upper() == "THE DECISION RULE" or (len(rest) == 1 and not any(
                        x["t"] == "Link" for p in rest for x in p["c"])):
                    body.append({"_type": "callout", "_key": pt.k(), "title": first.title() if first.isupper() else first,
                                 "body": text_of(rest[0]["c"]).strip(), "variant": "key-takeaway"})
                else:
                    # CTA box (has a link)
                    desc = text_of(rest[0]["c"]).strip() if rest else ""
                    body.append({"_type": "callout", "_key": pt.k(), "title": first,
                                 "body": desc, "variant": "stat"})
                    # the CTA box's link (callout text is plain, so link it on its own line)
                    for p in rest[1:]:
                        lk = next((x for x in p["c"] if x["t"] == "Link"), None)
                        if lk:
                            ltxt = text_of(lk["c"][1]).strip().lstrip("→").strip()
                            href = pt.rel(lk["c"][2][0])
                            k = pt.k()
                            body.append({"_type": "block", "_key": pt.k(), "style": "normal",
                                         "markDefs": [{"_key": k, "_type": "link", "href": href}],
                                         "children": [{"_type": "span", "_key": pt.k(), "text": "→ " + ltxt,
                                                       "marks": [k, "strong"]}]})
            else:
                # data table: header row + body rows -> comparisonTable (metric + 2 value columns)
                hdr = [blocks_text(c).strip() for c in rows[0]]
                data = []
                for r in rows[1:]:
                    vals = [blocks_text(c).strip() for c in r]
                    data.append({"_type": "row", "_key": pt.k(),
                                 "metric": vals[0], "a": vals[1] if len(vals) > 1 else "",
                                 "b": vals[2] if len(vals) > 2 else ""})
                body.append({"_type": "comparisonTable", "_key": pt.k(),
                             "colA": hdr[1] if len(hdr) > 1 else "", "colB": hdr[2] if len(hdr) > 2 else "",
                             "rows": data})
            prev_was_eyebrow = False
        i += 1

    # ---- FAQ
    texts = [para_text(b) for b in faq_blocks if b["t"] in ("Para", "Plain") and para_text(b)]
    for q, a in zip(texts[0::2], texts[1::2]):
        faq.append({"_key": pt.k(), "question": q, "answer": a})

    slug = backend["SEO-friendly URL"].rstrip("/").split("/")[-1]
    seo_title = re.sub(r"\s*\(\d+ chars\)\s*$", "", backend["Meta title (CMS field)"]).strip()
    excerpt = re.sub(r"\s*\(\d+ chars\)\s*$", "", backend["Meta description"]).strip()
    tags = [t.strip() for t in backend["Secondary keywords"].split(";") if t.strip()]
    primary = backend.get("Primary keyword", "").strip()
    if primary:
        tags = [primary] + tags
    feature_alt = re.sub(r"\s*\(Feature image.*$", "", backend["Feature image alt text"]).strip()

    return {
        "id": aid,
        "slug": slug,
        "title": title,
        "seoTitle": seo_title,
        "excerpt": excerpt,
        "tags": tags[:8],
        "imageAlt": feature_alt,
        "infographicAlt": infographic_alt,
        "chartAlt": chart_alt,
        "folder": os.path.relpath(inner, ROOT).replace("\\", "/"),
        "download": download,
        "body": body,
        "faq": faq,
    }


if __name__ == "__main__":
    for aid, pre in ARTICLES:
        data = convert(aid, pre)
        with open(os.path.join(OUT, f"{aid}.json"), "w", encoding="utf8") as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
        kinds = {}
        for b in data["body"]:
            key = b["_type"] if b["_type"] != "block" else b["style"] + (":" + b["listItem"] if b.get("listItem") else "")
            kinds[key] = kinds.get(key, 0) + 1
        print(aid, data["slug"], "|", data["title"], "|", kinds, "| faq:", len(data["faq"]), "| dl:", bool(data["download"]))
