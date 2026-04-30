# Plano de Implementação: BJSoft SaaS Admin & Operacional

Este documento detalha o progresso da reestruturação da arquitetura para um modelo Relacional SaaS-Ready e os próximos passos para estabilização.

## 🟢 O que já foi feito

### 1. Arquitetura e Banco de Dados (API)
- [x] **Schema Prisma Refatorado**: Suporte a hierarquia Grupo (Tenant) > Filiais (Branch).
- [x] **Dados Fiscais**: Campos para CNPJ, IE, CNAEs e endereços (Fiscal e Cobrança) integrados.
- [x] **Cadastros Auxiliares Globais**: Tabelas de Países (BACEN), Estados (IBGE), Municípios (IBGE), CEP e CNAE sem isolamento de tenant.
- [x] **Carga Inicial (Seed)**: Scripts para popular Países, Estados e Capitais.
- [x] **Integração ViaCEP**: Lógica de busca e cache automático de CEPs implementada no `AuxiliaryService`.

### 2. Administração Master (SaaS Admin)
- [x] **Gestão de Empresas**: CRUD de Grupos Econômicos com planos e branding.
- [x] **Catálogo de Rotinas**: Gestão global de funcionalidades.
- [x] **Matriz de Recursos**: Interface para vincular Planos a Rotinas.
- [x] **Cadastros Auxiliares**: Listagens criadas para Países, Estados, Municípios e CNAE.

### 3. Operação do Sistema (Cliente)
- [x] **Gestão de Unidades**: Novo CRUD de Filiais com interface de abas (Dados, Endereço, Branding).
- [x] **Segurança**: Estrutura para Usuários e Perfis de Acesso preparada para multi-tenant.

---

## 🟡 O que falta fazer (Imediato)

### 1. Correções de Build e Estrutura
- [x] **Limpeza de Pastas**: Mover definitivamente os arquivos da pasta `pages/admin` para `pages/saas` ou `pages/sistema`.
- [x] **Ajuste de Tipos PO-UI**:
    - [x] Remover `p-value` de `po-page-dynamic-edit` (carregamento automático).
    - [x] Corrigir propriedade `icon` em `PoTableColumn` (não suportada).
    - [x] Corrigir caminhos relativos de importação do `CoreService` em todos os componentes movidos.

### 2. Integração Frontend (Auxiliares)
- [x] **Busca de CEP**: Implementar campo de busca com gatilho para preenchimento automático no formulário de Filiais.
- [x] **Menu Master**: Adicionar os novos cadastros auxiliares ao menu do Administrador Master.

### 3. Padrão Visual Premium (PO-UI UI/UX)
- [x] **Configuração do Toolbar**: Limpar header nativo e usar `po-toolbar` fixo com título do sistema.
- [x] **Header Customizado no Menu**: Aplicar `<ng-template p-menu-header-template>` para injetar nome, cargo e avatar corretamente sem quebrar o componente nativo.
- [ ] **Menu Colapsável (Requisito Documentação)**: Revisar a matriz de `menus` para garantir que **todos os itens de primeiro nível** tenham a propriedade `icon` definida (sem isso, o PO-UI não permite iniciar o menu recolhido).
- [ ] **Integração de Permissões**: Garantir que o `AuthService` entregue o payload correto para popular o Header do Menu dinamicamente.
- [ ] **Padronização de Páginas**: Refatorar páginas de listagem vazias (ex: Empresas RFB) para utilizar ações (`p-actions`) no cabeçalho do `po-page-default` e facilitar a carga de dados inicial.

### 4. Finalização
- [ ] **Build Final**: Garantir `npm run build` com sucesso absoluto.

### 4. Módulo Dados Públicos CNPJ (RFB)
- [x] **Frontend**: Criar listagens e visualização detalhada em abas (Sócios/Estabelecimentos).
- [x] **Backend**: Modelagem Prisma e Endpoints de consulta.
- [x] **Importador (ETL)**: Serviço de alto desempenho com Streams e batch insert.
- [ ] **Carga de Dados**:
    - [ ] **Download e Extração**: Baixar .zip da RFB e extrair .csv para pasta local.
    - [ ] **Executar Migração**: Rodar `npx prisma migrate dev` para criar novas tabelas.
    - [ ] **Disparar Carga**: Executar chamadas POST `/cnpj/import/...` para processar arquivos.
- [ ] **Commit & Push**: Sincronizar o repositório com as novas pastas e lógica.