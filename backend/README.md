# Backend

API NestJS do MVP de atendimento.

## Bootstrap local

1. Instale dependências:

```bash
npm install
```

2. Configure as variáveis com base em `backend/.env.example`.

3. Suba os bancos locais:

```bash
npm run db:up
```

4. Gere o client Prisma e aplique o schema:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Popule o usuário inicial:

```bash
npm run seed:backend
```

6. Opcionalmente importe dados do legado:

```bash
npm run import:legacy
```

7. Suba a API:

```bash
npm run dev:backend
```

## Credenciais locais

- `admin@fallback.com`
- `admin123`

## Verificação

```bash
npm --prefix backend test
npm --prefix backend run build
```
