---
title: "MPIsSmart"
function_name: "MPIsSmart"
doc_type: "function"
status: "published"
page_id: 461919343
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=461919343"
tdn_last_modified: "28 mai, 2019"
exported_at: "2026-06-03 09:58:56"
has_parameters: false
has_example: false
section_keys: [conte_do]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# MPIsSmart

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=461919343

## ConteÃºdo

Descrição
Essa função é responsável por verificar se o ambiente que está sendo utilizado é SmartERP.

Sintaxe
MPIsSmart → lRet

Retorno
lRet-  Lógico (.T. ou .F.)

Exemplo
#include "protheus.ch"

User Function MyTest()

	If MPIsSmart()
    	Conout('Ambiente SmartERP')
	EndIf

Return
