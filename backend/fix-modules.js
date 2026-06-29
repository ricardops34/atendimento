const fs = require('fs');
const path = require('path');

function fixModules(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixModules(fullPath);
    } else if (fullPath.endsWith('.module.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const dirName = path.dirname(fullPath);
      // check if any service in this dir uses PrismaService
      const serviceFiles = fs.readdirSync(dirName).filter(f => f.endsWith('.service.ts'));
      let needsPrisma = false;
      for (const sf of serviceFiles) {
        const sfc = fs.readFileSync(path.join(dirName, sf), 'utf8');
        if (sfc.includes('PrismaService')) {
          needsPrisma = true;
          break;
        }
      }

      if (needsPrisma && !content.includes('PrismaModule')) {
        console.log('Fixing', fullPath);
        // Add import { PrismaModule } from '../prisma/prisma.module';
        // Calculate relative path to prisma module
        const relPath = path.relative(dirName, path.join(__dirname, 'src', 'prisma', 'prisma.module')).replace(/\\/g, '/');
        content = `import { PrismaModule } from '${relPath}';\n` + content;
        
        // Add PrismaModule to imports: [...]
        if (content.includes('imports: [')) {
          content = content.replace('imports: [', 'imports: [PrismaModule, ');
        } else {
          content = content.replace('@Module({', '@Module({\n  imports: [PrismaModule],');
        }
        
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

fixModules(path.join(__dirname, 'src'));
console.log('Done.');
