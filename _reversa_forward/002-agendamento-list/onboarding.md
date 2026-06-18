# Onboarding: Listagem de Atendimentos

> Identificador: `002-agendamento-list`
> Data: `2026-06-17`
> Pré-requisito: feature `001-scaffold-repositorio` concluída e ambiente rodando

## Pré-condições

1. `npm run dev` na raiz do projeto está rodando (backend na porta 3000, frontend na porta 4200)
2. Banco PostgreSQL acessível com `DATABASE_URL` configurado em `backend/.env`
3. Prisma migrations aplicadas: `cd backend && npx prisma migrate deploy`
4. Pelo menos um tenant, usuário, perfil e agendamento criados no banco (ver passo 1 abaixo)

---

## Passo 1 — Criar dados de teste no banco

Execute no `psql` ou via seed do Prisma:

```sql
-- Tenant
INSERT INTO tenants (name, slug) VALUES ('Teste', 'teste') ON CONFLICT DO NOTHING;

-- Módulo appointments-list
INSERT INTO modules (name, key) VALUES ('Listagem de Atendimentos', 'appointments-list') ON CONFLICT DO NOTHING;

-- Perfil com módulo liberado (ajuste os IDs conforme os retornados acima)
INSERT INTO profiles (tenant_id, name) VALUES (1, 'Admin') ON CONFLICT DO NOTHING;
INSERT INTO users (tenant_id, profile_id, name, email, password)
  VALUES (1, 1, 'Ricardo', 'r@test.com', '<bcrypt_hash>') ON CONFLICT DO NOTHING;
INSERT INTO profile_modules (profile_id, module_id, can_read, can_write)
  VALUES (1, (SELECT id FROM modules WHERE key='appointments-list'), true, true)
  ON CONFLICT DO NOTHING;
```

---

## Passo 2 — Fazer login e obter token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"r@test.com","password":"<senha>","tenantSlug":"teste"}'
```

Copie o `accessToken` retornado.

---

## Passo 3 — Verificar endpoint de search

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/agendamentos/search?page=1&pageSize=20"
```

Resposta esperada:
```json
{ "items": [...], "page": 1, "pageSize": 20, "total": 0, "hasNext": false }
```

---

## Passo 4 — Testar a tela no browser

1. Acesse `http://localhost:4200`
2. Faça login com as credenciais do passo 1
3. Navegue para **Serviços > Agendamentos** no menu lateral
4. Verifique:
   - Tabela carrega com colunas: Data, Contrato, Profissional, Modalidade, Duração Total, Status
   - Paginação clássica aparece abaixo da tabela com seletor de 10 / 20 / 50
   - Botão "Filtros" abre modal com campos Data, Status, Modalidade, Contrato, Profissional
   - Busca rápida filtra por descrição, contrato ou profissional

---

## Passo 5 — Testar confirmação de atendimento

1. Crie um agendamento com `tipo = 'A'` via API ou pela tela de calendário
2. Na listagem, a linha deve mostrar a ação **Confirmar**
3. Clique em Confirmar — a linha deve mudar para status "Realizada" e o botão deve sumir
4. Clique em Confirmar novamente (via API): deve retornar HTTP 422

---

## Passo 6 — Testar exportação

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/agendamentos/export?format=csv" \
  --output atendimentos.csv

curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/agendamentos/export?format=xls" \
  --output atendimentos.xlsx
```

Verifique que os arquivos são baixados e abrem corretamente.

---

## Passo 7 — Testar botão OS

1. Na listagem, cada linha deve ter o ícone de OS
2. Passe o cursor sobre o ícone — deve aparecer o tooltip "Módulo em migração"
3. Clique no ícone — nenhuma ação deve ocorrer

---

## Passo 8 — Rodar os testes

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

Todos os testes devem passar. Se `lista.spec.ts` falhar em testes de "mostrar mais", significa que a migração de paginação não foi concluída.
