// Render functions that inject content from data.json into the DOM
// basePath handles the difference between index.html ("") and sub-pages ("../")

export function renderSalonIdentity(data, basePath = "") {
    // Document title
    document.title = `${data.salon.name} | ${data.salon.tagline}`;
    
    // Header logos (find all instances)
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        const main = logo.querySelector('.logo-main');
        const sub = logo.querySelector('.logo-sub');
        if (main) main.textContent = data.salon.logoMain;
        if (sub) sub.textContent = data.salon.logoSub;
    });

    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo) {
        footerLogo.innerHTML = `${data.salon.logoMain}<span>${data.salon.logoSub}</span>`;
    }
}

export function renderHero(data, container, basePath = "") {
    if (!container || !data.hero) return;
    
    const homeData = data.hero.home;
    container.innerHTML = `
        <span class="hero-tag">${homeData.tag}</span>
        <h1>${homeData.title}</h1>
        <p>${homeData.subtitle}</p>
        <div class="hero-buttons">
            <a href="${homeData.primaryBtn.href}" class="primary-btn">${homeData.primaryBtn.label}</a>
            <a href="${homeData.secondaryBtn.href}" class="secondary-btn">${homeData.secondaryBtn.label}</a>
        </div>
    `;
}

export function renderPageHero(data, container, pageKey, basePath = "") {
    if (!container || !data.hero || !data.hero[pageKey]) return;
    const heroData = data.hero[pageKey];
    
    container.style.background = `linear-gradient(rgba(20,12,14,.6), rgba(20,12,14,.8)), url('${basePath}${heroData.image}') center/cover`;
    container.style.paddingTop = "150px";
    container.style.paddingBottom = "80px";
    container.style.textAlign = "center";
    container.style.color = "white";
    
    container.innerHTML = `
        <span style="color: var(--gold); letter-spacing: 2px; font-size: 14px; text-transform: uppercase;">${heroData.tag}</span>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 54px; margin: 15px 0;">${heroData.title}</h1>
        <p style="color: #ccc; max-width: 600px; margin: 0 auto;">${heroData.subtitle}</p>
    `;
}

export function renderServices(data, container, basePath = "") {
    if (!container) return;
    
    const html = data.services.map(service => `
        <article class="service-card">
            <div class="service-image">
                <img src="${basePath}${service.image}" alt="${service.title}" loading="lazy">
                <div class="service-image-overlay"></div>
            </div>
            <div class="service-content">
                <span class="service-badge">${service.badge}</span>
                <h3>${service.title}</h3>
                <p>${service.shortSummary}</p>
                <div class="service-price">${service.price}</div>
                <a href="${basePath}pages/services.html#${service.id}" class="service-link">Learn More</a>
            </div>
        </article>
    `).join('');
    
    container.innerHTML = html;
}

