# Data Delta: Scaffold do Repositório e Workspace MVP

> Identificador: `001-scaffold-repositorio`
> Data: `2026-06-17`

Este documento apresenta a modelagem de dados e a configuração física de banco de dados adotadas para esta feature.

---

## 1. Mapeamento de Persistência (Prisma)

Nesta etapa inicial de scaffold, instalaremos e configuraremos o **Prisma ORM** sob a pasta `/backend`. A base de dados será o **PostgreSQL** rodando localmente (ou via Docker).

### Conexão e Schema Inicial
O arquivo inicial do Prisma será gerado em `backend/prisma/schema.prisma` contendo a seguinte configuração de datasource:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

O arquivo `.env` local conterá a variável de conexão correspondente:
```text
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/atendimento_mvp?schema=public"
```

---

## 2. Modelagem e Migrações

*Não há tabelas operacionais ou schemas de entidades gerados nesta feature. A importação do schema físico do Prisma contendo as tabelas (`empresa`, `profissional`, `contrato`, `agendamento`, `realizado`) será executada na Fase 2: Database and Import.*
