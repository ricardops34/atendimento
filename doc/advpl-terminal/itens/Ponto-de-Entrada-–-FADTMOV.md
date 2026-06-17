---
title: "Ponto de Entrada – FADTMOV"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fadtmov/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:18"
---

# Ponto de Entrada – FADTMOV

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fadtmov/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  FADTMOV                                                                                       |
 | Desc:  Valida a data da movimentação financeira (validando titulos a receber)                        |
 | Links: http://tdn.totvs.com/display/public/mp/FADTMOV+-+Valida+data+limite+do+Movimento+Financeiro   |
 *------------------------------------------------------------------------------------------------------*/

User Function FADTMOV()
	LOCAL aArea := GetArea()
	LOCAL aAreaA6 := SA6->(GetArea())
	LOCAL dData := ParamIxb[1]
	LOCAL lRet  := .T.
	LOCAl lPadrao := .T.
	Local cOrigAux := ""
	Local cBcoAux := ""
	Local cAgeAux := ""
	Local cConAux := ""
	Local nAux := 0

	if IsInCallStack("FA040Inclu")
		if IsInCallStack("AxInclui")
			if !Empty(SA6->A6_X_DTLIM) .and. dData < SA6->A6_X_DTLIM
				lRet := .f.
			endif
		endif

	Elseif IsInCallStack("Fa040Delet")
		//Tratamento para exclusão de Recebimentos Antecipados
		if SE1->E1_TIPO$MVRECANT
			SA6->(DbSetOrder(1))
			if SA6->(DbSeek(FwxFilial("SA6")+SE1->(E1_PORTADO+E1_AGEDEP+E1_CONTA)))
				If !Empty(SA6->A6_X_DTLIM)
					If dData < SA6->A6_X_DTLIM
						lRet := .f.
					Endif
				EndIf
			endif
		endif

	elseif IsInCallStack("FA070BTOK") //Tratamento para Baixa Manual do Titulos a Receber
		If !Empty(SA6->A6_X_DTLIM)
			If dData < SA6->A6_X_DTLIM
				lRet := .f.
			Endif
		endif

	elseif IsInCallStack("fA070Can")

	elseif IsInCallStack("FA070LOT") .and. IsInCallStack("FA070GRAVA")

		If !Empty(SA6->A6_X_DTLIM)
			If dData < SA6->A6_X_DTLIM
				lRet := .f.
			Endif
		endif
	else
		lPadrao := .t.
	endif

	If !lRet
		lPadrao := .F.
	EndIf

	if lPadrao
		//Alert("Padrão")
		Conout("Padrão")
		ListPilha()
		If dData < GetMv("MV_DATAFIN")
			If lHelp
				Help ( " ", 1, "DTMOVFIN")
			EndIf
			lRet:=.F.
		EndIf
	endif

	RestArea(aAreaA6)
	Restarea(aArea)
Return(lRet)
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada FADTMOV.
