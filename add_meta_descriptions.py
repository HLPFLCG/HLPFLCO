#!/usr/bin/env python3
"""
Script to add proper meta descriptions to all pages
"""

import re

# Meta descriptions for each page
META_DESCRIPTIONS = {
    'about.html': 'Learn about HLPFL\'s mission to transform musical talent into legally solid music businesses. Meet our team and discover why independent musicians trust us.',
    'services.html': 'Comprehensive music business services for independent artists. From legal foundations to artist branding, we help you build a sustainable music career.',
    'red-flag-guide.html': 'Download our free Music Industry Red Flag Guide. Learn to spot warning signs and protect your music career from common industry pitfalls.',
    'shop.html': 'Browse our collection of music business templates, guides, and resources designed specifically for independent musicians and artists.',
    'vip.html': 'Join the HLPFL VIP Program for exclusive access to premium music business resources, personalized guidance, and priority support.',
    'under-construction.html': 'This page is coming soon! Get notified when we launch and be the first to access new features and resources for your music career.'
}

def add_meta_description(html_content, filename, description):
    """Add or update meta description"""
    
    # Check if meta description already exists
    if 'name="description"' in html_content:
        # Update existing description
        pattern = r'<meta name="description" content="[^"]*">'
        replacement = f'<meta name="description" content="{description}">'
        html_content = re.sub(pattern, replacement, html_content)
    else:
        # Add new meta description after charset
        charset_pattern = r'(<meta charset="UTF-8">)'
        replacement = f'\\1\n    <meta name="description" content="{description}">'
        html_content = re.sub(charset_pattern, replacement, html_content)
    
    return html_content

def add_og_description(html_content, filename, description):
    """Add or update Open Graph description"""
    
    # Check if OG description already exists
    if 'property="og:description"' in html_content:
        # Update existing OG description
        pattern = r'<meta property="og:description" content="[^"]*">'
        replacement = f'<meta property="og:description" content="{description}">'
        html_content = re.sub(pattern, replacement, html_content)
    else:
        # Add new OG description after og:title if it exists
        if 'property="og:title"' in html_content:
            og_title_pattern = r'(<meta property="og:title" content="[^"]*">)'
            replacement = f'\\1\n    <meta property="og:description" content="{description}">'
            html_content = re.sub(og_title_pattern, replacement, html_content)
    
    return html_content

def process_file(filename):
    """Process a single file"""
    if filename not in META_DESCRIPTIONS:
        return
    
    print(f"Processing {filename}...")
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        description = META_DESCRIPTIONS[filename]
        
        # Add meta description
        content = add_meta_description(content, filename, description)
        
        # Add OG description
        content = add_og_description(content, filename, description)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Updated {filename}")
    except Exception as e:
        print(f"✗ Error processing {filename}: {e}")

def main():
    """Main function"""
    for filename in META_DESCRIPTIONS.keys():
        process_file(filename)
    
    print("\n✅ All meta descriptions added!")

if __name__ == '__main__':
    main()