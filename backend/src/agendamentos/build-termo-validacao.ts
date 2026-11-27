import PDFDocument from 'pdfkit';

export interface TermoValidacaoItem {
  data: string;
  tempo: string;
  observacao: string;
}

export interface TermoValidacaoDto {
  clienteNome: string;
  codigoCliente?: string | null;
  nomeProjeto?: string | null;
  codigoProjeto?: string | null;
  segmento?: string | null;
  unidadeTotvs?: string | null;
  profissionalNome?: string | null;
  coordenadorTotvs?: string | null;
  coordenadorCliente?: string | null;
  // Responsável (usuário chave do cliente) por validar a atividade do Analista neste contrato.
  responsavelValidacao?: string | null;
  dataGeracao: Date;
  itens: TermoValidacaoItem[];
}

const CYAN = '#00C9EB';
const CINZA_TITULO = '#363636';
const ROXO_BORDA = '#A44DFF';
const CINZA_HEADER = '#F2F2F2';
const PRETO = '#002233';

interface Col {
  label: string;
  width: number;
}

/**
 * PDF do Termo de Validação (formato TOTVS): segue o layout do modelo oficial —
 * grid "Ambientação", tabela "Termo de Validação de Entrega / Marco" (um atendimento por linha),
 * "Próximos Passos" e "Aceite".
 */
