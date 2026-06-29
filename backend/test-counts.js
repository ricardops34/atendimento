const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const agendamentos = await prisma.agendamento.count();
  const clientes = await prisma.cliente.count();
  const profissionais = await prisma.profissional.count();
  const contratos = await prisma.contrato.count();

  console.log(`- Agendamentos: ${agendamentos}`);
  console.log(`- Clientes: ${clientes}`);
  console.log(`- Profissionais: ${profissionais}`);
  console.log(`- Contratos: ${contratos}`);
}

main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
});
