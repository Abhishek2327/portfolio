// Typed.js - Typing animation
var typed = new Typed(".text", {
    strings: ["Python/Django Developer", "Data Analyst", "Competitive Programmer", "Web Developer"],
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
