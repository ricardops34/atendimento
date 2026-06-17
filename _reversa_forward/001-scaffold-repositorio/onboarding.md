# Onboarding: Scaffold do Repositório e Workspace MVP

> Identificador: `001-scaffold-repositorio`
> Data: `2026-06-17`

Este guia apresenta o passo a passo para testar, validar e inicializar o workspace de desenvolvimento criado para o MVP.

---

## 1. Instalação e Preparação

1. **Clonar/Abrir o Workspace**:
   Abra a pasta raiz `atendimento/` no seu terminal.

2. **Instalar Dependências na Raiz**:
   Instale o gerenciador de concorrência:
   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente**:
   Copie as variáveis de exemplo do backend:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Edite o arquivo `backend/.env` para ajustar as credenciais de conexão do PostgreSQL local (`DATABASE_URL`).

4. **Instalar Dependências nos Subdiretórios**:
   Rode o instalador automatizado a partir da raiz:
   ```bash
   npm run install:all
   ```

---

## 2. Inicialização dos Servidores de Desenvolvimento

Rode o comando de execução unificada na raiz do projeto:
```bash
npm run dev
```

Este comando inicializará concorrentemente:
* A API NestJS em `http://localhost:3000`
* A SPA Angular em `http://localhost:4200`

---

## 3. Validação dos Componentes

* **Validação do Backend**: Abra `http://localhost:3000/api` no navegador e certifique-se de receber a resposta Hello World padrão do NestJS.
* **Validação do Frontend**: Abra `http://localhost:4200` no navegador e confirme a renderização da tela de boas-vindas do PO-UI.
* **Validação do Banco**: Execute `npx prisma generate` no diretório `/backend` para testar a compilação do Prisma Client local.
