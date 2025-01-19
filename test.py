import os

directory_path = "./images"  # Replace with your directory path

try:
    files = os.listdir(directory_path)
    for file in files:
        print(f"'{file}',")
except FileNotFoundError as e:
    print(f"Error: {e}")