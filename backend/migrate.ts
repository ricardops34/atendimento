import { PrismaClient } from '@prisma/client';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const DEFAULT_EMPRESA_ID = 1;
const DEFAULT_CONTRACT_START = new Date('2026-01-01');
const DEFAULT_CONTRACT_END = new Date('2026-12-31');
const DEFAULT_CONTRACT_TYPE = 'F';

// Configuração de conexão com o banco legado (MySQL)
const legacyDbConfig = {
  host: process.env.LEGACY_DB_HOST || 'localhost',
  user: process.env.LEGACY_DB_USER || 'root',
  password: process.env.LEGACY_DB_PASSWORD || '',
  database: process.env.LEGACY_DB_NAME || 'bjsoft18_portal',
  port: 3306,
};

/**
 * Função T-01: Higienização de Cores Hexadecimais
 */
function sanitizeColor(color: string | null | undefined): string {
  if (!color) return '#333333';
  const cleanColor = color.trim();
  const hexRegex = /^#[0-9A-F]{6}$/i;
  return hexRegex.test(cleanColor) ? cleanColor : '#333333';
}

/**
 * Função T-02: Conversão de Tempo Líquido Textual para Minutos
 */
function parseDurationToMinutes(durationText: string | null): number {
  if (!durationText || typeof durationText !== 'string') return 0;
  const parts = durationText.split(':');
  if (parts.length !== 2) return 0;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return 0;
  return hours * 60 + minutes;
}

/**
 * Função T-03: Concatenação de Datetimes Técnicos
 */
function composeDateTime(date: Date, timeStr: string | null): Date {
  const [hours, minutes] = (timeStr || '00:00').split(':').map(Number);
  const composed = new Date(date);
  composed.setHours(hours || 0, minutes || 0, 0, 0);
  return composed;
}

/**
 * Script Principal de ETL
 */
