# PoSearchAiError

**Tipo:** Interface / Modelo
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-search-ai-error

Interface que define o objeto emitido pelo evento `p-error` quando a chamada à
API de IA falha (erro HTTP, timeout, resposta inválida, etc.).

## Propriedades

| Propriedade | Tipo | Opcional | Descrição |
|---|---|---|---|
| `message` | `string` | não | Mensagem de erro. |
| `query` | `string` | não | Texto original digitado pelo usuário. |
| `statusCode` | `number` | não | Código HTTP do erro (ex: `500`, `408` para timeout). |
