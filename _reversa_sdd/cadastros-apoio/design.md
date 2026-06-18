# Cadastros de Apoio, Design Técnico

## Interface

Esta unit é composta pelas seguintes entidades do sistema legado:

### Modelos ActiveRecord (Persistência)

| Símbolo | Classe Base | Tabela Associada | Observação |
|---------|-------------|------------------|------------|
| `Empresa` | `TRecord` | `empresa` | Empresa cliente com endereço, cor e razão social. |
| `Profissional` | `TRecord` | `profissional` | Profissional executor vinculado a um usuário do sistema. |
| `Contrato` | `TRecord` | `contrato` | Contrato comercial com vigência, tipo e cor. |
| `ContratoProfissional` | `TRecord` | `contrato_profissional` | Pivô many-to-many entre Contrato e Profissional. |
| `ContratoItem` | `TRecord` | `contrato_item` | Escala semanal de profissional por contrato. |

### Controladores e Telas

| Símbolo | Método / Ação | Retorno / Saída | Observação |
|---------|---------------|-----------------|------------|
| `EmpresaForm.onSave` | `onSave($param)` | Salva registro no banco | Valida `nome`, `cor` e `cidade_id` obrigatórios. |
| `EmpresaForm.onChangecidade_estado_id` | Ajax | Recarrega combo de cidades filtrando por estado | Dropdown cascading Estado → Cidade. |
| `ProfissionalForm.onSave` | `onSave($param)` | Salva registro no banco | Valida `nome` e `system_user_id` obrigatórios. |
| `ContratoForm.onSave` | `onSave($param)` | Salva contrato + pivôs + escala | Valida `empresa_id`, `descricao`, `dt_inicio`, `dt_fim`, `tipo` obrigatórios. Salva `ContratoProfissional` e `ContratoItem` em cascata. |
| `ContratoForm.OnDiaSemana` | Ajax | Preenche horários padrão | Ao selecionar dia da semana: 08:30 / 11:30 / 13:00 / 18:00. |
| `ContratoForm.onAddContratoItemContrato` | Sessão local | Adiciona linha na grid da escala | Operação em memória antes do save. |
| `ContratoForm.onEditContratoItemContrato` | Sessão local | Edita linha na grid da escala | Operação em memória. |
| `ContratoForm.onDeleteContratoItemContrato` | Sessão local | Remove linha na grid da escala | Operação em memória. |

---

## Fluxo Principal (Cadastro e Persistência)

### Empresa
1. Formulário com: `nome` (obrigatório), `razao`, `cor` (obrigatório no legado, opcional no sistema novo), `endereco`, Estado (dropdown), Cidade (dropdown cascading dependente do Estado).
2. Validação de campos obrigatórios.
3. Persistência via `store()`.

### Profissional
1. Formulário com: `nome` (obrigatório), `system_user_id` (obrigatório — combo de usuários do sistema `permission.SystemUsers`).
2. Validação de campos obrigatórios.
3. Persistência via `store()`.

### Contrato
1. Formulário com: `empresa_id`, `descricao`, `cor`, `dt_inicio`, `dt_fim`, `tipo` (F/H), `valor_hora`, `valor_fixo`.
2. Multi-select de profissionais (`profissionais_id` → `TDBMultiSearch`).
3. Seção de escala semanal (master-detail em sessão): dia da semana, profissional, hora início, intervalo ini, intervalo fim, hora final.
4. `onSave`: persiste `Contrato`, apaga e recria `ContratoProfissional`, persiste `ContratoItem`.

---

## Fluxos Alternativos e Tratamento de Erros

*   **Validação Falha:** Campo obrigatório vazio → exceção, dados mantidos no formulário.
*   **Erro de Banco (FK RESTRICT):** Exclusão de empresa com contrato vinculado → rollback + mensagem de erro.
*   **Dia da Semana (Ajax):** Ao selecionar um dia, preenche automaticamente `hora_inicio=08:30`, `intervalo_ini=11:30`, `intervalo_fim=13:00`, `hora_final=18:00`.

---

## Estado Interno (Tabelas de Banco)

### Tabela: `empresa`
| Campo | Tipo | Obrigatório | Observação |
|-------|------|-------------|------------|
| `id` | INTEGER | PK autoincrement | |
| `nome` | VARCHAR(255) | Sim | Nome fantasia / cliente |
| `razao` | VARCHAR(255) | Não | Razão social |
| `cor` | VARCHAR(7) | Não (era obrigatório no legado) | Cor hex da empresa na agenda |
| `endereco` | VARCHAR(500) | Não | Endereço completo |
| `cidade` | VARCHAR(255) | Não | Nome da cidade (texto livre no sistema novo) |
| `estado` | VARCHAR(2) | Não | UF (texto livre no sistema novo) |
| `tenant_id` | INTEGER | Sim | FK → tenants |

