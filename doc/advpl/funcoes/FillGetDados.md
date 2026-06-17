---
title: "FillGetDados"
function_name: "FillGetDados"
doc_type: "function"
status: "published"
page_id: 692933217
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=692933217"
tdn_last_modified: "10 jun, 2022"
exported_at: "2026-06-03 09:58:33"
has_parameters: true
has_example: true
section_keys: [parametros, exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FillGetDados

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=692933217

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| nOpc | Numérico | Número correspondente à operação a ser executada. | X |
| cAlias | Caracter | Alias da tabela referente aos itens. | X |
| nOrder | Numérico | Ordem correspondente a chave de índice para preencher o aCols. Default é 1. | N |
| cSeekKey | Caracter | Chave utilizada no posicionamento da área para preencher o aCols. | N |
| bSeekWhile | Bloco de código | Bloco contendo a expressão a ser comparada com cSeekKey na condição do While. | N |
| uSeekFor | Qualquer | Condição para execução do While. | N |
| aNoFields | Vetor | Array com nome dos campos que serão excluídos na montagem do aHeader. | N |
| aYesFields | Vetor | Array com nome dos campos que serão incluídos na montagem do aHeader. | N |
| lOnlyYes | Lógico | Flag indicando se considera somente os campos declarados no aYesFields + campos do usuário. Default é .F. | N |
| cQuery | Caracter | Query para filtro da tabela cAlias. | N |
| bMontCols | Bloco de código | Bloco contendo função especifica para preencher o aCols. | N |
| lEmpty | Lógico | Se for uma inclusão, passar .T. para que o aCols seja inicializado com 1 linha em  branco. | N |
| aHeaderAux | Vetor | Nome do aHeader auxiliar. Caso necessite tratar o aHeader e aCols como variáveis locais (por exemplo, no uso de várias getdados). | N |
| aColsAux | Vetor | Nome do aCols auxiliar. Caso necessite tratar o aHeader e aCols como variáveis locais (por exemplo, no uso de várias getdados). | N |
| bAfterCols | Bloco de código | Bloco executado após a inclusão de cada linha no aCols. | N |
| bBeforeCols | Bloco de código | Bloco de código contendo expressão para sair do While. É executado antes da inclusão de cada linha no aCols. | N |
| bAfterHeader | Bloco de código | Bloco para manipular o aHeader após o preenchimento dos campos padrões e antes de incluir os campos reservados para o WalkThru. | N |
| cAliasQry | Caracter | Nome do alias para a query. | N |
| bCriaVar | Bloco de código | Bloco de código para criar a variável de memória. | N |
| lUserFields | Lógico | Define se inclui os campos de usuários. Default é .F. | N |
| aYesUsado | Vetor | Array com o nome dos campos que deverão ser apresentados. | N |

## Exemplo

```text
{{bCondicao1, bTrue1, bFalse1}, {bCondicao2, bTrue2, bFalse2}.. bCondicaoN, bTrueN, bFalseN}
cQuery
Se ambiente utilizado for TOP e cQuery estiver preenchido, desconsidera os parâmetros cSeekKey e bSeekWhile caso tenham sido informados.
Para a criação do aHeader e aCols via Query, a tabela não poderá possuir campos do tipo MEMO. Caso seja necessário incluir condições para a inclusão dos registros no aCols será necessário a utilização dos parâmetros cSeekKey e bSeekWhile.
aYesFields
Quando utilizar esse parâmetro buscando os campos do dicionário de dados (SX3), remova os espaços em branco utilizando a função AllTrim.
```
