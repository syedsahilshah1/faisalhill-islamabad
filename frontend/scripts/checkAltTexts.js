const fs = require('fs');
const path = require('path');

const issues = [];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check <img> tags
  const imgRegex = /<img\s+([^>]+)>/gi;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const props = match[1];
    const srcMatch = props.match(/src=(?:\"([^\"]+)\"|'([^']+)'|\{([^}]+)\})/);
    const altMatch = props.match(/alt=(?:\"([^\"]*)\"|'([^']*)'|\{([^}]+)\})/);
    
    const src = srcMatch ? (srcMatch[1] || srcMatch[2] || srcMatch[3]) : 'unknown';
    const alt = altMatch ? (altMatch[1] || altMatch[2] || altMatch[3]) : null;
    const line = content.substring(0, match.index).split('\n').length;
    
    if (alt === null || alt.trim() === '') {
      issues.push({ file: filePath, line, tag: 'img', src, alt: alt === null ? 'MISSING' : 'EMPTY' });
    }
  }

  // Check <Image tags
  const imageRegex = /<Image\s+([^>]+)>/gi;
  while ((match = imageRegex.exec(content)) !== null) {
    const props = match[1];
    const srcMatch = props.match(/src=(?:\"([^\"]+)\"|'([^']+)'|\{([^}]+)\})/);
    const altMatch = props.match(/alt=(?:\"([^\"]*)\"|'([^']*)'|\{([^}]+)\})/);
    
    const src = srcMatch ? (srcMatch[1] || srcMatch[2] || srcMatch[3]) : 'unknown';
    const alt = altMatch ? (altMatch[1] || altMatch[2] || altMatch[3]) : null;
    const line = content.substring(0, match.index).split('\n').length;
    
    if (alt === null || alt.trim() === '') {
      issues.push({ file: filePath, line, tag: 'Image', src, alt: alt === null ? 'MISSING' : 'EMPTY' });
    }
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') walkDir(full);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      checkFile(full);
    }
  }
}

walkDir(path.join(process.cwd(), 'src'));
console.log(`Total missing or empty alt tags found: ${issues.length}`);
issues.forEach(i => console.log(`${path.relative(process.cwd(), i.file)}:${i.line} -> <${i.tag}> src="${i.src}" alt="${i.alt}"`));
