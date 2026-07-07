# PoTableSearchAiField

**Tipo:** Interface / Modelo
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-table-search-ai-field

Interface de configuração da busca por IA integrada ao `po-table`, utilizada pela
propriedade `p-search-ai-field`.

Quando configurada, a tabela renderiza um campo `po-search-ai` na barra de ações,
no lugar da busca textual padrão (`po-search`). O filtro gerado pela IA é aplicado
automaticamente aos dados da tabela, conforme a estratégia definida em `apply`.

#### Endpoint de IA (`url`)

O campo `url` deve apontar para um endpoint (proxy) que implemente o contrato do
`po-search-ai`: recebe `{ query, columns }` via `POST` e responde com
`{ filter, description, confidence }`.

> A integração com a LLM e a guarda de chaves devem ocorrer **no backend**, nunca
> no client-side. O backend de referência open source está disponível em
> [`po-sample-api`](https://github.com/po-ui/po-sample-api).

#### Colunas enviadas à IA

Por padrão, os metadados enviados ao endpoint são derivados automaticamente de
`p-columns` da tabela, respeitando as colunas visíveis e excluindo aquelas com
`searchAiIgnore: true`. O campo `columns` permite sobrescrever esse comportamento.

#### Estratégia de aplicação do filtro (`apply`)

| Valor | Comportamento |
|-------|---------------|
| `'auto'` (padrão) | Modo serviço: envia `$filter` ao `p-service-api`; modo local: aplica o parser OData interno sobre `p-items`. |
| `'parser'` | Sempre usa o parser OData interno. No modo serviço, busca todos os dados e filtra localmente. |
| `'server'` | Sempre delega o filtro ao `p-service-api` via `$filter`. |
| `'none'` | Não aplica o filtro; apenas emite `p-search-ai-result` para o desenvolvedor tratar. |
| `(result) => void` | Override total: o desenvolvedor recebe o resultado e assume o controle. |

## Propriedades

| Propriedade | Tipo | Opcional | Descrição |
|---|---|---|---|
| `apply` | `'auto' | 'parser' | 'server' | 'none' | ((result: PoSearchAiResult) => void)` | sim | Define como o filtro OData retornado pela IA é aplicado à tabela. |
| `columns` | `Array<PoSearchAiColumn>` | sim | Override das colunas enviadas ao endpoint de IA. Quando omitido, os metadados |
| `literals` | `PoSearchAiLiterals` | sim | Objeto com os literais usados pelo `po-search-ai` integrado à tabela. Permite |
| `minConfidence` | `number` | sim | Nível mínimo de confiança (`0.0` a `1.0`) para que o filtro gerado pela IA seja |
| `placeholder` | `string` | sim | Texto exibido como placeholder no campo de busca por IA. |
| `timeout` | `number` | sim | Tempo máximo de espera (em milissegundos) pela resposta do endpoint de IA. |
| `url` | `string` | não | Endpoint (proxy) de IA responsável por converter a consulta em linguagem natural |
