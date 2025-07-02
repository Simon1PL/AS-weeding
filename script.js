// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
const scrollableContent = document.querySelector('.scrollable-content');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target && scrollableContent) {
            const targetTop = target.offsetTop;
            scrollableContent.scrollTo({
                top: targetTop - 24, // adjust offset for sticky navbar if needed
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    toggle.addEventListener('click', function() {
        navLinks.classList.toggle('open');
    });
    // Optional: close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Rotating hero images with fade effect
    const images = ['zdj1.jpg', 'zdj2.jpg', 'zdj3.jpg', 'zdj4.jpg'];
    const imagesMobile = ['zdj1-small.jpg', 'zdj2.jpg', 'zdj3.jpg', 'zdj4.jpg'];
    let idx = Math.floor(Math.random() * images.length); // start from random image
    const hero = document.querySelector('.hero-image');
    // Remove previous overlay if exists
    let imgEl = hero.querySelector('.hero-fade-img');
    if (!imgEl) {
        imgEl = document.createElement('div');
        imgEl.className = 'hero-fade-img';
        imgEl.style.position = 'absolute';
        imgEl.style.top = 0;
        imgEl.style.left = 0;
        imgEl.style.width = '100%';
        imgEl.style.height = '100%';
        imgEl.style.zIndex = 1;
        imgEl.style.opacity = 0;
        imgEl.style.transition = 'opacity 0.8s';
        hero.insertBefore(imgEl, hero.firstChild);
    }
    function setHeroBg(immediate = false) {
        const isMobile = window.matchMedia('(max-width: 700px)').matches;
        const arr = isMobile ? imagesMobile : images;
        imgEl.style.background = `url('${arr[idx]}') right top/cover no-repeat`;
        imgEl.style.opacity = 1;
        setTimeout(() => {
            hero.style.background = `url('${arr[idx]}') right top/cover no-repeat`;
            imgEl.style.opacity = 0;
        }, immediate ? 0 : 800);
    }
    setHeroBg(true);
    setInterval(() => {
        idx = (idx + 1) % images.length;
        setHeroBg();
    }, 10000);
    window.addEventListener('resize', () => setHeroBg(true));
});

// Countdown timer to 30.04.2026
function updateCountdown() {
    const countdown = document.getElementById('countdown-timer');
    const targetDate = new Date('2026-04-30T16:00:00+02:00');
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
        countdown.style.display = 'none';
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    let text = 'Pozostało: ';
    if (days > 0) {
        text += `${days} dni, `;
    }
    if (hours > 0 || days > 0) {
        text += `${hours} godz, `;
    }
    if (minutes > 0 || hours > 0 || days > 0) {
        text += `${minutes} min, `;
    }
    text += `${seconds} sek`;
    countdown.textContent = text;
}
setInterval(updateCountdown, 1000);
updateCountdown();
