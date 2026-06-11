import os
import requests

images = {
    "party-thumb-1.jpg": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2026-05-14-at-17.22.44-rng4i9k0cfnegh8gp30xmdmbef3pp1e5yhlo8vn3e6.jpeg",
    "party-thumb-2.jpg": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/istockphoto-535403859-612x612-1-r1mz9i8wny3yytkvrj9bmrh3zpeytqcszqptojbu26.jpg",
    "party-thumb-3.webp": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/Girls_night_out_1200x630-r1mzc804gwrl2c6cwumgiiygsybifjp473iosqi04u.webp",
    "geoffreys-detail.png": "https://sevenseashotel.net/wp-content/uploads/2026/05/Gemini_Generated_Image_pfw0uapfw0uapfw0-768x1024.png",
    "geoffreys-logo.png": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/Geoffrey-Dark-Logo-qynkywr6zrnobovpchvjnlz4x7lwpmwbkh3y1dnwv4.png",
    "vibe-nation-detail.jpg": "https://sevenseashotel.net/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-14-at-17.22.44-768x1024.jpeg",
    "vibe-nation-logo.png": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/logo-rnedq3olhh5uyp912r00dteqpqbyc1dx659aldse1s.png",
    "baazigar-detail.jpg": "https://sevenseashotel.net/wp-content/uploads/2026/05/Screenshot-2026-05-14-180400.jpg",
    "baazigar-logo.png": "https://sevenseashotel.net/wp-content/uploads/2026/05/images.png",
    "legends-celebrate.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-17-at-5.10.53-PM-1024x676.jpeg",
    "enjoy-music-2.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-17-at-4.52.06-PM-e1739794051421-640x1024.jpeg",
    "enjoy-music-3.avif": "https://sevenseashotel.net/wp-content/uploads/2025/02/two-beautiful-girls-dancing-party_155003-5520.avif",
    "dance-pro.avif": "https://sevenseashotel.net/wp-content/uploads/2025/02/flow-club-pathankot-night-clubs-5qzoy9pipm-1024x684.avif"
}

output_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/entertainment"
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
