const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROPOSTA_SLUG = 'proposta-carolina-k8m3vq';

// Caminhos possíveis para o projeto de origem da proposta
const possibleSourcePaths = [
  path.resolve(__dirname, '..', '..', 'Cliente-Carolina'),
  path.resolve(__dirname, '..', '..', '..', 'Cliente-Carolina'),
  'C:\\Users\\Teste\\Downloads\\Cliente-Carolina',
];

const sourceDir = possibleSourcePaths.find((p) => fs.existsSync(p));
const publicTargetDir = path.resolve(__dirname, '..', 'public', PROPOSTA_SLUG);

console.log(`[sync-proposta] Slug ativo: /${PROPOSTA_SLUG}/`);

if (sourceDir) {
  console.log(`[sync-proposta] Projeto de origem encontrado em: ${sourceDir}`);
  console.log('[sync-proposta] Executando build da proposta com Vite...');
  execSync('npm run build', { cwd: sourceDir, stdio: 'inherit' });

  const distDir = path.join(sourceDir, 'dist');
  if (fs.existsSync(distDir)) {
    console.log(`[sync-proposta] Sincronizando ${distDir} -> ${publicTargetDir}...`);
    if (fs.existsSync(publicTargetDir)) {
      fs.rmSync(publicTargetDir, { recursive: true, force: true });
    }
    fs.cpSync(distDir, publicTargetDir, { recursive: true });
    console.log('[sync-proposta] Sincronização concluída com sucesso!');
  } else {
    console.error('[sync-proposta] Erro: pasta dist não foi gerada no projeto de origem.');
    process.exit(1);
  }
} else {
  console.log('[sync-proposta] Pasta de origem Cliente-Carolina não encontrada neste ambiente.');
  if (fs.existsSync(publicTargetDir)) {
    console.log('[sync-proposta] Pasta pública public/' + PROPOSTA_SLUG + ' já está presente e pronta para deploy.');
  } else {
    console.warn('[sync-proposta] Atenção: public/' + PROPOSTA_SLUG + ' não existe.');
  }
}
