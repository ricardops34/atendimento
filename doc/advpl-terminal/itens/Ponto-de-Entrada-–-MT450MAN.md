---
title: "Ponto de Entrada – MT450MAN"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt450man/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:39"
---

# Ponto de Entrada – MT450MAN

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt450man/

## Exemplo do Ponto de Entrada

```advpl
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT450MAN                                                                                      |
 | Desc:  Bloqueia a abertura da tela da liberação manual de crédito do pedido de venda                 |
 | Links: http://tdn.totvs.com/display/public/mp/MT450MAN                                               |
 *------------------------------------------------------------------------------------------------------*/

User Function MT450MAN()
	Local aArea := GetArea()
	Local aAreaC9 := SC9->(GetArea())
	Local lRet := .T.
	Local cPedido := SC9->C9_PEDIDO

	lRet :=  MsgYesNo("Pedido: "+cPedido+", continua?", "Atenção")

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

Exemplo do Ponto de Entrada MT450MAN.
