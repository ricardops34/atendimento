---
title: "FwExistLocaliz - Verifica a existência da função localizada."
function_name: "FwExistLocaliz"
doc_type: "function"
status: "published"
page_id: 287071061
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=287071061"
tdn_last_modified: "20 set, 2017"
exported_at: "2026-06-03 09:58:38"
has_parameters: true
has_example: true
section_keys: [parametros, exemplo, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwExistLocaliz - Verifica a existência da função localizada.

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=287071061

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cFunction | String | Função base para localização | N |

## Exemplo

```text
FwExistLocaliz("ExecTes")
No ambiente Brasil irá verificar a existência da rotina ExecTesBRA
No ambiente Russia irá verificar a existência da rotina ExecTesRUS

A função deve estar no fonte localizado da rotina padrão que a chamou.
Exemplo.
O fonte padrão atfa050.prw executou a chamada da função localizada FwExecLocaliz("ExecTes",{“Param1"})
A função ExecTesBRA() somente será executada se ela estiver no fonte ATFA050BRA.PRW

Declaração
FwExistLocaliz( cFunction ) -> lRetorno
Parâmetros:
NomeTipoDescriçãoDefaultObrigatório
cFunction StringFunção base para localização X
```

## Retorno

NomeTipoDescrição
lRetornoLógicoRetorna se a função existe na localização do ambiente do sistema.

Exemplos
User Function TestExit(cFunction)

Local lRet

lRet := FwExistLocaliz("Exemplo")

Return lRet
