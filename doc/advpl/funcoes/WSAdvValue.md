---
title: "WSAdvValue"
function_name: "WSAdvValue"
doc_type: "function"
status: "published"
page_id: 361450525
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=361450525"
tdn_last_modified: "16 mai, 2018"
exported_at: "2026-06-03 09:59:06"
has_parameters: true
has_example: false
section_keys: [parametros]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# WSAdvValue

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=361450525

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| oXml | Objeto | Objeto XML do retorno do SOAP | X |
| cObjCpoInfo | Caracter | String com path do XML a ser recuperado | X |
| cType | Caracter | Tipo do dado no XML | X |
| xDefault | Caracter | Valor default caso não consiga recuperar do XML | N |
| cNotNILMsg | Caracter | Mensagem de erro caso seja obrigatório o valor, e não tenha | N |
| lAsArray | Lógico | Indica se retorno deverá vir como array | N |
| cAdvType | Caracter | Tipo do dado em Advpl | N |
| cAdv2Par | Caracter | Variável que será preenchida com valor do XML | N |
| cRecNS | Caracter | Namespace | N |
| lRealLong | Lógico | Se verdadeiro, utilizará função DEC_CREATE para retornar valor numérico caso tipo do XML seja LONG. Default .F. | N |
