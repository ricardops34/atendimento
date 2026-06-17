---
title: "Ponto de Entrada – MA410LEG"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma410leg/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:55"
---

# Ponto de Entrada – MA410LEG

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma410leg/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*-------------------------------------------------------------------------------------------------------*
 | P.E.:  MA410LEG                                                                                       |
 | Desc:  Adiciona cores no browse de legenda                                                            |
 | Links: http://tdn.totvs.com/display/public/mp/MA410LEG+-+Alterar+textos+da+legenda+de+status+do+pedido|
 *-------------------------------------------------------------------------------------------------------*/

User Function MA410LEG()
	Local aArea  := GetArea()
	Local aCores := ParamIXB

	aAdd(aCores, {'BR_VIOLETA', 'Pedido situação X'})
	aAdd(aCores, {'BR_VERDE_ESCURO', 'Pedido situação Y'})

	RestArea(aArea)
Return aCores
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MA410LEG.
