---
title: "Ponto de Entrada – M410STTS"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m410stts/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:30"
---

# Ponto de Entrada – M410STTS

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m410stts/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*-------------------------------------------------------------------------------*
 | P.E.:  M410STTS                                                               |
 | Desc:  Ponto de Entrada executado após geração do pedido de venda             |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6784155           |
 *-------------------------------------------------------------------------------*/

User Function M410STTS()
	Local aArea    := GetArea()
	Local aAreaC5  := SC5->(GetArea())
	Local aAreaC6  := SC6->(GetArea())
	Local aAreaC9  := SC9->(GetArea())
	Local cPedido  := SC5->C5_NUM
	Local aAreaAux := {}
	Local cBlqCred := "  "
	Local cBlqEst  := "  "
	Local aLocal   := {}

	RecLock('SC5', .F.)
		C5_X_CAMPO := 'Teste'
	SC5->(MsUnlock()

	RestArea(aAreaC9)
	RestArea(aAreaC6)
	RestArea(aAreaC5)
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M410STTS.
