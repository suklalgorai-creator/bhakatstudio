/**
 * slider.js — Hybrid Hero Slider logic (Video -> Images)
 */

export function initHeroSlider() {
    const video = document.getElementById('hero-video');
    const slides = document.querySelectorAll('.hero-slide');
    if (!video || slides.length === 0) return;

    let currentSlide = 0;
    let sliderInterval;

    const startImageSlider = () => {
        // 1. Fade out the video seamlessly
        video.style.opacity = '0';
        
        // 2. Fade in the first image slide
        slides[0].classList.add('active');

        // 3. Start the regular image slideshow loop
        sliderInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Crossfade every 5 seconds
        
        // Pause the video after it fades out to save resources
        setTimeout(() => {
            if(!video.paused) video.pause();
        }, 2000);
    };

    // Wait exactly 10 seconds playing the video, then trigger transition
    setTimeout(startImageSlider, 10000);
}
