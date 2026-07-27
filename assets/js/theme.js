/**
 * theme.js — Dark / Light mode toggle with localStorage persistence
 */

import { $ } from './utils.js';

export const initTheme = () => {
    const themeToggle = $('.theme-toggle');
    const themeToggleIcon = $('.theme-toggle-icon');

    const setTheme = (theme) => {
        const isDark = theme === 'dark';
        document.body.dataset.theme = theme;
        themeToggle?.setAttribute('aria-pressed', String(isDark));
        themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

        if (themeToggleIcon) {
            themeToggleIcon.innerHTML = isDark ? '&#9790;' : '&#9788;';
        }
    };

    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem('bhakat-theme') || 'dark';
    } catch (_) {
        // Storage unavailable — use default.
    }

    setTheme(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        try {
            localStorage.setItem('bhakat-theme', nextTheme);
        } catch (_) {
            // Keep for session only.
        }
    });
};
