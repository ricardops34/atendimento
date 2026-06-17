---
title: "Ponto de Entrada – MT460EST"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt460est/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:42"
---

# Ponto de Entrada – MT460EST

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt460est/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'RwMake.ch'
#Include 'Protheus.ch'

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT460EST                                                                                      |
 | Desc:  Valida estorno da liberação de Estoque no Doc.Saída                                           |
 | Links: http://tdn.totvs.com/display/public/mp/MT460EST                                               |
 *------------------------------------------------------------------------------------------------------*/

User Function MT460EST()
	Local aArea := GetArea()
	Local aAreaC9 := SC9->(GetArea())
	Local aAreaC6 := SC6->(GetArea())
	Local aAreaC5 := SC5->(GetArea())
	Local lRet    := .T.

	lRet := MsgYesNo("Deseja Continuarç", "Atenção")

	RestArea(aAreaC5)
	RestArea(aAreaC6)
	RestArea(aAreaC9)
	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT460EST.
