// Typed.js - Typing animation
var typed = new Typed(".text", {
    strings: ["Python/Django Developer", "AI/ML Engineer", "Data Analyst", "Competitive Programmer", "Web Developer"],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 1500,
    loop: true
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('bx-x');
    });

    // Close menu on link click
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('bx-x');
        });
    });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    // Sticky header shadow
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 80) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        portfolioBoxes.forEach(box => {
            if (filter === 'all' || box.getAttribute('data-category') === filter) {
                box.style.display = 'block';
                box.style.animation = 'slideTop 0.5s ease forwards';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .portfolio-box, .achievement-card, .about-card, .skills-column').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add 'show' class styles
const style = document.createElement('style');
style.textContent = '.show { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ==================== LIVE CODEFORCES RATING ====================
async function fetchCodeforcesRating() {
    try {
        const res = await fetch('https://codeforces.com/api/user.info?handles=heshane');
        const data = await res.json();
        if (data.status === 'OK') {
            const user = data.result[0];
            const rating = user.rating || 1602;
            const maxRating = user.maxRating || 1602;
            const rank = user.rank || 'expert';

            const cfRatingEl = document.getElementById('cf-rating');
            const cfRankLabel = document.getElementById('cf-rank-label');

            if (cfRatingEl) cfRatingEl.textContent = rating;
            if (cfRankLabel) {
                cfRankLabel.textContent = rank.charAt(0).toUpperCase() + rank.slice(1);
            }
        }
    } catch (e) {
        // fallback: keep static values already in HTML
    }
}

// ==================== LIVE LEETCODE RATING ====================
async function fetchLeetCodeRating() {
    try {
        const res = await fetch('https://leetcode-stats-api.herokuapp.com/Heshane-11');
        const data = await res.json();
        if (data.status === 'success') {
            const lcRatingEl = document.getElementById('lc-rating');
            if (lcRatingEl && data.ranking) {
                // Keep the stored max rating, just update solved count if available
            }
        }
    } catch (e) {
        // fallback: keep static 2069 already in HTML
    }
}

// ==================== VISITOR COUNTER ====================
async function fetchVisitorCount() {
    const el = document.getElementById('visitor-count');
    if (!el) return;

    // Increment local count
    let localCount = parseInt(localStorage.getItem('portfolio_visits') || '0') + 1;
    localStorage.setItem('portfolio_visits', localCount);

    try {
        const res = await fetch('https://api.counterapi.dev/v1/heshane11/portfolio/up', {
            method: 'GET'
        });
        const data = await res.json();
        if (data && data.count) {
            el.textContent = data.count.toLocaleString();
        } else {
            el.textContent = localCount.toLocaleString();
        }
    } catch (e) {
        el.textContent = localCount.toLocaleString();
    }
}

// Run on load
fetchCodeforcesRating();
fetchLeetCodeRating();
fetchVisitorCount();

// ==================== ANIMATED PARTICLES BACKGROUND ====================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 100;
    const connectionDistance = 120;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 238, 255, 0.4)';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.update();
            p.draw();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 238, 255, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    animate();
}

document.addEventListener('DOMContentLoaded', initParticles);
initParticles();

