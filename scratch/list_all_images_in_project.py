import os

public_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public"
image_extensions = (".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif")

print("Found image files in public folder:")
for root, dirs, files in os.walk(public_dir):
    for file in files:
        if file.lower().endswith(image_extensions):
            rel_path = os.path.relpath(os.path.join(root, file), public_dir)
            print(f"  {rel_path} ({os.path.getsize(os.path.join(root, file))} bytes)")
