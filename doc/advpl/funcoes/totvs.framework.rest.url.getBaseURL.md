---
title: "totvs.framework.rest.url.getBaseURL"
function_name: "totvs"
doc_type: "function"
status: "published"
page_id: 901955138
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=901955138"
tdn_last_modified: "09 jan, 2025"
exported_at: "2026-06-03 09:59:02"
has_parameters: true
has_example: true
section_keys: [parametros, exemplo, sintaxe, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# totvs.framework.rest.url.getBaseURL

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=901955138

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| oRest | Objecto | Representa a requisição REST. | X |
| cEndPoint | Character | Representa o endpoint (caminho) na URL | N |

## Exemplo

```text
Chamada a função totvs.framework.rest.url.getBaseURL na API que atende ao endereço "http://localhost:3001/rest/tstGetBaseUrl", o retorno da função será "http://localhost:3001/rest/".

Importante
A função apenas apresentará sua funcionalidade quando executada dentro de uma aplicação Rest.
```

## Sintaxe

```text
totvs.framework.rest.url.getBaseURL( < oRest >, [ cEndPoint ] ) →  cFullUrl

Parâmetros:
NomeTipoDescriçãoObrigatório
oRestObjectoRepresenta a requisição REST.X
cEndPointCharacterRepresenta o endpoint (caminho) na URL
```

## Retorno

cFullUrl: character → URL base da api

Código:
Exemplo
#include "tlpp-core.th"
#include "tlpp-rest.th"

@get("sample/rest/crud/URLBase")
Function getURLBase()

  Local jBody as json

  jBody := JsonObject():new()
  jBody:fromJson( oRest:GetBodyRequest() )

  oRest:setResponse( totvs.framework.rest.url.getBaseURL(oRest) )
  oRest:setStatusCode(200)
Return
