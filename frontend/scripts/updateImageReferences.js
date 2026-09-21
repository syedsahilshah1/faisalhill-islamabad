const fs = require('fs');
const path = require('path');

const replacements = [
  // High Priority specific file names
  { old: 'imgi_5_Rectangle-1-1-scaled-e1766059628733.png', new: 'faisal-hills-executive-boulevard.webp' },
  { old: 'imgi_160_WhatsApp-Image-2025-01-27-at-15.16.19_de49243e-1.jpg', new: 'faisal-hills-development-site.webp' },
  { old: 'imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg', new: 'hills-walk-commercial-aerial.webp' },
  { old: 'imgi_3_DJI_20250818122014_0056_D-scaled.jpg', new: 'faisal-hills-drone-view.webp' },
  { old: 'imgi_4_DJI_20250818121525_0053_D-scaled.jpg', new: 'faisal-hills-aerial-panoramic.webp' },
  { old: 'imgi_27_Rectangle-1-scaled.png', new: 'faisal-hills-monument-entrance.webp' },
  { old: 'imgi_175_faisal-jewel.jpg', new: 'faisal-jewel-tower.webp' },
  { old: 'faisal-jewel-sketch.jpg', new: 'faisal-jewel-architectural-sketch.webp' },
  { old: 'faisal-jewel.jpg', new: 'faisal-jewel-building.webp' },
  { old: 'faisal-forest.jpg', new: 'faisal-hills-miyawaki-forest.webp' },
  { old: 'faisal-park.jpg', new: 'faisal-hills-glow-park.webp' },
  { old: 'faisal-roots-school.png', new: 'roots-international-school-campus.webp' },
  { old: 'faisal-roots-school.jpg', new: 'roots-international-school-faisal-hills.webp' },
  { old: 'faisalhillarc.jpg', new: 'faisal-hills-arc-gate.webp' },
  { old: 'faisalarc (1).webp', new: 'faisal-hills-arc-monument.webp' },
  { old: 'faisalarc (2).jpg', new: 'faisal-hills-arc-entrance.webp' },
  { old: 'faisalarc (2).webp', new: 'faisal-hills-arc-monument-2.webp' },
  { old: 'faisalarc (3).jpg', new: 'faisal-hills-arc-view.webp' },
  { old: 'faisalexecutivemap.png', new: 'faisal-hills-executive-map.webp' },
  { old: 'faisalhill.jpg', new: 'faisal-hills-overview.webp' },
  { old: 'faisalhillexecutive.webp', new: 'faisal-hills-executive-block.webp' },
  { old: 'girl-headphone-support.png', new: 'faisal-hills-customer-support.webp' },
  { old: 'imgi_10_LogosIn500x150Px-01-2048x615.png', new: 'faisal-town-group-logo.webp' },
  { old: 'logo.png', new: 'faisal-hills-logo.webp' },
  { old: 'imgi_38_Faisal-Hills-site-home-page-header.webp', new: 'faisal-hills-site-header.webp' },
  { old: 'imgi_44_Executive-Block.webp', new: 'faisal-hills-executive-sector.webp' },
  { old: 'imgi_45_Glow-garden.webp', new: 'faisal-hills-glow-garden.webp' },
  { old: 'imgi_46_Mosques.webp', new: 'faisal-hills-jamia-mosque.webp' },
  { old: 'imgi_48_sports-arena.webp', new: 'faisal-hills-sports-arena.webp' },
  { old: 'imgi_49_Medical-xomplex.webp', new: 'faisal-hills-medical-complex.webp' },
  { old: 'faisal-hills-master-plan-map.jpg', new: 'faisal-hills-master-plan-map.webp' },
  { old: 'faisal-hill-payment-plan.jpg', new: 'faisal-hills-payment-plan-2026.webp' },
  { old: 'faisal-hil-payment-plan.jpg', new: 'faisal-hills-payment-plan.webp' },
  // Commercial subfolder
  { old: 'commercial/fashion-pret.jpg', new: 'commercial/fashion-pret.webp' },
  { old: 'commercial/flagship-store.jpg', new: 'commercial/flagship-store.webp' },
  { old: 'commercial/food-court.jpg', new: 'commercial/food-court.webp' },
  { old: 'commercial/hypermarket.jpg', new: 'commercial/hypermarket.webp' },
  { old: 'commercial/jewelry-souk.jpg', new: 'commercial/jewelry-souk.webp' },
  { old: 'commercial/tech-gadgets.jpg', new: 'commercial/tech-gadgets.webp' }
];

let totalFilesModified = 0;
let totalReplacements = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const r of replacements) {
    if (content.includes(r.old)) {
      // Replace all occurrences
      const re = new RegExp(r.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(re, r.new);
      modified = true;
      totalReplacements++;
      console.log(`[REPLACED] in ${path.relative(process.cwd(), filePath)}: ${r.old} -> ${r.new}`);
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFilesModified++;
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
        walkDir(full);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.json'))) {
      processFile(full);
    }
  }
}

console.log('Scanning and updating image paths in src/...');
walkDir(path.join(process.cwd(), 'src'));
console.log(`\nReplacement complete! Modified ${totalFilesModified} files with ${totalReplacements} image path updates.`);
