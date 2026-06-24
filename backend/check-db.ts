import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const agendamentosSemProfissional = await prisma.agendamento.count({
    where: { profissionalId: null }
  });
  console.log('Agendamentos sem profissional:', agendamentosSemProfissional);

  const agendamentos = await prisma.agendamento.findMany({
    where: { profissionalId: null },
    take: 1
  });
  console.log('Exemplo:', agendamentos);
}

check().catch(console.error).finally(() => prisma.$disconnect());
