# PoHelperOptions

**Tipo:** Interface / Modelo
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-helper-options

Interface para configuração das opções de ajuda (*helper*).

## Propriedades

| Propriedade | Tipo | Opcional | Descrição |
|---|---|---|---|
| `content` | `string` | sim | Texto explicativo exibido no popover. |
| `eventOnClick` | `Function` | sim | Evento disparado ao clicar no ícone do helper. |
| `footerAction` | `{
    label: string;
    action: Function;
}` | sim | Ação customizada exibida no rodapé do popover. |
| `title` | `string` | sim | Título do helper exibido no popover. |
| `type` | `'info' | 'help'` | sim | Tipo do ícone exibido: `info` ou `help`. |
