import { PrismaClient } from '@prisma/client';
import * as mysql from 'mysql2/promise';

const prisma = new PrismaClient();

async function main() {
  const empresaDefault = await prisma.empresa.findFirst({ where: { slug: 'empresa-padrao' } });
  if (!empresaDefault) {
    throw new Error('Empresa fallback não encontrada.');
  }

  const connection = await mysql.createConnection({
    host: process.env.LEGACY_DB_HOST || 'mysql',
    port: parseInt(process.env.LEGACY_DB_PORT || '3306'),
    user: process.env.LEGACY_DB_USER || 'root',
    password: process.env.LEGACY_DB_PASSWORD || 'Senha@1245',
    database: process.env.LEGACY_DB_NAME || 'bjsoft18_portal',
    dateStrings: true,
  });

  console.log('Conectado ao MySQL legacy!');

  const [rows] = await connection.execute('SELECT * FROM agendamento');
  const agendamentos = rows as any[];

  console.log(`Encontrados ${agendamentos.length} agendamentos. Importando...`);

  let count = 0;
  for (const item of agendamentos) {

    // Tratamento de datas com UTC Noon para evitar problemas de fuso no frontend
    const dataAgendaStr = item.data_agenda ? item.data_agenda.split(' ')[0] : '2020-01-01';
    const dataAgenda = new Date(`${dataAgendaStr}T12:00:00Z`);

    const parseDatetime = (dt: string) => {
      if (!dt) return new Date();
      return new Date(`${dt.replace(' ', 'T')}Z`);
    };

    const horarioInicial = parseDatetime(item.horario_inicial);
    const horarioFinal = parseDatetime(item.horario_final);

    const contratoId = item.contrato_id || null;

    // Forçar profissional ID 1 se for nulo, como existe apenas 1 profissional (Ricardo)
    const profissionalId = item.profissional_id || 1;

    let duracaoMinutos = 0;
    if (item.hora_total) {
      const parts = item.hora_total.split(':');
      duracaoMinutos = (parseInt(parts[0]) * 60) + parseInt(parts[1]);
    } else {
      duracaoMinutos = Math.round((horarioFinal.getTime() - horarioInicial.getTime()) / 60000);
    }

    await prisma.agendamento.upsert({
      where: { id: item.id },
      update: {
        empresaId: empresaDefault.id,
        contratoId,
        profissionalId,
        descricao: item.descricao,
        dataAgenda,
        horaInicio: String(item.hora_inicio || '00:00').substring(0, 5),
        horaFim: String(item.hora_fim || '00:00').substring(0, 5),
        horaIntervaloInicial: String(item.hora_intervalo_inicial || '00:00').substring(0, 5),
        horaIntervaloFinal: String(item.hora_intervalo_final || '00:00').substring(0, 5),
        duracaoMinutos,
        horarioInicial,
        horarioFinal,
        local: String(item.local || 'P').substring(0, 1),
        tipo: String(item.tipo || 'A').substring(0, 1),
        cor: String(item.cor || '#333333').substring(0, 7),
        observacao: item.observacao,
      },
      create: {
        id: item.id,
        empresaId: empresaDefault.id,
        contratoId,
        profissionalId,
        descricao: item.descricao,
        dataAgenda,
        horaInicio: String(item.hora_inicio || '00:00').substring(0, 5),
        horaFim: String(item.hora_fim || '00:00').substring(0, 5),
        horaIntervaloInicial: String(item.hora_intervalo_inicial || '00:00').substring(0, 5),
        horaIntervaloFinal: String(item.hora_intervalo_final || '00:00').substring(0, 5),
        duracaoMinutos,
        horarioInicial,
        horarioFinal,
        local: String(item.local || 'P').substring(0, 1),
        tipo: String(item.tipo || 'A').substring(0, 1),
        cor: String(item.cor || '#333333').substring(0, 7),
        observacao: item.observacao,
      }
    });
    count++;
  }

  console.log(`✅ Importados ${count} agendamentos com sucesso!`);

  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"agendamento"', 'id'), COALESCE((SELECT MAX(id) FROM "agendamento"), 0) + 1, false)`
  );

  await connection.end();
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
