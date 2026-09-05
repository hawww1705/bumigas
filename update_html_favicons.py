import os
import re

dir_path = r'C:\Users\Hizkia Ariel Wijono\.gemini\antigravity\scratch\bumigas'

replacement = """
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/favicon.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/assets/images/favicon.png">
"""

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the existing link rel="icon" line
        # We will look for <link rel="icon" type="image/png" href="assets/images/favicon.png">
        # or similar and replace it.
        pattern = re.compile(r'<link\s+rel=[\'"]icon[\'"].*?>')
        new_content = pattern.sub(replacement.strip('\n'), content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated favicons in {filename}")
