#!/usr/bin/env python3
"""One-off v1 → v2 post migration (kept for reference; see docs/MIGRATION.md).

Reads posts/<slug>.md + metadata from js/posts.js and writes
src/content/blog/uz/<slug>.mdx. Post text is NOT rewritten — only MDX
pitfalls outside code are fixed: { } escaped, bare <word> escaped, <br> made
self-closing, image paths moved to /blog/images, a leading H1 demoted to H2
(the page already renders the title as the H1).
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
posts_js = (ROOT / "js/posts.js").read_text()
entries = re.findall(
    r'slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*readTime:\s*"(\d+)', posts_js
)

def norm_date(d: str) -> str:
    y, m, day = d.split("-")
    return f"{int(y):04d}-{int(m):02d}-{int(day):02d}"

def fix_text(seg: str) -> str:
    seg = re.sub(r"<br\s*/?>", "<br />", seg)
    seg = seg.replace("{", "\\{").replace("}", "\\}")
    # bare <word> / < that is not one of our allowed tags
    seg = re.sub(r"<(?!br />)", "&lt;", seg)
    return seg

def fix_line(line: str) -> str:
    # keep inline code spans untouched
    parts = re.split(r"(`[^`]*`)", line)
    return "".join(p if p.startswith("`") else fix_text(p) for p in parts)

def description(md: str) -> str:
    for block in re.split(r"\n\s*\n", md):
        b = block.strip()
        if not b or b.startswith(("#", "!", ">", "---", "```", "|", "-", "*")):
            continue
        text = re.sub(r"!\[[^]]*\]\([^)]*\)|<[^>]+>", "", b)
        text = re.sub(r"\[([^]]+)\]\([^)]*\)", r"\1", text)
        text = re.sub(r"[*_`]", "", text).replace("\n", " ").strip()
        return (text[:157] + "…") if len(text) > 160 else text
    return ""

out_dir = ROOT / "src/content/blog/uz"
for slug, title, date, minutes in entries:
    md = (ROOT / f"posts/{slug}.md").read_text().strip("\n")
    md = md.replace("](posts/images/", "](/blog/images/")
    lines, in_code, first_h1_done = [], False, False
    for line in md.split("\n"):
        # Fences may sit inside blockquotes ("> ```bash").
        if re.sub(r"^(\s*>\s?)+", "", line).lstrip().startswith("```"):
            in_code = not in_code
            lines.append(line)
            continue
        if in_code:
            lines.append(line)
            continue
        if not first_h1_done and re.match(r"#\s", line):
            line = "#" + line
            first_h1_done = True
        lines.append(fix_line(line))
    meta = {
        "title": title,
        "description": description(md),
        "date": norm_date(date),
        "readingMinutes": int(minutes),
        "tags": [],
    }
    body = "\n".join(lines)
    head = "export const metadata = " + json.dumps(meta, ensure_ascii=False, indent=2) + ";\n\n"
    (out_dir / f"{slug}.mdx").write_text(head + body + "\n")
    print(f"✓ {slug}  {meta['date']}  {meta['description'][:60]}")
