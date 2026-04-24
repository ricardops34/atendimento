# 🏛️ Arquitetura do Sistema SaaS

## Visão Geral
O projeto **Sistema** é uma plataforma SaaS multi-tenant desenvolvida para alta escalabilidade e isolamento de dados.

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: Angular 17+
- **UI Library**: PO-UI (TOTVS Design System)
- **State Management**: RxJS / Signals

### Backend
- **Framework**: NestJS (Node.js)
- **API**: RESTful com documentação OpenAPI (Swagger)
- **Autenticação**: JWT com suporte a Multi-tenant

## 🎨 Padrões de Frontend (PO-UI)
Para garantir a consistência visual e produtividade, o projeto segue obrigatoriamente o design system **PO-UI**:
- **Componentes**: Utilizar exclusivamente componentes da biblioteca `@po-ui/ng-components`.
- **Templates Dinâmicos**: Preferir sempre `PoPageDynamicTable` para listagens e `PoPageDynamicEdit` para formulários de CRUD.
- **Estilização**: Utilizar as classes utilitárias do PO-UI (ex: `po-row`, `po-md-6`) em vez de CSS customizado sempre que possível.
- **UX/UI**: Seguir o Guia de Estilo oficial para manter a experiência "Premium" da TOTVS.

### Banco de Dados & ORM
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Isolamento**: Row-Level Security (RLS) + Tenant ID Filter

---

## 🏗️ Estratégia de Multi-tenancy (Modelo Híbrido)
Adotamos uma abordagem híbrida para suportar diferentes planos de contratação:

1. **Pool Compartilhado (Planos Standard/Pro)**:
   - Shared Database / Shared Schema.
   - Isolamento lógico via `tenant_id` + **PostgreSQL RLS**.
   - Foco em baixo custo e alta densidade.

2. **Instância Dedicada (Plano Enterprise)**:
   - Database-per-tenant.
   - Banco de dados físico isolado.
   - Foco em conformidade, performance garantida e segurança física.

---

## ⚙️ Componentes de Engenharia SaaS
- **Connection Router**: Serviço responsável por identificar o plano do tenant e rotear as queries para a instância correta (Shared ou Dedicated).
- **Tenant Provisioner**: Automação para criação de novos bancos de dados e migração de dados entre modelos.

---

## 🛡️ Segurança
- **CORS**: Configuração restrita por tenant.
- **Rate Limiting**: Aplicado por IP e por Tenant ID.
- **Audit Logs**: Registro de todas as operações de escrita com identificação do autor e cliente.
