const fs = require('fs');

function hideButtons(file) {
  let content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let newLines = [];
  
  for(let i=0; i<lines.length; i++) {
     let line = lines[i];
     if (line.includes('<button') && lines[i+2] && lines[i+2].includes('setIs') && lines[i+2].includes('Expanded')) {
        // We found a button start. Let's trace back to find what variables were used in the expanded block.
        // It's usually like: cms.overview.expandedParagraph1
        // We can just look up to 30 lines back for "cms." and "expanded"
        let condition = '';
        for(let k=i-1; k>=Math.max(0, i-40); k--) {
           let match = lines[k].match(/cms\.[a-zA-Z0-9_]+\.expanded[a-zA-Z0-9_]+/);
           if (match) {
              // Wait, sometimes it's two variables! like cms.overview.expandedParagraph1 || cms.overview.expandedParagraph2
              // Let's grab the whole condition from the closest line that has ' ? (' or ' && (' or just use a generic regex for the whole block.
              let match2 = lines[k].match(/\{(cms\.[a-zA-Z0-9_]+\.expanded[a-zA-Z0-9_]+(?:\s*\|\|\s*cms\.[a-zA-Z0-9_]+\.expanded[a-zA-Z0-9_]+)*)\s*(?:&&|\?)/);
              if (match2) {
                 condition = match2[1];
                 break;
              } else if (match) {
                 // if no || or && found, just use the first match
                 condition = match[0];
                 break;
              }
           }
        }
        
        if (condition) {
           let indent = line.match(/^\s*/)[0];
           newLines.push(indent + '{(' + condition + ') && (');
           // add the button lines until </button>
           while(i < lines.length) {
              newLines.push(lines[i]);
              if (lines[i].includes('</button>')) {
                 newLines.push(indent + ')}');
                 break;
              }
              i++;
           }
           continue; // skip the rest of the loop
        }
     }
     newLines.push(line);
  }
  
  fs.writeFileSync(file, newLines.join('\n'));
}

const files = [
  'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/blocks/ExecutiveBlockContent.tsx',
  'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/blocks/PrimeBlockContent.tsx',
  'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/blocks/BlockB1ExtensionContent.tsx',
  'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/blocks/BlockCContent.tsx',
  'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/blocks/FaisalJewelContent.tsx',
  'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/blocks/HillsWalkContent.tsx'
];

files.forEach(f => {
    hideButtons(f);
});
console.log('Buttons conditionally wrapped.');
