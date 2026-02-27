// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-xmark');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-xmark');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal Animation using Intersection Observer
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, revealOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        revealOnScroll.unobserve(entry.target);
    });
}, revealOptions);

// Add reveal classes to sections and cards
document.querySelectorAll('.section, .card, .project-card').forEach(el => {
    el.classList.add('reveal-item');
    revealOnScroll.observe(el);
});

// Form submission to Web3Forms
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });
            const result = await response.json();

            if (response.status === 200) {
                btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                btn.style.background = '#28a745';
                contactForm.reset();
            } else {
                btn.innerHTML = '<span>Error Sending</span><i class="fas fa-times"></i>';
                btn.style.background = '#dc3545';
                console.log(result);
            }
        } catch (error) {
            console.log(error);
            btn.innerHTML = '<span>Error Sending</span><i class="fas fa-times"></i>';
            btn.style.background = '#dc3545';
        }

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);
    });
}

// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay to the outline for a smooth fluid effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hide cursor when typing
const inputElements = document.querySelectorAll('input, textarea');

inputElements.forEach(el => {
    el.addEventListener('focus', () => {
        cursorDot.classList.add('cursor-hidden');
        cursorOutline.classList.add('cursor-hidden');
    });

    el.addEventListener('blur', () => {
        cursorDot.classList.remove('cursor-hidden');
        cursorOutline.classList.remove('cursor-hidden');
    });
});