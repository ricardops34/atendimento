---
title: "FWURIDecode"
function_name: "FWURIDecode"
doc_type: "function"
status: "published"
page_id: 822689152
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=822689152"
tdn_last_modified: "01 fev, 2024"
exported_at: "2026-06-03 09:58:50"
has_parameters: true
has_example: true
section_keys: [parametros, sintaxe, retorno, exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FWURIDecode

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=822689152

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| uri | Character | URI que será efetuado o decode | X |

## Sintaxe

```text
FWURIDecode( <uri> ) → character
Parâmetros:
NomeTipoDescriçãoObrigatório
uriCharacterURI que será efetuado o decodeX
```

## Retorno

Character → URI após o decode

## Exemplo

```text
#include "protheus.ch"

//-------------------------------------------------------------------
/*/{Protheus.doc} U_DecodeURI
Exemplo de uso da função FWURIDecode

@author Daniel Mendes
@since 01/02/2024
@version 1.0
/*/
//-------------------------------------------------------------------
user function DecodeURI()
local cURI as character
local cDecodeURI  as character

cURI := "https://www.totvs.com/sistema-de-gestao/totvs-backoffice-linha-protheus/"
cDecodeURI := FWURIDecode(cURI)

ConOut(cDecodeURI)

return
```
