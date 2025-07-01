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
