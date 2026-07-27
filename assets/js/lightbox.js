/**
 * lightbox.js — Gallery lightbox with keyboard navigation.
 */

import { $, $$ } from './utils.js';

export const initLightbox = () => {
    const lightbox = $('.lightbox');
    const lightboxImg = $('.lightbox img');
    const closeBtn = $('.lightbox-close');
    const prevBtn = $('.lightbox-prev');
    const nextBtn = $('.lightbox-next');
    const galleryImages = $$('.gallery-item img').filter((img) => img.getAttribute('src'));
    let currentIndex = 0;

    if (!lightbox || !lightboxImg || !galleryImages.length) return;

    const showImage = (index) => {
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const image = galleryImages[currentIndex];
        lightboxImg.src = image.currentSrc || image.src;
        lightboxImg.alt = image.alt || 'Bhakat Studio gallery image';
    };

    const openLightbox = (index) => {
        showImage(index);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn?.focus();
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    galleryImages.forEach((image, index) => {
        image.closest('.gallery-item')?.addEventListener('click', () => openLightbox(index));
    });

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', () => showImage(currentIndex - 1));
    nextBtn?.addEventListener('click', () => showImage(currentIndex + 1));

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('open')) return;
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });
};
