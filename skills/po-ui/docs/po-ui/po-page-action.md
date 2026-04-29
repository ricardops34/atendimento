# PoPageAction

**Tipo:** Interface / Modelo
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-page-action

Interface para as ações dos componentes po-page-default e po-page-list.

> Quando o array de actions possui quatro ou mais registros, os dois últimos e os seguintes são automaticamente agrupados no po-dropdown.
A partir desse ponto, as propriedades `selected`, `separator`, `type` e `subItems` passam a ter efeito apenas nas ações exibidas dentro do dropdown, ou seja, a partir da terceira ação.
Dessa forma, o uso de subItems (agrupadores dentro do dropdown) só terá efeito quando houver pelo menos quatro ações definidas.

## Propriedades

| Propriedade | Tipo | Opcional | Descrição |
|---|---|---|---|
| `action` | `Function` | sim | Ação que será executada, sendo possível passar o nome ou a referência da função. |
| `disabled` | `boolean | Function` | sim | Função que deve retornar um booleano para habilitar ou desabilitar a ação para o registro selecionado. |
| `icon` | `string | TemplateRef<void>` | sim | Define um ícone que será exibido ao lado esquerdo do rótulo. |
| `label` | `string` | não | Rótulo da ação. |
| `selected` | `boolean` | sim | Define se a ação está selecionada. |
| `separator` | `boolean` | sim | Atribui uma linha separadora acima do item. |
| `subItems` | `Array<PoDropdownAction>` | sim | Array de ações (`PoDropdownAction`) usado para criar agrupadores de subitens. |
| `type` | `string` | sim | Define a cor do item, sendo `default` o padrão. |
| `url` | `string` | sim | URL utilizada para redirecionamento das páginas. |
| `visible` | `boolean | Function` | sim | Define se a ação será visível. |
