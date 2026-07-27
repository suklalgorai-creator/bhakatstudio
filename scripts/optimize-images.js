const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'assets', 'images');
const baseDir = path.join(__dirname, '..');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const ext = path.extname(file);
            const basename = path.basename(file, ext);
            const webpPath = path.join(dir, `${basename}.webp`);
            
            try {
                // Convert to webp
                await sharp(fullPath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                    
                console.log(`Converted: ${file} -> ${basename}.webp`);
                
                // Delete original to save space
                fs.unlinkSync(fullPath);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
}

// Global text replacement helper
function replaceInFiles(dir, matchExts) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fullPath.includes('node_modules') || fullPath.includes('.git')) continue;
        
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            replaceInFiles(fullPath, matchExts);
        } else if (file.match(/\.(html|css|js|json)$/i)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Regex to match .webp, .webp, .webp and replace with .webp
            const regex = new RegExp(`\\.(${matchExts.join('|')})`, 'gi');
            
            if (regex.test(content)) {
                content = content.replace(regex, '.webp');
                fs.writeFileSync(fullPath, content);
                console.log(`Updated references in: ${file}`);
            }
        }
    }
}

async function run() {
    console.log('Starting image optimization...');
    await processDirectory(imagesDir);
    console.log('Finished converting images.');
    
    console.log('Updating references in code files...');
    replaceInFiles(baseDir, ['jpg', 'jpeg', 'png']);
    console.log('All done!');
}

run();
