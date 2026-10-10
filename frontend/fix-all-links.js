const fs = require('fs');
const path = require('path');

function replaceCMS(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceCMS(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Target fields: we look for `{cms...something}` containing "paragraph", "desc", "p1"
            const regex = /\{\s*(cms\.[a-zA-Z0-9_\.]+(?:(?:Desc|description|paragraph|p1|expandedParagraph|lopDescription|leadParagraph)[a-zA-Z0-9_]*)(?:\s*\|\|\s*(?:'[^']*'|"[^"]*"|`[^`]*`))?)\s*\}/gi;
            
            content = content.replace(regex, (match, p1) => {
                // If it's already wrapped or is part of a ternary/prop, let's be careful.
                // We do a rough check if the preceding text is an attribute like `value=` or `text=`
                const idx = originalContent.indexOf(match);
                const prevText = originalContent.substring(Math.max(0, idx - 20), idx);
                if (prevText.includes('text=') || prevText.includes('value=') || prevText.includes('onChange=') || match.includes('<FormattedText')) {
                    return match;
                }
                
                return '<FormattedText text={' + p1 + '} />';
            });

            if (content !== originalContent) {
                // We need to add the import if it's not there
                if (!content.includes('import FormattedText')) {
                    // find last import
                    const lastImportIndex = content.lastIndexOf('import ');
                    if (lastImportIndex !== -1) {
                        const endOfLine = content.indexOf('\n', lastImportIndex);
                        content = content.substring(0, endOfLine + 1) + "import FormattedText from '@/components/ui/FormattedText';\n" + content.substring(endOfLine + 1);
                    } else {
                        content = "import FormattedText from '@/components/ui/FormattedText';\n" + content;
                    }
                }
                fs.writeFileSync(fullPath, content);
                console.log('Fixed ' + fullPath);
            }
        }
    }
}

replaceCMS('d:/react project/client/nextjs and laravel/faisalHills/frontend/src/app');
replaceCMS('d:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/blocks');
