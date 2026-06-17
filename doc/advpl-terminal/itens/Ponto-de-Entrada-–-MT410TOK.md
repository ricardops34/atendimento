---
title: "Ponto de Entrada – MT410TOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt410tok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:36"
---

# Ponto de Entrada – MT410TOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt410tok/

## Exemplo do Ponto de Entrada

```advpl
#include 'Totvs.ch'

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT410TOK                                                                                      |
 | Desc:  Função executa antes de confirmar a inclusão do Pedido de Venda                               |
 | Links: http://tdn.totvs.com/display/public/mp/MA410MNU                                               |
 *------------------------------------------------------------------------------------------------------*/

User Function MT410TOK()
	Local lRet:= .T.
	Local aArea	:= GetArea()
	Local aAreaC9	:= SC9->(GetArea())
	Local aAreaC5	:= SC5->(GetArea())
	Local aAreaC6	:= SC6->(GetArea())

	//Se o campo existir
	If FieldPos("C5_X_TST") > 0
		//Se for inclusão e o campo estiver em branco
		If INCLUI .And. Empty(M->C5_X_TST)
			MsgStop("Erro, campo C5_X_TST em branco!", "Atenção")
			lRet := .F.
		EndIf
	EndIf

	RestArea(aAreaC6)
	RestArea(aAreaC5)
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

Exemplo do Ponto de Entrada MT410TOK.
