const fs = require('fs');
const path = require('path');
const sharp = require(path.join(process.cwd(), 'node_modules/sharp'));

const rootMap = [
  { from: 'chaudhry-abdul-majeed.png', to: 'chaudhry-abdul-majeed.webp' },
  { from: 'faisal-jewel-1.png', to: 'faisal-jewel-1.webp' },
  { from: 'faisal-jewel-2.png', to: 'faisal-jewel-2.webp' },
  { from: 'faisal-jewel-3.png', to: 'faisal-jewel-3.webp' },
  { from: 'faisal-jewel-sketch.jpg', to: 'faisal-jewel-sketch.webp' },
  { from: 'faisal-jewel-tower.jpg', to: 'faisal-jewel-tower.webp' },
  { from: 'faisal-jewel.jpg', to: 'faisal-jewel.webp' },
  { from: 'faisal-jewel.png', to: 'faisal-jewel-logo.webp' },
  { from: 'faisal-jewelimg.jpg', to: 'faisal-jewel-img.webp' },
  { from: 'faisalhillarc.jpg', to: 'faisalhillarc.webp' },
  { from: 'logo.png', to: 'logo.webp' }
];

async function convertRootImages() {
  for (const item of rootMap) {
    const srcPath = path.join(process.cwd(), 'public', item.from);
    const destPath = path.join(process.cwd(), 'public', item.to);

    if (fs.existsSync(srcPath)) {
      try {
        await sharp(srcPath)
          .webp({ quality: 85, effort: 4 })
          .toFile(destPath);
        console.log(`[CONVERTED ROOT] ${item.from} -> ${item.to}`);
      } catch (err) {
        console.error(`[ERROR] ${item.from}:`, err.message);
      }
    }
  }
}

convertRootImages();
