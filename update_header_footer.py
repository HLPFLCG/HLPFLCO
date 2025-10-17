#!/usr/bin/env python3
"""
Script to ensure all pages have consistent header/footer structure
and load the unified header-footer.js script
"""

import re
import os

def ensure_header_footer_script(html_content, filename):
    """Ensure header-footer.js is loaded before other scripts"""
    
    # Check if header-footer.js is already included
    if 'header-footer.js' in html_content:
        return html_content
    
    # For index.html, we need to add the script but keep the existing header/footer
    # For other pages, the script will inject the header/footer
    
    # Add the script before form-validation.js
    if 'form-validation.js' in html_content:
        html_content = html_content.replace(
            '   <!-- Form Validation -->',
            '   <!-- Unified Header/Footer -->\n   <script src="js/header-footer.js"></script>\n\n   <!-- Form Validation -->'
        )
    else:
        # Add before closing body tag
        html_content = html_content.replace(
            '</body>',
            '   <!-- Unified Header/Footer -->\n   <script src="js/header-footer.js"></script>\n\n   </body>'
        )
    
    return html_content

def ensure_header_structure(html_content, filename):
    """Ensure header has correct structure for injection"""
    
    # Skip index.html as it has the full header
    if filename == 'index.html':
        return html_content
    
    # Check if header needs to be simplified for injection
    header_pattern = r'<header[^>]*>.*?</header>'
    
    def replace_header(match):
        # Return simplified header for injection
        return '<header class="header" id="header">\n   <!-- Header injected by header-footer.js -->\n   </header>'
    
    html_content = re.sub(header_pattern, replace_header, html_content, flags=re.DOTALL)
    
    return html_content

def ensure_footer_structure(html_content, filename):
    """Ensure footer has correct structure for injection"""
    
    # Skip index.html as it has the full footer
    if filename == 'index.html':
        return html_content
    
    # Check if footer needs to be simplified for injection
    footer_pattern = r'<footer[^>]*>.*?</footer>'
    
    def replace_footer(match):
        # Return simplified footer for injection
        return '<footer class="footer">\n   <!-- Footer injected by header-footer.js -->\n   </footer>'
    
    html_content = re.sub(footer_pattern, replace_footer, html_content, flags=re.DOTALL)
    
    return html_content

def add_loading_screen(html_content, filename):
    """Add loading screen to pages that don't have it"""
    
    # Skip if already has loading screen
    if 'loading-screen' in html_content:
        return html_content
    
    # Skip index.html as it already has it
    if filename == 'index.html':
        return html_content
    
    loading_screen = '''   <!-- Loading Screen -->
   <div class="loading-screen" id="loadingScreen">
       <img src="images/updatedimages/loadinglogo.svg" alt="HLPFL Logo" class="loading-logo">
       <div class="loading-text">Loading...</div>
   </div>

   <!-- Scroll Progress Bar -->
   <div class="scroll-progress" id="scrollProgress"></div>

   '''
    
    # Add after opening body tag
    html_content = html_content.replace('<body>', '<body>\n' + loading_screen)
    
    return html_content

def add_loading_script(html_content, filename):
    """Add loading screen script"""
    
    # Skip if already has loading script
    if 'loadingScreen' in html_content and 'hidden' in html_content:
        return html_content
    
    loading_script = '''
   <script>
       // Loading Screen
       window.addEventListener('load', function() {
           setTimeout(() => {
               const loadingScreen = document.getElementById('loadingScreen');
               if (loadingScreen) {
                   loadingScreen.classList.add('hidden');
               }
           }, 500);
       });

       // Scroll Progress Bar
       window.addEventListener('scroll', function() {
           const scrollProgress = document.getElementById('scrollProgress');
           if (scrollProgress) {
               const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
               const scrollPercent = (window.pageYOffset / winHeight) * 100;
               scrollProgress.style.width = scrollPercent + '%';
           }
       });
   </script>
   '''
    
    # Add before closing body tag
    html_content = html_content.replace('</body>', loading_script + '\n   </body>')
    
    return html_content

def process_html_file(filepath):
    """Process a single HTML file"""
    print(f"Processing {filepath}...")
    
    filename = os.path.basename(filepath)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Apply transformations
    content = ensure_header_footer_script(content, filename)
    content = ensure_header_structure(content, filename)
    content = ensure_footer_structure(content, filename)
    content = add_loading_screen(content, filename)
    content = add_loading_script(content, filename)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Updated {filepath}")

def main():
    """Main function to process all HTML files"""
    files_to_update = [
        'index.html',
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
    print("\nNext steps:")
    print("1. Test all pages to ensure header/footer appear correctly")
    print("2. Verify mobile menu works on all pages")
    print("3. Check that current page is highlighted in navigation")

if __name__ == '__main__':
    main()