export function buildPdfTermoValidacao(dto: TermoValidacaoDto): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 40, size: 'A4', layout: 'portrait' });
    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    const startX = 40;
    const pageWidth = doc.page.width - startX * 2;
    const pageBottom = doc.page.height - 50;

    let pageNumber = 1;

    const drawPageHeader = () => {
      doc.fontSize(20).font('Helvetica-Bold')
        .fillColor(CINZA_TITULO).text('TERMO DE ', startX, 40, { continued: true })
        .fillColor(CYAN).text('VALIDAÇÃO');
      doc.fontSize(9).fillColor('#999999').font('Helvetica')
        .text(String(pageNumber), startX, 40, { width: pageWidth, align: 'right' });
      doc.y = 75;
    };

    const ensureSpace = (height: number) => {
      if (doc.y + height > pageBottom) {
        doc.addPage();
        pageNumber += 1;
        drawPageHeader();
      }
    };

    const sectionTitle = (text: string, arrow = false) => {
      ensureSpace(24);
      const y0 = doc.y;
      let textX = startX;

      if (arrow) {
        const ay = y0 + 7;
        doc.save();
        doc.strokeColor(CYAN).lineWidth(1.5);
        doc.moveTo(startX, ay).lineTo(startX + 10, ay).stroke();
        doc.fillColor(CYAN);
        doc.moveTo(startX + 10, ay - 3).lineTo(startX + 15, ay).lineTo(startX + 10, ay + 3).fill();
        doc.restore();
        textX = startX + 20;
      }

      doc.fontSize(13).fillColor(CYAN).font('Helvetica-Bold').text(text, textX, y0);
      doc.moveDown(0.4);
    };

    // ---------- Ambientação (grid 2 colunas, como no modelo) ----------
    const drawAmbientacaoRow = (
      leftLabel: string,
      leftVal: string,
      rightLabel: string | null,
      rightVal: string | null,
    ) => {
      const colW = pageWidth / 2;
      const padW = colW - 12;
      doc.font('Helvetica-Bold').fontSize(9);
      const leftText = `${leftLabel}: ${leftVal || '-'}`;
      const rightText = rightLabel ? `${rightLabel}: ${rightVal || '-'}` : '';
      const leftH = doc.heightOfString(leftText, { width: rightLabel ? padW : pageWidth - 12 });
      const rightH = rightLabel ? doc.heightOfString(rightText, { width: padW }) : 0;
      const rowHeight = Math.max(leftH, rightH) + 12;

      ensureSpace(rowHeight);
      const y0 = doc.y;
      doc.rect(startX, y0, pageWidth, rowHeight).strokeColor(ROXO_BORDA).lineWidth(1).stroke();
      if (rightLabel) {
        doc.moveTo(startX + colW, y0).lineTo(startX + colW, y0 + rowHeight).strokeColor(ROXO_BORDA).stroke();
      }

      doc.font('Helvetica-Bold').fontSize(9).fillColor(PRETO);
      doc.text(`${leftLabel}: `, startX + 6, y0 + 6, { continued: true, width: rightLabel ? padW : pageWidth - 12 });
      doc.font('Helvetica').text(leftVal || '-');

      if (rightLabel) {
        doc.font('Helvetica-Bold').text(`${rightLabel}: `, startX + colW + 6, y0 + 6, { continued: true, width: padW });
        doc.font('Helvetica').text(rightVal || '-');
      }

      doc.y = y0 + rowHeight;
    };

    // "Data" do Termo é a data do último atendimento lançado no período, não a data de geração do PDF.
    const ultimoApontamento = dto.itens.length
      ? dto.itens[dto.itens.length - 1].data
      : dto.dataGeracao.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    drawPageHeader();
    sectionTitle('Ambientação');
    drawAmbientacaoRow('Nome do cliente', dto.clienteNome, 'Código de cliente', dto.codigoCliente || '');
    drawAmbientacaoRow('Nome do projeto', dto.nomeProjeto || '', 'Código do projeto', dto.codigoProjeto || '');
    drawAmbientacaoRow('Segmento cliente', dto.segmento || '', 'Unidade TOTVS', dto.unidadeTotvs || '');
    drawAmbientacaoRow('Data', ultimoApontamento, 'Analista de Serviços', dto.profissionalNome || '');
    drawAmbientacaoRow('Gerente/Coordenador TOTVS', dto.coordenadorTotvs || '', null, null);
    drawAmbientacaoRow('Gerente/Coordenador cliente', dto.coordenadorCliente || '', null, null);

    doc.moveDown(1);

    // ---------- Termo de Validação de Entrega / Marco ----------
    sectionTitle('Termo de Validação de Entrega / Marco', true);
    const nomeMarco = dto.nomeProjeto || dto.clienteNome;
    doc.fontSize(9).font('Helvetica').fillColor('#333333')
      .text('Informo que foram concluídas as atividades que compõem o marco ', startX, doc.y, { continued: true, width: pageWidth })
      .font('Helvetica-Oblique').text(nomeMarco, { continued: true })
      .font('Helvetica').text(' estando o usuário de acordo com os processos abaixo relacionados. Sendo assim, declaro validados e aceitos os processos.');
    doc.moveDown(0.8);

    const itemCols: Col[] = [
      { label: 'Nome do Processo', width: pageWidth * 0.4 },
      { label: 'Data de Validação', width: pageWidth * 0.16 },
      { label: 'Nome / Assinatura do Usuário Chave', width: pageWidth * 0.22 },
      { label: 'Nome / Assinatura do Analista de Serviços Totvs', width: pageWidth * 0.22 },
    ];

    const drawGridHeader = (cols: Col[]) => {
      const headerHeight = 28;
      ensureSpace(headerHeight);
      const y0 = doc.y;
      doc.rect(startX, y0, pageWidth, headerHeight).fillAndStroke(CINZA_HEADER, ROXO_BORDA);
      doc.fillColor(PRETO).font('Helvetica-Bold').fontSize(8);
      let colX = startX;
      cols.forEach((c) => {
        doc.text(c.label, colX + 4, y0 + 7, { width: c.width - 8 });
        if (colX > startX) {
          doc.moveTo(colX, y0).lineTo(colX, y0 + headerHeight).strokeColor(ROXO_BORDA).stroke();
        }
        colX += c.width;
      });
      doc.y = y0 + headerHeight;
    };

    const drawItemRow = (item: TermoValidacaoItem) => {
      const col0Width = itemCols[0].width - 8;
      doc.font('Helvetica-Bold').fontSize(9);
      const headerLineH = doc.heightOfString(`Data: ${item.data}    Tempo: ${item.tempo}`, { width: col0Width });
      doc.font('Helvetica').fontSize(9);
      const obsH = doc.heightOfString(item.observacao || '-', { width: col0Width });
      const rowHeight = headerLineH + 14 + obsH + 16;

      ensureSpace(rowHeight);
      const y0 = doc.y;
      doc.rect(startX, y0, pageWidth, rowHeight).strokeColor(ROXO_BORDA).lineWidth(1).stroke();
      let colX = startX;
      itemCols.forEach((c, idx) => {
        if (idx > 0) {
          doc.moveTo(colX, y0).lineTo(colX, y0 + rowHeight).strokeColor(ROXO_BORDA).stroke();
        }
        colX += c.width;
      });

      doc.font('Helvetica-Bold').fontSize(9).fillColor(PRETO)
        .text(`Data: ${item.data}    Tempo: ${item.tempo}`, startX + 4, y0 + 6, { width: col0Width });
      doc.font('Helvetica-Bold').text('Observação:', startX + 4, doc.y + 2, { width: col0Width });
      doc.font('Helvetica').fillColor('#333333').text(item.observacao || '-', startX + 4, doc.y + 2, { width: col0Width });

      const col1X = startX + itemCols[0].width;
      const col2X = col1X + itemCols[1].width;
      const col3X = col2X + itemCols[2].width;
      doc.font('Helvetica').fontSize(9).fillColor(PRETO)
        .text(item.data, col1X + 4, y0 + 6, { width: itemCols[1].width - 8 });
      doc.text(dto.responsavelValidacao || '', col2X + 4, y0 + 6, { width: itemCols[2].width - 8 });
      doc.text(dto.profissionalNome || '', col3X + 4, y0 + 6, { width: itemCols[3].width - 8 });

      doc.y = y0 + rowHeight;
    };

    drawGridHeader(itemCols);
    if (!dto.itens.length) {
      ensureSpace(24);
      doc.font('Helvetica').fontSize(9).fillColor('#666666').text('Nenhum atendimento encontrado no período.', startX, doc.y);
      doc.moveDown(1);
    } else {
      dto.itens.forEach((item) => drawItemRow(item));
    }

    doc.moveDown(1);

    // ---------- Próximos Passos ----------
    sectionTitle('Próximos Passos');
    const proximosCols: Col[] = [
      { label: 'Responsável', width: pageWidth * 0.25 },
      { label: 'Próximos Passos', width: pageWidth * 0.55 },
      { label: 'Prazos', width: pageWidth * 0.2 },
    ];
    drawGridHeader(proximosCols);
    for (let i = 0; i < 3; i += 1) {
      ensureSpace(20);
      const y0 = doc.y;
      doc.rect(startX, y0, pageWidth, 20).strokeColor(ROXO_BORDA).lineWidth(1).stroke();
      let colX = startX;
      proximosCols.forEach((c, idx) => {
        if (idx > 0) {
          doc.moveTo(colX, y0).lineTo(colX, y0 + 20).strokeColor(ROXO_BORDA).stroke();
        }
        colX += c.width;
      });
      doc.y = y0 + 20;
    }

    // ---------- Aceite ----------
    doc.moveDown(1.5);
    sectionTitle('Aceite');
    const aceiteCols: Col[] = [
      { label: 'Aprovado por', width: pageWidth * 0.45 },
      { label: 'Assinatura', width: pageWidth * 0.35 },
      { label: 'Data', width: pageWidth * 0.2 },
    ];
    drawGridHeader(aceiteCols);
    ensureSpace(30);
    const y0 = doc.y;
    doc.rect(startX, y0, pageWidth, 30).strokeColor(ROXO_BORDA).lineWidth(1).stroke();
    let colX = startX;
    aceiteCols.forEach((c, idx) => {
      if (idx > 0) {
        doc.moveTo(colX, y0).lineTo(colX, y0 + 30).strokeColor(ROXO_BORDA).stroke();
      }
      colX += c.width;
    });

    doc.font('Helvetica').fontSize(9).fillColor(PRETO)
      .text(dto.coordenadorCliente || '', startX + 4, y0 + 8, { width: aceiteCols[0].width - 8 });
    doc.text(ultimoApontamento, startX + aceiteCols[0].width + aceiteCols[1].width + 4, y0 + 8, { width: aceiteCols[2].width - 8 });
    doc.y = y0 + 30;

    doc.end();
  });
}
