/**
 * Page Enhancements
 * Additional improvements for better UX and accessibility
 */

(function() {
    'use strict';

    /**
     * Add skip to content link for accessibility
     */
    function addSkipLink() {
        // Check if skip link already exists
        if (document.querySelector('.skip-link')) {
            return;
        }

        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.setAttribute('tabindex', '0');
        
        // Insert at the beginning of body
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Add smooth page transitions
     */
    function addPageTransitions() {
        // Fade in page on load
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-in';
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Fade out on navigation
        document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's a special link
                if (!href || href === '#' || href.startsWith('javascript:')) {
                    return;
                }

                e.preventDefault();
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }

    /**
     * Add breadcrumb navigation
     */
    function addBreadcrumbs() {
        // Skip for index page
        const path = window.location.pathname;
        if (path === '/' || path.endsWith('index.html')) {
            return;
        }

        // Check if breadcrumbs already exist
        if (document.querySelector('.breadcrumbs')) {
            return;
        }

        // Get page name
        const pageName = path.split('/').pop().replace('.html', '').replace(/-/g, ' ');
        const pageTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1);

        // Create breadcrumb HTML
        const breadcrumbHTML = `
            <nav class="breadcrumbs" aria-label="Breadcrumb">
                <div class="container">
                    <ol>
                        <li><a href="/">Home</a></li>
                        <li aria-current="page">${pageTitle}</li>
                    </ol>
                </div>
            </nav>
        `;

        // Insert after header
        const header = document.querySelector('header.header');
        if (header) {
            header.insertAdjacentHTML('afterend', breadcrumbHTML);
        }
    }

    /**
     * Optimize font loading
     */
    function optimizeFontLoading() {
        // Add font-display: swap to font links
        document.querySelectorAll('link[href*="fonts.googleapis.com"]').forEach(link => {
            const href = link.getAttribute('href');
            if (!href.includes('display=')) {
                link.setAttribute('href', href + '&display=swap');
            }
        });
    }

    /**
     * Add back to top button
     */
    function addBackToTop() {
        // Check if button already exists
        if (document.querySelector('.back-to-top')) {
            return;
        }

        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.setAttribute('aria-label', 'Back to top');
        button.style.display = 'none';
        
        document.body.appendChild(button);

        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                button.style.display = 'flex';
            } else {
                button.style.display = 'none';
            }
        });

        // Scroll to top on click
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Add print styles trigger
     */
    function addPrintOptimization() {
        // Add print-friendly class when printing
        window.addEventListener('beforeprint', function() {
            document.body.classList.add('printing');
        });

        window.addEventListener('afterprint', function() {
            document.body.classList.remove('printing');
        });
    }

    /**
     * Improve external link handling
     */
    function improveExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            // Add rel attributes for security
            if (!link.getAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }

            // Add visual indicator for external links
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-external-link-alt external-icon';
                icon.style.marginLeft = '5px';
                icon.style.fontSize = '0.8em';
                link.appendChild(icon);
            }
        });
    }

    /**
     * Add keyboard navigation improvements
     */
    function improveKeyboardNav() {
        // Add visible focus indicators
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });
    }

    /**
     * Add CSS for enhancements
     */
    function addEnhancementStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Skip Link */
            .skip-link {
                position: absolute;
                top: -40px;
                left: 0;
                background: var(--c-gold);
                color: var(--c-white);
                padding: 8px 16px;
                text-decoration: none;
                z-index: 10000;
                border-radius: 0 0 4px 0;
                font-weight: 600;
            }

            .skip-link:focus {
                top: 0;
            }

            /* Breadcrumbs */
            .breadcrumbs {
                background: var(--c-bg-secondary);
                padding: 1rem 0;
                border-bottom: 1px solid var(--c-border);
                margin-top: 80px;
            }

            .breadcrumbs ol {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .breadcrumbs li {
                display: flex;
                align-items: center;
                color: var(--c-text-muted);
                font-size: 0.9rem;
            }

            .breadcrumbs li:not(:last-child)::after {
                content: '/';
                margin-left: 0.5rem;
                color: var(--c-text-light);
            }

            .breadcrumbs a {
                color: var(--c-gold);
                text-decoration: none;
                transition: color var(--tr-quick);
            }

            .breadcrumbs a:hover {
                color: var(--c-gold-light);
                text-decoration: underline;
            }

            /* Back to Top Button */
            .back-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                background: var(--c-gold);
                color: var(--c-white);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: var(--shadow-lg);
                transition: all var(--tr-smooth);
                z-index: 1000;
            }

            .back-to-top:hover {
                background: var(--c-gold-light);
                transform: translateY(-5px);
                box-shadow: var(--shadow-xl);
            }

            /* Keyboard Navigation */
            .keyboard-nav *:focus {
                outline: 3px solid var(--c-gold) !important;
                outline-offset: 2px !important;
            }

            /* External Link Icon */
            .external-icon {
                opacity: 0.7;
            }

            /* Print Styles */
            @media print {
                .header,
                .footer,
                .nav__toggle,
                .back-to-top,
                .loading-screen,
                .scroll-progress {
                    display: none !important;
                }

                body {
                    background: white !important;
                    color: black !important;
                }

                a {
                    text-decoration: underline !important;
                }

                .breadcrumbs {
                    border-bottom: 1px solid #ccc;
                }
            }

            /* Mobile Responsive */
            @media (max-width: 768px) {
                .breadcrumbs {
                    margin-top: 70px;
                }

                .back-to-top {
                    bottom: 1rem;
                    right: 1rem;
                    width: 45px;
                    height: 45px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Initialize all enhancements
     */
    function init() {
        addSkipLink();
        addBreadcrumbs();
        optimizeFontLoading();
        addBackToTop();
        addPrintOptimization();
        improveExternalLinks();
        improveKeyboardNav();
        addEnhancementStyles();
        
        console.log('Page enhancements initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();