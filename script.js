document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = mobileMenu.getElementsByTagName('a');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
    }

    menuBtn.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking a link
    Array.from(mobileMenuLinks).forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        observer.observe(card);
    });

    // Error handling for image loading
    const handleImageError = (img) => {
        img.src = 'fallback-image.jpg'; // Replace with actual fallback image path
        img.alt = 'Image not available';
    };

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
});

// Prevent mobile menu from showing on resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // md breakpoint
        const mobileMenu = document.getElementById('mobileMenu');
        if (!mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.add('translate-x-full');
        }
    }
});
