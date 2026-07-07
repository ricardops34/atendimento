# PoSearchAiComponent

**Seletor:** `po-search-ai`
**Tipo:** Componente / Diretiva
**Pacote:** `@po-ui/ng-components`
**Referência:** https://po-ui.io/documentation/po-search-ai

O `po-search-ai` é um componente de **busca em linguagem natural** baseado em input.
Ele permite que o usuário digite uma consulta em texto livre (por exemplo,
"clientes de SP com saldo acima de R$ 500"*) e a converte, através de um provedor de IA,
em um filtro estruturado (normalmente OData) que pode ser aplicado por outro componente,
como o [`po-table`](/documentation/po-table).

> **Componente experimental:** o `po-search-ai` está em fase experimental. Sua API
> (propriedades, eventos e contrato com o backend) pode sofrer alterações
> entre versões. Utilize com cautela em ambientes de produção.

O componente é **agnóstico ao provedor de IA**. Toda a comunicação ocorre através do
endpoint informado em `p-url`, que recebe `{ query, columns }` e deve retornar
`{ filter, description, confidence }`. Isso garante que nenhuma chave de IA seja
exposta no client-side — a integração com a LLM é responsabilidade do backend (proxy).

Por herdar de `po-input`, o componente suporta as propriedades comuns de formulário
(label, help, helper, required, disabled, readonly, size, clean, loading, etc.) e
integra-se a formulários `template-driven` e `reactive`.

#### Endpoint de IA (backend)

O componente **não conversa diretamente com a LLM**. Você deve disponibilizar um endpoint
próprio (proxy) e informá-lo em `p-url`.
É nesse backend que devem ficar a chave de acesso da IA e as regras usadas para montar
o prompt. Essas informações nunca devem ficar expostas no client-side

O contrato é simples. O componente faz um `POST` enviando:

```json
{
  "query": "funcionários de São Paulo com salário acima de 5000",
  "columns": [
    { "property": "name", "label": "Nome", "type": "string" },
    { "property": "city", "label": "Cidade", "type": "string" },
    { "property": "salary", "label": "Salário", "type": "number" }
  ]
}
```

E o endpoint deve responder com:

```json
{
  "filter": "city eq 'São Paulo' and salary gt 5000",
  "description": "Funcionários de São Paulo com salário acima de 5000",
  "confidence": 0.92
}
```

Onde `filter` é o filtro estruturado gerado pela IA (normalmente OData), `description` é um
resumo legível e `confidence` (`0.0` a `1.0`) indica o quão confiável foi a interpretação —
comparado com `p-min-confidence` para decidir entre os eventos `p-result` e `p-low-confidence`.

