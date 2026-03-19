// Custom Cursor & Follower Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateCursor = () => {
    // Smooth interpolation for cursor and follower
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    follower.style.transform = `translate3d(${followerX - 16}px, ${followerY - 16}px, 0)`;

    // Parallax background glows
    const glows = document.querySelectorAll('.bg-glow');
    glows.forEach((glow, index) => {
        const speed = (index + 1) * 0.02;
        const x = (window.innerWidth / 2 - mouseX) * speed;
        const y = (window.innerHeight / 2 - mouseY) * speed;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    requestAnimationFrame(animateCursor);
};
animateCursor();

// Interactive Elements Hover
const interactiveElements = document.querySelectorAll('a, button, .project-card, .faq-item');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.classList.add('glow-cursor-active');
        follower.style.transform += ' scale(2.5)';
    });

    el.addEventListener('mouseleave', () => {
        follower.classList.remove('glow-cursor-active');
    });
});

// Magnetic Button Effect
const magneticButtons = document.querySelectorAll('.btn-primary, .btn-glass, .social-pill');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate3d(0, 0, 0) scale(1)`;
    });
});

// 3D Tilt Effect for Cards
const tiltCards = document.querySelectorAll('.project-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        card.style.transform = `perspective(1000px) rotateX(${deltaY * -10}deg) rotateY(${deltaX * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// Scroll Reveal Enhanced
const revealOnScroll = () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) el.classList.add('active');
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(el => el.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// Copy Email Functionality
const copyBtns = document.querySelectorAll('.copy-btn');
copyBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const email = "boopathiuxd@gmail.com";
        try {
            await navigator.clipboard.writeText(email);
            btn.classList.add('copied');
            const icon = btn.querySelector('i');
            const originalIcon = icon.getAttribute('data-lucide');
            
            icon.setAttribute('data-lucide', 'check');
            lucide.createIcons();
            
            setTimeout(() => {
                btn.classList.remove('copied');
                icon.setAttribute('data-lucide', originalIcon);
                lucide.createIcons();
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    });
});
