const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.agendamento.count();
  console.log(`Total Agendamentos: ${count}`);
  
  if (count > 0) {
    const agendamentos = await prisma.agendamento.findMany({
      take: 5
    });
    console.log('Agendamentos:', JSON.stringify(agendamentos, null, 2));
  }
}

main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
});