async function runETL() {
  console.log('Iniciando script de migração ETL...');
  const legacyConn = await mysql.createConnection(legacyDbConfig);

  try {
    // 1. Limpeza do banco de dados alvo (Idempotência)
    console.log('Limpando tabelas do banco de dados PostgreSQL...');
    await prisma.$transaction([
      prisma.realizado.deleteMany(),
      prisma.agendamento.deleteMany(),
      prisma.contratoItem.deleteMany(),
      prisma.contrato.deleteMany(),
      prisma.profissional.deleteMany(),
      prisma.empresa.deleteMany(),
      prisma.empresa.deleteMany(), // Limpa as empresas também, caso queira resetar tudo, ou deixe para usar upsert.
    ]);

    // 1.5 Criar Empresa Padrão
    console.log('Criando Empresa padrão...');
    await prisma.empresa.upsert({
      where: { id: DEFAULT_EMPRESA_ID },
      update: {},
      create: {
        id: DEFAULT_EMPRESA_ID,
        name: 'Empresa Padrão',
        slug: 'default',
      },
    });

    console.log('Associando admin@fallback.com a Empresa padrão...');
    const adminUser = await prisma.user.findFirst({ where: { email: 'admin@fallback.com' } });
    if (adminUser) {
      await prisma.userEmpresa.upsert({
        where: { userId_empresaId: { userId: adminUser.id, empresaId: DEFAULT_EMPRESA_ID } },
        update: {},
        create: { userId: adminUser.id, empresaId: DEFAULT_EMPRESA_ID },
      });
    }

    // 2. Migração de Clientes
    console.log('Migrando Clientes...');
    const [empresasLegacy] = await legacyConn.execute<any[]>('SELECT * FROM empresa');
    const empresasToInsert = empresasLegacy.map((e) => ({
      id: e.id,
      empresaId: DEFAULT_EMPRESA_ID,
      nome: String(e.nome).trim() || 'Empresa Não Informada',
    }));
    await prisma.cliente.createMany({ data: empresasToInsert });
    console.log(`> Inseridas ${empresasToInsert.length} empresas.`);

    // 3. Migração de Profissionais
    console.log('Migrando Profissionais...');
    const [profissionaisLegacy] = await legacyConn.execute<any[]>('SELECT * FROM profissional');
    const profissionaisToInsert = profissionaisLegacy.map((p) => ({
      id: p.id,
      empresaId: DEFAULT_EMPRESA_ID,
      nome: String(p.nome).trim() || 'Profissional Não Informado',
    }));
    await prisma.profissional.createMany({ data: profissionaisToInsert });
    console.log(`> Inseridos ${profissionaisToInsert.length} profissionais.`);

    // 4. Migração de Contratos
    console.log('Migrando Contratos...');
    const [contratosLegacy] = await legacyConn.execute<any[]>('SELECT * FROM contrato');
    const contratosToInsert = contratosLegacy.map((c) => ({
      id: c.id,
      empresaId: DEFAULT_EMPRESA_ID,
      clienteId: c.empresa_id,
      descricao: String(c.descricao).trim(),
      cor: sanitizeColor(c.cor),
      dtInicio: c.dt_inicio ? new Date(c.dt_inicio) : DEFAULT_CONTRACT_START,
      dtFim: c.dt_fim ? new Date(c.dt_fim) : DEFAULT_CONTRACT_END,
      tipo: c.tipo || DEFAULT_CONTRACT_TYPE,
      isFeriado: c.is_feriado === 1 || false,
    }));
    await prisma.contrato.createMany({ data: contratosToInsert });
    console.log(`> Inseridos ${contratosToInsert.length} contratos.`);

    // 5. Migração de Escalas (ContratoItem)
    console.log('Migrando Escalas (ContratoItem)...');
    const [itensLegacy] = await legacyConn.execute<any[]>('SELECT * FROM contrato_item');
    const itensToInsert = itensLegacy
      .filter((ci) => ci.profissional_id && ci.contrato_id) // Ignorar registros órfãos
      .map((ci) => ({
        id: ci.id,
        contratoId: ci.contrato_id,
        profissionalId: ci.profissional_id,
        diaSemana: ci.dia_semana,
        horaInicio: String(ci.hora_inicio || '00:00').substring(0, 5),
        horaFim: String(ci.hora_fim || '00:00').substring(0, 5),
        intervaloIni: String(ci.intervalo_ini || '00:00').substring(0, 5),
        intervaloFim: String(ci.intervalo_fim || '00:00').substring(0, 5),
    }));
    await prisma.contratoItem.createMany({ data: itensToInsert });
    console.log(`> Inseridas ${itensToInsert.length} escalas.`);

    // 6. Migração de Agendamentos
    console.log('Migrando Agendamentos...');
    const [agendamentosLegacy] = await legacyConn.execute<any[]>('SELECT * FROM agendamento');
    const agendamentosToInsert = agendamentosLegacy.map((a) => {
      // Aplicando transformações T-02 e T-03
      const duracaoMinutos = parseDurationToMinutes(a.hora_total);
      const horarioInicial = composeDateTime(new Date(a.data_agenda), a.hora_inicio);
      const horarioFinal = composeDateTime(new Date(a.data_agenda), a.hora_fim);

      return {
        id: a.id,
        empresaId: DEFAULT_EMPRESA_ID,
        contratoId: a.contrato_id || null,
        profissionalId: a.profissional_id || 1,
        descricao: String(a.descricao || '').trim().substring(0, 500),
        dataAgenda: new Date(a.data_agenda),
        horaInicio: String(a.hora_inicio || '00:00').substring(0, 5),
        horaFim: String(a.hora_fim || '00:00').substring(0, 5),
        horaIntervaloInicial: String(a.hora_intervalo_inicial || '00:00').substring(0, 5),
        horaIntervaloFinal: String(a.hora_intervalo_final || '00:00').substring(0, 5),
        duracaoMinutos,
        horarioInicial,
        horarioFinal,
        local: a.local || 'P',
        tipo: a.tipo || 'A',
        cor: sanitizeColor(a.cor),
        observacao: a.observacao || null,
      };
    });
    
    // Processamento em chunks para evitar bloqueios grandes se a base for muito grande
    const chunkSize = 1000;
    for (let i = 0; i < agendamentosToInsert.length; i += chunkSize) {
      const chunk = agendamentosToInsert.slice(i, i + chunkSize);
      await prisma.agendamento.createMany({ data: chunk });
    }
    console.log(`> Inseridos ${agendamentosToInsert.length} agendamentos.`);

    // 7. Migração de Realizados
    console.log('Migrando Realizados...');
    const [realizadosLegacy] = await legacyConn.execute<any[]>('SELECT * FROM realizado');
    const realizadosToInsert = realizadosLegacy.map((r) => {
      // Localizamos a duracao_minutos no array parseado para T-04
      const agendamentoRelacionado = agendamentosToInsert.find(a => a.id === r.agendamento_id);
      const minutos = agendamentoRelacionado?.duracaoMinutos || 0;
      const horasDecimais = (minutos / 60).toFixed(2); // Transformação T-04

      return {
        id: r.id,
        agendamentoId: r.agendamento_id,
        horasDecimais: Number(horasDecimais),
      };
    });

    for (let i = 0; i < realizadosToInsert.length; i += chunkSize) {
      const chunk = realizadosToInsert.slice(i, i + chunkSize);
      await prisma.realizado.createMany({ data: chunk });
    }
    console.log(`> Inseridos ${realizadosToInsert.length} realizados.`);

    console.log('Migração concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a migração ETL:', error);
  } finally {
    await legacyConn.end();
    await prisma.$disconnect();
  }
}

runETL();
