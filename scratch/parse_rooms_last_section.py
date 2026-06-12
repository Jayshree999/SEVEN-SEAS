import urllib.request
from bs4 import BeautifulSoup
import re

url = "https://sevenseashotel.net/rooms/"
headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=20) as resp:
    html = resp.read().decode("utf-8")

soup = BeautifulSoup(html, "html.parser")

# Remove script/style
for tag in soup(["script", "style"]):
    tag.decompose()

# Get all elementor sections/containers
sections = soup.select(".elementor-section, .e-con")
print(f"Total sections/containers: {len(sections)}\n")

# Print last 3 sections with text and images
for i, sec in enumerate(sections[-5:]):
    idx = len(sections) - 5 + i
    texts = [t.strip() for t in sec.stripped_strings if len(t.strip()) > 3]
    imgs = [img.get("src", img.get("data-src", "")) for img in sec.find_all("img")]
    bg = sec.get("style", "")
    bg_img = re.findall(r'url\(["\']?(https?://[^"\')\s]+)["\']?\)', bg)
    print(f"=== SECTION {idx} ===")
    print(f"Classes: {sec.get('class', [])}")
    print(f"Text content: {texts[:20]}")
    print(f"Images: {imgs}")
    print(f"BG images: {bg_img}")
    print()
