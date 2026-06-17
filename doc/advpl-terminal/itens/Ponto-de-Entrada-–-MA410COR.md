---
title: "Ponto de Entrada – MA410COR"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma410cor/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:54"
---

# Ponto de Entrada – MA410COR

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma410cor/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*-------------------------------------------------------------------------------------------------------*
 | P.E.:  MA410COR                                                                                       |
 | Desc:  Adiciona cores no browse de legenda                                                            |
 | Links: http://tdn.totvs.com/display/public/mp/MA410COR+-+Alterar+cores+do+cadastro+do+status+do+pedido|
 *-------------------------------------------------------------------------------------------------------*/

User Function MA410COR()
	Local aArea  := GetArea()
	Local aCores := ParamIXB
	Local nAtual := 0

	aAdd(aCores, {"(!Empty(C5_X_CAMPX)) .And. (Empty(C5_X_CAMPY))", 'BR_VIOLETA'})
	aAdd(aCores, {"(Empty(C5_X_CAMPX)) .And. (!Empty(C5_X_CAMPY))", 'BR_VERDE_ESCURO'})

	RestArea(aArea)
Return aCores
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MA410COR.
