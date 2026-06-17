---
title: "FWMonitorMsg"
function_name: "FWMonitorMsg"
doc_type: "function"
status: "published"
page_id: 643990275
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=643990275"
tdn_last_modified: "08 out, 2021"
exported_at: "2026-06-03 09:58:43"
has_parameters: true
has_example: true
section_keys: [parametros, sintaxe, retorno, exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FWMonitorMsg

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=643990275

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cMsg | Caracter | Texto que será apresentado na aba comentários do monitor do Protheus | X |

## Sintaxe

```text
FWMonitorMsg( cMsg )
Parâmetros:
NomeTipoDescriçãoObrigatório
cMsgCaracterTexto que será apresentado na aba comentários do monitor do ProtheusX
```

## Retorno

Nil

## Exemplo

```text
FWMonitorMsg
#include "protheus.ch"

//-------------------------------------------------------------------
/*/{Protheus.doc} MyMOnitor
Exemplo de utilização da função FWMonitorMsg

@author Framework
@since 01/10/2011
@version 1.0
*/
//-------------------------------------------------------------------
user function MyMOnitor()
local cMsg as char

cMsg:= "Minha Thread"

FWMonitorMsg(cMsg)

return

Esta função está disponível a partir da release 33 do Protheus. Em releases abaixo da 33 está disponível a partir do pacote de lib 20211116.
```
