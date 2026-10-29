#!/usr/bin/env python3
"""
Ports the four designed landing-page HTML templates (Docs/landing-pages/...) into
Next.js:  python3 scripts/landing-port/build.py

Per page it writes
  components/landing2/css/<key>.css     template CSS, scoped under .lpx.lp-<key>
  components/landing2/html/<key>.ts     <main> markup + mobile call bar (as a string)
  components/landing2/inits/<key>.ts    template JS as init(); HubSpot swapped for /api/leads
  app/(site)/<slug>/page.tsx            route with metadata

The site Nav/Footer (route group layout) replaces the template's own header/footer.
"""
import glob, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.abspath(os.path.join(HERE, "..", ".."))
SRC = glob.glob(os.path.join(WEB, "..", "Docs", "landing-pages", "Landing_pages_ready*"))[0]

PAGES = {
    "google": dict(file="magicworks-google-ads-landing-page-new (1).html", slug="google-ads-agency-pune", form="lp-google-ads-pune", pillar="Digital Marketing"),
    "meta":   dict(file="magicworks-meta-ads-landing-page-new (1).html",   slug="meta-ads-agency-pune",   form="lp-meta-ads-pune",   pillar="Digital Marketing"),
    "seo":    dict(file="magicworks-seo-aeo-landing-page-new (3).html",    slug="seo-aeo-agency-pune",    form="lp-seo-aeo-pune",    pillar="Digital Marketing"),
    "web":    dict(file="magicworks-ai-native-website-landing-page (8).html", slug="web-development-agency-pune", form="lp-web-development-pune", pillar="Web Development"),
}


# ---------------------------------------------------------------- CSS scoping
def split_top(s, sep=","):
    out, depth, cur = [], 0, ""
    for ch in s:
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth -= 1
        if ch == sep and depth == 0:
            out.append(cur)
            cur = ""
        else:
            cur += ch
    out.append(cur)
    return [x.strip() for x in out if x.strip()]


def scope_selector(sel, scope):
    if sel in (":root", "body"):
        return scope
    if sel == "html":
        return None
    if sel.startswith(".js "):
        return f"{scope}.js {sel[4:]}"
    if sel.startswith("html "):
        return f"{scope} {sel[5:]}"
    if sel == "*":
        return f"{scope} *"
    if sel.startswith("*::") or sel.startswith("*:"):
        return f"{scope} {sel}"
    return f"{scope} {sel}"


def scope_css(css, scope):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out, i, n = [], 0, len(css)
    while i < n:
        j = css.find("{", i)
        if j == -1:
            break
        prelude = css[i:j].strip()
        depth, k = 1, j + 1
        while k < n and depth:
            if css[k] == "{":
                depth += 1
            elif css[k] == "}":
                depth -= 1
            k += 1
        body = css[j + 1:k - 1]
        i = k
        if prelude.startswith(("@media", "@supports")):
            out.append(f"{prelude}{{{scope_css(body, scope)}}}")
        elif prelude.startswith(("@keyframes", "@font-face", "@-webkit-keyframes")):
            out.append(f"{prelude}{{{body}}}")
        else:
            sels = [scope_selector(s, scope) for s in split_top(prelude)]
            sels = [s for s in sels if s]
            # a bare "*,*::before,*::after" reset also needs to hit the wrapper itself
            if sels:
                out.append(f"{','.join(sels)}{{{body}}}")
    return "\n".join(out)


