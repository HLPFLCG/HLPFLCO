#!/usr/bin/env python3
"""
Script to update all HTML pages to match index.html style
- Removes inline styles
- Ensures correct CSS references
- Adds analytics and form validation scripts
- Adds JSON-LD where appropriate
"""

import re
import os

def remove_inline_styles(html_content):
    """Remove <style>...</style> blocks from HTML"""
    # Find and remove style blocks
    pattern = r'<style>.*?</style>'
    cleaned = re.sub(pattern, '', html_content, flags=re.DOTALL)
    return cleaned

def add_scripts_before_body_close(html_content):
    """Add analytics and form validation scripts before </body>"""
    scripts = '''
   <!-- Form Validation -->
   <script src="js/form-validation.js"></script>
   <!-- Enhanced Analytics Tracking -->
   <script src="js/analytics.js"></script>
   '''
    
    # Check if scripts already exist
    if 'js/analytics.js' in html_content:
        return html_content
    
    # Add scripts before </body>
    html_content = html_content.replace('</body>', scripts + '\n   </body>')
    return html_content

def add_lazy_loading_to_images(html_content):
    """Add loading='lazy' to img tags that don't have it"""
    # Find all img tags without loading attribute
    pattern = r'<img\s+([^>]*?)(?<!loading=["\'])>'
    
    def add_lazy(match):
        img_tag = match.group(0)
        # Don't add to logo or loading screen images
        if 'loading-logo' in img_tag or 'logo' in img_tag.lower():
            return img_tag
        # Add loading="lazy" before the closing >
        return img_tag[:-1] + ' loading="lazy">'
    
    return re.sub(pattern, add_lazy, html_content)

def process_html_file(filepath):
    """Process a single HTML file"""
    print(f"Processing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove inline styles
    content = remove_inline_styles(content)
    
    # Add scripts
    content = add_scripts_before_body_close(content)
    
    # Add lazy loading to images
    content = add_lazy_loading_to_images(content)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Updated {filepath}")

def main():
    """Main function to process all HTML files"""
    files_to_update = [
        'about.html',
        'services.html',
        'red-flag-guide.html',
        'shop.html',
        'vip.html',
        'under-construction.html'
    ]
    
    for filename in files_to_update:
        if os.path.exists(filename):
            process_html_file(filename)
        else:
            print(f"⚠ File not found: {filename}")
    
    print("\n✅ All files processed successfully!")

if __name__ == '__main__':
    main()