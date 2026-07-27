const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fullPath.includes('node_modules') || fullPath.includes('.git') || file === 'images' || file === 'videos') continue;
        
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceInFiles(fullPath);
        } else if (file.match(/\.(html|json|js)$/i)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;
            
            if (content.includes('#')) {
                content = content.replace(/https:\/\/www\.youtube\.com\/@josphinclairing8087/g, '#');
                updated = true;
            }
            if (content.includes('https://www.facebook.com/')) {
                content = content.replace(/"https:\/\/www\.facebook\.com\/"/g, '"#"');
                updated = true;
            }
            if (content.includes('https://www.facebook.com')) {
                content = content.replace(/href="https:\/\/www\.facebook\.com"/g, 'href="#"');
                updated = true;
            }

            if (updated) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated social links in: ${file}`);
            }
        }
    }
}

replaceInFiles(baseDir);
