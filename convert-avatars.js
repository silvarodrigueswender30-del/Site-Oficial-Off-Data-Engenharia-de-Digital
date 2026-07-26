const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\Teste\\.gemini\\antigravity\\brain\\e50a7656-1fb7-42c0-bfa6-c9fb1c84de22';
const destDir = 'C:\\Users\\Teste\\Downloads\\PJR - Off- D\\SITE\\public\\assets\\testimonials';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function convertImages() {
  const files = [
    { src: 'avatar_3_1784227012809.png', dest: 'client-1.avif' }, // Roberto Alves (older man)
    { src: 'avatar_2_1784227004739.png', dest: 'client-2.avif' }, // Dra. Mariana (woman)
    { src: 'avatar_1_1784226996423.png', dest: 'client-3.avif' }  // Thiago (young man)
  ];

  for (const file of files) {
    const srcPath = path.join(sourceDir, file.src);
    const destPath = path.join(destDir, file.dest);
    
    console.log(`Convertendo ${file.src} para AVIF...`);
    await sharp(srcPath)
      .resize(256, 256, { fit: 'cover' }) // ensure it's a perfect square for avatar
      .avif({ quality: 65 })
      .toFile(destPath);
    console.log(`Salvo em ${destPath}`);
  }
  
  console.log('Todas as conversões concluídas com sucesso!');
}

convertImages().catch(console.error);
