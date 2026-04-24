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

### Banco de Dados & ORM
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Isolamento**: Row-Level Security (RLS) + Tenant ID Filter

---

## 🏗️ Estratégia de Multi-tenancy
Adotamos o modelo de **Shared Database / Shared Schema**.
- Cada tabela possui uma coluna `tenant_id`.
- O isolamento é garantido na camada de banco de dados via **RLS**, impedindo vazamento de dados mesmo em caso de falhas na aplicação.

---

## 🛡️ Segurança
- **CORS**: Configuração restrita por tenant.
- **Rate Limiting**: Aplicado por IP e por Tenant ID.
- **Audit Logs**: Registro de todas as operações de escrita com identificação do autor e cliente.
