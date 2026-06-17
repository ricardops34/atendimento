---
title: "Ponto de Entrada – FA60FIL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa60fil/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:14"
---

# Ponto de Entrada – FA60FIL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa60fil/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  FA60FIL                                                                                       |
 | Desc:  Filtro de registros processados do Borderô                                                    |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6071248                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function FA60FIL()
	Local cRet := ""

	//Irá filtrar os títulos
	cRet := "(SE1->E1_X_CAMPO $ ("+Alltrim(GetMV('MV_X_CAMPO'))+"))"
Return cRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada FA60FIL.
