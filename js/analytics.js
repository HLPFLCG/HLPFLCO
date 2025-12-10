/**
 * HLPFL Enhanced Analytics Tracking - GA4 Compliant
 * Following Google Analytics 4 and Google Tag Manager Best Practices
 * Based on 2024 industry standards
 */

(function() {
    'use strict';

    // Initialize dataLayer if not present
    window.dataLayer = window.dataLayer || [];
    
    // HLPFL Analytics Helper Object
    window.HLPFLAnalytics = {
        // Push event to dataLayer with proper GA4 structure
        pushEvent: function(eventName, parameters = {}) {
            window.dataLayer.push({
                'event': eventName,
                ...parameters
            });
            
            // Debug logging in development
            if (window.location.hostname === 'localhost' || window.location.hostname.includes('staging')) {
                console.log('📊 GA4 Event:', eventName, parameters);
            }
        },

        // E-commerce tracking helpers
        ecommerce: {
            viewService: function(service) {
                this.pushEvent('view_item', {
                    'ecommerce': {
                        'items': [{
                            'item_id': service.id || 'service-' + service.name.toLowerCase().replace(/\s+/g, '-'),
                            'item_name': service.name,
                            'item_category': service.category || 'service',
                            'price': service.price || 0,
                            'quantity': 1
                        }]
                    }
                });
            },

            selectService: function(service) {
                this.pushEvent('select_item', {
                    'ecommerce': {
                        'items': [{
                            'item_id': service.id || 'service-' + service.name.toLowerCase().replace(/\s+/g, '-'),
                            'item_name': service.name,
                            'item_category': service.category || 'service',
                            'price': service.price || 0,
                            'quantity': 1
                        }]
                    }
                });
            },

            beginCheckout: function(items, value = 0) {
                this.pushEvent('begin_checkout', {
                    'ecommerce': {
                        'value': value,
                        'currency': 'USD',
                        'items': items
                    }
                });
            },

            purchase: function(transaction) {
                this.pushEvent('purchase', {
                    'ecommerce': {
                        'transaction_id': transaction.id,
                        'value': transaction.value,
                        'currency': transaction.currency || 'USD',
                        'items': transaction.items
                    }
                });
            }
        },

        // User tracking helpers
        user: {
            setUserId: function(userId) {
                this.pushEvent('user_id_set', {
                    'user_id': userId
                });
            },

            setUserProperties: function(properties) {
                this.pushEvent('user_properties_set', properties);
            },

            login: function(method) {
                this.pushEvent('login', {
                    'method': method
                });
            },

            signUp: function(method) {
                this.pushEvent('sign_up', {
                    'method': method
                });
            }
        },

        // Lead generation tracking
        leadGeneration: {
            formStart: function(formType, formLocation) {
                this.pushEvent('form_start', {
                    'form_type': formType,
                    'form_location': formLocation
                });
            },

            formSubmit: function(formType, formLocation, leadSource) {
                this.pushEvent('generate_lead', {
                    'form_type': formType,
                    'form_location': formLocation,
                    'lead_source': leadSource
                });
            },

            newsletterSubscribe: function(source) {
                this.pushEvent('newsletter_subscribe', {
                    'source': source
                });
            }
        },

        // Engagement tracking
        engagement: {
            scrollDepth: function(depth) {
                this.pushEvent('scroll', {
                    'percent_scrolled': depth
                });
            },

            videoPlay: function(videoTitle, videoUrl) {
                this.pushEvent('video_start', {
                    'video_title': videoTitle,
                    'video_url': videoUrl,
                    'video_provider': 'custom'
                });
            },

            videoProgress: function(videoTitle, progress) {
                this.pushEvent('video_progress', {
                    'video_title': videoTitle,
                    'video_percent': progress
                });
            },

            fileDownload: function(fileName, fileUrl) {
                this.pushEvent('file_download', {
                    'file_name': fileName,
                    'file_url': fileUrl,
                    'file_extension': fileName.split('.').pop().toLowerCase()
                });
            }
        },

        // Content tracking
        content: {
            pageView: function(pageData) {
                this.pushEvent('page_view', {
                    'page_title': pageData.title,
                    'page_location': pageData.location,
                    'page_referrer': pageData.referrer,
                    'custom_page_type': pageData.type || 'standard'
                });
            },

            outboundClick: function(linkUrl, linkText, linkType) {
                this.pushEvent('outbound_click', {
                    'link_url': linkUrl,
                    'link_text': linkText,
                    'link_type': linkType
                });
            },

            search: function(searchTerm) {
                this.pushEvent('search', {
                    'search_term': searchTerm
                });
            }
        }
    };

    // Helper functions
    const helpers = {
        // Get element location on page
        getElementLocation: function(element) {
            const sections = ['hero', 'services', 'about', 'contact', 'footer'];
            let location = 'unknown';

            sections.forEach(function(section) {
                const sectionElement = document.querySelector('.' + section + '-section, .' + section + ', #' + section);
                if (sectionElement && sectionElement.contains(element)) {
                    location = section;
                }
            });

            return location;
        },

        // Get page type from URL
        getPageType: function() {
            const path = window.location.pathname;
            if (path === '/' || path === '/index.html') return 'home';
            if (path.includes('/services')) return 'services';
            if (path.includes('/about')) return 'about';
            if (path.includes('/contact')) return 'contact';
            if (path.includes('/resources')) return 'resources';
            if (path.includes('/blog')) return 'blog';
            return 'other';
        },

        // Identify social platform
        getSocialPlatform: function(url) {
            if (!url) return 'unknown';
            if (url.includes('linkedin.com')) return 'linkedin';
            if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
            if (url.includes('instagram.com')) return 'instagram';
            if (url.includes('youtube.com')) return 'youtube';
            if (url.includes('facebook.com')) return 'facebook';
            if (url.includes('tiktok.com')) return 'tiktok';
            return 'other';
        },

        // Debounce function to prevent excessive tracking
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    // Event tracking implementations
    const tracking = {
        // Track service interactions
        trackServiceInteractions: function() {
            // Service card clicks
            document.querySelectorAll('.service-card').forEach(function(card) {
                card.addEventListener('click', function(e) {
                    const serviceName = this.querySelector('h3')?.textContent.trim() || 'Unknown Service';
                    const serviceData = {
                        name: serviceName,
                        category: 'service',
                        location: helpers.getElementLocation(this)
                    };

                    window.HLPFLAnalytics.ecommerce.selectService(serviceData);
                    
                    // Also track general engagement
                    window.HLPFLAnalytics.pushEvent('service_interaction', {
                        'service_name': serviceName,
                        'interaction_type': 'click',
                        'location': serviceData.location
                    });
                });
            });
        },

        // Track form interactions
        trackFormInteractions: function() {
            document.querySelectorAll('form').forEach(function(form) {
                const formType = form.id || form.className || 'contact_form';
                const formLocation = helpers.getElementLocation(form);

                // Track form start (first field focus)
                const firstInput = form.querySelector('input, textarea, select');
                if (firstInput) {
                    firstInput.addEventListener('focus', function() {
                        window.HLPFLAnalytics.leadGeneration.formStart(formType, formLocation);
                    }, { once: true });
                }

                // Track form submission
                form.addEventListener('submit', function(e) {
                    const formData = new FormData(form);
                    const email = formData.get('email') || '';
                    const leadSource = window.location.pathname;

                    // Track lead generation
                    window.HLPFLAnalytics.leadGeneration.formSubmit(formType, formLocation, leadSource);

                    // If we have an email, set it as user property
                    if (email) {
                        window.HLPFLAnalytics.user.setUserProperties({
                            'email_provided': 'true',
                            'lead_source': leadSource
                        });
                    }
                });
            });
        },

        // Track navigation interactions
        trackNavigationInteractions: function() {
            // Main navigation
            document.querySelectorAll('.nav__list a, .main-nav a').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const linkText = this.textContent.trim();
                    const linkHref = this.getAttribute('href') || '';

                    window.HLPFLAnalytics.pushEvent('navigation_click', {
                        'link_text': linkText,
                        'link_url': linkHref,
                        'link_type': 'main_navigation'
                    });
                });
            });

            // Footer navigation
            document.querySelectorAll('.footer a').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const linkText = this.textContent.trim();
                    const linkHref = this.getAttribute('href') || '';

                    if (linkHref.includes('http') && !linkHref.includes('hlpfl.org')) {
                        // External link
                        window.HLPFLAnalytics.content.outboundClick(linkHref, linkText, 'footer_link');
                    } else {
                        // Internal link
                        window.HLPFLAnalytics.pushEvent('footer_click', {
                            'link_text': linkText,
                            'link_url': linkHref
                        });
                    }
                });
            });

            // Social media links
            document.querySelectorAll('.social-links a, .footer-social a').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const platform = helpers.getSocialPlatform(this.getAttribute('href'));
                    
                    window.HLPFLAnalytics.pushEvent('social_media_click', {
                        'social_platform': platform,
                        'link_location': helpers.getElementLocation(this)
                    });
                });
            });
        },

        // Track button interactions
        trackButtonInteractions: function() {
            document.querySelectorAll('.btn, .button, button[type="button"]').forEach(function(button) {
                button.addEventListener('click', function(e) {
                    const buttonText = this.textContent.trim();
                    const buttonClass = this.className;
                    const buttonLocation = helpers.getElementLocation(this);

                    // Skip certain buttons to avoid noise
                    if (buttonText === '' || buttonText === '×' || buttonType === 'close') return;

                    window.HLPFLAnalytics.pushEvent('button_click', {
                        'button_text': buttonText,
                        'button_class': buttonClass,
                        'button_location': buttonLocation
                    });
                });
            });
        },

        // Track scroll depth
        trackScrollDepth: function() {
            let trackedDepths = [];
            const scrollDepths = [25, 50, 75, 90];

            const handleScroll = helpers.debounce(function() {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );

                scrollDepths.forEach(function(depth) {
                    if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                        trackedDepths.push(depth);
                        window.HLPFLAnalytics.engagement.scrollDepth(depth);
                    }
                });
            }, 1000);

            window.addEventListener('scroll', handleScroll);
        },

        // Track popup interactions
        trackPopupInteractions: function() {
            // Red Flag popup open
            document.querySelectorAll('[onclick*="openRedFlagPopup"], .red-flag-trigger').forEach(function(trigger) {
                trigger.addEventListener('click', function() {
                    window.HLPFLAnalytics.pushEvent('popup_open', {
                        'popup_name': 'red_flag_guide',
                        'trigger_location': helpers.getElementLocation(this),
                        'trigger_text': this.textContent.trim()
                    });
                });
            });

            // Popup close
            document.querySelectorAll('.popup-close, .modal-close').forEach(function(closeButton) {
                closeButton.addEventListener('click', function() {
                    window.HLPFLAnalytics.pushEvent('popup_close', {
                        'popup_name': 'red_flag_guide',
                        'close_method': 'button'
                    });
                });
            });

            // Newsletter popup interactions
            document.querySelectorAll('.newsletter-form').forEach(function(form) {
                form.addEventListener('submit', function(e) {
                    window.HLPFLAnalytics.leadGeneration.newsletterSubscribe('popup');
                });
            });
        },

        // Track file downloads
        trackFileDownloads: function() {
            document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"]').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const fileUrl = this.getAttribute('href');
                    const fileName = fileUrl.split('/').pop();
                    
                    window.HLPFLAnalytics.engagement.fileDownload(fileName, fileUrl);
                });
            });
        },

        // Track time engagement
        trackTimeEngagement: function() {
            const timeIntervals = [30, 60, 180, 300]; // 30s, 1min, 3min, 5min
            let trackedIntervals = [];
            const startTime = Date.now();

            setInterval(function() {
                const timeOnPage = Math.floor((Date.now() - startTime) / 1000);

                timeIntervals.forEach(function(interval) {
                    if (timeOnPage >= interval && !trackedIntervals.includes(interval)) {
                        trackedIntervals.push(interval);
                        window.HLPFLAnalytics.pushEvent('user_engagement', {
                            'engagement_time_msec': interval * 1000,
                            'engagement_type': 'time_on_page'
                        });
                    }
                });
            }, 5000);
        },

        // Track outbound links
        trackOutboundLinks: function() {
            document.querySelectorAll('a[href^="http"]').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const linkUrl = this.getAttribute('href');
                    
                    // Only track external links (not hlpfl.org)
                    if (!linkUrl.includes('hlpfl.org')) {
                        const linkText = this.textContent.trim();
                        window.HLPFLAnalytics.content.outboundClick(linkUrl, linkText, 'external_link');
                    }
                });
            });
        }
    };

    // Initialize all tracking
    function initAnalytics() {
        // Track initial page view
        window.HLPFLAnalytics.content.pageView({
            title: document.title,
            location: window.location.href,
            referrer: document.referrer,
            type: helpers.getPageType()
        });

        // Wait for DOM to be ready before setting up event tracking
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setupEventTracking();
            });
        } else {
            setupEventTracking();
        }
    }

    function setupEventTracking() {
        // Setup all event tracking
        tracking.trackServiceInteractions();
        tracking.trackFormInteractions();
        tracking.trackNavigationInteractions();
        tracking.trackButtonInteractions();
        tracking.trackScrollDepth();
        tracking.trackPopupInteractions();
        tracking.trackFileDownloads();
        tracking.trackTimeEngagement();
        tracking.trackOutboundLinks();

        console.log('🚀 HLPFL GA4 Analytics tracking initialized');
    }

    // Initialize when script loads
    initAnalytics();

})();
