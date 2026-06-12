import os
from PIL import Image

image_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/events-3"
if not os.path.exists(image_dir):
    print("Directory does not exist")
    exit()

for filename in sorted(os.listdir(image_dir)):
    if filename.endswith((".jpg", ".webp")):
        filepath = os.path.join(image_dir, filename)
        try:
            with Image.open(filepath) as img:
                img = img.convert("RGB")
                pixels = list(img.getdata())
                num_pixels = len(pixels)
                
                # Calculate average RGB
                r_sum = sum(p[0] for p in pixels)
                g_sum = sum(p[1] for p in pixels)
                b_sum = sum(p[2] for p in pixels)
                avg_r = r_sum / num_pixels
                avg_g = g_sum / num_pixels
                avg_b = b_sum / num_pixels
                
                # Check dominant bins
                print(f"File: {filename} | Avg RGB: ({avg_r:.1f}, {avg_g:.1f}, {avg_b:.1f})")
        except Exception as e:
            print(f"Failed to analyze {filename}: {e}")
