const fs = require('fs');
const file = 'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/HomeClient.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  '{!isAboutExpanded && (',
  "{!isAboutExpanded && cms.chairman.expandedParagraph && cms.chairman.expandedParagraph.trim() !== '' && ("
);
fs.writeFileSync(file, content);
console.log('done');
