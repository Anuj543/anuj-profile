// ==================== GSAP REGISTRATION ==================== 
gsap.registerPlugin(ScrollTrigger);

// ==================== NAVIGATION ==================== 

const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scroll and active nav link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Scroll to section
        targetSection.scrollIntoView({ behavior: 'smooth' });
        mobileMenu.classList.add('hidden');
    });
});

// ==================== HERO ANIMATIONS ==================== 

const heroAnimation = gsap.timeline();

heroAnimation
    .from('.hero-title', {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power4.out'
    })
    .from('.hero-subtitle', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        ease: 'power4.out'
    }, '-=0.4')
    .from('.hero-buttons', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        ease: 'power4.out'
    }, '-=0.4');

// ==================== ANIMATED CANVAS BACKGROUND ==================== 

function createParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('canvas-container');
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    canvas.style.opacity = '0.8';
    container.appendChild(canvas);

    const particles = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 20000));

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = ['59, 130, 246', '168, 85, 247', '236, 72, 153'][Math.floor(Math.random() * 3)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw connections
            particles.forEach((otherParticle) => {
                const dx = this.x - otherParticle.x;
                const dy = this.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(${this.color}, ${this.opacity * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let animationId;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas on window resize
    const resizeCanvas = debounce(() => {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }, 250);

    window.addEventListener('resize', resizeCanvas);

    return {
        canvas,
        particles,
        stop: () => cancelAnimationFrame(animationId)
    };
}

const particleSystem = createParticles();

// ==================== SCROLL ANIMATIONS ==================== 

// Animate elements on scroll
const revealElements = document.querySelectorAll('.section-title, .about-content, .about-image, .project-card, .skill-category, .contact-form, .contact-info');

const revealOnScroll = gsap.utils.toArray(revealElements);

revealOnScroll.forEach((element) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            markers: false
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
});

// Section title scroll animation
gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.to(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top center',
            end: 'top 20%',
            scrub: 0.5,
            markers: false
        },
        letterSpacing: '2px',
        duration: 1
    });
});

// ==================== SKILL BARS ANIMATION ==================== 

const animatedSkillBars = new Set();

const skillBarAnimation = gsap.utils.toArray('.skill-item');

skillBarAnimation.forEach((skillItem) => {
    const skillBar = skillItem.querySelector('.skill-bar');
    const skillProgress = skillBar?.querySelector('.skill-progress');
    const skillName = skillItem.querySelector('.skill-name');
    
    if (skillProgress && skillBar) {
        ScrollTrigger.create({
            trigger: skillItem.closest('.skill-category'),
            onEnter: () => {
                if (!animatedSkillBars.has(skillItem)) {
                    animatedSkillBars.add(skillItem);
                    
                    // Get the target width from style or data attribute
                    const targetWidth = skillProgress.style.width || '80%';
                    const numericWidth = parseInt(targetWidth);
                    
                    gsap.to(skillProgress, {
                        width: targetWidth,
                        duration: 1.5,
                        ease: 'power3.out'
                    });

                    // Animate text color on progress
                    gsap.to(skillName, {
                        color: '#60a5fa',
                        duration: 1.5,
                        ease: 'power3.out'
                    }, 0);
                }
            },
            once: true
        });
    }
});

// ==================== PROJECT HOVER EFFECT ==================== 

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            boxShadow: '0 30px 60px rgba(59, 130, 246, 0.4)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ==================== FORM SUBMISSION ==================== 

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Validate form
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                gsap.to(input, {
                    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.3)',
                    duration: 0.3
                });
            }
        });

        if (!isValid) return;

        // Disable button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';

        // Add loading animation
        gsap.to(submitBtn, {
            opacity: 0.7,
            duration: 0.3
        });

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success state
            submitBtn.textContent = 'Message Sent! ✓';
            gsap.to(submitBtn, {
                background: 'linear-gradient(135deg, #10b981, #059669)',
                duration: 0.4
            });

            // Reset form with animation
            inputs.forEach((input, index) => {
                gsap.to(input, {
                    opacity: 0.5,
                    duration: 0.3,
                    delay: index * 0.05
                });
            });

            contactForm.reset();

            // Restore inputs
            inputs.forEach((input, index) => {
                gsap.to(input, {
                    opacity: 1,
                    duration: 0.3,
                    delay: 1.5 + index * 0.05
                });
            });

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                gsap.to(submitBtn, {
                    background: '',
                    opacity: 1,
                    duration: 0.4
                });
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.textContent = 'Error! Try Again';
            submitBtn.disabled = false;

            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 3000);
        }
    });

    // Real-time input validation
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                gsap.to(this, {
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                    duration: 0.3
                });
            }
        });

        input.addEventListener('focus', function() {
            gsap.to(this, {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
                duration: 0.3
            });
        });
    });
}

// ==================== STATS COUNTER ==================== 

const animatedStats = new Set();

gsap.utils.toArray('.stat-card').forEach((card) => {
    const valueElement = card.querySelector('.text-3xl');
    
    if (valueElement) {
        ScrollTrigger.create({
            trigger: card,
            onEnter: () => {
                if (!animatedStats.has(card)) {
                    animatedStats.add(card);
                    
                    const finalValue = parseInt(valueElement.textContent);
                    
                    gsap.fromTo(valueElement, 
                        { innerHTML: 0 },
                        {
                            innerHTML: finalValue,
                            duration: 2.5,
                            ease: 'power2.out',
                            snap: { innerHTML: 1 },
                            onUpdate: function() {
                                valueElement.textContent = Math.floor(this.targets()[0].innerHTML);
                            }
                        }
                    );

                    // Add entrance animation to the card
                    gsap.fromTo(card,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
                    );
                }
            },
            once: true
        });
    }
});

// ==================== ACTIVE NAV LINK ON SCROLL ==================== 

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== PARALLAX SCROLLING ==================== 

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== STAGGERED ANIMATIONS ==================== 

const staggerTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '#projects',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false
    }
});

document.querySelectorAll('.project-card').forEach((card, index) => {
    staggerTimeline.from(card, {
        opacity: 0,
        y: 30,
        rotation: 5,
        duration: 0.5
    }, index * 0.1);
});

// ==================== BUTTON RIPPLE EFFECT ==================== 

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ==================== SMOOTH SCROLL POLYFILL ==================== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== INTERSECTION OBSERVER ==================== 

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== KEYBOARD NAVIGATION ==================== 

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
    }
});

// ==================== PERFORMANCE OPTIMIZATION ==================== 

// Lazy load images
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src; // Trigger image load if not already loaded
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==================== UTILITY FUNCTIONS ==================== 

// Debounce function for resize events
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== INIT ==================== 

console.log('Portfolio website initialized successfully! 🚀');
