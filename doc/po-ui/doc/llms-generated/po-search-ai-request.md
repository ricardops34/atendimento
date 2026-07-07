# PoSearchAiRequest

**Tipo:** Interface / Modelo
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-search-ai-request

Interface que define o payload enviado ao endpoint de IA configurado via `p-url`.

O componente é **agnóstico ao provedor de IA**: o backend (proxy) recebe este payload,
encaminha para a LLM e retorna um `PoSearchAiResponse`.

## Propriedades

| Propriedade | Tipo | Opcional | Descrição |
|---|---|---|---|
| `columns` | `Array<PoSearchAiColumn>` | não | Metadados dos campos disponíveis para a busca (ver `PoSearchAiColumn`). |
| `query` | `string` | não | Texto em linguagem natural digitado pelo usuário. |
