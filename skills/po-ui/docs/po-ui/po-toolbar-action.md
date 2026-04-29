# PoToolbarAction

**Tipo:** Interface / Modelo
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-toolbar-action

Interface para lista de ações do componente.

## Propriedades

| Propriedade | Tipo | Opcional | Descrição |
|---|---|---|---|
| `action` | `Function` | sim | Ação que será executada, sendo possível passar o nome ou a referência da função. |
| `disabled` | `boolean | Function` | sim | Função que deve retornar um booleano para habilitar ou desabilitar a ação para o registro selecionado. |
| `icon` | `string | TemplateRef<void>` | sim | Define um ícone que será exibido ao lado esquerdo do rótulo. |
| `label` | `string` | não | Rótulo da ação. |
| `selected` | `boolean` | sim | Define se a ação está selecionada. |
| `separator` | `boolean` | sim | Atribui uma linha separadora acima do item. |
| `type` | `string` | sim | Define a cor do item, sendo `default` o padrão. |
| `url` | `string` | sim | URL utilizada para redirecionamento das páginas. |
| `visible` | `boolean | Function` | sim | Define se a ação será visível. |
