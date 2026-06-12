import os
from PIL import Image

image_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/events-3"
if not os.path.exists(image_dir):
    print("Directory does not exist")
    exit()

for filename in sorted(os.listdir(image_dir)):
    if filename.endswith((".jpg", ".webp", ".png", ".jpeg")):
        filepath = os.path.join(image_dir, filename)
        try:
            with Image.open(filepath) as img:
                print(f"File: {filename} | Format: {img.format} | Size: {img.size} | Mode: {img.mode}")
        except Exception as e:
            print(f"Failed to open {filename}: {e}")
