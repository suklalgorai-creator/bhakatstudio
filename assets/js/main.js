/**
 * main.js — Application entry point.
 * Fetches data, renders content, then initialises all modules.
 */

import { $ } from './utils.js';
import { initTheme } from './theme.js';
import { initNavbar, updateChrome, setActiveLink } from './navbar.js';
import { initRipple, initImageFallbacks } from './interactions.js';
import { initReveal, initCounters } from './animations.js';
import { initTestimonials } from './testimonials.js';
import { initLightbox } from './lightbox.js';
import { initForm } from './form.js';
import { initHeroSlider } from './slider.js';
import * as renderers from './renderers.js';

/* ── Lucide icons ── */
const initIcons = () => {
    window.lucide?.createIcons({
        attrs: {
            'stroke-width': 1.7,
            'aria-hidden': 'true'
        }
    });
};

/* ── Preloader (on window.load, not DOMContentLoaded) ── */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    $('.preloader')?.classList.add('hide');
});

/* ── Scroll chrome ── */
window.addEventListener('scroll', () => {
    updateChrome();
    setActiveLink();
}, { passive: true });

/* ── Data Fetch & Render ── */
async function loadAndRender() {
    try {
        // Determine basePath depending on if we are in index.html ("") or a subpage ("../")
        const isSubPage = window.location.pathname.includes('/pages/');
        const basePath = isSubPage ? '../' : '';
        const dataPath = `${basePath}assets/data/data.json`;

        const response = await fetch(dataPath);
        const data = await response.json();

        // 1. Render global elements (Contact, Footer, Salon Identity)
        renderers.renderSalonIdentity(data, basePath);
        renderers.renderContactDetails(data, basePath);

        // 2. Render index.html specific elements
        if (!isSubPage) {
            renderers.renderHero(data, document.querySelector('.hero-container'), basePath);
            renderers.renderServices(data, document.getElementById('services-content'), basePath);
            renderers.renderPackages(data, document.getElementById('packages-content'));
            renderers.renderWhyChooseUs(data, document.getElementById('why-us-content'), basePath);
            renderers.renderTestimonials(data, document.getElementById('testimonials-content'));
            renderers.renderGallery(data, document.getElementById('gallery-content'), basePath);
            renderers.renderAboutSection(data, document.getElementById('about'), basePath);
            renderers.renderAppointmentForm(data, document.getElementById('service-select'));
        } else {
            // 3. Render sub-pages specific elements
            const pageName = window.location.pathname.split('/').pop().replace('.html', '');
            renderers.renderPageHero(data, document.getElementById('page-hero'), pageName, basePath);
            
            if (pageName === 'services') {
                renderers.renderServicesPage(data, document.getElementById('services-page-content'), basePath);
            } else if (pageName === 'gallery') {
                renderers.renderGalleryPage(data, document.getElementById('gallery-page-content'), basePath);
            } else if (pageName === 'about') {
                renderers.renderAboutPage(data, document.getElementById('about-page-content'), basePath);
            }
        }

        // 4. Initialize all JS modules AFTER DOM is built
        initNavbar();
        initTheme();
        // 3. Initialize Interactive Modules
        if (!isSubPage) {
            initHeroSlider();
        }
        
        initIcons();
        initReveal();
        initCounters();
        // initLightbox(); // Replaced with premium GLightbox
        if (typeof GLightbox !== 'undefined') {
            GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                zoomable: true
            });
        }
        if (!isSubPage) initTestimonials();
        initRipple();
        initImageFallbacks();
        initForm();
        updateChrome();
        setActiveLink();

        // 5. Handle hash scrolling for dynamically rendered content
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300); // slight delay to ensure layout shifts are done
        }

    } catch (error) {
        console.error('Error loading data.json:', error);
    }
}

// Start app
loadAndRender();
