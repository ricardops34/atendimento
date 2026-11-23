import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

export interface ExtratoBancoHoras {
  contrato?: string;
  profissional?: string;
  dataInicial: string | null;
  dataFinal: string | null;
  valorHora: number;
  saldoAnterior: number;
  totalCreditos: number;
  totalDebitos: number;
  saldoFinal: number;
  valorSaldoAnterior: number;
  valorTotalCreditos: number;
  valorTotalDebitos: number;
  valorSaldoFinal: number;
  movimentos: Array<{
    data: Date | string;
    tipo: string;
    descricao?: string | null;
    credito: number;
    debito: number;
    saldo: number;
    valorCredito: number;
    valorDebito: number;
    valorSaldo: number;
  }>;
}

const formatHoras = (v: number) => {
  const neg = v < 0;
  const abs = Math.abs(v);
  let h = Math.floor(abs);
  let m = Math.round((abs - h) * 60);
  if (m === 60) {
    h += 1;
    m = 0;
  }
  return `${neg ? '-' : ''}${h}:${String(m).padStart(2, '0')}`;
};

const formatValor = (v: number) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const toDate = (d: Date | string | null | undefined): Date | null => {
  if (!d) return null;
  const date = typeof d === 'string' && d.length === 10 ? new Date(`${d}T00:00:00.000Z`) : new Date(d);
  return isNaN(date.getTime()) ? null : date;
};

const formatData = (d: Date | string | null | undefined) =>
  toDate(d)?.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) ?? '';

const descricaoPadrao = (m: { tipo: string; descricao?: string | null }) =>
  m.descricao || (m.tipo === 'CREDITO' ? 'Crédito de horas' : 'Débito de horas');

const descricaoPeriodo = (ext: ExtratoBancoHoras) =>
  ext.dataInicial || ext.dataFinal
    ? `${formatData(ext.dataInicial) || 'início'} a ${formatData(ext.dataFinal) || 'hoje'}`
    : 'Todo o histórico';

const AZUL = '#1a73e8';
const VERMELHO = '#d93025';

/**
 * PDF do extrato do banco de horas: saldo anterior, créditos, débitos e saldo acumulado.
 * Com ocultarValor, nenhum valor financeiro (nem valor/hora, nem totais) é impresso.
 */
