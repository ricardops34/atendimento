---
title: "Ponto de Entrada – M455FIL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m455fil/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:35"
---

# Ponto de Entrada – M455FIL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m455fil/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'Protheus.ch'
#Include 'RwMake.ch'

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  M455FIL                                                                                       |
 | Desc:  Validação de liberação de estoque Automático                                                  |
 | Links: http://tdn.totvs.com/display/public/mp/M455FIL+-+Montagem+da+Indregua                         |
 *------------------------------------------------------------------------------------------------------*/

User Function M455FIL()
	Local aArea   := GetArea()
	Local aAreaC9 := SC9->(GetArea())
	Local aAreaC6 := SC6->(GetArea())
	Local aAreaC5 := SC5->(GetArea())
	Local cRet    := ""

	cRet := "SC9->C9_FILIAL == '"+FWxFilial('SC9')+"' "

	RestArea(aAreaC5)
	RestArea(aAreaC6)
	RestArea(aAreaC9)
	RestArea(aArea)
Return cRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M455FIL.
