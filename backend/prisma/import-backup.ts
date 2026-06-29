/**
 * Script de importação dos dados do backup MySQL (bjsoft18_portal.sql)
 * para o PostgreSQL do novo sistema.
 *
 * Uso: npx ts-node prisma/import-backup.ts
 *
 * - Idempotente: usa upsert, pode ser rodado múltiplas vezes sem duplicar.
 * - Preserva os IDs originais do backup.
 * - Reseta as sequences do PostgreSQL ao final.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEFAULT_CONTRACT_START = new Date('2026-01-01');
const DEFAULT_CONTRACT_END = new Date('2026-12-31');
const DEFAULT_CONTRACT_TYPE = 'F';

// ---------------------------------------------------------------------------
// Dados extraídos do backup bjsoft18_portal.sql
// ---------------------------------------------------------------------------

const empresas = [
  { id: 1, nome: 'FUNLEC' },
  { id: 2, nome: 'RCG' },
  { id: 3, nome: 'MSGAS' },
  { id: 4, nome: 'GUATOS' },
  { id: 5, nome: 'GAO' },
  { id: 6, nome: 'Health Brasil' },
  { id: 7, nome: 'JFS' },
  { id: 8, nome: 'H2L' },
  { id: 9, nome: 'MATPAR' },
];

const profissionais = [
  { id: 1, nome: 'Ricardo Patay Sotomayor' },
];

// Contratos do backup (campo tipo ignorado — não existe no novo schema)
// isFeriado=false para todos: o contrato de feriado do sistema é gerado pelo seed
const contratos = [
  { id: 3,  clienteId: 1, descricao: 'FUNLEC',     cor: '#4CAF50' },
  { id: 4,  clienteId: 3, descricao: 'MSGAS',      cor: '#2196F3' },
  { id: 5,  clienteId: 2, descricao: 'RCG',         cor: '#00BCD4' },
  { id: 6,  clienteId: 4, descricao: 'GUATOS',      cor: '#FFC107' },
  { id: 7,  clienteId: 5, descricao: 'GAO MSGAS',   cor: '#2196F3' },
  { id: 8,  clienteId: 6, descricao: 'Health',      cor: '#9E9E9E' },
  { id: 9,  clienteId: 7, descricao: 'JFS',         cor: '#FF5722' },
  { id: 10, clienteId: 8, descricao: 'H2L AVULSO',  cor: '#00BCD4' },
];

// ContratoItems do backup — itens com profissional_id NULL são ignorados
// (schema não aceita profissionalId nulo; items 14 e 20 do backup não têm profissional)
const contratoItems = [
  { id: 9,  contratoId: 3, profissionalId: 1, diaSemana: 1, horaInicio: '07:30', intervaloIni: '00:00', intervaloFim: '00:00', horaFim: '11:30' },
  { id: 13, contratoId: 4, profissionalId: 1, diaSemana: 3, horaInicio: '07:30', intervaloIni: '11:30', intervaloFim: '13:30', horaFim: '17:30' },
  { id: 18, contratoId: 5, profissionalId: 1, diaSemana: 1, horaInicio: '13:00', intervaloIni: '00:00', intervaloFim: '00:00', horaFim: '18:00' },
  { id: 19, contratoId: 5, profissionalId: 1, diaSemana: 2, horaInicio: '08:00', intervaloIni: '11:30', intervaloFim: '13:00', horaFim: '18:00' },
];

// ---------------------------------------------------------------------------

async function resetSequence(table: string, column = 'id') {
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"${table}"', '${column}'), COALESCE((SELECT MAX(${column}) FROM "${table}"), 0) + 1, false)`
  );
}

async function main() {
  // Busca o tenant padrão (criado pelo seed.ts)
  const tenant = await prisma.empresa.findFirst({ where: { slug: 'default-tenant' } });
  if (!tenant) {
    throw new Error('Tenant "default" não encontrado. Rode "npx prisma db seed" primeiro.');
  }
  const empresaId = tenant.id;

  console.log(`Importando dados para tenant "${tenant.name}" (id=${empresaId})...`);

  // 1. Empresas
  console.log('\n→ Empresas...');
  for (const emp of empresas) {
    await prisma.cliente.upsert({
      where: { id: emp.id },
      update: { nome: emp.nome, empresaId },
      create: { id: emp.id, nome: emp.nome, empresaId },
    });
    console.log(`  ✓ [${emp.id}] ${emp.nome}`);
  }
  await resetSequence('cliente');

  // 2. Profissionais
  console.log('\n→ Profissionais...');
  for (const pro of profissionais) {
    await prisma.profissional.upsert({
      where: { id: pro.id },
      update: { nome: pro.nome, empresaId },
      create: { id: pro.id, nome: pro.nome, empresaId },
    });
    console.log(`  ✓ [${pro.id}] ${pro.nome}`);
  }
  await resetSequence('profissional');

  // 3. Contratos
  console.log('\n→ Contratos...');
  for (const con of contratos) {
    await prisma.contrato.upsert({
      where: { id: con.id },
      update: {
        descricao: con.descricao,
        cor: con.cor,
        clienteId: con.clienteId,
        empresaId,
        dtInicio: DEFAULT_CONTRACT_START,
        dtFim: DEFAULT_CONTRACT_END,
        tipo: DEFAULT_CONTRACT_TYPE
      },
      create: {
        id: con.id,
        descricao: con.descricao,
        cor: con.cor,
        clienteId: con.clienteId,
        empresaId,
        dtInicio: DEFAULT_CONTRACT_START,
        dtFim: DEFAULT_CONTRACT_END,
        tipo: DEFAULT_CONTRACT_TYPE,
        isFeriado: false
      },
    });
    console.log(`  ✓ [${con.id}] ${con.descricao}`);
  }
  await resetSequence('contrato');

  // 4. ContratoItems (escala semanal)
  console.log('\n→ Escalas (contrato_item)...');
  for (const ci of contratoItems) {
    await prisma.contratoItem.upsert({
      where: { id: ci.id },
      update: {
        diaSemana: ci.diaSemana,
        horaInicio: ci.horaInicio,
        intervaloIni: ci.intervaloIni,
        intervaloFim: ci.intervaloFim,
        horaFim: ci.horaFim,
        profissionalId: ci.profissionalId,
      },
      create: {
        id: ci.id,
        contratoId: ci.contratoId,
        profissionalId: ci.profissionalId,
        diaSemana: ci.diaSemana,
        horaInicio: ci.horaInicio,
        intervaloIni: ci.intervaloIni,
        intervaloFim: ci.intervaloFim,
        horaFim: ci.horaFim,
      },
    });
    console.log(`  ✓ [${ci.id}] contrato=${ci.contratoId} dia=${ci.diaSemana}`);
  }
  await resetSequence('contrato_item');

  console.log('\n✅ Importação concluída!');
}

main()
  .catch((e) => {
    console.error('Erro na importação:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
