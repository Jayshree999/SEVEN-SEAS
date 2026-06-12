import os
import shutil

src_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/events-3"
dest_dir = "/Users/indrj/.gemini/antigravity-ide/brain/6796f0b5-a4e6-4d81-9e08-6903033b5c5f"

for filename in os.listdir(src_dir):
    if filename.endswith(".jpg") or filename.endswith(".webp"):
        src_path = os.path.join(src_dir, filename)
        dest_path = os.path.join(dest_dir, filename)
        shutil.copy2(src_path, dest_path)
        print(f"Copied {filename} to brain")
