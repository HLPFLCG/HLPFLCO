js:  // Main initialization function
document.addEventListener('DOMContentLoaded', () => {
// Check if required libraries are loaded
if (!(window.gsap && window.ScrollTrigger && window.LocomotiveScroll && window.SplitType && window.THREE)) {
console.error('Required libraries failed to load');
return;
}

// Initialize preloader
initPreloader();

// This function will be called after preloader completes
function initAnimations() {
// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
el: document.querySelector('[data-scroll-container]'),
smooth: true,
lerp: 0.08,
smartphone: { smooth: true },
tablet: { smooth: true }
});

// Setup ScrollTrigger integration
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
scrollTop(value) {
return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
},
getBoundingClientRect() {
return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
},
pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
});

scroll.on('scroll', ScrollTrigger.update);
ScrollTrigger.addEventListener('refresh', () => scroll.update());
ScrollTrigger.defaults({ scroller: '[data-scroll-container]' });

// Initialize custom cursor
initCustomCursor();

// Initialize 3D elements
init3DElements();

// Initialize text animations
const textAnimator = new TextAnimator();
textAnimator.init();

// Initialize scroll animations
initScrollAnimations();

// Initialize navigation
initNavigation(scroll);

// Refresh ScrollTrigger
ScrollTrigger.refresh();
}

// Navigation functionality
function initNavigation(scroll) {
const toggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');

toggle.addEventListener('click', () => {
toggle.classList.toggle('active');
navList.classList.toggle('active');
document.body.classList.toggle('menu-open');
});

document.querySelectorAll('[data-scroll-to]').forEach(link => {
link.addEventListener('click', e => {
e.preventDefault();

const target = link.getAttribute('href');
scroll.scrollTo(target);

// Close mobile menu if open
toggle.classList.remove('active');
navList.classList.remove('active');
document.body.classList.remove('menu-open');
});
});
}
});
