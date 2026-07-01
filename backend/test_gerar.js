const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function composeDateTime(dateStr, timeStr) {
  const dateObj = new Date(dateStr);
  const [hours, minutes] = (timeStr || '00:00').split(':').map(Number);
  dateObj.setUTCHours(hours || 0, minutes || 0, 0, 0);
  return dateObj;
}

function parseDurationToMinutes(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(':');
  if (parts.length !== 2) return 0;
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

function calculateDuration(start, end, intStart, intEnd) {
  const startMins = parseDurationToMinutes(start);
  let endMins = parseDurationToMinutes(end);
  if (endMins === 0 && startMins > 0) endMins = 24 * 60;
  const intStartMins = parseDurationToMinutes(intStart);
  let intEndMins = parseDurationToMinutes(intEnd);
  if (intEndMins === 0 && intStartMins > 0) intEndMins = 24 * 60;
  const total = endMins - startMins;
  const interval = intEndMins - intStartMins;
  return Math.max(0, total - Math.max(0, interval));
}

async function main() {
  const mes = 7;
  const ano = 2026;
  const empresaId = 1;
  const contratoId = undefined;
  const profissionalId = undefined;

  try {
    const dataInicio = new Date(ano, mes - 1, 1);
    const dataFim = new Date(ano, mes, 0, 23, 59, 59, 999);
    
    const whereContrato = { empresaId };
    if (contratoId) whereContrato.id = contratoId;

    const contratos = await prisma.contrato.findMany({
      where: whereContrato,
      include: { escalas: true }
    });

    console.log(`Contratos encontrados: ${contratos.length}`);

    const agendamentosExistentes = await prisma.agendamento.findMany({
      where: {
        empresaId,
        dataAgenda: { gte: dataInicio, lte: dataFim },
      },
      select: { dataAgenda: true, contratoId: true, profissionalId: true }
    });

    console.log(`Agendamentos existentes: ${agendamentosExistentes.length}`);

    const formatToYMD = (d) => {
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    };
    const formatUTCToYMD = (d) => {
      return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
    };

    const setExistentes = new Set(
      agendamentosExistentes.map(a => `${formatUTCToYMD(new Date(a.dataAgenda))}_${a.contratoId}_${a.profissionalId}`)
    );

    const novosAgendamentos = [];

    for (const contrato of contratos) {
      if (!contrato.escalas || contrato.escalas.length === 0) continue;

      for (let d = new Date(dataInicio); d <= dataFim; d.setDate(d.getDate() + 1)) {
        const diaSemana = d.getDay();
        const escalasDia = contrato.escalas.filter((e) => {
          if (e.diaSemana !== diaSemana) return false;
          if (profissionalId && e.profissionalId !== profissionalId) return false;
          return true;
        });
        
        for (const escala of escalasDia) {
          const dateStr = formatToYMD(d);
          const key = `${dateStr}_${contrato.id}_${escala.profissionalId}`;
          
          if (!setExistentes.has(key)) {
            const dataAgenda = new Date(d);
            const horarioInicial = composeDateTime(dataAgenda, escala.horaInicio);
            const horarioFinal = composeDateTime(dataAgenda, escala.horaFim);
            const duracaoMinutos = calculateDuration(escala.horaInicio, escala.horaFim, escala.intervaloIni, escala.intervaloFim);

            novosAgendamentos.push({
              empresaId: empresaId || 1,
              contratoId: contrato.id,
              profissionalId: escala.profissionalId,
              descricao: contrato.descricao,
              dataAgenda,
              horaInicio: escala.horaInicio,
              horaFim: escala.horaFim,
              horaIntervaloInicial: escala.intervaloIni,
              horaIntervaloFinal: escala.intervaloFim,
              duracaoMinutos,
              horarioInicial,
              horarioFinal,
              local: 'P',
              tipo: 'A',
              cor: contrato.cor || '#333333',
              observacao: 'Gerado automaticamente pela rotina mensal'
            });
            
            setExistentes.add(key);
          }
        }
      }
    }

    console.log(`Novos agendamentos para criar: ${novosAgendamentos.length}`);
    if (novosAgendamentos.length > 0) {
      console.log('Primeiro registro:', novosAgendamentos[0]);
    }
    
    await prisma.agendamento.createMany({ data: novosAgendamentos });
    console.log('Finalizado com sucesso');

  } catch (error) {
    console.error('ERRO DETECTADO:');
    console.error(error);
  }
}

main().catch(console.error);
