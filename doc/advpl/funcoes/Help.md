---
title: "Help"
function_name: "Help"
doc_type: "function"
status: "published"
page_id: 345541359
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=345541359"
tdn_last_modified: "15 mar, 2018"
exported_at: "2026-06-03 09:58:52"
has_parameters: true
has_example: true
section_keys: [parametros, sintaxe, exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# Help

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=345541359

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cRotina | Caracter | Mantido por compatibilidade, não utilizar | N |
| nLinha | Numérico | Mantido por compatibilidade, não utilizar | N |
| cCampo | Caracter | Código do Help no sigahlp, caso não for informado, deve-se informar o cMensagem | N |
| cNome | Caracter | Caso informado, substitui o cCampo(Usado para o cMensagem) | N |
| cMensagem | Caracter | Mensagem apresentada pelo help quando o código não é informado | N |
| nLinha1 | Numérico | Linha inicial para apresentar a mensagem | N |
| nColuna | Numérico | Coluna inicial para apresentar a mensagem | N |
| lPop | Lógico | Mantido por compatibilidade, não utilizar | N |
| hWnd | Objeto | Mantido por compatibilidade, não utilizar | N |
| nHeight | Numérico | Mantido por compatibilidade, não utilizar | N |
| nWidth | Numérico | Mantido por compatibilidade, não utilizar | N |
| lGravaLog | Lógico | Indica se deve gravar log da mensagem de Help | N |
| aSoluc | Array | Array simples com mensagem de solução para o Help | N |

## Sintaxe

```text
help( cRotina , nLinha , cCampo , cNome , cMensagem , nLinha1 , nColuna , lPop , hWnd , nHeight , nWidth , lGravaLog , aSoluc )

Parâmetros:
NomeTipoDescriçãoObrigatório
cRotinaCaracterMantido por compatibilidade, não utilizar

nLinhaNuméricoMantido por compatibilidade, não utilizar

cCampoCaracterCódigo do Help no sigahlp, caso não for informado, deve-se informar o cMensagem

cNomeCaracterCaso informado, substitui o cCampo(Usado para o cMensagem)

cMensagemCaracterMensagem apresentada pelo help quando o código não é informado

nLinha1NuméricoLinha inicial para apresentar a mensagem

nColunaNuméricoColuna inicial para apresentar a mensagem

lPopLógicoMantido por compatibilidade, não utilizar

hWndObjetoMantido por compatibilidade, não utilizar

nHeightNuméricoMantido por compatibilidade, não utilizar

nWidthNuméricoMantido por compatibilidade, não utilizar

lGravaLogLógicoIndica se deve gravar log da mensagem de Help

aSolucArrayArray simples com mensagem de solução para o Help
```

## Exemplo

```text
ElseIf cIdPonto == 'FORMPOS'
	Help(NIL, NIL, "Texto do Help", NIL, "Texto do Problema", 1, 0, NIL, NIL, NIL, NIL, NIL, {"Texto da Solução"})
	xRet := .F.
EndIf
```
