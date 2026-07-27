const fs = require('fs');
const path = require('path');

const files = [
    'pages/about.html',
    'pages/gallery.html',
    'pages/services.html'
];

files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Fix paragraph
        content = content.replace(
            'Luxury Wedding Photography, elegant hair styling, mehendi and cinematic drone shoots, crafted for your most memorable moments.',
            'Luxury Wedding Photography and cinematic drone shoots, crafted for your most memorable moments.'
        );

        // Fix signature services list
        content = content.replace(
            /<li><a href="services\.html#bridal-makeup">Wedding Photography<\/a><\/li>\s*<li><a href="services\.html#hair-styling">Hair Styling<\/a><\/li>\s*<li><a href="services\.html#mehendi">Mehendi<\/a><\/li>\s*<li><a href="services\.html#facial-spa">Facial &amp; Spa<\/a><\/li>/gi,
            `<li><a href="services.html#wedding">Wedding Photography</a></li>
                    <li><a href="services.html#cinematic">Cinematic Films</a></li>
                    <li><a href="services.html#pre-wedding">Pre-Wedding Shoots</a></li>
                    <li><a href="services.html#candid">Candid Photography</a></li>`
        );
        
        fs.writeFileSync(fullPath, content);
        console.log(`Updated footer in: ${file}`);
    }
});
