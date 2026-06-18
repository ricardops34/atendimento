# Investigation: Listagem de Atendimentos

> Identificador: `002-agendamento-list`
> Data: `2026-06-17`

## Estado atual do código relevante

### Backend — `AgendamentosController` (`backend/src/agendamentos/agendamentos.controller.ts`)

- Endpoints presentes: `POST /`, `GET /`, `GET /search`, `GET /:id`, `PATCH /:id`, `DELETE /:id`
- **Ausente**: guards de autenticação, endpoint `/export`, endpoint `/:id/confirmar`
- O método `search()` já suporta todos os filtros definidos no requirements (tipo, local, contratoId, profissionalId, dataInicial, dataFinal, search, page, pageSize)

### Backend — `AgendamentosService` (`backend/src/agendamentos/agendamentos.service.ts`)

- Arquivo abre com `// @ts-nocheck` — suprime toda validação TypeScript. Deve ser removido.
- A lógica de imutabilidade em `update()` está funcional mas tem dois checks redundantes. O segundo check (`if (current.tipo !== 'A' && Object.keys(dto).length > 0)`) cobre todos os casos; o primeiro é desnecessário.
- `confirmar()` não existe como método separado; é feito via `update()` com `{ tipo: 'R' }` no DTO.

### Frontend — `Lista` (`frontend/src/app/features/agendamentos/lista/lista.ts`)

- Implementado com paginação "mostrar mais" (`onShowMore`, `hasNext`, `loadingShowMore`)
- `pageSize` fixo em 20; sem seletor de quantidade por página
- Ações existentes: `Editar`, `Confirmar` (condicional em `tipo === 'A'`). OS ausente.
- Sem botão ou dropdown de exportação
- Filtros avançados: modal com campos de Data, Status, Modalidade, Contrato, Profissional. Funcional.

### Frontend — `lista.spec.ts`

- Testa `loadData(true)` e `onShowMore()`. Ambos assumem o padrão "mostrar mais".
- Os testes precisarão ser reescritos junto com a mudança de paginação.

### Prisma Schema — `Agendamento`

- `duracaoMinutos: Int` — correto, sem necessidade de migração
- `tenantId` FK existente — isolamento por tenant já modelado
- Índices explícitos: nenhum declarado além das PKs e FKs. Considerar índice em `(tenantId, dataAgenda, tipo)` para queries de listagem/export com filtro de data.

## Bibliotecas a avaliar para export

### CSV
- `@json2csv/plainjs` — sem dependências nativas, pure JS, leve (~30 KB). Opção preferida.
- `csv-stringify` — alternativa madura da família `csv-parse`.

### XLS (Excel)
- `exceljs` — madura, suporta formatação avançada, ~3 MB. Opção preferida para .xlsx.
- `xlsx` (SheetJS) — mais leve, mas licença dual (GPLv3 para o pacote livre).

### PDF
- `pdfkit` — ~1 MB, sem dependências nativas. Adequado para relatórios tabulares simples.
- `@nestjs/pdf` — wrapper sobre `pdfkit`, conveniente para NestJS.

### XML
- `xmlbuilder2` — API fluente, suporte a namespaces, ~200 KB. Opção preferida.
- Geração manual com template string — viable para estrutura simples, zero dependências.

## Padrão de streaming HTTP para exports

O endpoint `GET /agendamentos/export` deve retornar o arquivo como stream para suportar volumes altos sem acumular tudo em memória:

```typescript
@Get('export')
async export(@Query() query: ExportQueryDto, @Res() res: Response) {
  const { format, ...filters } = query;
  res.setHeader('Content-Disposition', `attachment; filename="atendimentos.${format}"`);
  // ... set Content-Type por format
  await this.agendamentosService.streamExport(filters, format, res);
}
```

## Paginação clássica com `po-pagination`

O PO-UI oferece o componente `po-pagination` com propriedades:
- `p-page` — página atual
- `p-items-per-page` — itens por página (default 10)
- `p-total` — total de registros
- `p-items-per-page-options` — array com opções (ex: `[10, 20, 50]`)
- `(p-change-page)` — evento de mudança de página
- `(p-change-items-per-page)` — evento de mudança de tamanho

Isso substitui os campos `hasNext`, `loadingShowMore` e o método `onShowMore()` no componente `Lista`.

## Limite de registros para export

Exports não devem ter paginação — devem exportar todos os registros do filtro atual. Para evitar timeout:
- Máximo de 1.000 registros por export
- Se `count > 1.000`, retornar HTTP 422 com mensagem `"Refine os filtros para exportar menos de 1.000 registros."`
- O endpoint de search já tem paginação; o export bypassa essa paginação com um `take: 1001` e verifica o excesso