export function renderPackages(data, container) {
    if (!container) return;

    const html = data.packages.map((pkg, index) => `
        <div class="package-card ${pkg.featured ? 'featured' : ''} reveal-up" style="transition-delay: ${index * 100}ms">
            ${pkg.badge ? `<div class="package-badge">${pkg.badge}</div>` : ''}
            <h3>${pkg.name}</h3>
            <h1>${pkg.price}</h1>
            <ul style="list-style: none; padding: 0; text-align: left; max-width: 250px; margin: 0 auto 35px auto;">
                ${pkg.features.map(f => `<li style="display: flex; align-items: center; gap: 10px;"><i data-lucide="check-circle-2" style="color: ${pkg.featured ? '#fff' : 'var(--primary)'}; width: 18px; height: 18px; flex-shrink: 0;"></i> <span>${f}</span></li>`).join('')}
            </ul>
            <a href="?service=${encodeURIComponent(pkg.name + ' Package')}#contact" class="primary-btn" data-service="${pkg.name} Package">Book Package</a>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

export function renderTestimonials(data, container) {
    if (!container) return;

    // Testimonials HTML
    const html = data.testimonials.map(review => `
        <div class="testimonial-card">
            <div class="review-source">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span>${review.source}</span>
            </div>
            <div class="quote">&quot;</div>
            <p>${review.text}</p>
            <div class="stars">${'&#9733;'.repeat(review.stars)}${'&#9734;'.repeat(5-review.stars)}</div>
            <h3>${review.name}</h3>
            <span>${review.meta}</span>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

export function renderWhyChooseUs(data, container, basePath = "") {
    if (!container) return;

    const html = data.whyChooseUs.map(item => `
        <div class="why-card">
            <div class="why-icon-wrapper">
                <img src="${basePath}${item.image}" alt="${item.title}" class="why-img" loading="lazy">
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

export function renderGallery(data, container, basePath = "") {
    if (!container) return;

    // Filter to a subset if on homepage, else show all
    const isHomePage = basePath === "";
    const displayItems = isHomePage ? data.gallery.slice(0, 10) : data.gallery;

    const html = displayItems.map(item => {
        if (item.type === 'video') {
            return `
                <div class="gallery-item ${item.size === 'large' ? 'large' : ''}" data-category="${item.category}">
                    <a href="${basePath}${item.image}" class="glightbox" data-gallery="home-gallery" data-title="${item.category}" data-description="${item.alt}" style="display: block; width: 100%; height: 100%;">
                        <video src="${basePath}${item.image}" aria-label="${item.alt}" muted loop playsinline preload="metadata"></video>
                    </a>
                </div>
            `;
        }
        return `
            <div class="gallery-item ${item.size === 'large' ? 'large' : ''}" data-category="${item.category}">
                <a href="${basePath}${item.image}" class="glightbox" data-gallery="home-gallery" data-title="${item.category}" data-description="${item.alt}" style="display: block; width: 100%; height: 100%;">
                    <img src="${basePath}${item.image}" alt="${item.alt}" width="640" height="760" loading="lazy">
                </a>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

export function renderAboutSection(data, container, basePath = "") {
    if (!container) return;

    const html = `
        <div class="about-left">
            <img src="${basePath}${data.about.image || 'assets/images/gallery/bridal-4.jpg'}" alt="Bridal makeup look" width="720" height="820" loading="lazy">
        </div>
        <div class="about-right">
            <span>ABOUT US</span>
            <h2>${data.about.story.title}</h2>
            <p>${data.about.story.text.substring(0, 160)}...</p>
            <div class="about-features">
                ${data.about.features.map(f => `<div class="feature">${f}</div>`).join('')}
            </div>
            <div class="stats">
                ${data.about.stats.map(s => `
                    <div class="stat-box">
                        <h3 data-count="${s.number}">${s.number}+</h3>
                        <p>${s.label}</p>
                    </div>
                `).join('')}
            </div>
            <a href="${basePath}pages/about.html" class="primary-btn">Know More</a>
        </div>
    `;
    
    container.innerHTML = html;
}

export function renderContactDetails(data, basePath = "") {
    // Render Contact Info across all instances
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.href = `tel:${data.salon.contact.phone.replace(/\s+/g, '')}`;
        if (!link.classList.contains('floating-call') && !link.closest('.cta-buttons')) {
            link.textContent = data.salon.contact.phone;
        }
    });

    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
    whatsappLinks.forEach(link => {
        const defaultMessage = `Hello! I have an inquiry for ${data.salon.name}.`;
        link.href = `https://wa.me/${data.salon.contact.whatsapp}?text=${encodeURIComponent(defaultMessage)}`;
    });

    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.href = `mailto:${data.salon.contact.email}`;
        link.textContent = data.salon.contact.email;
    });

    const mapIframes = document.querySelectorAll('iframe[src*="google.com/maps"]');
    mapIframes.forEach(iframe => {
        iframe.src = data.salon.links.googleMapsEmbed;
    });

    const mapLinks = document.querySelectorAll('a.map-link');
    mapLinks.forEach(link => {
        link.href = data.salon.links.googleMapsDirect;
    });

    // Update social links
    document.querySelectorAll('a[href*="instagram.com"]').forEach(a => a.href = data.salon.links.instagram);
    document.querySelectorAll('a[href*="facebook.com"]').forEach(a => a.href = data.salon.links.facebook);
    document.querySelectorAll('a[href*="youtube.com"]').forEach(a => a.href = data.salon.links.youtube);
}

