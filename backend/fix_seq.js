const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  try {
    const result = await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('agendamento', 'id'), coalesce(max(id),0) + 1, false) FROM agendamento;`);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
run();
