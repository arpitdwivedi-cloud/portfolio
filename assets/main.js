// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Navigation active state + aria-current
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
});

// Scroll animations using Intersection Observer
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => { entry.target.classList.add('animated'); }, index * 100);
        }
    });
}, observerOptions);
animatedElements.forEach(element => observer.observe(element));

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Add loading animation delay for staggered effect
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
    heroElements.forEach((element, index) => {
        setTimeout(() => { element.classList.add('animated'); }, index * 200);
    });

    // Trigger stagger grids when in view
    const staggerGrids = document.querySelectorAll('.stagger-grid');
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    staggerGrids.forEach(g => gridObserver.observe(g));
});

// Enhanced scroll effects for navbar
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
    lastScrollY = currentScrollY;
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.floating-element');
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
const debouncedScroll = debounce(() => { /* heavy scroll work */ }, 16);
window.addEventListener('scroll', debouncedScroll);


// Theme toggle with persistence
const themeToggle = document.getElementById('themeToggle');
const docBody = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    docBody.setAttribute('data-theme', savedTheme);
}
function cycleTheme() {
    const current = docBody.getAttribute('data-theme') || 'genie';
    const next = current === 'genie' ? 'dark' : current === 'dark' ? 'light' : 'genie';
    docBody.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}
if (themeToggle) themeToggle.addEventListener('click', cycleTheme);


