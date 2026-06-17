---
title: "totvs.framework.company.getParameter"
function_name: "totvs"
doc_type: "function"
status: "published"
page_id: 981769877
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=981769877"
tdn_last_modified: "10 abr, 2026"
exported_at: "2026-06-03 09:59:01"
has_parameters: true
has_example: false
section_keys: [parametros]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# totvs.framework.company.getParameter

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=981769877

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cGroup | caractere | Código do grupo de empresa a ser pesquisado. | X |
| cBranch | caractere | Código da filial a ser pesquisada. | X |
| cParameter | caractere | Nome do parâmetro | X |
| lExists | lógico | Indica se deve apenas validar se o parâmetro existe
Default .F., caso true não retorna o conteúdo e sim se o parâmetro existe ou não (logical) | N |
| xDefault | variant | valor padrão a ser retornado caso o parâmetro não exista | N |
