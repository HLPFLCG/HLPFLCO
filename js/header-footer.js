/**
 * Unified Header and Footer Injection
 * Ensures consistent header and footer across all pages
 */

(function() {
    'use strict';

    // Header HTML - matches index.html exactly
    const headerHTML = `
        <div class="container">
            <a href="/" class="logo">
                <img src="images/updatedimages/landinglogosmall.svg" alt="HLPFL">
            </a>
            <nav class="nav">
                <ul class="nav__list" id="navList">
                    <li><a href="about.html">About</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="under-construction.html">VIPs</a></li>
                    <li><a href="under-construction.html">Shop</a></li>
                    <li><a href="under-construction.html">Contact</a></li>
                    <li><a href="https://calendly.com/founder-hlpfl/30min" class="btn btn--primary" target="_blank">Book Call</a></li>
                </ul>
                <button class="nav__toggle" id="navToggle" aria-expanded="false" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </div>
    `;

    // Footer HTML - matches index.html exactly
    const footerHTML = `
        <div class="container">
            <div class="footer-main">
                <div class="footer-brand fade-in-up">
                    <img src="images/footer/footerlogowebsitev1.webp" alt="HLPFL" class="footer-logo" loading="lazy">
                    <p class="footer-description">
                        Transforming music career chaos into clarity. We help independent musicians build legally solid, 
                        privacy-first businesses with standout brands.
                    </p>
                    <div class="footer-social">
                        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>

                <div class="footer-column fade-in-up" style="animation-delay: 0.1s">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="under-construction.html">Legal Foundation</a></li>
                        <li><a href="under-construction.html">Artist Branding</a></li>
                        <li><a href="under-construction.html">Music Rights & Royalties</a></li>
                        <li><a href="under-construction.html">Career Growth</a></li>
                    </ul>
                </div>

                <div class="footer-column fade-in-up" style="animation-delay: 0.2s">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="under-construction.html">Templates & Guides</a></li>
                        <li><a href="under-construction.html">VIP Program</a></li>
                        <li><a href="red-flag-guide.html">Red Flag Guide</a></li>
                        <li><a href="under-construction.html">Free Consultation</a></li>
                    </ul>
                </div>

                <div class="footer-column fade-in-up" style="animation-delay: 0.3s">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="about.html">About</a></li>
                        <li><a href="under-construction.html">Contact</a></li>
                        <li><a href="under-construction.html">Privacy Policy</a></li>
                        <li><a href="under-construction.html">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom fade-in-up">
                <p>2019 HLPFL. All rights reserved. Built with care for musicians.</p>
            </div>
        </div>
    `;

    /**
     * Initialize header
     */
    function initHeader() {
        const header = document.querySelector('header.header');
        
        if (header && !header.querySelector('.container')) {
            header.innerHTML = headerHTML;
            
            // Initialize mobile navigation
            const navToggle = document.getElementById('navToggle');
            const navList = document.getElementById('navList');
            
            if (navToggle && navList) {
                navToggle.addEventListener('click', function() {
                    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                    navToggle.setAttribute('aria-expanded', !isExpanded);
                    navList.classList.toggle('active');
                });
                
                // Close mobile nav when clicking on links
                navList.addEventListener('click', function(e) {
                    if (e.target.tagName === 'A') {
                        navList.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }

            // Add scroll effect
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    /**
     * Initialize footer
     */
    function initFooter() {
        const footer = document.querySelector('footer.footer');
        
        if (footer && !footer.querySelector('.container')) {
            footer.innerHTML = footerHTML;
        }
    }

    /**
     * Highlight current page in navigation
     */
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav__list a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === '/')) {
                link.style.color = 'var(--c-gold)';
                link.style.fontWeight = '600';
            }
        });
    }

    /**
     * Initialize everything when DOM is ready
     */
    function init() {
        initHeader();
        initFooter();
        highlightCurrentPage();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();