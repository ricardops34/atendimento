# Investigation: Acesso do Cliente aos Atendimentos

> Identificador: `003-acesso-cliente-atendimentos`
> Data: `2026-07-20`

## 1. O que o legado tinha (e o que não tinha)

- O legado (Adianti/PHP) não tem nenhum ator "Cliente" com login próprio. O único indício de algo público é a pasta `antigo/app/control/public/` ("Telas de visualização pública, não autenticadas"), citada em `_reversa_sdd/inventory.md`, mas ela nunca foi analisada em profundidade pela extração reversa (não está em `_reversa_sdd/code-analysis.md`). 🔴 Não há evidência de que essa pasta implementasse qualquer consulta de atendimentos — tratar como não relacionado até prova em contrário.
- O legado gera OS (Ordem de Serviço) impressa via `OrdemServicoDocument` (`_reversa_sdd/architecture.md#🔌-integrações-externas-e-internas`), que é o único artefato hoje entregue ao cliente, e é entregue offline/impresso, não via consulta online.
- Conclusão: esta feature não é uma migração de tela existente, é uma capacidade nova sobre a base já migrada.

## 2. O que o sistema atual (já migrado) já oferece e pode ser reaproveitado

- **Modelo de acesso já pronto:** `Profile → Menu → MenuItem → Routine → Module`, com `MenuGuard` checando se a rotina pedida está num `MenuItem` ativo de um `Menu` vinculado ao `Profile` do usuário (`backend/src/auth/guards/menu.guard.ts`). Isso significa que criar um novo perfil restrito é 100% dado, não código.
- **Isolamento multi-empresa já pronto:** `EmpresaGuard` (`backend/src/auth/guards/empresa.guard.ts`) já injeta `empresaId` do JWT em todo request. O mesmo padrão (claim no JWT + guard) foi escolhido para `clienteId`, por consistência.
- **Geração de extrato em PDF já pronta:** `AgendamentosService.generateExportExtrato` (`backend/src/agendamentos/agendamentos.service.ts`) e `buildPdfCalendario.ts` já calculam horas previstas por contrato e montam um PDF via `pdfkit`. Não é necessário escrever um gerador de PDF novo.
- **Exportação em outros formatos já pronta:** `AgendamentosService.generateExport` cobre csv/xls/pdf/xml para a listagem interna — não é reaproveitada diretamente porque RF-08 pede um extrato dedicado e mais simples (decisão do usuário), não o mesmo grid.

## 3. Alternativas de arquitetura consideradas

| Alternativa | Descrição | Por que foi descartada |
|-------------|-----------|--------------------------|
| Row-level security no Postgres (policies por `cliente_id`) | Aplicar isolamento diretamente no banco via `RLS` | O projeto não usa RLS em nenhum outro lugar (o isolamento por `empresaId` hoje é 100% em nível de aplicação, via `EmpresaGuard`); introduzir RLS só para clientes criaria dois modelos de segurança diferentes coexistindo |
| Reaproveitar as Routines/MenuItems de Agendamentos, com uma flag "somente leitura" no `MenuItem` ou no `Profile` | Um único conjunto de rotinas serviria backoffice e cliente, com comportamento condicional | Rejeitada explicitamente pelo usuário ("sem alterar as que temos hoje"); também aumentaria o acoplamento e o risco de um bug vazar ações de escrita para o cliente |
| Desnormalizar `clienteId` diretamente na tabela `agendamento` | Evitaria o join `agendamento → contrato → cliente` em toda consulta | Descartada por ora: exigiria migração de dados históricos e o join atual é suficiente para o volume de dados hoje conhecido; pode ser revisitada se houver problema de performance real |
| Cadastro de usuário do portal em tela separada de "Usuários" | Evitaria tocar na tela `usuarios-edit.page.ts` existente | Descartada: duplicaria CRUD de usuário só para diferenciar o vínculo; o usuário de portal é um `User` comum com `clienteId` preenchido |

## 4. Padrões aplicáveis

- Seguir o padrão de guards em cadeia já usado em `AgendamentosController` (`JwtAuthGuard, EmpresaGuard, MenuGuard` + `@RequireMenu`), acrescentando um `ClienteContextGuard` específico para as rotas do portal.
- Seguir o padrão de resposta paginada (`items`, `page`, `pageSize`, `total`, `hasNext`) já usado em `MenusService.search` e no restante do backend, exigido também pelo PO UI (`PoPageDynamicTable`) conforme `CLAUDE.md` do projeto.
- Seguir o padrão de tela somente leitura adaptando os componentes existentes de `frontend/src/app/features/agendamentos/calendario/` e `lista/`, removendo o `form-sidebar` (criação/edição) e os botões de ação (Confirmar, OS, exportações múltiplas).
