document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // GSAP Registration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Hero Animation Sequence
        const heroTl = gsap.timeline();
        heroTl.from(".hero-bg", { scale: 1.3, duration: 2, ease: "power2.out" })
              .from(".gsap-hero", { y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out" }, "-=1");

        // 2. Parallax effect for Hero Background on scroll
        gsap.to(".hero-bg", {
            y: "20%",
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // 3. Scroll Reveal Animations (Fade Up)
        const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
        fadeUpElements.forEach(el => {
            gsap.to(el, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Triggers when top of element hits 85% of viewport
                    toggleActions: "play none none none"
                }
            });
        });
    }

    // 4. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. Masonry Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            masonryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(item, { scale: 1, opacity: 1, duration: 0.4, display: 'block', ease: "power1.out" });
                    } else {
                        item.style.display = 'block';
                    }
                } else {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(item, { scale: 0.8, opacity: 0, duration: 0.4, display: 'none', ease: "power1.in" });
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
});