### Tabela: `profissional`
| Campo | Tipo | Obrigatório | Observação |
|-------|------|-------------|------------|
| `id` | INTEGER | PK autoincrement | |
| `nome` | VARCHAR(255) | Sim | Nome do profissional |
| `user_id` | INTEGER | Não (era obrigatório no legado) | FK → users |
| `tenant_id` | INTEGER | Sim | FK → tenants |

### Tabela: `contrato`
| Campo | Tipo | Obrigatório | Observação |
|-------|------|-------------|------------|
| `id` | INTEGER | PK autoincrement | |
| `empresa_id` | INTEGER | Sim | FK → empresa |
| `descricao` | VARCHAR(255) | Sim | |
| `cor` | VARCHAR(7) | Não | Default `#333333` |
| `dt_inicio` | DATE | Sim | Início da vigência |
| `dt_fim` | DATE | Sim | Fim da vigência |
| `tipo` | VARCHAR(1) | Sim | `F` (Fixo) ou `H` (Hora) |
| `valor_hora` | DECIMAL(10,2) | Não | Relevante quando tipo=H |
| `valor_fixo` | DECIMAL(10,2) | Não | Relevante quando tipo=F |
| `is_feriado` | BOOLEAN | — | Default false; identifica contrato de feriados |
| `tenant_id` | INTEGER | Sim | FK → tenants |

### Tabela: `contrato_profissional`
| Campo | Tipo | Observação |
|-------|------|------------|
| `id` | INTEGER | PK autoincrement |
| `contrato_id` | INTEGER | FK → contrato (ON DELETE CASCADE) |
| `profissional_id` | INTEGER | FK → profissional (ON DELETE CASCADE) |
| UNIQUE | `(contrato_id, profissional_id)` | |

### Tabela: `contrato_item` (escala semanal)
| Campo | Tipo | Observação |
|-------|------|------------|
| `id` | INTEGER | PK autoincrement |
| `contrato_id` | INTEGER | FK → contrato (ON DELETE CASCADE) |
| `profissional_id` | INTEGER | FK → profissional (ON DELETE CASCADE) |
| `dia_semana` | INTEGER | 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sáb |
| `hora_inicio` | VARCHAR(5) | hh:mm |
| `hora_fim` | VARCHAR(5) | hh:mm |
| `intervalo_ini` | VARCHAR(5) | hh:mm |
| `intervalo_fim` | VARCHAR(5) | hh:mm |

---

## Listagens e Filtros

### Empresa (EmpresaList)
- **Filtros:** id, nome
- **Colunas:** id, nome, cidade, endereço
- **Ações:** Editar, Excluir, Cadastrar, Exportar CSV

### Contrato (ContratoList)
- **Filtros:** empresa, tipo, dt_inicio, dt_fim
- **Colunas:** empresa→nome, dt_inicio (dd/mm/yyyy), dt_fim (dd/mm/yyyy)
- **Ações:** Editar, Excluir, Cadastrar, Exportar CSV

---

## Dependências

*   **Banco de Dados (PostgreSQL):** Acessado via Prisma ORM no NestJS.
*   **Autenticação:** `JwtAuthGuard`, `TenantGuard` aplicados a todos os endpoints.
*   **User:** O cadastro de Profissional referencia a tabela `users` via `user_id`.

---

## Decisões de Design

| Decisão | Evidência | Confiança |
|---------|-----------|-----------|
| Cidade e Estado como texto livre (sem FK) no sistema novo — simplificação do MVP para evitar cadastros auxiliares de Cidade/Estado. | `EmpresaForm.php` usa dropdown cascading, mas Cidade/Estado não está no escopo MVP. | 🟡 INFERIDO |
| `cor` em Empresa torna-se opcional no sistema novo (era obrigatório no legado). | `EmpresaForm.php:49` valida como required. Decisão de relaxar para facilitar cadastro. | 🟡 INFERIDO |
| `user_id` em Profissional torna-se opcional no sistema novo. | `ProfissionalForm.php:37` valida como required; pode ser relaxado para evitar dependência de criação prévia de usuário. | 🟡 INFERIDO |
| Cores hexadecimais validadas com regex `/^#[0-9A-F]{6}$/i` no backend antes de salvar. | `confidence-report.md` — lacuna mapeada. | 🟢 CONFIRMADO |

---

## Riscos e Lacunas

*   🔴 **EmpresaColaborador fora do escopo MVP:** O legado permite vincular `Colaborador` (funcionário da empresa cliente) a uma `Empresa` com nome, função e telefone. Essa funcionalidade não está implementada no sistema novo.
*   🟡 **Cidade/Estado:** Simplificado para texto livre no sistema novo. Dados do legado precisam de extração textual na migração ETL (T-01).
