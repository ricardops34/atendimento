---
title: "Ponto de Entrada – A650ADCOL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a650adcol/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:20"
---

# Ponto de Entrada – A650ADCOL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a650adcol/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopCOnn.ch"

/*-----------------------------------------------------------------------------------*
 | P.E.:  A650ADCOL                                                                  |
 | Desc:  Função que exclui linha da tela de componentes da OP                       |
 | Link:  http://tdn.totvs.com/display/public/mp/A650ADCOL+-+Gera+empenhos+de+SC%27s |
 *-----------------------------------------------------------------------------------*/

User Function A650ADCOL()
	Local aArea    := GetArea()
	Local aAreaB1  := SB1->(GetArea())
	Local nLinAtu  := Len(aCols)
	Local cCodProd := SG1->G1_COMP //ParamIXB[1]

	//Se for uma linha válida
	If nLinAtu > 0
		DbSelectArea('SB1')
		SB1->(DbSetOrder(1))

		//Posiciona no Produto
		If SB1->(DbSeek(FWxFilial('SB1') + cCodProd))
			If SB1->B1_X_CAMPO == 'XXX'
				//Marca a linha como excluída
				aCols[nLinAtu][Len(aCols[nLinAtu])] := .T.
			EndIf
		EndIf
	EndIf

	RestArea(aAreaB1)
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada A650ADCOL.
