const fs = require('fs');
const file = 'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/ui/FaqAccordion.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import FormattedText')) {
    content = content.replace('import { HelpCircle', "import FormattedText from '@/components/ui/FormattedText';\nimport { HelpCircle");
}

const target1 = '<div className="p-5 pl-14 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/50">\r\n                {aText}\r\n              </div>';
const target2 = '<div className="p-5 pl-14 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/50">\n                {aText}\n              </div>';

const replacement = '<div className="p-5 pl-14 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/50">\n                <FormattedText text={aText} />\n              </div>';

if (content.includes(target1)) {
    content = content.replace(target1, replacement);
    console.log('Replaced Faq target 1 (CRLF)');
} else if (content.includes(target2)) {
    content = content.replace(target2, replacement);
    console.log('Replaced Faq target 2 (LF)');
} else {
    console.log('Target not found in Faq');
}

fs.writeFileSync(file, content);
