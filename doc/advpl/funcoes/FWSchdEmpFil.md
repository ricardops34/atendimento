---
title: "FWSchdEmpFil"
function_name: "FWSchdEmpFil"
doc_type: "function"
status: "published"
page_id: 364921446
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=364921446"
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

# FWSchdEmpFil

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=364921446

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cCodigo | Caracter | Código do Schedule cadastrado | X |

## Retorno

Será retornada uma string com a Empresa e a Filial para o qual o processo está cadastrado.

Sintaxe
FWSchdEmpFil( cCodigo ) →

Parâmetros
NomeTipoDescriçãoObrigatório
cCodigo CaracterCódigo do Schedule cadastradoX

Exemplo de uso
Chamada da rotina via fonte:
User function u_tstEmpFil()
Local cEmpFil
cEmpFil := FWSchdEmpFil("000005")
  		MsgAlert(cEmpFil)
Return

O retorno da variável "cEmpFil" será "9901".
Para o caso de haver mais de uma empresa e/ou filial para o mesmo código, a informação será separada por ";". Por exemplo: "9901;1010"
