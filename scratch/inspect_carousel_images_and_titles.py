from bs4 import BeautifulSoup

html_path = "/Users/indrj/.gemini/antigravity-ide/brain/6796f0b5-a4e6-4d81-9e08-6903033b5c5f/scratch/events_3_full.html"

with open(html_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

elementor_div = soup.find(class_="elementor-8712")
if elementor_div:
    carousel = elementor_div.find("div", class_="e-n-carousel")
    if carousel:
        slides = carousel.find_all("div", class_="swiper-slide")
        for idx, slide in enumerate(slides):
            print(f"\n================ SLIDE #{idx+1} ================")
            print(slide.prettify()[:1000]) # Print first 1000 chars of each slide
    else:
        print("Carousel not found")
else:
    print("Wrapper not found")
