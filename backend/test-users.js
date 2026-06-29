const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.count();
  const empresas = await prisma.empresa.count();
  const perfis = await prisma.profile.count();
  const agendamentos = await prisma.agendamento.count();

  console.log(`- Users: ${users}`);
  console.log(`- Empresas: ${empresas}`);
  console.log(`- Profiles: ${perfis}`);
  console.log(`- Agendamentos: ${agendamentos}`);
}

main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
});
