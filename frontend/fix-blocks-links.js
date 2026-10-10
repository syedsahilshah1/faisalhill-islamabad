const fs = require('fs');
const file = 'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/faisal-hills-blocks/BlocksClient.tsx';
let content = fs.readFileSync(file, 'utf8');

const target1 = '<p className="text-xs text-slate-600 leading-relaxed">\r\n                  {st.desc}\r\n                </p>';
const target2 = '<p className="text-xs text-slate-600 leading-relaxed">\n                  {st.desc}\n                </p>';

const replacement = '<div className="text-xs text-slate-600 leading-relaxed">\n                  <FormattedText text={st.desc} />\n                </div>';

if (content.includes(target1)) {
    content = content.replace(target1, replacement);
    console.log('Replaced target 1 (CRLF)');
} else if (content.includes(target2)) {
    content = content.replace(target2, replacement);
    console.log('Replaced target 2 (LF)');
} else {
    console.log('Target not found');
}

fs.writeFileSync(file, content);
