const fs = require('fs');
const path = require('path');

const rootReplacements = [
  { old: '/chaudhry-abdul-majeed.png', new: '/chaudhry-abdul-majeed.webp' },
  { old: '/faisal-jewel-1.png', new: '/faisal-jewel-1.webp' },
  { old: '/faisal-jewel-2.png', new: '/faisal-jewel-2.webp' },
  { old: '/faisal-jewel-3.png', new: '/faisal-jewel-3.webp' },
  { old: '/faisal-jewel-sketch.jpg', new: '/faisal-jewel-sketch.webp' },
  { old: '/faisal-jewel-tower.jpg', new: '/faisal-jewel-tower.webp' },
  { old: '/faisal-jewel.jpg', new: '/faisal-jewel.webp' },
  { old: '/faisal-jewel.png', new: '/faisal-jewel-logo.webp' },
  { old: '/faisal-jewelimg.jpg', new: '/faisal-jewel-img.webp' },
  { old: '/faisalhillarc.jpg', new: '/faisalhillarc.webp' },
  { old: '/logo.png', new: '/logo.webp' },
  { old: 'chaudhry-abdul-majeed.png', new: 'chaudhry-abdul-majeed.webp' },
  { old: 'faisal-jewel-1.png', new: 'faisal-jewel-1.webp' },
  { old: 'faisal-jewel-2.png', new: 'faisal-jewel-2.webp' },
  { old: 'faisal-jewel-3.png', new: 'faisal-jewel-3.webp' },
  { old: 'faisal-jewel-sketch.jpg', new: 'faisal-jewel-sketch.webp' },
  { old: 'faisal-jewel-tower.jpg', new: 'faisal-jewel-tower.webp' },
  { old: 'faisal-jewel.jpg', new: 'faisal-jewel.webp' },
  { old: 'faisal-jewel.png', new: 'faisal-jewel-logo.webp' },
  { old: 'faisal-jewelimg.jpg', new: 'faisal-jewel-img.webp' },
  { old: 'faisalhillarc.jpg', new: 'faisalhillarc.webp' },
  { old: 'logo.png', new: 'logo.webp' }
];

// Step 1: Replace any remaining code references
function updateCodeRefs(dir) {
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.next' && item.name !== '.git') {
        updateCodeRefs(full);
      }
    } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.ts') || item.name.endsWith('.json'))) {
      let content = fs.readFileSync(full, 'utf8');
      let modified = false;
      for (const r of rootReplacements) {
        if (content.includes(r.old)) {
          const re = new RegExp(r.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          content = content.replace(re, r.new);
          modified = true;
          console.log(`[UPDATED CODE] in ${path.relative(process.cwd(), full)}: ${r.old} -> ${r.new}`);
        }
      }
      if (modified) {
        fs.writeFileSync(full, content, 'utf8');
      }
    }
  }
}

updateCodeRefs(path.join(process.cwd(), 'src'));

// Step 2: Delete old .png and .jpg files in public/ and public/images/
const deletedFiles = [];

function removeOldImages(dir) {
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      removeOldImages(full);
      // Remove empty directory if any
      if (fs.readdirSync(full).length === 0) {
        fs.rmdirSync(full);
        console.log(`[REMOVED EMPTY DIR] ${path.relative(process.cwd(), full)}`);
      }
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        fs.unlinkSync(full);
        deletedFiles.push(path.relative(process.cwd(), full));
        console.log(`[DELETED OLD IMAGE] ${path.relative(process.cwd(), full)}`);
      }
    }
  }
}

removeOldImages(path.join(process.cwd(), 'public'));

console.log(`\nCleanup complete! Deleted ${deletedFiles.length} old JPG/PNG files.`);
