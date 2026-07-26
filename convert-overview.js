const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\Teste\\Downloads\\PJR - Off- D\\ARQUIVOS-OFF';
const destDir = 'C:\\Users\\Teste\\Downloads\\PJR - Off- D\\SITE\\public\\assets\\services';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function convertImages() {
  const files = [
    { src: 'img-1.jpeg', dest: 'servico-overview-1.avif' },
    { src: 'img-2.jpeg', dest: 'servico-overview-2.avif' }
  ];

  for (const file of files) {
    const srcPath = path.join(sourceDir, file.src);
    const destPath = path.join(destDir, file.dest);
    
    console.log(`Convertendo ${file.src} para AVIF...`);
    await sharp(srcPath)
      .avif({ quality: 60 })
      .toFile(destPath);
    console.log(`Salvo em ${destPath}`);
  }
  
  console.log('Todas as conversões concluídas com sucesso!');
}

convertImages().catch(console.error);
