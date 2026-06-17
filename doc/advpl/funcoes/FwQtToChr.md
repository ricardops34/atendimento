---
title: "FwQtToChr"
function_name: "FwQtToChr"
doc_type: "function"
status: "published"
page_id: 611792525
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=611792525"
tdn_last_modified: "08 out, 2021"
exported_at: "2026-06-03 09:58:46"
has_parameters: true
has_example: true
section_keys: [parametros, sintaxe, retorno, exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwQtToChr

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=611792525

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cString | Caracter | String que será coloca entre aspas e terá seu conteúdo de aspas simples escapado | X |

## Sintaxe

```text
FwQtToChr( <cString> )
Parâmetros:
NomeTipoDescriçãoObrigatório
cStringCaracterString que será coloca entre aspas e terá seu conteúdo de aspas simples escapadoX
```

## Retorno

cString → Caracter - String formatada para o SQL

## Exemplo

```text
FWHasGed
#include "protheus.ch"

//-------------------------------------------------------------------
/*/{Protheus.doc} qtToChr
Exemplo de utilização da função FwQtToChr

@author Daniel Mendes
@since 14/04/2021
@version 1.0
*/
//-------------------------------------------------------------------
user function qtToChr()
local cString as char

cString := "gota d'água"

//Para uso dessa função, é necessário que exista uma conexão com o banco de dados (TCLink)
ConOut(FwQtToChr(cString))

return

Essa função está disponível na lib 20210517 ou superior
```
