const fs = require('fs');
const path = require('path');
const sharp = require(path.join(process.cwd(), 'node_modules/sharp'));

const IMAGES_DIR = path.join(process.cwd(), 'public/images');

const conversionMap = [
  { from: 'imgi_5_Rectangle-1-1-scaled-e1766059628733.png', to: 'faisal-hills-executive-boulevard.webp' },
  { from: 'imgi_160_WhatsApp-Image-2025-01-27-at-15.16.19_de49243e-1.jpg', to: 'faisal-hills-development-site.webp' },
  { from: 'imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg', to: 'hills-walk-commercial-aerial.webp' },
  { from: 'imgi_3_DJI_20250818122014_0056_D-scaled.jpg', to: 'faisal-hills-drone-view.webp' },
  { from: 'imgi_4_DJI_20250818121525_0053_D-scaled.jpg', to: 'faisal-hills-aerial-panoramic.webp' },
  { from: 'imgi_27_Rectangle-1-scaled.png', to: 'faisal-hills-monument-entrance.webp' },
  { from: 'imgi_175_faisal-jewel.jpg', to: 'faisal-jewel-tower.webp' },
  { from: 'faisal-jewel.jpg', to: 'faisal-jewel-building.webp' },
  { from: 'faisal-jewel-sketch.jpg', to: 'faisal-jewel-architectural-sketch.webp' },
  { from: 'faisal-forest.jpg', to: 'faisal-hills-miyawaki-forest.webp' },
  { from: 'faisal-park.jpg', to: 'faisal-hills-glow-park.webp' },
  { from: 'faisal-roots-school.jpg', to: 'roots-international-school-faisal-hills.webp' },
  { from: 'faisal-roots-school.png', to: 'roots-international-school-campus.webp' },
  { from: 'faisalhillarc.jpg', to: 'faisal-hills-arc-gate.webp' },
  { from: 'faisalarc (1).webp', to: 'faisal-hills-arc-monument.webp' },
  { from: 'faisalarc (2).jpg', to: 'faisal-hills-arc-entrance.webp' },
  { from: 'faisalarc (2).webp', to: 'faisal-hills-arc-monument-2.webp' },
  { from: 'faisalarc (3).jpg', to: 'faisal-hills-arc-view.webp' },
  { from: 'faisalexecutivemap.png', to: 'faisal-hills-executive-map.webp' },
  { from: 'faisalhill.jpg', to: 'faisal-hills-overview.webp' },
  { from: 'faisalhillexecutive.webp', to: 'faisal-hills-executive-block.webp' },
  { from: 'girl-headphone-support.png', to: 'faisal-hills-customer-support.webp' },
  { from: 'imgi_10_LogosIn500x150Px-01-2048x615.png', to: 'faisal-town-group-logo.webp' },
  { from: 'logo.png', to: 'faisal-hills-logo.webp' },
  { from: 'imgi_38_Faisal-Hills-site-home-page-header.webp', to: 'faisal-hills-site-header.webp' },
  { from: 'imgi_44_Executive-Block.webp', to: 'faisal-hills-executive-sector.webp' },
  { from: 'imgi_45_Glow-garden.webp', to: 'faisal-hills-glow-garden.webp' },
  { from: 'imgi_46_Mosques.webp', to: 'faisal-hills-jamia-mosque.webp' },
  { from: 'imgi_48_sports-arena.webp', to: 'faisal-hills-sports-arena.webp' },
  { from: 'imgi_49_Medical-xomplex.webp', to: 'faisal-hills-medical-complex.webp' },
  { from: 'faisal-hills-master-plan-map.jpg', to: 'faisal-hills-master-plan-map.webp' },
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
  console.log('Starting image conversions to WebP...');
  for (const item of conversionMap) {
    const srcPath = path.join(IMAGES_DIR, item.from);
    const destPath = path.join(IMAGES_DIR, item.to);

    if (fs.existsSync(srcPath)) {
      try {
        await sharp(srcPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(destPath);
        const srcStat = fs.statSync(srcPath);
        const destStat = fs.statSync(destPath);
        console.log(`[CONVERTED] ${item.from} (${(srcStat.size/1024).toFixed(1)}KB) -> ${item.to} (${(destStat.size/1024).toFixed(1)}KB)`);
      } catch (err) {
        console.error(`[ERROR] converting ${item.from}:`, err.message);
      }
    } else {
      console.warn(`[NOT FOUND] ${srcPath}`);
    }
  }
  console.log('Image conversion completed successfully!');
}

run();
