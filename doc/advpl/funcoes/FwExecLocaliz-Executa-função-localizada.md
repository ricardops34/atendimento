---
title: "FwExecLocaliz - Executa função localizada."
function_name: "FwExecLocaliz"
doc_type: "function"
status: "published"
page_id: 287071131
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=287071131"
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

# FwExecLocaliz - Executa função localizada.

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=287071131

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cFunction | String | Função base para localização. | N |
| uParam | Variável | Parâmetro a ser passado para função localizada. | N |

## Exemplo

```text
FwExecLocaliz("ExecTes",{“Param1"})
No ambiente Brasil irá executar a  função ExecTesBRA, enviando um array e retornando o valor que a função localizada retornar.
No ambiente Rússia irá executar a  função ExecTesRUS, enviando um array e retornando o valor que a função localizada retornar.
A função deve estar no fonte localizado da rotina padrão que a chamou.
Exemplo.
O fonte padrão atfa050.prw executou a chamada da função localizada FwExecLocaliz("ExecTes",{“Param1"})
A função ExecTesBRA() somente será executada se ela estiver no fonte ATFA050BRA.PRW

Declaração
FwExecLocaliz( cFunction, uParam ) -> xRetorno
Parâmetros:
NomeTipoDescriçãoDefaultObrigatório
cFunction StringFunção base para localização. X
uParam VariávelParâmetro a ser passado para função localizada.
```

## Retorno

NomeTipoDescrição
xRetornoVariávelRedireciona o retorno que a função localizada processou.

Exemplos

User Function TesteExeLoc()

Local cValue

cValue := FwExecLocaliz("Exemplo",{"Mario"})

Return cValue

//Função Localizada

Function ExemploBRA(aParam)
Local cNome := aParam[1]
Local cValue := "Bem vindo ao Brasil " + cNome
Return cValue
