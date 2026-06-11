import os
import requests

images = {
    "wellness-main.png": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/Gemini_Generated_Image_8ag69x8ag69x8ag6-rnhhpsznxpsd7c8i42v9zerp1umfur1wtkwvo9zwc2.png",
    "behnah-spa-thumb.png": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/Gemini_Generated_Image_ahtcmmahtcmmahtc-1-rnjinn0o08cujm2d33zrgsg2447yr7fki93z3ona7m.png",
    "gym-thumb.jpg": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/pexels-thgusstavo-2775269-scaled-r2pctit179zzcfi5bxt2mmkaf45238nq0y382ua0ky.jpg",
    "elevate-experience.png": "https://sevenseashotel.net/wp-content/uploads/2026/05/Gemini_Generated_Image_qjsyrxqjsyrxqjsy.png",
    "behnah-spa-detail.png": "https://sevenseashotel.net/wp-content/uploads/2026/05/Gemini_Generated_Image_ahtcmmahtcmmahtc.png",
    "gym-detail.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/03/pexels-thgusstavo-2775269-scaled.jpg",
    "gym-detail-2.png": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/Untitled-design-r2pd9lthmyhlvsvs2ackhl6sdgtnt8faw71y8kdjc0.png",
    "indulge-relaxation.png": "https://sevenseashotel.net/wp-content/uploads/2026/05/Gemini_Generated_Image_ahtcmmahtcmmahtc-1.png",
    "trends-expertise-1.png": "https://sevenseashotel.net/wp-content/uploads/2026/05/Gemini_Generated_Image_mna5zzmna5zzmna5-1024x573.png",
    "trends-expertise-2.jpg": "https://sevenseashotel.net/wp-content/uploads/2026/05/122.jpg",
    "trends-expertise-3.jpg": "https://sevenseashotel.net/wp-content/uploads/2026/05/spa-1024x515.jpg",
    "style-redefined-1.jpg": "https://sevenseashotel.net/wp-content/uploads/2026/05/club-wyndham-relaxing-spa-destinations-1024x417.jpg"
}

output_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/wellness"
os.makedirs(output_dir, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

for name, url in images.items():
    path = os.path.join(output_dir, name)
    print(f"Downloading {url} to {path}...")
    try:
        response = requests.get(url, headers=headers, timeout=20)
        if response.status_code == 200:
            with open(path, "wb") as f:
                f.write(response.content)
            print(f"Successfully downloaded {name}")
        else:
            print(f"Failed to download {name}: HTTP {response.status_code}")
    except Exception as e:
        print(f"Error downloading {name}: {e}")
