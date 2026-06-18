# Frontend

SPA Angular + PO-UI do MVP de atendimento.

## Padroes do projeto

Veja `../docs/project-patterns.md`.

- Angular: manter linha `v21`
- PO-UI: manter linha `v21`
- Icones PO-UI v21: usar `Animalia Icons` (`an an-*`)
- Menu lateral: usar `icon`, `shortLabel` e opcao explicita de logoff

## Ambiente local

O frontend usa a API local em `http://localhost:3000`, definida em `src/environments/environment.development.ts`.

## Subir localmente

Com o backend já rodando:

```bash
npm run dev:frontend
```

Acesse `http://localhost:4200`.

## Login local

- `admin@fallback.com`
- `admin123`

## Verificação

```bash
npm --prefix frontend test
npm --prefix frontend run build
```
