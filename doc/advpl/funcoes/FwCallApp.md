---
title: "FwCallApp"
function_name: "FwCallApp"
doc_type: "function"
status: "published"
page_id: 512430562
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=512430562"
tdn_last_modified: "27 set, 2024"
exported_at: "2026-06-03 09:58:36"
has_parameters: true
has_example: false
section_keys: [parametros]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwCallApp

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=512430562

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cApp | Caracter | Nome do aplicativo | X |
| oOwner | Objeto | Objeto Dialog para o caso de querer usar uma janela própria
Obs.: Caso enviado, o Activate deverá ser feito para abrir a tela. | N |
| oEngine | Objeto | Enviado por referência para o caso de querer manipular o objeto do TWebEngine | N |
| oChannel | Objeto | Enviado por referência para o caso de querer manipular o objeto do TWebChannel | N |
| cHost | Caracter | Host para uma simples abertura de browse.
Obs.: Caso enviado, todo pré-processamento será pulado | N |
| cSource | Caracter | Nome do fonte, caso não seja o mesmo nome do APP. | N |
| Param7 |  | Parâmetro interno | N |
| Param8 |  | Parâmetro interno | N |
| Param9 |  | Parâmetro interno | N |
| lUseOnBoarding | Lógico | Indica se abre o wizard de configuração para utilizar apps (mais informações abaixo) | N |
