// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});
// RSVP form submission (demo only)
document.querySelector('.rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your RSVP!');
    this.reset();
});