export function buildPdfExtratoBancoHoras(ext: ExtratoBancoHoras, ocultarValor = false): Promise<Buffer> {
  return new Promise((resolve) => {
    const comValor = !ocultarValor;
    const doc = new PDFDocument({ margin: 30, size: 'A4', layout: comValor ? 'landscape' : 'portrait' });
    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    const startX = 30;
    const pageBottom = doc.page.height - 50;

    type Col = { label: string; width: number; align: 'left' | 'right'; color?: string };
    const cols: Col[] = [
      { label: 'Data', width: 65, align: 'left' },
      { label: 'Descrição', width: comValor ? 290 : 260, align: 'left' },
      { label: 'Crédito (h)', width: 70, align: 'right', color: AZUL },
      { label: 'Débito (h)', width: 70, align: 'right', color: VERMELHO },
      { label: 'Saldo (h)', width: 70, align: 'right' },
    ];
    if (comValor) {
      cols.push(
        { label: 'Crédito (R$)', width: 70, align: 'right', color: AZUL },
        { label: 'Débito (R$)', width: 70, align: 'right', color: VERMELHO },
        { label: 'Saldo (R$)', width: 75, align: 'right' },
      );
    }
    const width = cols.reduce((a, c) => a + c.width, 0) + 10;
    const colX = cols.map((_, i) => startX + 5 + cols.slice(0, i).reduce((a, c) => a + c.width, 0));

    doc.fontSize(16).font('Helvetica-Bold').fillColor('#000000').text('Extrato de Banco de Horas', { align: 'center' });
    doc.moveDown(0.8);

    const info = (lbl: string, val: string) => {
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#000000').text(`${lbl}: `, startX, doc.y, { continued: true });
      doc.font('Helvetica').text(val);
    };
    info('Contrato', ext.contrato || '-');
    info('Profissional', ext.profissional || '-');
    info('Período', descricaoPeriodo(ext));
    if (comValor) info('Valor Hora', `R$ ${formatValor(ext.valorHora)}`);
    doc.moveDown(1);

    const drawHeader = () => {
      const y = doc.y;
      doc.rect(startX, y, width, 16).fill('#e0e0e0');
      doc.fillColor('#000000').font('Helvetica-Bold').fontSize(9);
      cols.forEach((c, i) => doc.text(c.label, colX[i], y + 4, { width: c.width - 5, align: c.align }));
      doc.y = y + 16;
    };

    // vals na mesma ordem de cols; neg = índices que devem sair em vermelho (saldo negativo)
    const drawLine = (vals: string[], opts: { bold?: boolean; fill?: string; neg?: number[] } = {}) => {
      const font = opts.bold ? 'Helvetica-Bold' : 'Helvetica';
      doc.font(font).fontSize(9);
      const h = Math.max(15, doc.heightOfString(vals[1] || ' ', { width: cols[1].width - 5 }) + 6);
      if (doc.y + h > pageBottom) {
        doc.addPage();
        drawHeader();
        doc.font(font).fontSize(9);
      }
      const y = doc.y;
      if (opts.fill) doc.rect(startX, y, width, h).fill(opts.fill);
      cols.forEach((c, i) => {
        const color = opts.neg?.includes(i) ? VERMELHO : c.color || '#333333';
        doc.fillColor(color).text(vals[i] ?? '', colX[i], y + 3, { width: c.width - 5, align: c.align });
      });
      doc.y = y + h;
    };

    const negIdx = (saldoH: number, saldoV: number) => [
      ...(saldoH < 0 ? [4] : []),
      ...(comValor && saldoV < 0 ? [7] : []),
    ];

    const linha = (base: string[], valores: string[]) => (comValor ? [...base, ...valores] : base);

    drawHeader();
    drawLine(
      linha(['', 'Saldo anterior', '', '', formatHoras(ext.saldoAnterior)], ['', '', formatValor(ext.valorSaldoAnterior)]),
      { bold: true, fill: '#f5f5f5', neg: negIdx(ext.saldoAnterior, ext.valorSaldoAnterior) },
    );

    let zebra = false;
    for (const m of ext.movimentos) {
      drawLine(
        linha(
          [
            formatData(m.data),
            descricaoPadrao(m),
            m.credito ? formatHoras(m.credito) : '',
            m.debito ? formatHoras(m.debito) : '',
            formatHoras(m.saldo),
          ],
          [m.credito ? formatValor(m.valorCredito) : '', m.debito ? formatValor(m.valorDebito) : '', formatValor(m.valorSaldo)],
        ),
        { fill: zebra ? '#fafafa' : undefined, neg: negIdx(m.saldo, m.valorSaldo) },
      );
      zebra = !zebra;
    }

    if (!ext.movimentos.length) {
      drawLine(['', 'Nenhuma movimentação no período.']);
    }

    doc.moveTo(startX, doc.y).lineTo(startX + width, doc.y).strokeColor('#000000').lineWidth(1).stroke();
    drawLine(
      linha(
        ['', 'Totais do período', formatHoras(ext.totalCreditos), formatHoras(ext.totalDebitos), formatHoras(ext.saldoFinal)],
        [formatValor(ext.valorTotalCreditos), formatValor(ext.valorTotalDebitos), formatValor(ext.valorSaldoFinal)],
      ),
      { bold: true, neg: negIdx(ext.saldoFinal, ext.valorSaldoFinal) },
    );

    // Quadro de fechamento
    const boxW = comValor ? 300 : 220;
    const boxX = startX + width - boxW;
    if (doc.y + 100 > pageBottom) doc.addPage();
    doc.moveDown(1.5);
    let y = doc.y;
    doc.lineWidth(1).strokeColor('#000000');
    doc.moveTo(boxX, y).lineTo(boxX + boxW, y).stroke();
    doc.fillColor('#000000').font('Helvetica-Bold').fontSize(9);
    doc.text('Fechamento', boxX + 5, y + 4, { width: boxW - 10, align: 'center' });
    y += 17;
    doc.moveTo(boxX, y).lineTo(boxX + boxW, y).stroke();

    const rows: Array<[string, number, number, string]> = [
      ['Saldo anterior', ext.saldoAnterior, ext.valorSaldoAnterior, '#000000'],
      ['(+) Créditos', ext.totalCreditos, ext.valorTotalCreditos, AZUL],
      ['(-) Débitos', ext.totalDebitos, ext.valorTotalDebitos, VERMELHO],
      ['(=) Saldo final', ext.saldoFinal, ext.valorSaldoFinal, ext.saldoFinal < 0 ? VERMELHO : '#000000'],
    ];
    const lblW = 110;
    const valW = comValor ? (boxW - lblW - 10) / 2 : boxW - lblW - 10;
    rows.forEach(([lbl, horas, valor, color], i) => {
      if (i % 2 === 0) doc.rect(boxX, y, boxW, 15).fill('#F0F0F0');
      const last = i === rows.length - 1;
      doc.fillColor(color).font('Helvetica-Bold').text(lbl, boxX + 5, y + 4, { width: lblW });
      doc.font(last ? 'Helvetica-Bold' : 'Helvetica');
      doc.text(`${formatHoras(horas)} h`, boxX + 5 + lblW, y + 4, { width: valW, align: 'right' });
      if (comValor) {
        doc.text(`R$ ${formatValor(valor)}`, boxX + 5 + lblW + valW, y + 4, { width: valW, align: 'right' });
      }
      y += 15;
    });
    doc.moveTo(boxX, y).lineTo(boxX + boxW, y).stroke();

    doc.end();
  });
}

