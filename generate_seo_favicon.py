import os
from PIL import Image

dir_path = r'C:\Users\Hizkia Ariel Wijono\.gemini\antigravity\scratch\bumigas'
logo_path = os.path.join(dir_path, 'assets', 'images', 'logo.png')
favicon_png_path = os.path.join(dir_path, 'assets', 'images', 'favicon.png')
favicon_ico_path = os.path.join(dir_path, 'favicon.ico')

# Open logo
img = Image.open(logo_path)

# Resize for Google Search requirements (multiple of 48px)
# We will use 192x192 for the PNG
img_png = img.resize((192, 192), Image.Resampling.LANCZOS)
img_png.save(favicon_png_path, 'PNG')
print(f"Saved {favicon_png_path} at 192x192")

# Also save an .ico file with multiple sizes (48x48, 96x96, 144x144, 192x192) at the root
icon_sizes = [(48, 48), (96, 96), (144, 144), (192, 192)]
img.save(favicon_ico_path, format='ICO', sizes=icon_sizes)
print(f"Saved {favicon_ico_path} with multiple sizes")

