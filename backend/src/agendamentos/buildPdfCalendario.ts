import PDFDocument from 'pdfkit';
import { calculateDuration } from './agendamentos.utils';

function formatTime(minutes: number): string {
  if (isNaN(minutes)) return '00:00';
  const isNegative = minutes < 0;
  const absMinutes = Math.abs(minutes);
  const h = Math.floor(absMinutes / 60);
  const m = Math.round(absMinutes % 60);
  const sign = isNegative ? '-' : '';
  return `${sign}${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function buildPdfCalendario(items: any[], filters: any, getHorasPrevistasContrato: any): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'portrait' });
    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    const formatCurrency = (val: number) => `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Group items
    const grouped: Record<string, Record<string, any[]>> = {};
    items.forEach(a => {
      const contrato = a.contrato?.descricao || 'Sem Cliente';
      const profissional = a.profissional?.nome || 'Sem Profissional';
      if (!grouped[contrato]) grouped[contrato] = {};
      if (!grouped[contrato][profissional]) grouped[contrato][profissional] = [];
      grouped[contrato][profissional].push(a);
    });

    for (const contratoName of Object.keys(grouped)) {
      for (const profissionalName of Object.keys(grouped[contratoName])) {
        const profItems = grouped[contratoName][profissionalName];
        if (profItems.length === 0) continue;

        profItems.sort((a, b) => {
          if (!a.dataAgenda || !b.dataAgenda) return 0;
          return new Date(a.dataAgenda).getTime() - new Date(b.dataAgenda).getTime();
        });

        // Medição (mês/ano) based on filters or first item
        let medicao = '';
        if (filters.dataInicial) {
          const d = new Date(filters.dataInicial);
          medicao = `${(d.getUTCMonth() + 1).toString().padStart(2, '0')}/${d.getUTCFullYear()}`;
        } else if (profItems[0].dataAgenda) {
          const d = new Date(profItems[0].dataAgenda);
          medicao = `${(d.getUTCMonth() + 1).toString().padStart(2, '0')}/${d.getUTCFullYear()}`;
        }

        // Calculate valor hora
        const primeiroContrato = profItems[0].contrato;
        let valorHora = Number(primeiroContrato?.valorHora || 0);
        let valorBase = 0;

        if (primeiroContrato?.tipo === 'F' && primeiroContrato?.valorFixo) {
          valorBase = Number(primeiroContrato.valorFixo);
          let totalMinutosBase = 0;
          profItems.forEach(item => {
            const d = item.duracaoMinutos || calculateDuration(item.horaInicio, item.horaFim, item.horaIntervaloInicial, item.horaIntervaloFinal);
            if (item.local !== 'E') totalMinutosBase += d; // Base includes Faltas and normal hours
          });
          const horasMes = totalMinutosBase / 60;
          if (horasMes > 0) {
            valorHora = valorBase / horasMes;
          }
        }

        if (doc.y > 600) doc.addPage();

        // Header do Profissional/Cliente
        doc.fontSize(10).font('Helvetica-Bold').fillColor('#000000');
        doc.text(`Cliente: `, 30, doc.y, { continued: true }).font('Helvetica').text(` ${contratoName}`);
        
        doc.font('Helvetica-Bold').text(`Analista: `, 30, doc.y, { continued: true }).font('Helvetica').text(` ${profissionalName}`);
        
        doc.font('Helvetica-Bold').text(`Medição: `, 30, doc.y, { continued: true }).font('Helvetica').text(` ${medicao}`);
        doc.moveDown(1);

        // Blocks of 6 columns
        const chunkSize = 6;
        for (let i = 0; i < profItems.length; i += chunkSize) {
          const chunk = profItems.slice(i, i + chunkSize);
          
          if (doc.y > 700) doc.addPage();

          let startY = doc.y;
          const colW = 80;
          const labelW = 55;
          let currentX = 30 + labelW;

          // Status row (Extra / Falta labels)
          doc.font('Helvetica').fontSize(10);
          chunk.forEach((item, idx) => {
            if (item.local === 'F') {
              doc.fillColor('#FF0000').text('Falta', currentX + idx * colW, startY, { width: colW, align: 'center' });
            } else if (item.local === 'E') {
              doc.fillColor('#0099FF').text('Extra', currentX + idx * colW, startY, { width: colW, align: 'center' });
            }
          });
          startY += 15;

          // Headers
          doc.fillColor('#000000').font('Helvetica-Bold');
          doc.text('Dia', 30, startY, { width: labelW });
          doc.text('Data', 30, startY + 15, { width: labelW });
          
          // Draw lines
          doc.moveTo(30, startY + 13).lineTo(560, startY + 13).stroke();
          doc.moveTo(30, startY + 28).lineTo(560, startY + 28).stroke();
          
          doc.font('Helvetica').fontSize(9);
          doc.text('Inicio', 30, startY + 30, { width: labelW });
          doc.text('Fim', 30, startY + 45, { width: labelW });
          doc.text('Outros', 30, startY + 60, { width: labelW });
          
          doc.font('Helvetica-Bold');
          doc.moveTo(30, startY + 73).lineTo(560, startY + 73).stroke();
          doc.text('Total', 30, startY + 75, { width: labelW });
          doc.moveTo(30, startY + 88).lineTo(560, startY + 88).stroke();

          // Data columns
          chunk.forEach((item, idx) => {
            const x = currentX + idx * colW;
            const dateObj = new Date(item.dataAgenda);
            const diaSemana = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' });
            const dataStr = dateObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            
            let textColor = '#000000';
            if (item.local === 'F') textColor = '#FF0000';
            else if (item.local === 'E') textColor = '#0099FF';

            doc.fillColor(textColor);
            
            doc.font('Helvetica-Bold');
            doc.text(diaSemana, x, startY, { width: colW, align: 'center' });
            doc.text(dataStr, x, startY + 15, { width: colW, align: 'center' });
            
            doc.font('Helvetica');
            doc.text(item.horaInicio || '00:00', x, startY + 30, { width: colW, align: 'center' });
            doc.text(item.horaFim || '00:00', x, startY + 45, { width: colW, align: 'center' });
            
            const outrosMin = calculateDuration(item.horaIntervaloInicial, item.horaIntervaloFinal, '00:00', '00:00');
            doc.text(formatTime(outrosMin), x, startY + 60, { width: colW, align: 'center' });
            
            const duracaoMin = item.duracaoMinutos || calculateDuration(item.horaInicio, item.horaFim, item.horaIntervaloInicial, item.horaIntervaloFinal);
            doc.font('Helvetica-Bold').text(formatTime(duracaoMin), x, startY + 75, { width: colW, align: 'center' });
          });
          
          doc.y = startY + 100;
        }

        // Totals Box
        if (doc.y > 650) doc.addPage();
        doc.moveDown(1);
        
        let minNormal = 0;
        let minExtra = 0;
        let minFalta = 0;

        profItems.forEach(item => {
          const d = item.duracaoMinutos || calculateDuration(item.horaInicio, item.horaFim, item.horaIntervaloInicial, item.horaIntervaloFinal);
          if (item.local === 'F') {
            minFalta += d;
            minNormal += d; // Faltas fazem parte da carga horária base (Horas Mês)
          } else if (item.local === 'E') {
            minExtra += d;
          } else {
            minNormal += d;
          }
        });

        const formatHoursClock = (hoursDec: number) => {
          const isNeg = hoursDec < 0;
          const absHours = Math.abs(hoursDec);
          const h = Math.floor(absHours);
          const m = Math.round((absHours - h) * 60);
          return `${isNeg ? '-' : ''}${h}:${m.toString().padStart(2, '0')}:00`;
        };

        const formatNumber = (val: number) => {
          return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        let adiantamentoLabel = '';
        let adiantamentoVal = 0;
        
        const primeiraLinha = profItems[0];
        if (primeiraLinha?.contrato?.adiantamentos?.length) {
          const dataExtrato = primeiraLinha.dataAgenda ? new Date(primeiraLinha.dataAgenda) : new Date();
          const extratoYear = dataExtrato.getFullYear();
          const extratoMonth = dataExtrato.getMonth();

          for (const adiantamento of primeiraLinha.contrato.adiantamentos) {
            const dtInicio = new Date(adiantamento.dataInicio);
            const iniYear = dtInicio.getFullYear();
            const iniMonth = dtInicio.getMonth();
            
            const monthsDiff = (extratoYear - iniYear) * 12 + (extratoMonth - iniMonth);
            const currentParcela = monthsDiff + 1; // 1-based index
            
            if (currentParcela >= 1 && currentParcela <= adiantamento.parcelas) {
              adiantamentoLabel = `Adi ${currentParcela}/${adiantamento.parcelas}`;
              adiantamentoVal = Number(adiantamento.valorParcela);
              break; 
            }
          }
        }

        const hrBase = minNormal / 60; // minNormal already includes Faltas in Calendario loop
        const hrExtra = minExtra / 60;
        const hrFalta = Math.abs(minFalta / 60);

        const valBase = valorBase || (hrBase * valorHora);
        const valExtra = hrExtra * valorHora;
        const valFalta = hrFalta * valorHora;
        const totalFinal = valBase + valExtra - valFalta - adiantamentoVal;

        const boxX = 350;
        let boxY = doc.y;

        // Cabeçalho Resumo
        doc.lineWidth(1).strokeColor('#000000');
        doc.moveTo(boxX, boxY).lineTo(boxX + 180, boxY).stroke();
        doc.fillColor('#000000').font('Helvetica-Bold');
        doc.text('Resumo', boxX + 5, boxY + 4, { width: 170, align: 'center' });
        boxY += 17;
        doc.moveTo(boxX, boxY).lineTo(boxX + 180, boxY).stroke();

        let zebraRow = 0;
        const drawRow = (lbl: string, val: string, lblColor: string, valColor: string) => {
          if (zebraRow % 2 === 0) {
            doc.rect(boxX, boxY, 180, 15).fill('#F0F0F0');
          }
          zebraRow++;
          
          doc.fillColor(lblColor).font('Helvetica-Bold');
          doc.text(lbl, boxX + 5, boxY + 4, { width: 85, align: 'left' });
          
          doc.fillColor(valColor).font('Helvetica');
          doc.text(val, boxX + 90, boxY + 4, { width: 85, align: 'right' });
          
          boxY += 15;
        };

        // Table Data
        drawRow('Horas Mês', formatHoursClock(hrBase), '#000000', '#000000');
        drawRow('Vlr Hora', formatNumber(valorHora), '#000000', '#000000');

        if (hrExtra > 0) {
          drawRow('Horas Ext', formatHoursClock(hrExtra), '#4285F4', '#4285F4'); // Blue
        }
        if (hrFalta > 0) {
          drawRow('Hrs Falta', formatHoursClock(hrFalta), '#EA4335', '#EA4335'); // Red
        }

        drawRow('Valor Base', formatNumber(valBase), '#000000', '#000000');
        
        if (valExtra > 0) {
          drawRow('Extras', formatNumber(valExtra), '#4285F4', '#4285F4');
        }
        if (valFalta > 0) {
          drawRow('Falta', formatNumber(valFalta), '#EA4335', '#EA4335');
        }
        if (adiantamentoVal > 0) {
          drawRow(adiantamentoLabel || 'Adiantamento', formatNumber(adiantamentoVal), '#EA4335', '#EA4335');
        }
        drawRow('Valor Total', formatNumber(totalFinal), '#000000', '#000000');
        
        // Linha final inferior
        doc.moveTo(boxX, boxY).lineTo(boxX + 180, boxY).stroke();

        doc.y = boxY + 30;
      }
    }

    doc.end();
  });
}
