# Cadastros de Apoio, Tarefas de Implementação

## Pré-requisitos
- [ ] Schema PostgreSQL inicializado (Prisma ORM com migration executada).
- [ ] Módulo de autenticação e contexto de Tenant ativos.
- [ ] Bibliotecas PO-UI instaladas no frontend Angular.

---

## Modelagem de Dados

*   [ ] **T-01: Modelagem das Entidades**
    *   Criar/atualizar schemas Prisma para `Empresa`, `Profissional`, `Contrato`, `ContratoProfissional`, `ContratoItem` com os campos completos levantados no legado.
    *   `Empresa`: `nome`, `razao`, `cor`, `endereco`, `cidade`, `estado`, `tenantId`.
    *   `Profissional`: `nome`, `userId` (FK → users, opcional), `tenantId`.
    *   `Contrato`: `empresaId`, `descricao`, `cor`, `dtInicio`, `dtFim`, `tipo`, `valorHora`, `valorFixo`, `isFeriado`, `tenantId`.
    *   `ContratoProfissional`: pivô `contratoId` × `profissionalId` com unique constraint.
    *   `ContratoItem`: `contratoId`, `profissionalId`, `diaSemana`, `horaInicio`, `horaFim`, `intervaloIni`, `intervaloFim`.
    *   Executar `prisma migrate dev`.
    *   **Confiança:** 🟢 CONFIRMADO

---

## Backend (APIs e Regras)

*   [ ] **T-02: APIs de CRUD para Empresa**
    *   Endpoints `GET /empresas`, `GET /empresas/:id`, `POST /empresas`, `PUT /empresas/:id`, `DELETE /empresas/:id`.
    *   Validações obrigatórias: `nome`.
    *   Bloqueio de exclusão quando há contratos vinculados (HTTP 409).
    *   Sanitizar `cor` com regex `/^#[0-9A-F]{6}$/i` antes de salvar.
    *   Filtros de listagem: `nome` (like), `id`.
    *   **Confiança:** 🟢 CONFIRMADO

*   [ ] **T-03: APIs de CRUD para Profissional**
    *   Endpoints `GET /profissionais`, `GET /profissionais/:id`, `POST /profissionais`, `PUT /profissionais/:id`, `DELETE /profissionais/:id`.
    *   Validações obrigatórias: `nome`.
    *   `userId` opcional; se informado, validar que o User pertence ao tenant.
    *   **Confiança:** 🟢 CONFIRMADO

*   [ ] **T-04: APIs de CRUD para Contrato**
    *   Endpoints `GET /contratos`, `POST /contratos`, `PUT /contratos/:id`, `DELETE /contratos/:id`.
    *   Validações obrigatórias: `empresaId`, `descricao`, `dtInicio`, `dtFim`, `tipo` (`F` ou `H`).
    *   Sanitizar `cor` com regex antes de salvar.
    *   `POST`/`PUT` deve receber array de `profissionalIds[]` e persistir/reconstruir `ContratoProfissional` em transação atômica.
    *   `POST`/`PUT` deve receber array de `escalas[]` (ContratoItem) e persistir em cascata.
    *   Filtros de listagem: `empresaId`, `tipo`, `dtInicio`, `dtFim`.
    *   **Confiança:** 🟢 CONFIRMADO

*   [ ] **T-05: Endpoint de listagem de Usuários para combo do Profissional**
    *   `GET /usuarios/select` — retorna `[{ id, name }]` para popular o combo de vínculo de usuário no formulário de Profissional.
    *   **Confiança:** 🟡 INFERIDO

---

## Frontend (Telas PO-UI)

*   [ ] **T-06: Telas de Cadastro de Empresas**
    *   **Listagem** (`po-page-list` + `po-table`): colunas id, nome, cidade, endereço. Filtros: id, nome. Botão Exportar CSV.
    *   **Formulário** (`po-page-detail` ou drawer): campos `nome`*, `razao`, `cor` (color picker hex), `endereco`, `cidade`, `estado`. Botões Salvar / Novo.
    *   **Confiança:** 🟡 INFERIDO

*   [ ] **T-07: Telas de Cadastro de Profissionais**
    *   **Listagem**: colunas id, nome, usuário vinculado.
    *   **Formulário**: campos `nome`*, `user_id`* (combo de usuários do sistema).
    *   **Confiança:** 🟡 INFERIDO

*   [ ] **T-08: Telas de Cadastro de Contratos**
    *   **Listagem**: filtros empresa, tipo, dt_inicio, dt_fim. Colunas: empresa, dt_inicio, dt_fim.
    *   **Formulário**:
        *   Campos principais: `empresa_id`* (combo), `descricao`*, `cor` (color picker), `dt_inicio`* (date), `dt_fim`* (date), `tipo`* (select: Fixo/Hora), `valor_hora`, `valor_fixo`.
        *   Multi-select de profissionais habilitados (`po-multiselect` ou lookup).
        *   Seção de escala semanal (master-detail inline):
            *   Combo dia da semana (Dom–Sáb) — ao selecionar, preenche horários padrão automaticamente.
            *   Combo profissional, hora_inicio, intervalo_ini, intervalo_fim, hora_final.
            *   Botão Adicionar linha; grid com editar/excluir por linha.
    *   **Confiança:** 🟡 INFERIDO

---

## Tarefas de Teste

*   [ ] **TT-01: Contrato sem Empresa → HTTP 400**
*   [ ] **TT-02: Contrato sem datas (dt_inicio/dt_fim) → HTTP 400**
*   [ ] **TT-03: Tipo de contrato inválido → HTTP 400**
*   [ ] **TT-04: Cor hex inválida → HTTP 400**
*   [ ] **TT-05: Exclusão de Empresa com contratos → HTTP 409**
*   [ ] **TT-06: Isolamento de Tenant (dados de tenant A invisíveis para tenant B)**
*   [ ] **TT-07: ContratoProfissional — salvar contrato com 3 profissionais e confirmar vínculos persistidos**
*   [ ] **TT-08: ContratoItem — salvar escala de segunda e quinta e confirmar 2 itens persistidos**

---

## Tarefas de Migração de Dados

*   [ ] **TM-01: Carga Histórica de Cadastros**
    *   Extrair de `bjsoft18_portal.sql` as tabelas `empresa`, `profissional`, `contrato`, `contrato_profissional`, `contrato_item`.
    *   Transformações:
        *   `empresa.cidade_id` → buscar nome da cidade e UF do estado para popular `cidade` e `estado` como texto.
        *   Contratos com `cor` nula ou inválida → substituir por `#333333`.
    *   Associar todos os registros ao tenant padrão (`default`).
    *   Conferir contagem de registros importados contra o backup.
    *   **Confiança:** 🟢 CONFIRMADO

---

## Ordem Sugerida
1. **T-01 (Modelagem):** Executar migration primeiro.
2. **T-02, T-03, T-04 (APIs Backend):** Implementar e testar endpoints.
3. **TM-01 (Migração):** Carga do backup com dados reais para testar o frontend.
4. **T-06, T-07, T-08 (Telas Frontend):** Construir componentes PO-UI e integrar com APIs.

---

## Lacunas Pendentes (🔴)

*   🔴 **EmpresaColaborador fora do MVP:** O legado possui um master-detail no formulário de Empresa para vincular Colaboradores (nome, função, telefone). Não implementado no sistema novo.
*   🔴 **Cidade/Estado como texto:** Simplificação de MVP; ETL (TM-01) precisa desnormalizar o nome da cidade e UF do estado a partir das tabelas auxiliares `cidade` e `estado` do backup.
