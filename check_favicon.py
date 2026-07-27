import os
dir_path = r'C:\Users\Hizkia Ariel Wijono\.gemini\antigravity\scratch\bumigas'
with open(os.path.join(dir_path, 'index.html'), 'r', encoding='utf-8') as f:
    content = f.read()
    if 'favicon' in content.lower():
        print("Favicon tag FOUND in index.html")
    else:
        print("Favicon tag NOT FOUND in index.html")
