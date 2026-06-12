import urllib.request
from bs4 import BeautifulSoup
import re

url = "https://sevenseashotel.net/rooms/"
headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=20) as resp:
    html = resp.read().decode("utf-8")

soup = BeautifulSoup(html, "html.parser")
for tag in soup(["script", "style"]): tag.decompose()

# Get top-level elementor sections (direct children of page wrapper)
page_wrap = soup.select_one(".elementor-section-wrap, [data-elementor-type='wp-page']")
if not page_wrap:
    page_wrap = soup.body

top_sections = page_wrap.find_all(
    lambda t: t.name in ["section", "div"] and 
    any(c.startswith("elementor-section") or c == "e-con" for c in t.get("class", [])) and
    t.parent == page_wrap,
    recursive=False
)

if not top_sections:
    # fallback: get all direct e-con or elementor-section elements at depth 3-4
    top_sections = soup.select(".elementor > .elementor-inner > .elementor-section-wrap > .elementor-section")

print(f"Top level sections: {len(top_sections)}")
# Print last 8 sections
for i, sec in enumerate(top_sections[-8:]):
    idx = len(top_sections) - 8 + i
    texts = [t.strip() for t in sec.stripped_strings if len(t.strip()) > 3]
    imgs = [(img.get("src","") or img.get("data-src","")) for img in sec.find_all("img")]
    h_tags = [h.get_text(strip=True) for h in sec.find_all(["h1","h2","h3","h4","h5"])]
    print(f"\n=== TOP SECTION {idx} ===")
    print(f"Headings: {h_tags}")
    print(f"All text (first 25): {texts[:25]}")
    print(f"Images: {imgs}")
