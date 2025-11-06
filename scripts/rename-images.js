const fs = require('fs');
const path = require('path');

const oldDir = path.join(__dirname, '../public/images/icons/Activities Blueprint');
const newDir = path.join(__dirname, '../public/images/icons/activities-blueprint');

// Função para normalizar nome do arquivo (remover espaços e caracteres especiais)
function normalizeFileName(filename) {
    return filename
        .replace(/\s+/g, '-')
        .replace(/,/g, '')
        .replace(/_/g, '-')
        .replace(/--+/g, '-')
        .toLowerCase();
}

if (!fs.existsSync(oldDir)) {
    console.error(`Diretório não encontrado: ${oldDir}`);
    process.exit(1);
}

// Criar novo diretório se não existir
if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
    console.log(`Criado diretório: ${newDir}`);
}

const files = fs.readdirSync(oldDir);
let renamedCount = 0;

files.forEach(file => {
    if (file.endsWith('.png')) {
        const oldPath = path.join(oldDir, file);
        const normalizedName = normalizeFileName(file);
        const newPath = path.join(newDir, normalizedName);
        
        // Mover e renomear arquivo
        if (file !== normalizedName || oldDir !== newDir) {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${file} -> ${normalizedName}`);
            renamedCount++;
        }
    }
});

// Remover diretório antigo se estiver vazio
try {
    const remainingFiles = fs.readdirSync(oldDir);
    if (remainingFiles.length === 0) {
        fs.rmdirSync(oldDir);
        console.log(`\nDiretório antigo removido: ${oldDir}`);
    }
} catch (err) {
    console.log(`\nAviso: Não foi possível remover diretório antigo: ${err.message}`);
}

console.log(`\nTotal de arquivos renomeados: ${renamedCount}`);
console.log(`Arquivos movidos para: ${newDir}`);

