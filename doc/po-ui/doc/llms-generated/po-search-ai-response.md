# PoSearchAiResponse

**Tipo:** Interface / Modelo
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-search-ai-response

Interface que define a resposta esperada do endpoint de IA configurado via `p-url`.

## Propriedades

| Propriedade | Tipo | Opcional | Descrição |
|---|---|---|---|
| `confidence` | `number` | sim | Nível de confiança da interpretação da IA, em um intervalo de `0.0` a `1.0`. |
| `data` | `Record<string, any>` | sim | Payload genérico da resposta da IA (mensagem de chat, ações, dados customizados, etc.). |
| `description` | `string` | sim | Descrição legível, em linguagem natural, da resposta. |
| `filter` | `string` | sim | Filtro gerado pela IA, normalmente no padrão OData |
| `type` | `PoSearchAiResponseType` | sim | Tipo da resposta retornada pela IA. |
