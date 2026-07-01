const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const feriadosNacionais = [
  { mes: 1, dia: 1, desc: "Confraternização Universal" },
  { mes: 4, dia: 21, desc: "Tiradentes" },
  { mes: 5, dia: 1, desc: "Dia do Trabalhador" },
  { mes: 9, dia: 7, desc: "Independência do Brasil" },
  { mes: 10, dia: 12, desc: "Nossa Senhora Aparecida" },
  { mes: 11, dia: 2, desc: "Finados" },
  { mes: 11, dia: 15, desc: "Proclamação da República" },
  { mes: 12, dia: 25, desc: "Natal" }
];

async function seed() {
  let empresaId = 1;

  for (const f of feriadosNacionais) {
    // Ano bissexto para garantir 29 de fevereiro se houvesse, mas usarei 2024 como base para data, a data específica não importa muito porque é fixo
    const dateStr = `2024-${String(f.mes).padStart(2, '0')}-${String(f.dia).padStart(2, '0')}T00:00:00.000Z`;
    const data = new Date(dateStr);

    const existe = await prisma.feriado.findFirst({
      where: {
        empresaId,
        descricao: f.desc,
      }
    });

    if (!existe) {
      await prisma.feriado.create({
        data: {
          empresaId,
          data,
          descricao: f.desc,
          tipo: 'N',
          fixo: true
        }
      });
      console.log(`Criado feriado: ${f.desc}`);
    } else {
      console.log(`Feriado já existe: ${f.desc}`);
    }
  }

  // Verifica a sequence para evitar problemas de ID
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('feriado', 'id'), coalesce(max(id),0) + 1, false) FROM feriado;`);
  console.log("Feriados nacionais populados!");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
