import os
import requests

images = {
    "naughty-pool-bar.jpg": "https://sevenseashotel.net/wp-content/uploads/2024/11/DSC02661-1024x683.jpg",
    "meeting-rooms.jpg": "https://sevenseashotel.net/wp-content/uploads/2026/05/Meeting-Rooms.jpg",
    "geoffreys.png": "https://sevenseashotel.net/wp-content/uploads/2026/05/Gemini_Generated_Image_pfw0uapfw0uapfw0-768x1024.png",
    "gym.png": "https://sevenseashotel.net/wp-content/uploads/2026/05/Gemini_Generated_Image_ahtcmmahtcmmahtc-1.png"
}

output_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/about"
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
