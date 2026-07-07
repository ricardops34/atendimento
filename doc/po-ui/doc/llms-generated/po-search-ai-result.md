# PoSearchAiResult

**Tipo:** Interface / Modelo
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-search-ai-result

Interface que define o objeto emitido pelos eventos `p-result` e `p-low-confidence`.

## Propriedades

| Propriedade | Tipo | Opcional | Descrição |
|---|---|---|---|
| `confidence` | `number` | sim | Nível de confiança da interpretação (`0.0` a `1.0`). |
| `data` | `Record<string, any>` | sim | Payload genérico da resposta (chat, ações, dados customizados, etc.). |
| `description` | `string` | sim | Descrição legível da resposta. |
| `filter` | `string` | sim | Filtro retornado pela IA (ex: filtro OData). Presente quando `type` é `'filter'`. |
| `query` | `string` | não | Texto original digitado pelo usuário. |
| `type` | `PoSearchAiResponseType` | não | Tipo da resposta retornada pela IA. |
