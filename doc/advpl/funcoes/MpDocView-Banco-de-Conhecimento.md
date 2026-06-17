---
title: "MpDocView - Banco de Conhecimento"
function_name: "MpDocView"
doc_type: "function"
status: "published"
page_id: 856453882
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=856453882"
tdn_last_modified: "15 jul, 2024"
exported_at: "2026-06-03 09:58:56"
has_parameters: true
has_example: true
section_keys: [parametros, sintaxe, retorno, exemplo, programa_fonte]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# MpDocView - Banco de Conhecimento

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=856453882

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| cFile | Caráter | Arquivo a abrir ( sem path ) | X |
| aExclui | Array | Fora de uso | N |
| cVerb | Caráter | Fora de uso | N |
| cDirDocs | Caráter | Diretório onde esta localizado o arquivo. Se omitido será utilizada o diretório padrão do banco de conhecimento. | N |

## Sintaxe

```text
MpDocView( cFile, aExclui, cVerb, cDirDocs )
Parâmetros:NomeTipo DescriçãoObrigatório
cFileCaráterArquivo a abrir ( sem path )X
aExcluiArrayFora de uso

cVerbCaráterFora de uso

cDirDocs CaráterDiretório onde esta localizado o arquivo. Se omitido será utilizada o diretório padrão do banco de conhecimento.
```

## Retorno

Lógico (.T. ou .F.) - Se conseguiu abrir

## Exemplo

```text
MpDocView( ACB->ACB_OBJETO )
```

## Programa Fonte

MpDocument.prw
