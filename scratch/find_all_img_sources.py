from bs4 import BeautifulSoup
import re

html_path = "/Users/indrj/.gemini/antigravity-ide/brain/6796f0b5-a4e6-4d81-9e08-6903033b5c5f/scratch/events_3_full.html"

with open(html_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

img_sources = set()
for img in soup.find_all("img"):
    for attr in ["src", "data-src", "srcset", "data-srcset"]:
        val = img.get(attr)
        if val:
            img_sources.add(val)

print("Found all img sources:")
for src in sorted(img_sources):
    print(src)
