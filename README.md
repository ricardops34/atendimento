# 🚀 Sistema SaaS Enterprise - BJSoft

Uma plataforma SaaS (Software as a Service) de última geração, construída para ser escalável, segura e **AI-Ready**. Este sistema utiliza uma arquitetura multi-tenant avançada para gerenciar múltiplos clientes com isolamento total de dados e customização dinâmica.

---

## 💎 Diferenciais do Sistema

### 🏢 Arquitetura Multi-Tenant Híbrida
- **Isolamento de Dados**: Suporte a banco de dados compartilhado (com RLS) e instâncias dedicadas para planos Enterprise.
- **Branding Dinâmico**: Cada cliente possui seu próprio subdomínio (`cliente.sistema.bjsoft.com.br`) com logos, cores e temas personalizados.

### 🤖 AI-Ready (Pronto para Inteligência Artificial)
- **IDs Semânticos**: Interface 100% mapeada para operação por agentes de IA autônomos.
- **Discovery API**: Endpoint de auto-descoberta que permite que IAs entendam o contexto, planos e capacidades do cliente instantaneamente.
- **Swagger Integrado**: Documentação OpenAPI completa para integração via Function Calling.

### ⚙️ Extensibilidade e Governança
- **Custom Routines (Plugins)**: Motor de execução de código customizado por cliente com controle de versionamento.
- **Faturamento e Bloqueio**: Controle automático de adimplência com suspensão de acesso em tempo real.
- **Relatórios Profissionais**: Integração com **jsreport** para geração dinâmica de PDFs e Excel com a marca do cliente.

---

## 🛠️ Stack Tecnológica

- **Backend**: [NestJS](https://nestjs.com/) (Node.js) com TypeScript.
- **Frontend**: [Angular](https://angular.io/) + [PO-UI](https://po-ui.io/) (Design System da TOTVS).
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/).
- **Cache & Filas**: [Redis](https://redis.io/).
- **Infraestrutura**: Docker Swarm, Traefik, Portainer e GitHub Actions (CI/CD).

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados.

### Rodando Localmente
1. Clone o repositório:
   ```bash
   git clone https://github.com/ricardops34/sistema.git
   ```
2. Inicie o ecossistema:
   ```bash
   docker-compose up -d
   ```
3. O sistema estará disponível em:
   - Frontend: `http://localhost:80`
   - API: `http://localhost:3000/docs`

---

## ☁️ Deploy na Nuvem (CI/CD)

O deploy é automatizado via **GitHub Actions**:
1. O código é buildado e testado.
2. As imagens Docker são enviadas para o **Docker Hub** (`ricardops34`).
3. O **Portainer** na VPS faz o pull e atualiza o stack automaticamente.

---

## 🛡️ Segurança e Auditoria
- **Audit Logs**: Todas as ações de escrita são registradas com Tenant ID e User ID.
- **Rate Limiting**: Proteção contra ataques de força bruta e abusos de API.
- **JWT Authentication**: Autenticação moderna e segura com suporte a Refresh Tokens.

---

**Desenvolvido por Ricardo - BJSoft** 💎✨
