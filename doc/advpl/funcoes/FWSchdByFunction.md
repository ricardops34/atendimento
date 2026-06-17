---
title: "FWSchdByFunction"
function_name: "FWSchdByFunction"
doc_type: "function"
status: "published"
page_id: 364921365
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=364921365"
tdn_last_modified: "29 mai, 2018"
exported_at: "2026-06-03 09:58:48"
has_parameters: true
has_example: false
section_keys: [parametros, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FWSchdByFunction

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=364921365

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cRotina | Caracter | Nome da rotina cadastrada no Schedule | X |

## Retorno

Será mostrado o código cadastrado em formato de caractere.

Sintaxe
FWSchdByFunction( cRotina ) →

Parâmetros
NomeTipoDescriçãoObrigatório
cRotina CaracterNome da rotina cadastrada no ScheduleX

Exemplo de uso
Rotina cadastrada no Schedule: ROTNAX (código “0001” gerado automaticamente)

Chamada da rotina via fonte:
User function u_tstVldINCLUI()

Local cCodSchedule
cCodSchedule := FWSchdByFunction("ROTNAX")
		MsgAlert(cCodSchedule)
Return
O retorno da variável “cCodSchedule” será “0001”.
