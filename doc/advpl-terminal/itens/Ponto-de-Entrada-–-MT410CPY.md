---
title: "Ponto de Entrada – MT410CPY"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt410cpy/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:33"
---

# Ponto de Entrada – MT410CPY

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt410cpy/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'Protheus.ch'

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT410CPY                                                                                      |
 | Desc:  Na cópia do Pedido de Venda, zera os campos especificos                                       |
 | Links: http://tdn.totvs.com/pages/releaseview.actionçpageId=6784349                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MT410CPY()
	Local aArea		:= GetArea()
	Local lRet			:= .T.
	Local nPosCampo	:= GdFieldPos("C6_X_CAMPO")
	Local nLinAtu		:= 0

	//Zerando dados customizados no cabeçalho
	M->C5_X_CAMPO := ''

	//Percorrendo linhas da grid
	For nLinAtu := 1 To Len(aCols)
		//Se encontrar o campo na grid, sobrepõe o valor
		If nPosCampo > 0
			aCols[nLinAtu][nPosCampo] := ''
		EndIf
	Next nLinAtu

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT410CPY.
