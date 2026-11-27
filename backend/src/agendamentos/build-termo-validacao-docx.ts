import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
} from 'docx';
import { TermoValidacaoDto } from './build-termo-validacao';

const CYAN = '00C9EB';
const CINZA_TITULO = '363636';
const ROXO_BORDA = 'A44DFF';
const CINZA_HEADER = 'F2F2F2';
const PRETO = '002233';

const cellBorders = () => ({
  top: { style: BorderStyle.SINGLE, size: 4, color: ROXO_BORDA },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: ROXO_BORDA },
  left: { style: BorderStyle.SINGLE, size: 4, color: ROXO_BORDA },
  right: { style: BorderStyle.SINGLE, size: 4, color: ROXO_BORDA },
});

const cellMargins = { top: 80, bottom: 80, left: 100, right: 100 };

function labelValueCell(label: string, value: string, widthPercent: number, columnSpan?: number) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    ...(columnSpan ? { columnSpan } : {}),
    borders: cellBorders(),
    margins: cellMargins,
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: `${label}: `, bold: true, color: PRETO, size: 18 }),
          new TextRun({ text: value || '-', color: PRETO, size: 18 }),
        ],
      }),
    ],
  });
}

function ambientacaoRow(leftLabel: string, leftVal: string, rightLabel?: string | null, rightVal?: string | null) {
  // A tabela tem 2 colunas de grid (definidas pela 1ª linha, 50/50). Uma linha com uma única
  // célula precisa declarar columnSpan: 2 explicitamente, senão o Word deixa uma coluna vazia
  // e sem borda à direita (bug visto nos testes: "caixa fantasma" ao lado de linhas solteiras).
  const cells = [labelValueCell(leftLabel, leftVal, rightLabel ? 50 : 100, rightLabel ? undefined : 2)];
  if (rightLabel) cells.push(labelValueCell(rightLabel, rightVal || '', 50));
  return new TableRow({ children: cells });
}

function headerCell(text: string, widthPercent: number) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    borders: cellBorders(),
    shading: { fill: CINZA_HEADER },
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 16, color: PRETO })] })],
  });
}

function textCell(text: string, widthPercent: number) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    borders: cellBorders(),
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text: text || '', size: 18, color: PRETO })] })],
  });
}

/**
 * DOCX do Termo de Validação, espelhando o layout do PDF gerado por build-termo-validacao.ts
 * (mesmo DTO, mesmos dados — inclusive a data do último atendimento no campo "Data").
 */
export async function buildDocxTermoValidacao(dto: TermoValidacaoDto): Promise<Buffer> {
  const ultimoApontamento = dto.itens.length
    ? dto.itens[dto.itens.length - 1].data
    : dto.dataGeracao.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

  const nomeMarco = dto.nomeProjeto || dto.clienteNome;

  const ambientacaoTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      ambientacaoRow('Nome do cliente', dto.clienteNome, 'Código de cliente', dto.codigoCliente),
      ambientacaoRow('Nome do projeto', dto.nomeProjeto || '', 'Código do projeto', dto.codigoProjeto),
      ambientacaoRow('Segmento cliente', dto.segmento || '', 'Unidade TOTVS', dto.unidadeTotvs),
      ambientacaoRow('Data', ultimoApontamento, 'Analista de Serviços', dto.profissionalNome),
      ambientacaoRow('Gerente/Coordenador TOTVS', dto.coordenadorTotvs || ''),
      ambientacaoRow('Gerente/Coordenador cliente', dto.coordenadorCliente || ''),
    ],
  });

  const itemHeaderRow = new TableRow({
    children: [
      headerCell('Nome do Processo', 40),
      headerCell('Data de Validação', 16),
      headerCell('Nome / Assinatura do Usuário Chave', 22),
      headerCell('Nome / Assinatura do Analista de Serviços Totvs', 22),
    ],
  });

  const itemRows = dto.itens.length
    ? dto.itens.map(
        (item) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: 40, type: WidthType.PERCENTAGE },
                borders: cellBorders(),
                margins: cellMargins,
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: `Data: ${item.data}    Tempo: ${item.tempo}`, bold: true, size: 18, color: PRETO }),
                    ],
                  }),
                  new Paragraph({ children: [new TextRun({ text: 'Observação:', bold: true, size: 18, color: PRETO })] }),
                  new Paragraph({ children: [new TextRun({ text: item.observacao || '-', size: 18, color: '333333' })] }),
                ],
              }),
              textCell(item.data, 16),
              textCell(dto.responsavelValidacao || '', 22),
              textCell(dto.profissionalNome || '', 22),
            ],
          }),
      )
    : [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 100, type: WidthType.PERCENTAGE },
              columnSpan: 4,
              borders: cellBorders(),
              margins: cellMargins,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: 'Nenhum atendimento encontrado no período.', italics: true, color: '666666', size: 18 })],
                }),
              ],
            }),
          ],
        }),
      ];

  const itemTable = new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [itemHeaderRow, ...itemRows] });

  const proximosHeaderRow = new TableRow({
    children: [headerCell('Responsável', 25), headerCell('Próximos Passos', 55), headerCell('Prazos', 20)],
  });
  const proximosEmptyRows = Array.from(
    { length: 3 },
    () => new TableRow({ children: [textCell('', 25), textCell('', 55), textCell('', 20)] }),
  );
  const proximosTable = new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [proximosHeaderRow, ...proximosEmptyRows] });

  const aceiteHeaderRow = new TableRow({
    children: [headerCell('Aprovado por', 45), headerCell('Assinatura', 35), headerCell('Data', 20)],
  });
  const aceiteRow = new TableRow({
    children: [textCell(dto.coordenadorCliente || '', 45), textCell('', 35), textCell(ultimoApontamento, 20)],
  });
  const aceiteTable = new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [aceiteHeaderRow, aceiteRow] });

  const sectionTitle = (text: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 150 },
      children: [new TextRun({ text, bold: true, color: CYAN, size: 26 })],
    });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: 'TERMO DE ', bold: true, color: CINZA_TITULO, size: 40 }),
              new TextRun({ text: 'VALIDAÇÃO', bold: true, color: CYAN, size: 40 }),
            ],
          }),
          sectionTitle('Ambientação'),
          ambientacaoTable,
          new Paragraph({ spacing: { before: 200, after: 150 }, children: [] }),
          sectionTitle('Termo de Validação de Entrega / Marco'),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({ text: 'Informo que foram concluídas as atividades que compõem o marco ', color: '333333', size: 18 }),
              new TextRun({ text: nomeMarco, italics: true, color: '333333', size: 18 }),
              new TextRun({
                text:
                  ' estando o usuário de acordo com os processos abaixo relacionados. Sendo assim, declaro validados e aceitos os processos.',
                color: '333333',
                size: 18,
              }),
            ],
          }),
          itemTable,
          sectionTitle('Próximos Passos'),
          proximosTable,
          sectionTitle('Aceite'),
          aceiteTable,
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
}
