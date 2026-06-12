import os

img_dir = "/Users/indrj/Desktop/SEVEN-SEAS/public/events-3"

promise_path = os.path.join(img_dir, "promise.jpg")
bp_path = os.path.join(img_dir, "birthday-party.jpg")
bp_temp_path = os.path.join(img_dir, "birthday-party_temp.jpg")
accom_path = os.path.join(img_dir, "accommodation.jpg")

try:
    # 1. promise.jpg -> birthday-party_temp.jpg
    if os.path.exists(promise_path):
        os.rename(promise_path, bp_temp_path)
        print("Renamed promise.jpg to birthday-party_temp.jpg")
        
    # 2. birthday-party.jpg -> accommodation.jpg
    if os.path.exists(bp_path):
        os.rename(bp_path, accom_path)
        print("Renamed birthday-party.jpg to accommodation.jpg")
        
    # 3. birthday-party_temp.jpg -> birthday-party.jpg
    if os.path.exists(bp_temp_path):
        os.rename(bp_temp_path, bp_path)
        print("Renamed birthday-party_temp.jpg to birthday-party.jpg")
        
    print("Image swap completed successfully!")
except Exception as e:
    print(f"Error during image swap: {e}")