# ---------------------------------------------------------------- JS patching
def patch_js(js, form_name, pillar, source):
    js = js.replace("document.documentElement.className += ' js';",
                    "var __root = document.querySelector('.lpx'); if (__root) __root.classList.add('js');", 1)

    # remove the "Preview mode" guard (form was not connected to HubSpot)
    a = js.find("if (!isSet(CONFIG.HUBSPOT_PORTAL_ID)")
    if a != -1:
        b = js.find("return;", a)
        b = js.find("}", b) + 1
        js = js[:a] + js[b:]

    # swap the HubSpot POST for our own lead API
    a = js.find("fetch('https://api.hsforms.com")
    b = js.find(".then(function (r)", a)
    assert a != -1 and b != -1, "fetch block not found"
    new_fetch = (
        "fetch('/api/leads', {\n"
        "      method: 'POST',\n"
        "      headers: { 'Content-Type': 'application/json' },\n"
        "      body: JSON.stringify({\n"
        "        name: form.elements.name.value.trim(),\n"
        "        email: form.elements.email.value.trim(),\n"
        "        phone: form.elements.phone.value.trim(),\n"
        "        company: form.elements.company.value.trim(),\n"
        "        website: form.elements.website ? form.elements.website.value.trim() : undefined,\n"
        f"        pillar: '{pillar}',\n"
        "        message: message,\n"
        f"        source_page: '/{source}',\n"
        "        _gotcha: form.elements.hp_field ? form.elements.hp_field.value : ''\n"
        "      })\n"
        "    })\n    "
    )
    js = js[:a] + new_fetch + js[b:]

    # fire the same dataLayer event the rest of the site uses (GTM lead_form_submit trigger)
    push = (f"window.dataLayer = window.dataLayer || []; "
            f"window.dataLayer.push({{ event: 'lead_form_submit', form_name: '{form_name}' }});")
    js = re.sub(r"(\.then\(function \(\) \{)", r"\1\n      " + push, js, count=1)

    # attribution + page are captured server-side (cookie + source_page); keep message clean
    js = js.replace(", attribution, 'Page: ' + window.location.pathname]", "]")

    # stricter phone rule (same as server-side lib/phone.ts)
    js = js.replace("return /^[6-9]\\d{9}$/.test(d);",
                    "return /^[6-9]\\d{9}$/.test(d) && !/^(\\d)\\1{9}$/.test(d) && ['9876543210','1234567890','9123456789'].indexOf(d) === -1;")

    # friendlier message when the server rejects the phone number
    js = js.replace(".then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })",
                    ".then(function (r) { if (r.status === 400) { var e = new Error('bad'); e.bad = true; throw e; } if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })")
    js = js.replace(".catch(function () { statusEl.textContent = 'Something went wrong. Please call us on +91 97645 66644.'; })",
                    ".catch(function (err) { statusEl.textContent = (err && err.bad) ? 'Please check your name, email and 10-digit phone number, then try again.' : 'Something went wrong. Please call us on +91 97645 66644.'; })")
    return js



# ---------------------------------------------------------------- Google Ads conversion + optional goal (2026-10-29)
ADS_ID = "AW-18402352411"
ADS_LABEL = "CczACNCuneUcEJu69sZE"

GTAG_LOADER = """
  /* ---- Google tag: loads only once a real ID is entered ---- */
  if (isSet(CONFIG.GOOGLE_ADS_ID)) {
    var gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GOOGLE_ADS_ID;
    document.head.appendChild(gs);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.GOOGLE_ADS_ID);
  }
"""

GTAG_CONVERSION = """
      if (window.gtag && isSet(CONFIG.GOOGLE_ADS_ID) && isSet(CONFIG.GOOGLE_ADS_LABEL)) {
        window.gtag('event', 'conversion', { send_to: CONFIG.GOOGLE_ADS_ID + '/' + CONFIG.GOOGLE_ADS_LABEL });
      }"""


def patch_ads(js):
    """Fill in the Google Ads conversion ID/label (fires only in the success .then of the
    lead POST, never on click, validation errors or failed submits) and make the
    free-text goal/summary field optional."""
    js = js.replace("'AW-XXXXXXXXXX'", f"'{ADS_ID}'").replace("'XXXXXXXXXXXXXXXXXXXX'", f"'{ADS_LABEL}'")
    if "GOOGLE_ADS_ID" not in js:  # Meta template has no Google tag: add config, loader and conversion
        js = js.replace("META_PIXEL_ID: 'YOUR_META_PIXEL_ID'",
                        f"META_PIXEL_ID: 'YOUR_META_PIXEL_ID',\n    GOOGLE_ADS_ID: '{ADS_ID}',\n    GOOGLE_ADS_LABEL: '{ADS_LABEL}'", 1)
        js = js.replace("  /* ---- Meta Pixel:", GTAG_LOADER.lstrip("\n") + "\n  /* ---- Meta Pixel:", 1)
        js = js.replace("if (window.fbq && isSet(CONFIG.META_PIXEL_ID)) { window.fbq('track', 'Lead'); }",
                        "if (window.fbq && isSet(CONFIG.META_PIXEL_ID)) { window.fbq('track', 'Lead'); }" + GTAG_CONVERSION, 1)
    js = js.replace("'f-goal': function (v) { return v.trim().length >= 20; }", "'f-goal': function () { return true; }")
    js = js.replace("'Goal: ' + form.elements.goal.value.trim()",
                    "(form.elements.goal.value.trim() ? 'Goal: ' + form.elements.goal.value.trim() : '')")
    return js


