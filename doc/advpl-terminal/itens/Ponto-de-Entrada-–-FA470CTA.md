---
title: "Ponto de Entrada – FA470CTA"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa470cta/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:13"
---

# Ponto de Entrada – FA470CTA

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa470cta/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*----------------------------------------------------------------------------------------------*
 | P.E.:  FA470CTA                                                                              |
 | Desc:  Leitura do Saldo Inicial                                                              |
 | Link:  http://tdn.totvs.com/display/public/mp/FA470CTA+-+Leitura+de+saldo+inicial+--+12006   |
 *----------------------------------------------------------------------------------------------*/

User Function FA470CTA()
	Local aArea    := GetArea()
	Local aRetorno := ParamIXB
	Local cBco := aRetorno[1]
	Local cAge := aRetorno[2]
	Local cCnt := aRetorno[3]

	//Posicionando no banco
	DbSelectArea('SA6')
	SA6->(DbSetOrder(1))
	SA6->(DbGoTop())
	If SA6->(DbSeek(FWxFilial("SA6")+ cBco + cAge + cCnt ))
		//Se tiver data final
		If !Empty(SA6->A6_X_DTLIM)

			//Se a database do sistema for menor que a do cadastro de bancos
			If Date() < SA6->A6_X_DTLIM
				Final(	"Não é possível fazer esta movimentação financeira "+;
						"Origem: FA470CTA")

				aRetorno[1] := ""
				aRetorno[2] := ""
				aRetorno[3] := ""
			EndIf
		EndIf
	EndIf

	RestArea(aArea)
Return aRetorno
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada FA470CTA.
