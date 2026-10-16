#!/usr/bin/env python3
"""
Converts Purva Desai's two October 2026 articles from Word to Sanity Portable
Text JSON (one file per article next to this script):

    python3 scripts/purva-p2/_convert.py

  Where-Your-Business-Should-Be-Listed-Online  -> where-listed.json
  Voice-Search-in-India                        -> voice-search.json

Reads Docs/Blogs/Purva/<folder>/<folder>.docx.
"""
import importlib.util, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
SRC = os.path.join(ROOT, "Docs", "Blogs", "Purva")

# reuse the Portable Text helper class from the Anjali converter
spec = importlib.util.spec_from_file_location("anjali_convert", os.path.join(HERE, "..", "anjali-p2", "_convert.py"))
ac = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ac)

ARTICLES = [
    ("where-listed", "Where-Your-Business-Should-Be-Listed-Online",
     "A laptop and phone showing a map of India with listing platforms such as Google Business Profile, Justdial, LinkedIn, IndiaMART, Sulekha and Facebook, beside a checklist of accurate name, phone number, address and opening hours"),
    ("voice-search", "Voice-Search-in-India",
     "A woman driving in Pune asks her phone for the best dentist open now near her, and a voice assistant shows nearby clinic options on the dashboard screen"),
]


def para_text(b):
    return ac.text_of(b["c"]).strip() if b["t"] in ("Para", "Plain") else ""


def is_all(inlines, kind):
    inl = [i for i in inlines if i["t"] != "Space"]
    return bool(inl) and all(i["t"] == kind for i in inl)


def is_strong_em(inlines):
    inl = [i for i in inlines if i["t"] != "Space"]
    if len(inl) != 1:
        return False
    i = inl[0]
    if i["t"] == "Strong" and all(x["t"] in ("Emph", "Space") for x in i["c"]):
        return True
    if i["t"] == "Emph" and all(x["t"] in ("Strong", "Space") for x in i["c"]):
        return True
    return False


