---
title: "FwComAltInf - Informações do cadastro de Empresa Localizado"
function_name: "FwComAltInf"
doc_type: "function"
status: "published"
page_id: 273996793
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=273996793"
tdn_last_modified: "04 mai, 2017"
exported_at: "2026-06-03 09:58:37"
has_parameters: true
has_example: false
section_keys: [parametros, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwComAltInf - Informações do cadastro de Empresa Localizado

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=273996793

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| aFields | Array | Array com os campos da tabela de empresa localizada (SYS_COMPANY_L_+cPaisLoc) | N |
| cGrpCompany | String | Grupo de Empresa | cEmpAnt |
| cBranch | String | Filial | cFilAnt |

## Retorno

NomeTipoDescrição
aRetornoArrayArray com a estrutura [Campo][Conteudo]

Exemplos
aRet := FwComAltInf({'CO_KPP','CO_INN'})

Conteúdo do aRetorno

{
	{CO_KPP, '5151'},
	{CO_INN, '8887'}
}
