const fs = require('fs');
const file = 'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/HomeClient.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import FormattedText')) {
  content = content.replace("import ScrollReveal from '@/components/ui/ScrollReveal';", "import FormattedText from '@/components/ui/FormattedText';\nimport ScrollReveal from '@/components/ui/ScrollReveal';");
}

// Remove the `renderWithLinks` function entirely if it exists.
content = content.replace(/const renderWithLinks \=[\s\S]*?return \<\>\{parts\}\<\/\>\;\r?\n\}\;/g, '');

// Replace any `{renderWithLinks(cms...)}` with `<FormattedText text={cms...} />`
content = content.replace(/\{renderWithLinks\((.*?)\)\}/g, '<FormattedText text={$1} />');

const fields = [
  'cms.chairman.visibleParagraph',
  'cms.chairman.expandedParagraph',
  'cms.overview.paragraph',
  'cms.location.p1',
  'cms.landmarks.paragraph',
  'cms.masterPlan.paragraph',
  'cms.masterPlan.subParagraph',
  'cms.blocksSection.paragraph',
  'cms.blocksSection.supplySubline',
  'row.profile',
  'cms.plotsForSale.ratesSubline',
  'cms.flagships.paragraph',
  'cms.paymentPlan.paragraph',
  'cms.whyInvest.paragraph',
  'cms.amenities?.paragraph',
  'cms.testimonials.paragraph',
  'cms.infrastructure.paragraph',
  'cms.finalCta.paragraph',
];

for (const field of fields) {
  const escapedField = field.replace(/\./g, '\\.').replace(/\?/g, '\\?');
  const regex = new RegExp('\\{\\s*(' + escapedField + '(?:\\s*\\|\\|\\s*(?:\'[^\']*\'|"[^"]*"|`[^`]*`))?)\\s*\\}', 'g');
  
  content = content.replace(regex, (match, p1) => {
    return '<FormattedText text={' + p1 + '} />';
  });
}

// Special case for subParagraph ternary
content = content.replace(/\{cms\.masterPlan\.subParagraph \? \([\s\S]*?\{cms\.masterPlan\.subParagraph\}[\s\S]*?\) : null\}/, '{cms.masterPlan.subParagraph ? (\n                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2.5">\n                    <FormattedText text={cms.masterPlan.subParagraph} />\n                  </p>\n                ) : null}');

fs.writeFileSync(file, content);
console.log('done');
