import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenants = await prisma.tenant.findMany({
    include: { plan: true }
  });
  const plans = await prisma.plan.findMany();
  
  console.log('--- TENANTS ---');
  console.table(tenants.map(t => ({ id: t.id, name: t.name, domain: t.domain, plan: t.plan.name })));
  
  console.log('\n--- PLANS ---');
  console.table(plans.map(p => ({ id: p.id, name: p.name, maxUsers: p.maxUsers })));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