/** Planilha do extrato do banco de horas (horas em decimal; valores omitidos com ocultarValor). */
export async function buildXlsxExtratoBancoHoras(ext: ExtratoBancoHoras, ocultarValor = false): Promise<Buffer> {
  const comValor = !ocultarValor;
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Extrato Banco de Horas');

  sheet.addRow(['Extrato de Banco de Horas']).font = { bold: true, size: 14 };
  sheet.addRow(['Contrato', ext.contrato || '-']);
  sheet.addRow(['Profissional', ext.profissional || '-']);
  sheet.addRow(['Período', descricaoPeriodo(ext)]);
  if (comValor) sheet.addRow(['Valor Hora (R$)', ext.valorHora]);
  sheet.addRow([]);

  const header = ['Data', 'Descrição', 'Crédito (h)', 'Débito (h)', 'Saldo (h)'];
  if (comValor) header.push('Crédito (R$)', 'Débito (R$)', 'Saldo (R$)');
  const headerRow = sheet.addRow(header);
  headerRow.font = { bold: true };
  headerRow.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0E0E0' } };
  });

  const linha = (base: any[], valores: any[]) => (comValor ? [...base, ...valores] : base);

  sheet.addRow(linha([null, 'Saldo anterior', null, null, ext.saldoAnterior], [null, null, ext.valorSaldoAnterior])).font = {
    bold: true,
  };

  for (const m of ext.movimentos) {
    const row = sheet.addRow(
      linha(
        [toDate(m.data), descricaoPadrao(m), m.credito || null, m.debito || null, m.saldo],
        [m.credito ? m.valorCredito : null, m.debito ? m.valorDebito : null, m.valorSaldo],
      ),
    );
    row.getCell(3).font = { color: { argb: 'FF1A73E8' } };
    row.getCell(4).font = { color: { argb: 'FFD93025' } };
    if (comValor) {
      row.getCell(6).font = { color: { argb: 'FF1A73E8' } };
      row.getCell(7).font = { color: { argb: 'FFD93025' } };
    }
  }

  sheet.addRow(
    linha(
      [null, 'Totais do período', ext.totalCreditos, ext.totalDebitos, ext.saldoFinal],
      [ext.valorTotalCreditos, ext.valorTotalDebitos, ext.valorSaldoFinal],
    ),
  ).font = { bold: true };

  sheet.addRow([]);
  sheet.addRow(comValor ? ['Fechamento', '', 'Horas', 'Valor (R$)'] : ['Fechamento', '', 'Horas']).font = { bold: true };
  const fechamento: Array<[string, number, number]> = [
    ['Saldo anterior', ext.saldoAnterior, ext.valorSaldoAnterior],
    ['(+) Créditos', ext.totalCreditos, ext.valorTotalCreditos],
    ['(-) Débitos', ext.totalDebitos, ext.valorTotalDebitos],
    ['(=) Saldo final', ext.saldoFinal, ext.valorSaldoFinal],
  ];
  fechamento.forEach(([lbl, h, v], i) => {
    const row = sheet.addRow(comValor ? [lbl, '', h, v] : [lbl, '', h]);
    if (i === fechamento.length - 1) row.font = { bold: true };
  });

  sheet.getColumn(1).width = 14;
  sheet.getColumn(1).numFmt = 'dd/mm/yyyy';
  sheet.getColumn(2).width = 45;
  for (let c = 3; c <= (comValor ? 8 : 5); c++) {
    sheet.getColumn(c).width = 14;
    sheet.getColumn(c).numFmt = '#,##0.00';
  }

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}
