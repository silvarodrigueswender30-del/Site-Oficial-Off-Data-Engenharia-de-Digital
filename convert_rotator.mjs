import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SITE_DIR = 'C:\\Users\\Teste\\Downloads\\PJR - Off- D\\SITE';
const SOURCE_DIR = 'C:\\Users\\Teste\\Downloads\\PJR - Off- D\\ARQUIVOS-OFF';
const DEST_BASE = path.join(SITE_DIR, 'public', 'assets', 'services');

const imagesToProcess = [
  { src: 'img-Site-Institucional1.jpeg', folder: 'site-institucional', name: 'img-1' },
  { src: 'img-Site-Institucional2.jpeg', folder: 'site-institucional', name: 'img-2' },
  { src: 'imgLanding-Page.jpeg', folder: 'landing-page', name: 'img-1' },
  { src: 'img-Landing-Page2.jpeg', folder: 'landing-page', name: 'img-2' },
  { src: 'img-Loja-Virtual.jpeg', folder: 'loja-virtual', name: 'img-1' },
  { src: 'img-Loja-Virtual2.jpeg', folder: 'loja-virtual', name: 'img-2' },
];

async function main() {
  try {
    let sharp;
    try {
      sharp = (await import('sharp')).default;
    } catch (e) {
      console.log('Installing sharp...');
      execSync('npm install sharp --no-save', { cwd: SITE_DIR, stdio: 'inherit' });
      sharp = (await import('sharp')).default;
    }

    for (const item of imagesToProcess) {
      const srcPath = path.join(SOURCE_DIR, item.src);
      const destDir = path.join(DEST_BASE, item.folder);

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      const sizes = [
        { suffix: '1400w', width: 1400, height: 875 },
        { suffix: '800w', width: 800, height: 500 }
      ];

      for (const size of sizes) {
        const destPath = path.join(destDir, `${item.name}-${size.suffix}.avif`);
        await sharp(srcPath)
          .resize(size.width, size.height, { fit: 'cover', position: 'attention' })
          .avif({ quality: 60, effort: 4 })
          .toFile(destPath);
        console.log(`Created ${destPath}`);
      }
    }
    console.log('Done!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

main();
