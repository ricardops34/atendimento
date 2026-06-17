---
title: "FwBranAltInf - Informações do cadastro de Filial Localizado"
function_name: "FwBranAltInf"
doc_type: "function"
status: "published"
page_id: 273997191
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=273997191"
tdn_last_modified: "04 mai, 2017"
exported_at: "2026-06-03 09:58:36"
has_parameters: true
has_example: false
section_keys: [parametros, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwBranAltInf - Informações do cadastro de Filial Localizado

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=273997191

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| aFields | Array | Array com os campos da tabela de empresa localizada (SYS_BRANCH_L_+cPaisLoc) | N |
| cGrpCompany | String | Grupo de Empresa | cEmpAnt |
| cBranch | String | Filial | cFilAnt |

## Retorno

NomeTipoDescrição
aRetornoArrayArray com a estrutura [Campo][Conteudo]

Exemplos
aRet := FwBranAltInf({'BR_KPP','BR_FULLNAM'})

Conteudo do aRetorno

{
	{'BR_KPP', '5151'},
	{'BR_FULLNAM', 'Empresa'}
}
