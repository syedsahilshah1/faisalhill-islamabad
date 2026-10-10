const fs = require('fs');
const files = [
    'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/faisal-hills-blocks/BlocksClient.tsx',
    'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/faisal-hills-noc-status/page.tsx',
    'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/faisal-hills-payment-plan/PaymentPlanClient.tsx',
    'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/master-plan/MasterPlanClient.tsx',
    'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/components/blocks/BlockB1ExtensionContent.tsx'
];
for(const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    // First, remove the bad import
    content = content.replace(/import FormattedText from '@\/components\/ui\/FormattedText';\n/g, '');
    
    // Add it after the first import line
    content = content.replace(/(import .*?;\r?\n)/, "$1import FormattedText from '@/components/ui/FormattedText';\n");
    fs.writeFileSync(file, content);
}
console.log('Fixed imports');
