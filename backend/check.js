const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const contrato = await prisma.contrato.findFirst({ where: { descricao: { contains: 'RCG' } }, include: { escalas: true } });
  console.log(JSON.stringify(contrato, null, 2));
}
main().finally(() => prisma.$disconnect());
