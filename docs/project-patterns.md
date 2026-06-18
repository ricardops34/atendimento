# Project Patterns

## Frontend Stack

- Angular deve permanecer na linha `v21`.
- PO-UI deve permanecer na linha `v21`.
- Qualquer upgrade de Angular ou PO-UI deve preservar compatibilidade entre as duas stacks antes de entrar no projeto.
- Seguir os pre-requisitos oficiais do `po-ui/po-angular`: `Node.js 20.11.x+`, `@angular/cli@21`, Angular `21.2.x`, `rxjs 7.8.x`, `typescript 5.9.x` e `zone.js 0.15.x`.
- Dependencias usadas diretamente pelo bootstrap Angular devem estar declaradas no `package.json`; `zone.js` nao pode ficar apenas como dependencia transitiva.
- Em PO-UI `v21`, os icones devem usar `Animalia Icons` com prefixo `an an-*`.
- Nao usar `po-icon-*` em novas implementacoes ou ajustes no frontend `v21`.

## Menu Shell

- Itens do `po-menu` devem ter `icon`.
- Itens do `po-menu` devem ter `shortLabel`.
- O menu lateral deve expor uma opcao explicita de `Sair`/logoff.
