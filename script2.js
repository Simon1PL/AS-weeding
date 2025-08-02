document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    let isScrolling;
    let startX;
    let scrollLeft;
    let isMouseDown = false;

    // Get page width for snapping calculations
    const pageWidth = window.innerWidth;

    // Smooth scroll to the nearest page when scrolling stops
    container.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const scrollPosition = container.scrollLeft;
            const targetPage = Math.round(scrollPosition / pageWidth);
            container.scrollTo({
                left: targetPage * pageWidth,
                behavior: 'smooth'
            });
            updateNavSelected(targetPage);
        }, 50);
    });

    // Handle mouse drag scrolling
    container.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    container.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    // Handle touch events
    container.addEventListener('touchend', () => {
        const scrollPosition = container.scrollLeft;
        const targetPage = Math.round(scrollPosition / pageWidth);
        container.scrollTo({
            left: targetPage * pageWidth,
            behavior: 'smooth'
        });
        updateNavSelected(targetPage);
    });

    // Navigation links scroll to the correct page and update selected state
    const navLinks = document.querySelectorAll('.nav-link');
    function updateNavSelected(pageIndex) {
        navLinks.forEach((link, i) => {
            if (parseInt(link.getAttribute('data-page'), 10) === pageIndex) {
                link.classList.add('selected');
            } else {
                link.classList.remove('selected');
            }
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const pageIndex = parseInt(this.getAttribute('data-page'), 10);
            container.scrollTo({
                left: pageIndex * window.innerWidth,
                behavior: 'smooth'
            });
            updateNavSelected(pageIndex);
        });
    });

    // Update nav on scroll snap
    function updateNavOnScroll() {
        const pageIndex = Math.round(container.scrollLeft / window.innerWidth);
        updateNavSelected(pageIndex);
    }
    container.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            updateNavOnScroll();
        }, 20);
    });
    // Set initial selected nav
    updateNavSelected(0);

    // Countdown to wedding date
    function updateCountdowns() {
        const weddingDate = new Date('2026-04-30T16:00:00');
        const now = new Date();
        let diff = weddingDate - now;
        if (diff < 0) diff = 0;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        if(document.getElementById('countdown-days'))
            document.getElementById('countdown-days').textContent = days;
        if(document.getElementById('countdown-hours'))
            document.getElementById('countdown-hours').textContent = hours;
        if(document.getElementById('countdown-minutes'))
            document.getElementById('countdown-minutes').textContent = minutes;
    }
    updateCountdowns();
    setInterval(updateCountdowns, 15000); // update every minute

    // Enable horizontal scroll with mouse wheel
    container.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            container.scrollBy({
                left: e.deltaY,
                behavior: 'smooth'
            });
        }
    }, { passive: false });
});
