import { PrismaClient } from '@prisma/client';
import * as mysql from 'mysql2/promise';

const prisma = new PrismaClient();

async function main() {
  const empresaDefault = await prisma.empresa.findFirst({ where: { slug: 'empresa-padrao' } });
  if (!empresaDefault) {
    throw new Error('Empresa fallback não encontrada.');
  }

  const connection = await mysql.createConnection({
    host: process.env.LEGACY_DB_HOST || 'mysql',
    port: parseInt(process.env.LEGACY_DB_PORT || '3306'),
    user: process.env.LEGACY_DB_USER || 'root',
    password: process.env.LEGACY_DB_PASSWORD || 'root',
    database: process.env.LEGACY_DB_NAME || 'bjsoft18_portal',
  });

  console.log('Conectado ao MySQL legacy!');

  const [rows] = await connection.execute('SELECT * FROM profissional');
  const profissionais = rows as any[];

  console.log(`Encontrados ${profissionais.length} profissionais. Importando...`);

  let count = 0;
  for (const item of profissionais) {
    await prisma.profissional.upsert({
      where: { id: item.id },
      update: {
        nome: item.nome,
        empresaId: empresaDefault.id,
      },
      create: {
        id: item.id,
        nome: item.nome,
        empresaId: empresaDefault.id,
      }
    });
    count++;
  }

  console.log(`✅ Importados ${count} profissionais com sucesso!`);

  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"profissional"', 'id'), COALESCE((SELECT MAX(id) FROM "profissional"), 0) + 1, false)`
  );

  await connection.end();
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
