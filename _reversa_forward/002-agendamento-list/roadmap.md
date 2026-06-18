# Roadmap: Listagem de Atendimentos

> Identificador: `002-agendamento-list`
> Data: `2026-06-17`
> Requirements: `_reversa_forward/002-agendamento-list/requirements.md`
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA

## 1. Resumo da abordagem

O código base já implementa o núcleo desta feature: `AgendamentosController`, `AgendamentosService` e o componente Angular `Lista` existem e funcionam. A listagem carrega via `GET /agendamentos/search`, os filtros estão operacionais e a ação de confirmar já chama `PATCH /agendamentos/:id` com `{ tipo: 'R' }`.

O delta desta feature cobre quatro gaps concretos:

1. **Exportação (RF-05)**: nenhum endpoint de export existe no backend; nenhum botão existe no frontend.
2. **Botão OS como placeholder (RF-04)**: a ação `Ordem de Serviço` ainda não consta na tabela de ações do componente `Lista`.
3. **Paginação clássica**: a implementação atual usa o padrão "mostrar mais" com `pageSize` fixo em 20. O requirements define paginação clássica com seletor de 10 / 20 / 50 itens por página.
4. **Auth guards no controller**: `AgendamentosController` não tem `@UseGuards(JwtAuthGuard, TenantGuard, ModuleGuard)` nem `@RequireModule('appointments-list')`, expondo os endpoints sem proteção.

Além desses quatro gaps, um item de higiene de código está presente: `agendamentos.service.ts` usa `// @ts-nocheck`, suprimindo validação TypeScript. Isso será corrigido como parte das ações de polimento.

Tudo o que não está listado acima já está funcionando e não deve ser alterado.

## 2. Princípios aplicados

Nenhum arquivo `principles.md` encontrado em `.reversa/`. Seção mantida como n/a.

| Princípio | Como a feature se relaciona | Status |
|-----------|------------------------------|--------|
| n/a | — | — |

## 3. Decisões técnicas

| ID | Decisão | Justificativa | Alternativas descartadas | Confidência |
|----|---------|----------------|--------------------------|-------------|
| D-01 | Endpoint de export: `GET /agendamentos/export?format=csv\|xls\|pdf\|xml` retorna stream de arquivo | Reutiliza os filtros do `search` existentes; separar em endpoint próprio evita poluir o search com lógica de serialização | Endpoint único com flag `export=true` no search | 🟢 |
| D-02 | Export implementado com `@ExcelJS/exceljs` (XLS), `@json2csv/plainjs` (CSV) e `PDFKit` (PDF) no backend NestJS | Bibliotecas leves e sem licença restritiva; PDFKit já é padrão em projetos NestJS | Usar `dompdf` do legado (PHP somente); gerar CSV no frontend (sem segurança) | 🟡 |
| D-03 | XML de export gerado manualmente com `xmlbuilder2` para controle total da estrutura | Simples, sem overhead de ORM serializers | Usar `fast-xml-parser`; serializar JSON → XML diretamente | 🟡 |
| D-04 | Paginação migrada de "mostrar mais" para paginação clássica com `po-pagination` | Decisão confirmada pelo usuário no clarify (sessão 2026-06-17) | Manter "mostrar mais" (já implementado); scroll infinito | 🟢 |
| D-05 | Endpoint dedicado `PATCH /agendamentos/:id/confirmar` criado para semântica clara | Separar confirmação do update genérico torna o contrato de API explícito e evita que o frontend envie `{ tipo: 'R' }` no body de update | Manter via `PATCH /:id` com `{ tipo: 'R' }` (funciona mas é implícito) | 🟡 |
| D-06 | Auth guards adicionados ao `AgendamentosController` usando os guards já existentes (`JwtAuthGuard`, `TenantGuard`, `ModuleGuard`) | Guards já implementados em `backend/src/auth/guards/`; apenas faltava aplicá-los no controller | Criar novo guard específico | 🟢 |

## 4. Premissas

Nenhum marcador `[DÚVIDA]` persistiu após o clarify. Nenhuma premissa aberta.

## 5. Delta arquitetural