export function renderAppointmentForm(data, selectContainer) {
    if (!selectContainer) return;

    const html = `
        <option value="">Select Service</option>
        ${data.appointment.services.map(s => `<option value="${s}">${s}</option>`).join('')}
    `;
    
    selectContainer.innerHTML = html;
}

export function renderServicesPage(data, container, basePath = "") {
    if (!container) return;

    const html = data.services.map((service, index) => {
        const isAlt = index % 2 !== 0;
        const bgStyle = isAlt ? 'style="background: var(--bg-alt);"' : '';
        
        const imageHtml = `
            <div class="service-detail-image">
                <img src="${basePath}${service.image}" alt="${service.title}" style="border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
            </div>
        `;
        
        const contentHtml = `
            <div class="service-detail-content">
                <span style="color: var(--primary); font-weight: 600; letter-spacing: 2px; font-size: 12px;">${service.badge}</span>
                <h2 style="font-family: 'Playfair Display', serif; font-size: 38px; margin: 15px 0;">${service.title}</h2>
                <p style="line-height: 1.8; color: var(--gray); margin-bottom: 20px;">${service.fullDescription}</p>
                <ul style="margin-bottom: 30px;">
                    ${service.features.map(f => `<li style="margin-bottom: 10px; display: flex; gap: 10px; color: var(--gray);"><i data-lucide="check" style="color: var(--primary);"></i> ${f}</li>`).join('')}
                </ul>
                <div style="font-size: 24px; font-weight: 600; margin-bottom: 20px;">${service.price}</div>
                <a href="${basePath}index.html?service=${encodeURIComponent(service.title)}#contact" class="primary-btn" data-service="${service.title}">Book This Service</a>
            </div>
        `;
        
        return `
            <section class="service-detail" id="${service.id}" ${bgStyle}>
                <div class="service-detail-container">
                    ${isAlt ? contentHtml + imageHtml : imageHtml + contentHtml}
                </div>
            </section>
        `;
    }).join('');

    container.innerHTML = html;

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

export function renderAboutPage(data, container, basePath = "") {
    if (!container) return;

    const html = `
    <!-- Meet the Team -->
    <section class="team-section">
        <span style="color: var(--primary); font-weight: 600; letter-spacing: 2px; font-size: 12px;">THE EXPERTS</span>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 42px; margin: 15px 0;">Meet Our Founder & Team</h2>
        <p style="color: var(--gray); max-width: 600px; margin: 0 auto; margin-bottom: 40px;">The creative visionaries and dedicated artists behind ${data.salon.name}.</p>
        
        <div class="team-grid" style="margin-bottom: 60px;">
            <div class="team-card">
                <img src="${basePath}${data.about.founder.image}" alt="${data.about.founder.name}" class="team-img" loading="lazy" style="width: 180px; height: 180px; object-fit: cover; object-position: center 20%;">
                <h3 class="team-name">${data.about.founder.name}</h3>
                <div class="team-role">${data.about.founder.role}</div>
                <p class="team-bio">${data.about.founder.bio}</p>
            </div>
        </div>

        <div class="team-photo-container" style="max-width: 1000px; margin: 0 auto; display: flex; gap: 20px; align-items: center; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 20px; -webkit-overflow-scrolling: touch; scrollbar-width: none;">
            <style> .team-photo-container::-webkit-scrollbar { display: none; } </style>
            
            <!-- Image Card -->
            <div style="flex: 0 0 85%; max-width: 400px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.3); scroll-snap-align: center;">
                <img src="${basePath}${data.about.team.image}" alt="Our Expert Team" style="width: 100%; height: 260px; object-fit: cover; display: block; object-position: center;">
            </div>
            
            <!-- Text Card -->
            <div style="flex: 0 0 85%; max-width: 500px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 25px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: center; scroll-snap-align: center;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 12px; color: var(--gold);">${data.about.team.title}</h3>
                <p style="color: var(--gray); font-size: 14px; line-height: 1.5; margin: 0;">${data.about.team.text}</p>
            </div>
            
        </div>
    </section>

    <!-- About Content -->
    <div class="about-page-content">
        <div class="about-text">
            <span style="color: var(--primary); font-weight: 600; letter-spacing: 2px; font-size: 12px;">THE JOURNEY</span>
            <h2>${data.about.story.title.replace('<br>', ' ')}</h2>
            <p>${data.about.story.text}</p>
            <div style="margin-top: 30px;">
                <a href="${basePath}index.html#contact" class="primary-btn">Contact Us</a>
            </div>
        </div>
        <div class="about-image">
            <img src="${basePath}assets/images/gallery/bridal 3.jpg" alt="Bhakat Studio Photographer at Work" loading="lazy">
        </div>
    </div>

    <!-- Mission & Vision -->
    <section class="mission-vision">
        <div class="mv-grid">
            <div class="mv-card">
                <div class="mv-icon"><i data-lucide="target"></i></div>
                <h3>Our Mission</h3>
                <p>${data.about.mission}</p>
            </div>
            <div class="mv-card">
                <div class="mv-icon"><i data-lucide="sparkles"></i></div>
                <h3>Our Vision</h3>
                <p>${data.about.vision}</p>
            </div>
        </div>
    </section>

    <!-- Celebration Section -->
    <section class="celebration-section">
        <div class="celebration-card">
            <span style="color: var(--primary); font-weight: 600; letter-spacing: 2px; font-size: 12px; display: block; margin-bottom: 15px;">CELEBRATING SUCCESS</span>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 38px; color: var(--text-color); margin-bottom: 30px;">${data.about.anniversary.title}</h3>
            <img src="${basePath}${data.about.anniversary.image}" alt="Salon Inauguration" loading="lazy">
            <p style="color: var(--gray); line-height: 1.8; font-size: 16px; max-width: 800px; margin: 0 auto;">${data.about.anniversary.text}</p>
        </div>
    </section>
    `;

    container.innerHTML = html;

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

export function renderGalleryPage(data, container, basePath = "") {
    if (!container) return;

    // Filter controls
    const categories = [...new Set(data.gallery.map(i => i.category))];
    const filterHtml = `
        <div class="gallery-filters">
            <button class="filter-btn active" data-filter="all">All</button>
            ${categories.map(c => `
                <button class="filter-btn" data-filter="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</button>
            `).join('')}
        </div>
    `;

    const itemsHtml = `
        <div class="masonry-gallery">
            ${data.gallery.map(item => {
                if (item.type === 'video') {
                    return `
                        <div class="masonry-item ${item.category}">
                            <a href="${basePath}${item.image}" class="glightbox" data-gallery="full-gallery" data-title="${item.category}" data-description="${item.alt}" style="display: block;">
                                <video src="${basePath}${item.image}" aria-label="${item.alt}" muted loop playsinline preload="metadata"></video>
                            </a>
                        </div>
                    `;
                }
                return `
                    <div class="masonry-item ${item.category}">
                        <a href="${basePath}${item.image}" class="glightbox" data-gallery="full-gallery" data-title="${item.category}" data-description="${item.alt}" style="display: block;">
                            <img src="${basePath}${item.image}" alt="${item.alt}" loading="lazy">
                        </a>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    container.innerHTML = filterHtml + itemsHtml;

    // Attach filter logic
    const filterBtns = container.querySelectorAll('.filter-btn');
    const galleryItems = container.querySelectorAll('.masonry-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
