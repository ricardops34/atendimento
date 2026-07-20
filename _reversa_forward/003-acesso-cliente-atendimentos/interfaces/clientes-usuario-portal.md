# Interface: POST /clientes, PATCH /clientes/:id (campo `usuarioId` novo)

> Identificador da feature: `003-acesso-cliente-atendimentos`
> Tipo: HTTP (alteração aditiva em contrato já existente, `backend/src/clientes/`)
> Consumido por: `frontend/src/app/features/cadastros-apoio/clientes/clientes-edit.page.ts` (campo combo "Usuário")

Substitui a abordagem anterior (sub-rotas `usuario-portal` com criação de e-mail/senha embutida). Por decisão final do usuário, o cadastro de Cliente ganha apenas um **campo simples** que vincula um usuário **já existente** — a criação do usuário (e-mail, senha, perfil) continua 100% na tela de Usuários (`configuracoes/usuarios`), que não é alterada.

## Request

- **Métodos/rotas:** `POST /clientes` (criação), `PATCH /clientes/:id` (edição) — rotas já existentes, sem mudança de path/verbo.
- **Campo novo no body (opcional):**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `usuarioId` | number \| null | não | Vincula o Cliente a um `User` já existente (RN-03, 1:1). `null`/ausente mantém o cliente sem vínculo (comportamento atual, sem mudança). A FK vive em `Cliente.usuarioId`, não em `User`. |

- Clientes existentes que não enviarem `usuarioId` continuam funcionando exatamente como hoje — mudança 100% retrocompatível.
- O combo de seleção no frontend é populado via `GET /users` (já existente, `UserService.findAll()`, sem alteração).

## Response (200/201)

Objeto de cliente já retornado hoje, acrescido do campo `usuarioId` e do objeto `usuario` resumido (quando vinculado):

```json
{ "id": 15, "nome": "Cliente A", "usuarioId": 88, "usuario": { "id": 88, "name": "Contato Cliente A", "email": "contato@clientea.com", "isActive": true } }
```

## Erros

| Status | Condição |
|--------|----------|
| 409 | `usuarioId` informado já está vinculado a outro cliente (violação do unique constraint em `cliente.usuario_id`, RN-03) — convertido de erro cru do Prisma (`P2002`) para mensagem amigável em `ClientesService` |
| 400 | `usuarioId` não é um número válido |

## Idempotência

- `PATCH /clientes/:id` com o mesmo `usuarioId` repetidas vezes é idempotente.
- Enviar `usuarioId: null` desvincula o usuário do cliente (não exclui o `User`).
