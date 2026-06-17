---
title: "FwListBranches"
function_name: "FwListBranches"
doc_type: "function"
status: "published"
page_id: 423939703
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=423939703"
tdn_last_modified: "26 out, 2018"
exported_at: "2026-06-03 09:58:42"
has_parameters: true
has_example: false
section_keys: [parametros]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwListBranches

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=423939703

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| lCheckUser | Lógico | Indica se exibirá apenas as filiais que o usuário possui acesso. Valor default: .T. | N |
| lAllEmp | Lógico | Indica se exibirá todas as empresas do grupo ou apenas unidade de negócio e filiais da empresa logada. Valor default: .F. | N |
| lOnlySelect | Lógico | Indica se o retorno da função irá considerar todos registros apresentados ou apenas os registros marcados. Valor default: .T. | N |
| aRetInfo | Array | Indica os campos que serão retornados no término da rotina.
Valor Default: { 'FLAG', 'SM0_CODFIL', 'SM0_NOMRED', 'SM0_CGC', 'SM0_INSC', 'SM0_INSCM' }
Campos aceitos:
'FLAG' - indica se o registro foi marcado ou não
'SM0_CODFIL' - Código completo da filial
'SM0_EMPRESA' - Código da empresa
'SM0_UNIDNEG' - Código da unidade de negócio
'SM0_FILIAL' - Código da filial
'SM0_DESCEMP' - Nome da empresa
'SM0_NOMRED' - Nome da filial
'SM0_CGC' - CNPJ
'SM0_INSC' - Inscrição Estadual
'SM0_INSCM' - Inscrição Municipal | N |
