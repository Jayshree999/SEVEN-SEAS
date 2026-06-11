import os
import urllib.request
import ssl

WORKSPACE_PUBLIC = "/Users/indrj/Desktop/SEVEN-SEAS/public/offers"
os.makedirs(WORKSPACE_PUBLIC, exist_ok=True)

targets = {
    "ramadan-stay.jpg": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/DSC_1707-scaled-r2gkway1yl2guo83veb0b1bzwe8vj6g12qp078uaow.jpg",
    "ramadan-gathering.jpg": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/HD-wallpaper-delicious-iftar-at-sezzam-ramadan-rest-formi-calm-coffee-sweet-r2gnbzc3g93bt8v9wao7vwtuoa3fisiogpdhqeuaao.jpg",
    "ramadan-salt.webp": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/catering-buffet-food-restaurant-cafe-meat-vegetables-341775916-r2gncvalwmb2rzkupohj8orivdpwsi1jx3k01tiwf4.webp",
    "loyalty.jpg": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/istockphoto-510633000-612x612-1-r1nahuhnd6svw902ln8ivpz0reneia029tlv4m82ow.jpg",
    "breakfast-inclusive.jpg": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/pexels-jjagtenberg-103124-scaled-r1nah9t76u0kstu3yeaqcv6voxhbsxpyuz96kj2qhs.jpg",
    "stay-longer.png": "https://sevenseashotel.net/wp-content/uploads/2025/02/Luxury-Hotel-Presentation.png",
    "longstay-premium19.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/02/IMG20250127142904-1024x768.jpg",
    "longstay-burjview.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/02/DSC_2390-scaled.jpg",
    "longstay-seaview.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/02/DSC_2352-1024x681.jpg",
    "amenities-main.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/01/premium_photo-1683134297492-cce5fc6dae31-1024x683.jpg",
    "amenities-gym.png": "https://sevenseashotel.net/wp-content/uploads/2025/02/Gym-1024x681.png",
    "amenities-pool.jpg": "https://sevenseashotel.net/wp-content/uploads/2024/11/DSC02661-1024x683.jpg",
    "modern-attire-main.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/02/IMG20250203185857-1024x768.jpg",
    "modern-attire-1.jpg": "https://sevenseashotel.net/wp-content/uploads/2024/11/019A3930-Enhanced-NR-1024x683.jpg",
    "modern-attire-spa.jpg": "https://sevenseashotel.net/wp-content/uploads/2025/02/DSC_2508-681x1024.jpg",
    "icon-20.png": "https://sevenseashotel.net/wp-content/uploads/2022/04/icon-20.png",
    "icon-19.png": "https://sevenseashotel.net/wp-content/uploads/2022/04/icon-19.png",
}

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

success_count = 0
fail_count = 0

for name, url in targets.items():
    dest = os.path.join(WORKSPACE_PUBLIC, name)
    print(f"Downloading {url} to {dest}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(dest, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Successfully downloaded {name}")
        success_count += 1
    except Exception as e:
        print(f"Failed to download {name} from {url}. Error: {e}")
        fail_count += 1

print(f"Download Finished. Success: {success_count}, Fails: {fail_count}")
