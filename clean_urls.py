import os
import re

dir_path = r'C:\Users\Hizkia Ariel Wijono\.gemini\antigravity\scratch\bumigas'

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace href="index.html" with href="/"
        content = re.sub(r'href=["\']index\.html["\']', 'href="/"', content)
        
        # Replace href="page.html" with href="page"
        content = re.sub(r'href=["\']([a-zA-Z0-9_-]+)\.html["\']', r'href="\1"', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
