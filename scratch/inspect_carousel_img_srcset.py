from bs4 import BeautifulSoup
import json

html_path = "/Users/indrj/.gemini/antigravity-ide/brain/6796f0b5-a4e6-4d81-9e08-6903033b5c5f/scratch/events_3_full.html"

with open(html_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

elementor_div = soup.find(class_="elementor-8712")
if elementor_div:
    carousel = elementor_div.find("div", class_="e-n-carousel")
    if carousel:
        slides = carousel.find_all("div", class_="swiper-slide")
        for idx, slide in enumerate(slides):
            print(f"\n--- Slide #{idx+1} ---")
            img = slide.find("img")
            if img:
                print(f"  src: {img.get('src')}")
                print(f"  data-src: {img.get('data-src')}")
                print(f"  srcset: {img.get('srcset')}")
                print(f"  data-srcset: {img.get('data-srcset')}")
            else:
                print("  No image found")
    else:
        print("Carousel not found")
else:
    print("Wrapper not found")
