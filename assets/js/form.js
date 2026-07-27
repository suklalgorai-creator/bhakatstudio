/**
 * form.js — Appointment booking form sends to WhatsApp.
 */

import { $ } from './utils.js';

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const d = new Date(dateStr);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const initForm = () => {
    $('.booking-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);

        const name = data.get('name') || '';
        const phone = data.get('phone') || '';
        const service = data.get('service') || '';
        const date = formatDate(data.get('date'));
        const message = data.get('message') || '';

        const lines = [
            '✨ *BHAKAT STUDIO - JAGADISH CREATION* ✨',
            '━━━━━━━━━━━━━━━━━━━',
            '',
            '📋 *NEW BOOKING REQUEST*',
            '',
            `👤 *Name:* ${name}`,
            '',
            `📱 *Phone:* ${phone}`,
            '',
            `💄 *Service:* ${service}`,
            '',
            `📅 *Date:* ${date}`,
        ];

        if (message.trim()) {
            lines.push('', `💬 *Message:* ${message}`);
        }

        lines.push(
            '',
            '━━━━━━━━━━━━━━━━━━━',
            '🙏 Please confirm my appointment.',
            'Thank you! 🌸'
        );

        const encodedMessage = encodeURIComponent(lines.join('\n'));
        window.open(`https://wa.me/917463030584?text=${encodedMessage}`, '_blank');
        form.reset();
    });

    const setServiceInForm = (serviceName) => {
        const select = document.getElementById('service-select');
        if (!select) return;

        let optionExists = Array.from(select.options).some(opt => opt.value === serviceName);
        if (!optionExists) {
            const newOption = new Option(serviceName, serviceName);
            select.add(newOption);
        }
        select.value = serviceName;
    };

    // 1. Check URL on load (cross-page navigation)
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedService = urlParams.get('service');
    if (preselectedService) {
        setServiceInForm(preselectedService);
    }

    // 2. Intercept clicks (same-page navigation)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.dataset.service) {
            setServiceInForm(link.dataset.service);
            // If we are already on index.html, prevent reload and just scroll
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                // Update URL without reload
                window.history.pushState({}, '', link.getAttribute('href'));
            }
        }
    });
};
