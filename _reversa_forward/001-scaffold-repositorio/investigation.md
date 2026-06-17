# Investigation: Scaffold do Repositório e Workspace MVP

> Identificador: `001-scaffold-repositorio`
> Data: `2026-06-17`

Este documento consolida a pesquisa de padrões, dependências e comandos necessários para a inicialização e estruturação do workspace para o MVP de atendimento.

---

## 1. Pesquisa de Dependências e Versões

### Frontend (Angular + PO-UI)
Para atender à solicitação de uso do **Angular v21** (ou a versão de ponta correspondente no ambiente de execução do usuário):
- **Angular CLI**: Utilizado para scaffold do app Angular (`@angular/cli`).
- **PO-UI Components**: Adicionar a biblioteca `@po-ui/ng-components` e `@po-ui/ng-templates`.
- **FullCalendar**: Para o calendário reativo, usaremos a biblioteca `@fullcalendar/angular` com o plugin `@fullcalendar/daygrid` e `@fullcalendar/timegrid` para paridade visual com o calendário legado.

### Backend (NestJS + Prisma)
- **NestJS CLI**: Utilitário para scaffold do NestJS (`@nestjs/cli`).
- **Prisma Client**: Mapeador de persistência do PostgreSQL (`prisma` e `@prisma/client`).
- **Class Validator**: Validadores estruturais nos DTOs de entrada (`class-validator` e `class-transformer`).
- **Concurrently**: Biblioteca na raiz do repositório para inicialização múltipla assíncrona.

---

## 2. Padrões de Estruturação do Workspace

Optamos pela estrutura de pastas independentes coordenadas por um `package.json` raiz.
O arquivo raiz `package.json` conterá os scripts de desenvolvimento e orquestração:

```json
{
  "name": "atendimento-mvp",
  "version": "1.0.0",
  "scripts": {
    "install:all": "npm install && cd backend && npm install && cd ../frontend && npm install",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run start:dev",
    "dev:frontend": "cd frontend && npm run start"
  },
  "dependencies": {
    "concurrently": "^8.2.0"
  }
}
```

---

## 3. Links e Referências Úteis

* **NestJS Documentation**: [https://docs.nestjs.com](https://docs.nestjs.com)
* **Angular Documentation**: [https://angular.dev](https://angular.dev)
* **PO-UI Documentation (Local)**: [doc/po-ui/doc/llms-generated/](file:///C:/Patay/Ricardo/VPS/atendimento/doc/po-ui/doc/llms-generated/)
* **Prisma ORM documentation**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
* **FullCalendar Angular Integration**: [https://fullcalendar.io/docs/angular](https://fullcalendar.io/docs/angular)