def convert(slug, folder, image_alt):
    docx = os.path.join(SRC, folder, folder + ".docx")
    blocks = json.loads(subprocess.check_output(["pandoc", "-f", "docx", "-t", "json", docx]))["blocks"]
    pt = ac.PT("pv" + slug[:2] + "_")

    # ---- headline, tags, meta table
    paras = [(i, b) for i, b in enumerate(blocks) if b["t"] == "Para"]
    title = para_text(paras[1][1]) if para_text(paras[0][1]).isupper() else para_text(paras[0][1])
    byline = next(para_text(b) for _, b in paras if "Target keywords" in para_text(b))
    kw = byline.split("Target keywords:")[1]
    tags = [t.strip() for t in kw.split(",") if t.strip()]

    meta = {}
    for b in blocks:
        if b["t"] == "Table":
            for row in ac.table_rows(b):
                if len(row) == 2:
                    meta[ac.blocks_text(row[0]).strip()] = ac.blocks_text(row[1]).strip()
            break
    seo_title = meta["Title tag"]
    excerpt = meta["Meta description"]
    canonical = meta["Canonical URL"].rstrip("/")
    post_slug = canonical.split("/")[-1]

    # ---- locate sections
    def find(pred, start=0):
        for i in range(start, len(blocks)):
            if pred(blocks[i]):
                return i
        return None

    def is_head(b, text):
        if b["t"] == "Header":
            return ac.text_of(b["c"][2]).strip() == text
        return b["t"] == "Para" and para_text(b) == text and is_all(b["c"], "Strong")

    i_meta_end = find(lambda b: b["t"] == "Table") + 1
    i_faq = find(lambda b: is_head(b, "Frequently asked questions"))
    i_src = find(lambda b: is_head(b, "Sources"), i_faq)

    article = blocks[i_meta_end:i_faq]
    faq_blocks = blocks[i_faq + 1:i_src]
    tail = blocks[i_src + 1:]

    body = []

    def add(b):
        if b:
            body.append(b)

    # ---- article
    n = len(article)
    i = 0
    while i < n:
        b = article[i]
        t = b["t"]
        if t == "Header":
            lvl = b["c"][0]
            add(pt.block("h2" if lvl <= 2 else "h3", b["c"][2]))
        elif t == "Para":
            inl = b["c"]
            txt = para_text(b)
            nxt = article[i + 1] if i + 1 < n else None
            if is_strong_em(inl):
                add(pt.block("h3", inl))
            elif is_all(inl, "Strong") and len(txt) < 140 and txt[-1] not in ".:?":
                add(pt.block("h2", inl))
            elif (len(txt) < 90 and not any(x["t"] in ("Strong", "Emph", "Link") for x in inl)
                  and txt[-1] not in ".?!:;," and nxt is not None and nxt["t"] == "Para"
                  and any(x["t"] == "Link" for x in nxt["c"])
                  and ("service" in para_text(nxt).lower())):
                # CTA: title line + paragraph with service links
                links = [x for x in nxt["c"] if x["t"] == "Link"]
                body.append({"_type": "callout", "_key": pt.k(), "title": txt, "body": para_text(nxt), "variant": "key-takeaway"})
                defs, kids = [], []
                kids.append({"_type": "span", "_key": pt.k(), "text": "Explore: ", "marks": []})
                for j, lk in enumerate(links):
                    key = pt.k()
                    defs.append({"_key": key, "_type": "link", "href": pt.rel(lk["c"][2][0])})
                    kids.append({"_type": "span", "_key": pt.k(), "text": ac.text_of(lk["c"][1]).strip(), "marks": [key]})
                    if j < len(links) - 1:
                        kids.append({"_type": "span", "_key": pt.k(), "text": " and ", "marks": []})
                body.append({"_type": "block", "_key": pt.k(), "style": "normal", "markDefs": defs, "children": kids})
                i += 1  # consumed the next paragraph
            else:
                add(pt.block("normal", inl))
        elif t in ("BulletList", "OrderedList"):
            items = b["c"] if t == "BulletList" else b["c"][1]
            kind = "bullet" if t == "BulletList" else "number"
            for it in items:
                for sub in it:
                    if sub["t"] in ("Para", "Plain"):
                        add(pt.block("normal", sub["c"], list_item=kind))
        elif t == "BlockQuote":
            for sub in b["c"]:
                if sub["t"] in ("Para", "Plain"):
                    add(pt.block("blockquote", sub["c"]))
        i += 1

    # ---- FAQ (bold question paragraph, then answer paragraph(s))
    faq = []
    q = None
    ans = []
    for b in faq_blocks:
        if b["t"] != "Para":
            continue
        txt = para_text(b)
        if is_all(b["c"], "Strong") and txt.endswith("?"):
            if q:
                faq.append({"_key": pt.k(), "question": q, "answer": " ".join(ans)})
            q, ans = txt, []
        elif q:
            ans.append(txt)
    if q:
        faq.append({"_key": pt.k(), "question": q, "answer": " ".join(ans)})

    # ---- Sources (list directly after the heading) + closing CTA block
    src_items = []
    for b in tail:
        if b["t"] == "BulletList":
            for it in b["c"]:
                for sub in it:
                    if sub["t"] in ("Para", "Plain"):
                        src_items.append(sub["c"])
        elif src_items:
            break
    if src_items:
        add(pt.block("h3", [{"t": "Str", "c": "Sources"}]))
        for inl in src_items:
            add(pt.block("normal", inl, list_item="bullet"))

    cta = None
    for j, b in enumerate(tail):
        if b["t"] == "Para" and para_text(b).startswith("CTA block"):
            cta = tail[j + 1:j + 3]
            break
    if cta:
        lead = para_text(cta[0])
        link = next((x for x in cta[1]["c"] if x["t"] == "Link"), None) if len(cta) > 1 else None
        m = re.match(r"^(.*?\?)\s*(.*)$", lead)
        cta_title, rest = (m.group(1), m.group(2)) if m else (lead, "")
        body.append({"_type": "callout", "_key": pt.k(), "title": cta_title, "body": rest, "variant": "key-takeaway"})
        if link:
            key = pt.k()
            body.append({"_type": "block", "_key": pt.k(), "style": "normal",
                         "markDefs": [{"_key": key, "_type": "link", "href": pt.rel(link["c"][2][0])}],
                         "children": [{"_type": "span", "_key": pt.k(), "text": ac.text_of(link["c"][1]).strip(),
                                       "marks": [key, "strong"]}]})

    return {
        "key": slug,
        "folder": f"Docs/Blogs/Purva/{folder}",
        "image": f"Docs/Blogs/Purva/{folder}/{folder}.jpg",
        "title": title,
        "seoTitle": seo_title,
        "excerpt": excerpt,
        "slug": post_slug,
        "tags": tags,
        "imageAlt": image_alt,
        "body": body,
        "faq": faq,
    }


if __name__ == "__main__":
    for slug, folder, alt in ARTICLES:
        d = convert(slug, folder, alt)
        with open(os.path.join(HERE, slug + ".json"), "w", encoding="utf8") as f:
            json.dump(d, f, ensure_ascii=False, indent=1)
        kinds = {}
        for b in d["body"]:
            k = b["_type"] if b["_type"] != "block" else b["style"] + (":" + b["listItem"] if b.get("listItem") else "")
            kinds[k] = kinds.get(k, 0) + 1
        print(slug, "|", d["title"], "|", d["slug"], "|", len(d["seoTitle"]), len(d["excerpt"]), "|", kinds, "| faq", len(d["faq"]))
        print("   tags:", d["tags"])
