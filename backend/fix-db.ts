import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fix() {
  const result = await prisma.agendamento.updateMany({
    where: { profissionalId: null },
    data: { profissionalId: 1 }
  });
  console.log('Agendamentos atualizados:', result.count);
}

fix().catch(console.error).finally(() => prisma.$disconnect());
