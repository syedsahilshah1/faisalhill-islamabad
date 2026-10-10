const fs = require('fs');
const file = 'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/HomeClient.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import FormattedText')) {
    content = content.replace("import React", "import React\nimport FormattedText from '@/components/ui/FormattedText';");
}

// 1. {b.description}
content = content.replace(/<p className="text-xs text-slate-600 leading-relaxed">\{b\.description\}<\/p>/g, 
'<div className="text-xs text-slate-600 leading-relaxed"><FormattedText text={b.description} /></div>');

// 2. {am.desc} in amenities (around line 2072 and 2141) - usually it's in a <p> tag
content = content.replace(/<p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 line-clamp-2">\s*\{am\.desc\}\s*<\/p>/g,
'<div className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 line-clamp-2">\n<FormattedText text={am.desc} />\n</div>');

content = content.replace(/<p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">\s*\{am\.desc\}\s*<\/p>/g,
'<div className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">\n<FormattedText text={am.desc} />\n</div>');

// 3. {selectedFacilityModal.desc}
content = content.replace(/<p className="text-sm text-slate-600 leading-relaxed mb-6">\s*\{selectedFacilityModal\.desc\}\s*<\/p>/g,
'<div className="text-sm text-slate-600 leading-relaxed mb-6">\n<FormattedText text={selectedFacilityModal.desc} />\n</div>');

fs.writeFileSync(file, content);
