---
title: "MpBinView - Banco de Conhecimento"
function_name: "MpBinView"
doc_type: "function"
status: "published"
page_id: 856454365
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=856454365"
tdn_last_modified: "15 jul, 2024"
exported_at: "2026-06-03 09:58:54"
has_parameters: true
has_example: true
section_keys: [parametros, sintaxe, retorno, exemplo, programa_fonte]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# MpBinView - Banco de Conhecimento

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=856454365

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cFile | Caráter | Arquivo a abrir ( sem path ) | X |
| cBinId | Caráter | Id do arquivo binário | X |

## Sintaxe

```text
MpBinView( cFile, cBinId )
Parâmetros:NomeTipo DescriçãoObrigatório
cFileCaráterArquivo a abrir ( sem path )X
cBinId CaráterId do arquivo binárioX
```

## Retorno

Lógico (.T. ou .F.) - Se conseguiu abrir

## Exemplo

```text
MPBinView( ACB->ACB_OBJETO, ACB->ACB_BIND )
```

## Programa Fonte

MpDocument.prw
