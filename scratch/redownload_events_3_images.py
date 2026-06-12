import os
import urllib.request
import shutil

# Clear the events-3 directory first
img_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/events-3"
if os.path.exists(img_dir):
    shutil.rmtree(img_dir)
os.makedirs(img_dir, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}

# Exact mappings from live HTML carousel:
# Slide 1 → Birthday Party  → Screenshot-2026-05-28-164706...
# Slide 2 → Real Estate Event → bg-about-r1n4ru7...
# Slide 3 → Social Event → corporate-event-2166-x-1384...
# Slide 4 → Social Gathering → WhatsApp-Image-2026-05-14...
# Slide 5 → Accommodation → 019A3948-scaled...

images = {
    "hero-bg.webp":         "https://sevenseashotel.net/wp-content/uploads/2025/02/5-Steps-To-Planning-A-Corporate-Gala.webp",
    "joyful-occasions.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-17-at-6.07.54-PM-1024x768.jpeg",
    "cta-bg.jpg":           "https://sevenseashotel.net/wp-content/uploads/2025/02/corporate-gala-events.jpg",
    # Carousel cards (exact slide order from live DOM)
    "birthday-party.jpg":   "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/Screenshot-2026-05-28-164706-ro4g8r0dj0xl37eexgac3jh0vuoe5iy44vjv4svafw.jpg",
    "real-estate.jpg":      "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/bg-about-r1n4ru759fihqbmvemxf7z4y6nguombbm63qzt4crg.jpg",
    "social-event.jpg":     "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/corporate-event-2166-x-1384-wallpaper-l6ljzh3n3yeufgws-r0vdnwmrhq4j092avat40cwm0gtu0w46hfl87v4s64.jpg",
    "social-gathering.jpg": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2026-05-14-at-17.22.44-rng4i9k6wdjvhzdmggex3n0taiphf1zlb9jc6bi2zg.jpeg",
    "accommodation.jpg":    "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/019A3948-scaled-qwnow9wmioh8lrkek7qq1k8zkg8nyauhizygupkn18.jpg",
}

for filename, url in images.items():
    dest_path = os.path.join(img_dir, filename)
    print(f"Downloading {url}")
    print(f"  -> {filename}")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=20) as resp:
            with open(dest_path, "wb") as f:
                f.write(resp.read())
        size = os.path.getsize(dest_path)
        print(f"  OK ({size} bytes)")
    except Exception as e:
        print(f"  FAILED: {e}")

print("\nDone! Files in events-3/:")
for f in sorted(os.listdir(img_dir)):
    print(f"  {f}  ({os.path.getsize(os.path.join(img_dir, f))} bytes)")
