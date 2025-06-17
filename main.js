document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });

    // Basic scroll to section functionality (optional, can be done with CSS smooth scrolling)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            hamburger.style.display='hidden';

            // Close the navigation menu on mobile after clicking
            if (window.innerWidth < 769) {
                nav.style.display='none';
            }
        });
    });
});