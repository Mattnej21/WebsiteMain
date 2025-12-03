/* ===========================
   PORTFOLIO INTERACTIONS
   Smooth scrolling, parallax, micro-interactions
   =========================== */

class PortfolioApp {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.themeToggle = document.getElementById('themeToggle');
        this.contactForm = document.getElementById('contactForm');
        this.preloader = document.getElementById('preloader');
        
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.setupContactForm();
        this.setupParallax();
        this.setupMicroInteractions();
        this.hidePreloader();
    }

    // ===========================
    // THEME TOGGLE
    // ===========================

    setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // ===========================
    // NAVIGATION
    // ===========================

    setupNavigation() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when link clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Smooth scroll on anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // ===========================
    // SCROLL EFFECTS
    // ===========================

    setupScrollEffects() {
        let scrollTimeout;
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Navbar scroll effect
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Parallax effect on hero image
            const heroImage = document.querySelector('.profile-image');
            if (heroImage && scrollTop < window.innerHeight) {
                const offset = scrollTop * 0.5;
                heroImage.style.transform = `translateY(${offset}px)`;
            }

            // Scroll indicator fade
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                const opacity = Math.max(0, 1 - scrollTop / 200);
                scrollIndicator.style.opacity = opacity;
                scrollIndicator.style.pointerEvents = opacity === 0 ? 'none' : 'auto';
            }

            lastScrollTop = scrollTop;
        }, { passive: true });
    }

    // ===========================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===========================

    setupIntersectionObserver() {
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: false,
                mirror: true,
                offset: 100,
                disable: window.innerWidth < 768
            });
        }

        // Custom intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    // ===========================
    // PARALLAX EFFECTS
    // ===========================

    setupParallax() {
        const sections = document.querySelectorAll('.section');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrolled;
                const distance = scrolled - (sectionTop - window.innerHeight / 2);
                
                // Subtle parallax for section backgrounds
                if (Math.abs(distance) < window.innerHeight) {
                    const parallax = distance * 0.1;
                    section.style.backgroundPosition = `0 ${parallax}px`;
                }
            });
        }, { passive: true });
    }

    // ===========================
    // CONTACT FORM
    // ===========================

    setupContactForm() {
        if (!this.contactForm) return;

        this.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this.contactForm);
            const data = {
                name: this.contactForm.querySelector('input[type="text"]').value,
                email: this.contactForm.querySelector('input[type="email"]').value,
                message: this.contactForm.querySelector('textarea').value
            };

            // Submit to form service (you can use Formspree, EmailJS, etc.)
            // For now, just show success message
            this.showFormSuccess();
            this.contactForm.reset();
        });
    }

    showFormSuccess() {
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    }

    // ===========================
    // MICRO-INTERACTIONS
    // ===========================

    setupMicroInteractions() {
        // Button hover ripple effect
        this.setupRippleEffect();
        
        // Card hover animations
        this.setupCardAnimations();
        
        // Number counter animation
        this.setupNumberCounters();
        
        // Project card hover
        this.setupProjectCardHover();
    }

    setupRippleEffect() {
        document.querySelectorAll('.btn, .skill-tag, .social-link').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createRipple(e, element);
            });
        });
    }

    createRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    setupCardAnimations() {
        document.querySelectorAll('.stat-card, .education-card, .timeline-content').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupNumberCounters() {
        const statCards = document.querySelectorAll('.stat-card h3');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    const target = entry.target;
                    const finalValue = parseInt(target.textContent);
                    
                    if (!isNaN(finalValue)) {
                        this.animateCounter(target, finalValue);
                        target.dataset.counted = 'true';
                    }
                }
            });
        }, observerOptions);

        statCards.forEach(card => observer.observe(card));
    }

    animateCounter(element, finalValue) {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);
            
            element.textContent = currentValue + '+';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    setupProjectCardHover() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add glow effect
                this.style.boxShadow = '0 20px 60px rgba(187, 134, 252, 0.4)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
            });
        });
    }

    // ===========================
    // PRELOADER
    // ===========================

    hidePreloader() {
        // Preloader will auto-hide after 2s due to CSS animation
        // This ensures content is visible after animation
        setTimeout(() => {
            this.preloader.style.pointerEvents = 'none';
        }, 2000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================

// Enhanced scroll performance with throttling
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Perform scroll-based calculations here
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ===========================
// MOUSE TRACKING FOR DYNAMIC BACKGROUNDS
// ===========================

document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth);
    const mouseY = (e.clientY / window.innerHeight);
    
    // Update background gradient based on mouse position
    document.querySelectorAll('.hero').forEach(section => {
        const x = mouseX * 100;
        const y = mouseY * 100;
        section.style.backgroundImage = `
            radial-gradient(circle at ${x}% ${y}%, rgba(187, 134, 252, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100-x}% ${100-y}%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)
        `;
    });
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown') {
        const currentSection = document.querySelector('.section:in-viewport');
        if (currentSection && currentSection.nextElementSibling) {
            currentSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp') {
        const currentSection = document.querySelector('.section:in-viewport');
        if (currentSection && currentSection.previousElementSibling) {
            currentSection.previousElementSibling.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// VIEWPORT-SPECIFIC UTILITIES
// ===========================

// Detect if element is in viewport
Element.prototype.isInViewport = function() {
    const rect = this.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// CSS :in-viewport selector polyfill
const updateInViewportElements = () => {
    document.querySelectorAll('.section').forEach(section => {
        if (section.isInViewport()) {
            section.classList.add('in-viewport');
        } else {
            section.classList.remove('in-viewport');
        }
    });
};

window.addEventListener('scroll', updateInViewportElements, { passive: true });
window.addEventListener('resize', updateInViewportElements, { passive: true });
updateInViewportElements();

// ===========================
// DEVICE-SPECIFIC INTERACTIONS
// ===========================

// Detect touch device
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

// Adjust interactions for touch devices
if (isTouchDevice()) {
    document.documentElement.classList.add('touch-device');
}

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Add keyboard focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus management for modals/menus
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navMenu && navLinks.length > 0) {
    navLinks[0].addEventListener('focus', () => {
        navMenu.classList.add('visible');
    });

    navLinks[navLinks.length - 1].addEventListener('blur', () => {
        if (!navMenu.classList.contains('open')) {
            navMenu.classList.remove('visible');
        }
    });
}
