const fs = require('fs');
const file = 'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/faisal-hills-blocks/BlocksClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Glossary definition
content = content.replace(/<p className="text-xs text-slate-600">\{t\.definition\}<\/p>/g,
'<div className="text-xs text-slate-600"><FormattedText text={t.definition} /></div>');

// Infrastructure cards desc
content = content.replace(/<p className="text-xs text-slate-300 mt-1">\{c\.desc\}<\/p>/g,
'<div className="text-xs text-slate-300 mt-1"><FormattedText text={c.desc} /></div>');

// Growth stages meaning
content = content.replace(/<span className="font-bold text-slate-700">What it means: <\/span>\{row\.meaning\}/g,
'<span className="font-bold text-slate-700">What it means: </span><FormattedText text={row.meaning} />');
content = content.replace(/<td className="py-3\.5 px-4 text-slate-700">\{row\.meaning\}<\/td>/g,
'<td className="py-3.5 px-4 text-slate-700"><FormattedText text={row.meaning} /></td>');

// Decision Matrix Trade-off
content = content.replace(/<span className="font-bold text-slate-700">Trade-off: <\/span>\{row\.tradeOff\}/g,
'<span className="font-bold text-slate-700">Trade-off: </span><FormattedText text={row.tradeOff} />');
content = content.replace(/<td className="py-3\.5 px-4 text-slate-700">\{row\.tradeOff\}<\/td>/g,
'<td className="py-3.5 px-4 text-slate-700"><FormattedText text={row.tradeOff} /></td>');

fs.writeFileSync(file, content);
