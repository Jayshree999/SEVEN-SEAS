import os
import requests

logos = {
    "behnah-spa-logo.png": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/Seven-Unisex-Saloon-Logo-1-r2pdch7qiqf5cwplaj1j3v3hpuo1bxtryetd1048bk.png",
    "gym-logo.png": "https://sevenseashotel.net/wp-content/uploads/elementor/thumbs/Seven-Unisex-Saloon-Logo-r2pdc5xo8pzphl5z4e609xxyl87mrkkzwuzj9okye8.png"
}

output_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/wellness"
os.makedirs(output_dir, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

for name, url in logos.items():
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
