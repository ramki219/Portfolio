// ========== GLOBAL VARIABLES ==========
let isMenuOpen = false;
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const scrollTopBtn = document.getElementById('scroll-top');

// ========== DOM CONTENT LOADED ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    setupScrollAnimations();
    setupFormulaCards();
});

// ========== WEBSITE INITIALIZATION ==========
function initializeWebsite() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial animations
    gsap.set('.hero-left > *', { opacity: 0, y: 50 });
    gsap.set('.profile-image', { opacity: 0, scale: 0.8 });
    gsap.set('.float-card', { opacity: 0, scale: 0.8 });
    
    // Hero animations
    gsap.timeline({ delay: 0.2 })
        .to('.hero-left > *', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        })
        .to('.profile-image', {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5")
        .to('.float-card', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.3");
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Mobile menu toggle
    if (burger) {
        burger.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    }
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Animate burger menu
    const spans = burger.querySelectorAll('span');
    if (isMenuOpen) {
        gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, duration: 0.3 });
        gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
    } else {
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
    }
}

// ========== SCROLL HANDLING ==========
function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Navbar background
    if (scrolled > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(12px)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
    
    // Scroll to top button
    if (scrollTopBtn) {
        if (scrolled > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }
    
    // Update active navigation
    updateActiveNavigation();
}

// ========== ACTIVE NAVIGATION ==========
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
    // Section animations
    gsap.utils.toArray('.section').forEach(section => {
        gsap.fromTo(section.children, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Expertise cards
    gsap.utils.toArray('.expertise-card').forEach(card => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 30,
            rotationX: -15
        }, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            rotation: index % 2 === 0 ? -5 : 5
        }, {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// ========== FORMULA CARDS ==========
function setupFormulaCards() {
    const formulaCards = document.querySelectorAll('.formula-card');
    
    formulaCards.forEach(card => {
        const header = card.querySelector('.formula-header');
        const content = card.querySelector('.formula-content');
        const expandBtn = card.querySelector('.expand-btn');
        
        header.addEventListener('click', () => {
            const isActive = content.classList.contains('active');
            
            // Close all other cards
            formulaCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const otherContent = otherCard.querySelector('.formula-content');
                    const otherBtn = otherCard.querySelector('.expand-btn');
                    otherContent.classList.remove('active');
                    otherBtn.textContent = '+';
                    otherBtn.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current card
            if (isActive) {
                content.classList.remove('active');
                expandBtn.textContent = '+';
                expandBtn.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('active');
                expandBtn.textContent = '−';
                expandBtn.style.transform = 'rotate(180deg)';
                
                // Animate content reveal
                gsap.fromTo(content.children, {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.1
                });
            }
        });
    });
}

// ========== UTILITY FUNCTIONS ==========
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Optimized scroll handler
const optimizedScrollHandler = throttle(handleScroll, 16);
window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/9d4048e7-2c68-46e0-96b1-9b304d1fa4a2.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadCriticalResources();

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error tracking here
});

// ========== ACCESSIBILITY ENHANCEMENTS ==========
// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu();
    }
});

// Focus management
document.addEventListener('focusin', function(e) {
    if (e.target.matches('a, button, input, textarea, select')) {
        e.target.style.outline = '2px solid #2563eb';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('a, button, input, textarea, select')) {
        e.target.style.outline = 'none';
    }
});

// ========== CONTACT FORM HANDLING ==========
function handleContactForm() {
    // Add contact form functionality here if needed
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    });
}

// Initialize contact form handling
handleContactForm();

console.log('Website initialized successfully! 🚀');