def patch_goal_label(html):
    for t in ["What should Google Ads achieve for you?", "What should Meta Ads achieve for you?", "What should your website achieve?"]:
        html = html.replace(t + "</label>", t + " (optional)</label>")
    return html


# ---------------------------------------------------------------- build
def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf8", newline="\n") as f:
        f.write(text)


def main():
    for key, cfg in PAGES.items():
        s = open(os.path.join(SRC, cfg["file"]), encoding="utf8").read()
        head = s[: s.find("<body")]
        title = re.search(r"<title>(.*?)</title>", head, re.S).group(1).replace("&amp;", "&").strip()
        desc = re.search(r'<meta name="description" content="(.*?)">', head, re.S).group(1).replace("&amp;", "&")
        og_t = re.search(r'og:title" content="(.*?)"', head).group(1).replace("&amp;", "&")
        og_d = re.search(r'og:description" content="(.*?)"', head).group(1).replace("&amp;", "&")

        css = "\n".join(re.findall(r"<style[^>]*>(.*?)</style>", s, re.S))
        write(os.path.join(WEB, "components", "landing2", "css", f"{key}.css"),
              scope_css(css, f".lpx.lp-{key}") + "\n")

        # markup: everything inside <main> plus the mobile call bar
        m = s[s.find('<main id="main">'): s.find("</main>") + len("</main>")]
        m = m.replace('<main id="main">', '<div id="main">').replace("</main>", "</div>")
        mbar = re.search(r'<div class="mbar" id="mbar">.*?</div>', s, re.S).group(0)
        html = patch_goal_label((m + "\n" + mbar).replace("\r", ""))
        write(os.path.join(WEB, "components", "landing2", "html", f"{key}.ts"),
              "// Generated by scripts/landing-port/build.py. Do not edit by hand.\n"
              f"export const html = {json.dumps(html, ensure_ascii=False)};\n")

        scripts = re.findall(r"<script(?![^>]*src)[^>]*>(.*?)</script>", s, re.S)
        js = patch_ads(patch_js("\n".join(scripts), cfg["form"], cfg["pillar"], cfg["slug"]))
        write(os.path.join(WEB, "components", "landing2", "inits", f"{key}.ts"),
              "// @ts-nocheck\n/* eslint-disable */\n// Generated by scripts/landing-port/build.py. Do not edit by hand.\n"
              f"export default function init() {{\n{js}\n}}\n")

        page = f'''import type {{ Metadata }} from "next";
import "@/components/landing2/css/{key}.css";
import LandingInit from "@/components/landing2/LandingInit";
import {{ html }} from "@/components/landing2/html/{key}";

const URL_PATH = "/{cfg["slug"]}";
const TITLE = {json.dumps(title, ensure_ascii=False)};
const DESCRIPTION = {json.dumps(desc, ensure_ascii=False)};

export const metadata: Metadata = {{
  title: {{ absolute: TITLE }},
  description: DESCRIPTION,
  alternates: {{ canonical: URL_PATH }},
  openGraph: {{
    url: `https://magicworksitsolutions.com${{URL_PATH}}`,
    title: {json.dumps(og_t, ensure_ascii=False)},
    description: {json.dumps(og_d, ensure_ascii=False)},
  }},
}};

export default function Page() {{
  return (
    <>
      <div className="lpx lp-{key}" dangerouslySetInnerHTML={{{{ __html: html }}}} />
      <LandingInit page="{key}" />
    </>
  );
}}
'''
        write(os.path.join(WEB, "app", "(site)", cfg["slug"], "page.tsx"), page)
        print(key, "ok", len(css), "css ->", len(scope_css(css, '.x')), "| html", len(html), "| js", len(js))

    write(os.path.join(WEB, "components", "landing2", "LandingInit.tsx"), '''"use client";

import { useEffect } from "react";

const loaders: Record<string, () => Promise<{ default: () => void }>> = {
  google: () => import("./inits/google"),
  meta: () => import("./inits/meta"),
  seo: () => import("./inits/seo"),
  web: () => import("./inits/web"),
};

/** Starts the template behaviour (animations, tabs, two-step form) once the markup is on screen. */
export default function LandingInit({ page }: { page: keyof typeof loaders }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".lpx");
    if (!root || root.dataset.inited) return;
    root.dataset.inited = "1";
    loaders[page]().then((m) => m.default());
  }, [page]);
  return null;
}
''')


if __name__ == "__main__":
    main()
