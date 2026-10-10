const fs = require('fs');
const path = require('path');

function deduplicateImports(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            deduplicateImports(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Match all instances of the import
            const importStatement = "import FormattedText from '@/components/ui/FormattedText';";
            
            // split by the exact import statement
            let parts = content.split(importStatement);
            
            // if there are more than 2 parts, it means there are 2 or more occurrences
            if (parts.length > 2) {
                // keep the first one, remove the rest
                let newContent = parts[0] + importStatement + parts.slice(1).join('').replace(/^\r?\n/, '');
                
                // wait, if there are multiple, simply joining them might remove newlines unexpectedly.
                // safer approach: replace globally, but keep the first
                
                let firstIndex = content.indexOf(importStatement);
                let firstPart = content.substring(0, firstIndex + importStatement.length);
                let restPart = content.substring(firstIndex + importStatement.length);
                
                // remove all other occurrences in the rest part
                // also remove empty lines left behind if possible
                restPart = restPart.replace(new RegExp(importStatement + '\\r?\\n?', 'g'), '');
                
                content = firstPart + restPart;
                
                fs.writeFileSync(fullPath, content);
                console.log('Deduplicated in ' + fullPath);
            }
        }
    }
}

deduplicateImports('d:/react project/client/nextjs and laravel/faisalHills/frontend/src/app');
deduplicateImports('d:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/blocks');
console.log('Done');
