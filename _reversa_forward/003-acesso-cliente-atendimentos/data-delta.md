# Data Delta: Acesso do Cliente aos Atendimentos

> Identificador: `003-acesso-cliente-atendimentos`
> Data: `2026-07-20`
> Modelo de referência atual: `backend/prisma/schema.prisma`

## 1. Alteração de schema — `Cliente`

```prisma
model Cliente {
  id             Int        @id @default(autoincrement())
  ...
  contratos      Contrato[]
+ usuarioId      Int?       @unique @map("usuario_id")
+ usuario        User?      @relation(fields: [usuarioId], references: [id], onDelete: SetNull)

  @@map("cliente")
}
```

- `usuarioId` é opcional (clientes sem acesso ao portal não têm vínculo) e **único** — garante RN-03 (1:1): um `User` nunca pode ser referenciado por mais de um `Cliente`.
- A FK vive em **`Cliente`**, não em `User` — decisão explícita do usuário: "o campo Usuário fica no cadastro de Cliente". (Uma tentativa inicial colocou a FK em `User.clienteId`; foi revertida durante `/reversa-coding`.)
- `onDelete: SetNull`: se o `User` vinculado for excluído, o `Cliente` não é apagado, só perde o vínculo (e automaticamente perde acesso ao portal, já que sem `usuarioId` não há `clienteId` para resolver no login).

## 2. Alteração de schema — `User` (relação inversa)

```prisma
model User {
  id            Int            @id @default(autoincrement())
  ...
  userEmpresas  UserEmpresa[]
  profissionais Profissional[]
+ cliente       Cliente?

  @@map("users")
}
```

- Puramente declarativa (relação inversa do Prisma), sem novo campo de banco em `users`.
- Graças a essa relação inversa, `auth.service.ts` consegue ler `user.cliente?.id` mesmo a FK física estando em `cliente.usuario_id` (ver seção 4).

## 3. Sem alteração em `Agendamento`, `Contrato`, `Module`, `Routine`, `Menu`, `MenuItem`, `Profile`

- O escopo por cliente é resolvido via join `Agendamento.contratoId → Contrato.clienteId` (já existente), não requer novo campo em `Agendamento` (ver decisão D-08 do `roadmap.md`).
- `Module`, `Routine`, `Menu`, `MenuItem`, `Profile` já têm toda a estrutura necessária — a feature apenas insere linhas novas (dado de configuração), via `backend/prisma/seed-portal-cliente.ts` (ver seção 5; não via `seed.ts`, que está desatualizado em relação a este schema — ver `legacy-impact.md`).

## 4. Migração SQL

Arquivo `backend/prisma/manual-migrations/2026-07-20_add_cliente_id_to_users.sql` (nome do arquivo mantido por já ter sido criado antes do ajuste; conteúdo corrigido para a coluna certa):

```sql
ALTER TABLE cliente
  ADD COLUMN usuario_id INTEGER UNIQUE REFERENCES users(id) ON DELETE SET NULL;
```

⚠️ **Não executar esta migração sem autorização explícita do usuário**, conforme a regra de proteção de banco de dados do projeto (`CLAUDE.md`). O arquivo já foi criado durante `/reversa-coding`, mas sua aplicação no banco (local ou remoto) exige aviso prévio e confirmação.

## 5. Dados de configuração novos (não são migração de schema, são linhas de dado)

Criados via `backend/prisma/seed-portal-cliente.ts` (script novo e isolado — ver `legacy-impact.md` sobre por que não se usou `seed.ts`):

| Tabela | Registro |
|--------|--------------------|
| `modules` | `key = 'portal-cliente'`, `name = 'Clientes'` |
| `routines` | `key = 'portal-cliente-calendario'`, `path = '/portal/calendario'`, `moduleId` → módulo acima |
| `routines` | `key = 'portal-cliente-lista'`, `path = '/portal/lista'`, `moduleId` → módulo acima |
| `routines` | `key = 'portal-cliente-extrato'`, `path = '/portal/extrato'`, `moduleId` → módulo acima |
| `menus` | `title = 'Portal do Cliente'`, com 3 `menu_items` apontando para as 3 rotinas acima |
| `profiles` | `name = 'Cliente'`, `menuId` → menu acima |

## 6. Contrato do JWT (não é schema de banco, mas é um dado persistido em trânsito)

Payload atual (`auth.service.ts#login`):

```ts
{ sub: user.id, email: user.email, empresaId: selectedEmpresa.empresaId, profileId: user.profileId }
```

Payload novo:

```ts
{ sub: user.id, email: user.email, empresaId: selectedEmpresa.empresaId, profileId: user.profileId, clienteId: user.cliente?.id ?? null }
```

`validateUser()` passa a incluir `cliente: true` na consulta Prisma do `User`, e `jwt.strategy.ts#validate` repassa `clienteId` no objeto retornado (usado por `req.user.clienteId`).

## 7. Campo novo no cadastro de Cliente (DTO, não schema)

`CreateClienteDto`/`UpdateClienteDto` ganham `usuarioId?: number | null` — trafega junto com o resto do payload de `POST /clientes`/`PATCH /clientes/:id`, igual a `municipioId`/`estadoId`. Ver `interfaces/clientes-usuario-portal.md`.
