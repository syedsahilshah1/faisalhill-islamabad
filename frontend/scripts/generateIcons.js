const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b0032"/>
      <stop offset="100%" stop-color="#55001d"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fae08c"/>
      <stop offset="100%" stop-color="#d49b28"/>
    </linearGradient>
  </defs>
  
  <!-- Background with subtle rounded corners (or circle for SERP) -->
  <rect width="512" height="512" rx="100" fill="url(#bgGrad)"/>
  
  <!-- Gold Accent Inner Border -->
  <rect x="24" y="24" width="464" height="464" rx="80" fill="none" stroke="url(#goldGrad)" stroke-width="8" stroke-opacity="0.65"/>
  
  <!-- Mountain Margalla Peak Motif -->
  <path d="M170 175 L225 110 L280 175 Z" fill="url(#goldGrad)" opacity="0.9"/>
  <path d="M250 175 L290 125 L330 175 Z" fill="url(#goldGrad)" opacity="0.75"/>
  <circle cx="225" cy="92" r="10" fill="url(#goldGrad)"/>

  <!-- Serif Bold FH Monogram -->
  <text x="256" y="340" 
        font-family="Georgia, 'Times New Roman', 'Playfair Display', serif" 
        font-size="200" 
        font-weight="900" 
        fill="#ffffff" 
        text-anchor="middle" 
        letter-spacing="-3">FH</text>
        
  <!-- Subtitle Tag -->
  <text x="256" y="415" 
        font-family="'Arial', 'Inter', system-ui, sans-serif" 
        font-size="36" 
        font-weight="800" 
        fill="url(#goldGrad)" 
        text-anchor="middle" 
        letter-spacing="9">FAISAL HILLS</text>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svg512);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg512);

const svgBuffer = Buffer.from(svg512);

async function run() {
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512x512.png'));
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192x192.png'));
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(svgBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon-48x48.png'));
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(svgBuffer).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
  // Save standard square favicon.ico
  await sharp(svgBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon.ico'));
  
  // Create site.webmanifest
  const webmanifest = {
    name: "Faisal Hills Islamabad",
    short_name: "Faisal Hills",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    theme_color: "#7b002c",
    background_color: "#ffffff",
    display: "standalone"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(webmanifest, null, 2));
  fs.writeFileSync(path.join(publicDir, 'manifest.webmanifest'), JSON.stringify(webmanifest, null, 2));

  console.log('Successfully generated all high-res favicons and webmanifest!');
}

run().catch(console.error);
