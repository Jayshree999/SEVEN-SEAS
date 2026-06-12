import os
from PIL import Image
from PIL.ExifTags import TAGS

image_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/events-3"
if not os.path.exists(image_dir):
    print("Directory does not exist")
    exit()

for filename in sorted(os.listdir(image_dir)):
    if filename.endswith((".jpg", ".webp", ".png", ".jpeg")):
        filepath = os.path.join(image_dir, filename)
        print(f"\nFile: {filename}")
        try:
            with Image.open(filepath) as img:
                info = img._getexif()
                if info:
                    for tag, value in info.items():
                        decoded = TAGS.get(tag, tag)
                        print(f"  {decoded}: {value}")
                else:
                    print("  No EXIF data found")
        except Exception as e:
            print(f"  Error reading EXIF: {e}")
