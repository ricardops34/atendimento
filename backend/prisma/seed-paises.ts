import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fetching IBGE data for Paises...');
  try {
    const paisesRes = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/paises');
    if (paisesRes.ok) {
      const paises = await paisesRes.json() as any[];
      console.log(`Loaded ${paises.length} paises from IBGE API. Saving...`);
      let count = 0;
      for (const pais of paises) {
        const id = pais.id?.M49;
        const sigla = pais.id?.['ISO-ALPHA-2'];
        const nome = pais.nome;
        
        if (id && sigla) {
          await prisma.pais.upsert({
            where: { id: id },
            update: { nome: nome, sigla: sigla },
            create: { id: id, nome: nome, sigla: sigla },
          });
          count++;
        }
      }
      console.log(`Seed of Paises completed successfully! Inserted/Updated ${count} países.`);
    } else {
      console.warn('Failed to fetch Paises from IBGE');
    }
  } catch (error) {
    console.error('Error fetching IBGE data for Paises:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
