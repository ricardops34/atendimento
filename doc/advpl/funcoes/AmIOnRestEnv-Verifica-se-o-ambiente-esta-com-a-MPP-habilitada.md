---
title: "AmIOnRestEnv - Verifica se o ambiente esta com a MPP habilitada"
function_name: "AmIOnRestEnv"
doc_type: "function"
status: "published"
page_id: 870411743
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=870411743"
tdn_last_modified: "27 set, 2024"
exported_at: "2026-06-03 09:58:30"
has_parameters: false
has_example: false
section_keys: [sintaxe]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# AmIOnRestEnv - Verifica se o ambiente esta com a MPP habilitada

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=870411743

## Sintaxe

```text
AmIOnRestEnv() →lRet

Retorno
lRet → Valor booleano que indica se esta habilitada ou não

Exemplo de uso
#include "protheus.ch"
#include "fwmvcdef.ch"

//-------------------------------------------------------------------
/*{Protheus.doc} callMyApp
Chamada do aplicativo

@author  Framework
@since   27/09/2024
@version 1.0
*/
//-------------------------------------------------------------------
Function callMyApp()
    If AmIOnRestEnv()
		FwCallApp("myapp")
	Else
		Alert('Para utilizar aplicativos a porta multiprotocolo deve ser habilitada')
    Endif
Return
```