| Componente | Arquivo de origem no legado | Tipo de mudança | Resumo |
|------------|------------------------------|-----------------|--------|
| `AgendamentosController` | `_reversa_sdd/agendamentos/design.md#AgendamentoList` | contrato-novo + regra-alterada | Novos endpoints `GET /export` e `PATCH /:id/confirmar`; guards adicionados |
| `AgendamentosService` | `_reversa_sdd/agendamentos/design.md#AgendamentoList` | componente-novo (método) + higiene | Novos métodos `export()` e `confirmar()`; remoção de `@ts-nocheck` |
| `Lista` (Angular) | `_reversa_sdd/migration/target_screens.md#AgendamentoList` | regra-alterada + componente-novo | Paginação migrada para clássica; ação OS adicionada; botão Exportar adicionado |
| `AgendamentoService` (Angular) | `_reversa_sdd/migration/target_screens.md#AgendamentoList` | contrato-novo | Método `export(params, format)` adicionado |
| `lista.spec.ts` | — | regra-alterada | Testes de "mostrar mais" substituídos por testes de paginação clássica |

## 6. Delta no modelo de dados

O schema Prisma já está correto para esta feature:
- `duracaoMinutos` existe como `Int` (não mais `VARCHAR hh:ii`)
- `tenantId` existe em `Agendamento` com FK para `Tenant`
- Cor default `#333333` já está no modelo `Contrato`

A única mudança necessária é a **seed** do módulo `appointments-list` na tabela `modules`, caso ainda não exista.

Detalhe completo em: `_reversa_forward/002-agendamento-list/data-delta.md`

## 7. Delta de contratos externos

| Contrato | Tipo | Arquivo de detalhe |
|----------|------|--------------------|
| `GET /agendamentos/search` | HTTP | `_reversa_forward/002-agendamento-list/interfaces/agendamentos-search.md` |
| `GET /agendamentos/export` | HTTP (stream) | `_reversa_forward/002-agendamento-list/interfaces/agendamentos-export.md` |
| `PATCH /agendamentos/:id/confirmar` | HTTP | `_reversa_forward/002-agendamento-list/interfaces/agendamentos-confirmar.md` |

## 8. Plano de migração

1. **Seed de módulo**: verificar se o registro `{ key: 'appointments-list', name: 'Listagem de Atendimentos' }` existe na tabela `modules`; se não, inserir via migration seed.
2. **Sem migração de schema**: nenhuma coluna nova nem índice novo é necessário para esta feature.
3. **Sem migração de dados**: os registros existentes de `agendamento` já têm `duracaoMinutos` populado.

## 9. Riscos e mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Export de PDF com volume alto (>500 linhas) causa timeout de resposta HTTP | Alto | Médio | Limitar export a 1.000 linhas máximo; retornar HTTP 422 acima disso com mensagem de orientação |
| Testes existentes do `lista.spec.ts` quebram na migração para paginação clássica | Médio | Alto | Reescrever os testes como parte da mesma ação de mudança de paginação, não depois |
| Remover `@ts-nocheck` expõe erros de tipo latentes no service | Médio | Médio | Corrigir erros de tipo encontrados como parte da ação de higiene; não deixar para depois |
| Módulo `appointments-list` ausente na seed bloqueia acesso para todos os usuários | Alto | Baixo | Validar seed em ambiente de dev antes de avançar para os demais itens |

## 10. Critério de pronto

- [ ] Todas as ações do `actions.md` marcadas `[X]`
- [ ] `GET /agendamentos/search` protegido por guards (JWT + Tenant + Module `appointments-list`)
- [ ] `GET /agendamentos/export` retorna arquivo válido para os quatro formatos (CSV, XLS, PDF, XML)
- [ ] `PATCH /agendamentos/:id/confirmar` rejeita com HTTP 422 quando `tipo !== 'A'`
- [ ] Paginação clássica funcional com seletor 10 / 20 / 50 e navegação por página
- [ ] Botão OS visível por linha, desabilitado, com tooltip "Módulo em migração"
- [ ] `@ts-nocheck` removido e compilação TypeScript sem erros no `agendamentos.service.ts`
- [ ] Todos os testes de `lista.spec.ts` e `agendamentos.service.spec.ts` passando
- [ ] `regression-watch.md` gerado

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-06-17 | Versão inicial gerada por `/reversa-plan` | reversa |
