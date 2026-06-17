---
title: "FWMVCRotAuto"
function_name: "FWMVCRotAuto"
doc_type: "function"
status: "published"
page_id: 347439760
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=347439760"
tdn_last_modified: "26 mar, 2018"
exported_at: "2026-06-03 09:58:44"
has_parameters: true
has_example: false
section_keys: [parametros]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FWMVCRotAuto

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=347439760

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| oModel | Objeto | Objeto com o modelo do formulário de dados | X |
| cAlias | Caracter | Alias do Browse principal | N |
| nOpcAuto | Numérico | Código de identificação do tipo de processamento da rotina automática
[3] Inclusão / [4] Alteração / [5] Exclusão | N |
| aAuto | Array | Array com os dados da rotina automática na seguinte estrutura
[n][1] Código do formulário do Modelo que terá uma atribuição
[n][2] Array padrão dos dados da EnchAuto e GetDAuto, conforme documentação anterior | X |
| lSeek | Lógico | Indica se o arquivo principal deve ser posicionado com base nos dados fornecidos. | N |
| lPosaRot | Lógico | Indica se o nOpc não deve ser calculado com base no aRotina | N |
