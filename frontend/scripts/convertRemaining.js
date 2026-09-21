const fs = require('fs');
const path = require('path');
const sharp = require(path.join(process.cwd(), 'node_modules/sharp'));

const IMAGES_DIR = path.join(process.cwd(), 'public/images');

const remainingMap = [
  { from: 'faisal-hill-payment-plan.jpg', to: 'faisal-hills-payment-plan-2026.webp' },
  { from: 'faisal-hil-payment-plan.jpg', to: 'faisal-hills-payment-plan.webp' },
  // Commercial subfolder
  { from: 'commercial/fashion-pret.jpg', to: 'commercial/fashion-pret.webp' },
  { from: 'commercial/flagship-store.jpg', to: 'commercial/flagship-store.webp' },
  { from: 'commercial/food-court.jpg', to: 'commercial/food-court.webp' },
  { from: 'commercial/hypermarket.jpg', to: 'commercial/hypermarket.webp' },
  { from: 'commercial/jewelry-souk.jpg', to: 'commercial/jewelry-souk.webp' },
  { from: 'commercial/tech-gadgets.jpg', to: 'commercial/tech-gadgets.webp' }
];

async function run() {
  for (const item of remainingMap) {
    const srcPath = path.join(IMAGES_DIR, item.from);
    const destPath = path.join(IMAGES_DIR, item.to);

    if (fs.existsSync(srcPath)) {
      try {
        await sharp(srcPath)
          .webp({ quality: 80, effort: 3 })
          .toFile(destPath);
        const srcStat = fs.statSync(srcPath);
        const destStat = fs.statSync(destPath);
        console.log(`[CONVERTED] ${item.from} (${(srcStat.size/1024).toFixed(1)}KB) -> ${item.to} (${(destStat.size/1024).toFixed(1)}KB)`);
      } catch (err) {
        console.error(`[ERROR] converting ${item.from}:`, err.message);
      }
    }
  }

  // Also copy faisal-hills-master-plan-map-opt.webp to faisal-hills-master-plan-map.webp if exists
  const masterOpt = path.join(IMAGES_DIR, 'faisal-hills-master-plan-map-opt.webp');
  const masterDest = path.join(IMAGES_DIR, 'faisal-hills-master-plan-map.webp');
  if (fs.existsSync(masterOpt)) {
    fs.copyFileSync(masterOpt, masterDest);
    console.log('[COPIED] faisal-hills-master-plan-map-opt.webp -> faisal-hills-master-plan-map.webp');
  }

  console.log('All remaining conversions done!');
}

run();
