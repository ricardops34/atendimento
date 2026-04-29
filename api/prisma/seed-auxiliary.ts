import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando Carga Inicial de Dados Auxiliares...');

  // 1. Países (BACEN)
  await prisma.country.upsert({
    where: { code: '1058' },
    update: {},
    create: { code: '1058', name: 'Brasil', isoCode: 'BRA' }
  });

  // 2. Estados (IBGE)
  const states = [
    { code: 11, uf: 'RO', name: 'Rondônia' },
    { code: 12, uf: 'AC', name: 'Acre' },
    { code: 13, uf: 'AM', name: 'Amazonas' },
    { code: 14, uf: 'RR', name: 'Roraima' },
    { code: 15, uf: 'PA', name: 'Pará' },
    { code: 16, uf: 'AP', name: 'Amapá' },
    { code: 17, uf: 'TO', name: 'Tocantins' },
    { code: 21, uf: 'MA', name: 'Maranhão' },
    { code: 22, uf: 'PI', name: 'Piauí' },
    { code: 23, uf: 'CE', name: 'Ceará' },
    { code: 24, uf: 'RN', name: 'Rio Grande do Norte' },
    { code: 25, uf: 'PB', name: 'Paraíba' },
    { code: 26, uf: 'PE', name: 'Pernambuco' },
    { code: 27, uf: 'AL', name: 'Alagoas' },
    { code: 28, uf: 'SE', name: 'Sergipe' },
    { code: 29, uf: 'BA', name: 'Bahia' },
    { code: 31, uf: 'MG', name: 'Minas Gerais' },
    { code: 32, uf: 'ES', name: 'Espírito Santo' },
    { code: 33, uf: 'RJ', name: 'Rio de Janeiro' },
    { code: 35, uf: 'SP', name: 'São Paulo' },
    { code: 41, uf: 'PR', name: 'Paraná' },
    { code: 42, uf: 'SC', name: 'Santa Catarina' },
    { code: 43, uf: 'RS', name: 'Rio Grande do Sul' },
    { code: 50, uf: 'MS', name: 'Mato Grosso do Sul' },
    { code: 51, uf: 'MT', name: 'Mato Grosso' },
    { code: 52, uf: 'GO', name: 'Goiás' },
    { code: 53, uf: 'DF', name: 'Distrito Federal' }
  ];

  for (const s of states) {
    await prisma.state.upsert({
      where: { uf: s.uf },
      update: s,
      create: s
    });
  }

  // 3. Municípios (Exemplos de Capitais)
  const spState = await prisma.state.findUnique({ where: { uf: 'SP' } });
  if (spState) {
    await prisma.city.upsert({
      where: { code: 3550308 },
      update: {},
      create: { code: 3550308, name: 'São Paulo', stateId: spState.id }
    });
  }

  // 4. CNAEs (Exemplos)
  const cnaes = [
    { code: '6201-5/00', description: 'Desenvolvimento de programas de computador sob encomenda' },
    { property: '6202-3/00', description: 'Desenvolvimento e licenciamento de programas de computador customizáveis' },
    { code: '6203-1/00', description: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis' }
  ];

  for (const c of cnaes) {
    if (c.code) {
      await prisma.cnae.upsert({
        where: { code: c.code },
        update: { description: c.description },
        create: { code: c.code, description: c.description }
      });
    }
  }

  console.log('Carga Inicial concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
