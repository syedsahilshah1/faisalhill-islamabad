const fs = require('fs');
const file = 'd:/react project/client/nextjs and laravel/faisalHills/frontend/src/app/ubaid/admin/login/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `
            pages: initialSeoConfig.pages.map(initPage => {
              const apiPage = seoData.pages.find((p) => p.page_slug === initPage.pageSlug);
              if (apiPage) {
                return {
                  ...initPage,
                  pageTitle: apiPage.title || initPage.pageTitle,
                  metaTitle: apiPage.title || initPage.metaTitle,
                  metaDescription: apiPage.meta_description || initPage.metaDescription,
                  metaKeywords: apiPage.keywords || initPage.metaKeywords,
                  ogTitle: apiPage.og_title || initPage.ogTitle,
                  ogDescription: apiPage.og_description || initPage.ogDescription,
                  h1Heading: apiPage.h1_heading || initPage.h1Heading,
                  canonicalUrl: apiPage.canonical_url || initPage.canonicalUrl,
                  robotsIndex: apiPage.robots_index !== false,
                  robotsFollow: apiPage.robots_follow !== false,
                  focusKeyword: apiPage.focus_keyword || initPage.focusKeyword,
                  secondaryKeywords: apiPage.secondary_keywords || initPage.secondaryKeywords,
                  ogImage: apiPage.og_image || initPage.ogImage,
                  twitterTitle: apiPage.twitter_title || initPage.twitterTitle,
                  twitterDescription: apiPage.twitter_description || initPage.twitterDescription,
                  twitterImage: apiPage.twitter_image || initPage.twitterImage,
                  schemaType: apiPage.schema_type || initPage.schemaType,
                  customSchemaJson: apiPage.custom_schema_json || initPage.customSchemaJson
                };
              }
              return initPage;
            }).concat(
              seoData.pages.filter(p => !initialSeoConfig.pages.some(init => init.pageSlug === p.page_slug)).map(p => ({
                pageSlug: p.page_slug,
                pageTitle: p.title,
                metaTitle: p.title,
                metaDescription: p.meta_description,
                metaKeywords: p.keywords || '',
                ogTitle: p.og_title || '',
                ogDescription: p.og_description || '',
                h1Heading: p.h1_heading || '',
                canonicalUrl: p.canonical_url || '',
                robotsIndex: p.robots_index !== false,
                robotsFollow: p.robots_follow !== false,
                focusKeyword: p.focus_keyword || '',
                secondaryKeywords: p.secondary_keywords || '',
                ogImage: p.og_image || '',
                twitterTitle: p.twitter_title || '',
                twitterDescription: p.twitter_description || '',
                twitterImage: p.twitter_image || '',
                schemaType: p.schema_type || 'WebPage',
                customSchemaJson: p.custom_schema_json || ''
              }))
            )
`;

const regex = /pages:\s*seoData\.pages\.map\(\(p:\s*any\)\s*=>\s*\(\{\s*pageSlug:\s*p\.page_slug,[\s\S]*?ogDescription:\s*p\.og_description\s*\|\|\s*''\s*\}\)\)/;

if (regex.test(content)) {
    content = content.replace(regex, replacement.trim());
    fs.writeFileSync(file, content);
    console.log('Fixed pages assignment in login/page.tsx');
} else {
    console.log('Could not find the target regex in login/page.tsx');
}