> **Exemplo de implementação:** o PO UI mantém um backend de referência, open source, que recebe
> esse contrato e o encaminha para um provedor de IA (Groq/Gemini).
> - Endpoint público: [`/v1/ai/filter`](https://po-sample-api.onrender.com/api#/ai)
> - Código-fonte: [po-sample-api/src/ai/ai.service.ts](https://github.com/po-ui/po-sample-api/blob/main/src/ai/ai.service.ts)

#### Estados de comportamento

- **Idle:** aguardando a digitação da consulta.
- **Loading:** consulta em andamento (ícone de carregamento ativo).
- **Aplicado:** após uma resposta bem-sucedida, exibe um feedback persistente de
"filtro aplicado via IA" enquanto a consulta estiver ativa, com opção de limpeza rápida.
- **Baixa confiança:** quando `confidence` for menor que `p-min-confidence`, emite
`p-low-confidence` e não aplica o filtro automaticamente.
- **Erro:** quando a chamada falha, emite `p-error`.

#### Tokens customizáveis

É possível alterar o estilo do componente usando os seguintes tokens (CSS):

> Para maiores informações, acesse o guia [Personalizando o Tema Padrão com Tokens CSS](https://po-ui.io/guides/theme-customization).

| Propriedade | Descrição | Valor Padrão |
|-------------------------------|-----------------------------------------------------------------|------------------------------------|
| **Default** | | |
| `--font-family` | Família tipográfica do campo | `var(--font-family-theme)` |
| `--font-size` | Tamanho da fonte do campo | `var(--font-size)` |
| `--text-color` | Cor do texto digitado | `var(--color-neutral-dark-90)` |
| `--text-color-placeholder` | Cor do texto do placeholder | `var(--color-neutral-light-30)` |
| `--color` | Cor da borda do campo | `var(--color-neutral-dark-70)` |
| `--background` | Cor de fundo do campo | `var(--color-neutral-light-05)` |
| `--border-radius` | Raio da borda do campo | `var(--border-radius-md)` |
| **Ícones e divisória** | | |
| `--color-icon-read` | Cor do ícone de busca por IA | `var(--color-neutral-dark-70)` |
| `--color-divider` | Cor da divisória vertical entre o campo e o botão de busca | `var(--color-neutral-mid-40)` |
| `--color-icon-processing` | Cor do ícone exibido enquanto a consulta está sendo processada | `var(--color-action-default)` |
| **Hover** | | |
| `--color-hover` | Cor da borda no estado hover | `var(--color-brand-01-dark)` |
| `--background-hover` | Cor de fundo no estado hover | `var(--color-brand-01-lightest)` |
| **Focused** | | |
| `--color-focused` | Cor da borda no estado de foco | `var(--color-action-default)` |
| `--outline-color-focused` | Cor do outline no estado de foco | `var(--color-action-focus)` |
| **Disabled** | | |
| `--color-disabled` | Cor da borda no estado desabilitado | `var(--color-neutral-light-30)` |
| `--background-disabled` | Cor de fundo no estado desabilitado | `var(--color-neutral-light-20)` |

## Inputs

| Propriedade | Alias | Tipo | Opcional | Padrão | Descrição |
|---|---|---|---|---|---|
| `columns` | `p-columns` | `Array<PoSearchAiColumn>` | sim | `[]` | Metadados das colunas/campos disponíveis para a busca por IA. Essas informações são |
| `literals` | `p-literals` | `PoSearchAiLiterals` | sim | - | Objeto com os literais usados no componente. Permite sobrescrever as mensagens padrão |
| `minConfidence` | `p-min-confidence` | `number` | sim | `0.5` | Nível mínimo de confiança (`0.0` a `1.0`) para que o resultado da IA seja considerado |
| `timeout` | `p-timeout` | `number` | sim | `10000` | Tempo máximo de espera (em milissegundos) pela resposta da IA antes de abortar a |
| `url` | `p-url` | `string` | sim | - | Endpoint (proxy) responsável por encaminhar a consulta para o provedor de IA. |

## Outputs

| Evento | Alias | Tipo | Descrição |
|---|---|---|---|
| `clearEvent` | `p-clear` | `EventEmitter` | Evento disparado quando o filtro aplicado via IA é limpo, seja pela ação do usuário |
| `error` | `p-error` | `EventEmitter` | Evento disparado quando a chamada à API de IA falha (erro HTTP, timeout, etc.). |
| `lowConfidence` | `p-low-confidence` | `EventEmitter` | Evento disparado quando a confiança da resposta da IA é menor que `p-min-confidence`. |
| `result` | `p-result` | `EventEmitter` | Evento disparado quando a IA retorna um resultado com confiança maior ou igual a |

## Métodos

### `search()`

Envia a consulta atual (valor do campo) para o endpoint de IA configurado em `p-url`.

Caso a consulta esteja vazia ou `p-url` não esteja definido, nada é feito.
O resultado é emitido via `p-result` (ou `p-low-confidence` quando a confiança for baixa)
e falhas são emitidas via `p-error`.

### `clearSearch()`

Limpa o filtro aplicado via IA, esvazia o campo e emite o evento `p-clear`.

### `onSearchKeydown(event: )`

Manipula a tecla pressionada no campo: dispara a busca ao pressionar `Enter`.
