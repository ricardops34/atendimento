# Cadastros de Apoio, Tarefas de Implementação

## Pré-requisitos
- [ ] Schema PostgreSQL inicializado (através do Prisma ORM).
- [ ] Módulo de autenticação e contexto de Tenant ativo disponíveis.
- [ ] Bibliotecas de componentes PO-UI instaladas e configuradas no frontend Angular.

## Tarefas

### Modelagem de Dados
*   [ ] **T-01: Modelagem das Entidades**
    *   **Descrição:** Criar os esquemas Prisma para as tabelas `Company` (Empresa), `Professional` (Profissional) e `Contract` (Contrato), herdando chaves estrangeiras e relacionamentos adequados e adicionando o campo `tenantId`.
    *   **Origem no legado:**
        *   [Empresa.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Empresa.php)
        *   [Profissional.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Profissional.php)
        *   [Contrato.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/model/Contrato.php)
    *   **Critério de pronto:** Modelos criados no arquivo `schema.prisma` e migration executada com sucesso no banco Postgres.
    *   **Confiança:** 🟢 CONFIRMADO

### Backend (APIs e Regras)
*   [ ] **T-02: APIs de CRUD para Empresa**
    *   **Descrição:** Criar endpoints REST `GET`, `POST`, `PUT`, `DELETE` para Empresas.
    *   **Origem no legado:**
        *   [EmpresaForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/EmpresaForm.php)
        *   [EmpresaList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/EmpresaList.php)
    *   **Critério de pronto:** Endpoints expostos e validando que o `nome` é obrigatório e que todas as operações filtram pelo `tenantId` da sessão.
    *   **Confiança:** 🟢 CONFIRMADO

*   [ ] **T-03: APIs de CRUD para Profissional**
    *   **Descrição:** Criar endpoints REST para Profissionais.
    *   **Origem no legado:**
        *   [ProfissionalForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/ProfissionalForm.php)
        *   [ProfissionalList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/cadastros_basicos/ProfissionalList.php)
    *   **Critério de pronto:** CRUD funcional, validando `nome` obrigatório e escopo de `tenantId`.
    *   **Confiança:** 🟢 CONFIRMADO

*   [ ] **T-04: APIs de CRUD para Contrato**
    *   **Descrição:** Criar endpoints REST para Contratos.
    *   **Origem no legado:**
        *   [ContratoForm.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/ContratoForm.php)
        *   [ContratoList.php](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/app/control/servicos/ContratoList.php)
    *   **Critério de pronto:** CRUD funcional, validando obrigatoriedade de `empresaId` (FK) e sanitizando a string de cor hexadecimal antes de salvar.
    *   **Confiança:** 🟢 CONFIRMADO

### Frontend (Telas PO-UI)
*   [ ] **T-05: Telas de Cadastro de Empresas**
    *   **Descrição:** Criar listagem (`po-page-list` e `po-table`) e formulário de cadastro de Empresas.
    *   **Critério de pronto:** Tela integrada com a API do backend, exibindo validações de campos obrigatórios e paginação de dados.
    *   **Confiança:** 🟡 INFERIDO

*   [ ] **T-06: Telas de Cadastro de Profissionais**
    *   **Descrição:** Criar listagem e formulário de cadastro de Profissionais utilizando componentes PO-UI.
    *   **Critério de pronto:** Tela funcional e integrada com o backend de profissionais.
    *   **Confiança:** 🟡 INFERIDO

*   [ ] **T-07: Telas de Cadastro de Contratos**
    *   **Descrição:** Criar listagem e formulário de cadastro de Contratos, incluindo um combo de seleção de empresa (`po-combo`) e um seletor visual de cor.
    *   **Critério de pronto:** Formulário integrado, permitindo cadastrar a cor visual do contrato associada à empresa cliente.
    *   **Confiança:** 🟡 INFERIDO

---

## Tarefas de Teste

*   [ ] **TT-01: Teste de Integridade de Contratos**
    *   **Critério de pronto:** Teste de integração enviando payload de contrato sem `empresaId` e validando o retorno HTTP Status `400 Bad Request`.
*   [ ] **TT-02: Teste de Validação de Cor Hexadecimal**
    *   **Critério de pronto:** Teste enviando código de cor inválido (ex: `azul` ou `#XYZ123`) no cadastro de contrato e validando a rejeição com erro HTTP `400`.
*   [ ] **TT-03: Teste de Isolamento de Tenant**
    *   **Critério de pronto:** Validar que uma requisição com o Token de autenticação do Tenant A não consegue listar nem editar dados de empresas ou contratos do Tenant B (HTTP Status `403 Forbidden` ou lista vazia).

---

## Tarefas de Migração de Dados

*   [ ] **TM-01: Carga Histórica de Cadastros**
    *   **Descrição:** Extrair registros das tabelas `empresa`, `profissional` e `contrato` contidas no arquivo de backup SQL [bjsoft18_portal.sql](file:///C:/Patay/Ricardo/VPS/atendimento/antigo/backup/bjsoft18_portal.sql) e importá-los para as novas tabelas PostgreSQL, preservando mapeamento original de IDs, chaves estrangeiras e associando todos ao tenant padrão (`default`).
    *   **Critério de pronto:** Script de migração executado sem erros e conferência de contagem de registros importados idêntica ao backup legado.

---

## Ordem Sugerida
1.  **T-01 (Modelagem):** Deve ser executada primeiro para liberar o banco de dados.
2.  **T-02, T-03, T-04 (APIs Backend):** Implementação e teste unitário das regras de negócio e endpoints.
3.  **TM-01 (Migração):** Carga dos dados do backup no banco PostgreSQL para que as telas frontend tenham dados reais para teste de layout.
4.  **T-05, T-06, T-07 (Telas Frontend):** Construção dos componentes visuais em PO-UI e integração final com as APIs.

---

## Lacunas Pendentes (🔴)
*   🔴 **Sanitização de Cores Hex no Banco de Dados Legado:** O dump SQL de backup possui cores variadas ou nulas cadastradas na tabela de contratos. O script de importação (`TM-01`) precisará aplicar uma cor padrão (ex: `#333333`) para qualquer contrato que não possua cor hexadecimal definida no backup.
