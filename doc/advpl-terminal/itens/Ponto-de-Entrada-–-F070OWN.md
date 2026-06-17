---
title: "Ponto de Entrada – F070OWN"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f070own/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:35"
---

# Ponto de Entrada – F070OWN

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f070own/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*----------------------------------------------------------------------------------------------*
 | P.E.:  F070OWN                                                                               |
 | Desc:  P.E. executado para filtrar as baixas por lote - Contas a Receber                     |
 | Link:  http://tdn.totvs.com/display/public/mp/F070OWN+-+Montagem+do+filtro+da+baixa+--+11652 |
 *----------------------------------------------------------------------------------------------*/

User Function F070OWN()
	Local aArea   := GetArea()
	Local cFiltro := ""

	//Montando o filtro
	If IsInCallStack("FA070ChecF")
		cFiltro += 'E1_FILIAL+E1_PORTADO+E1_AGEDEP+E1_CONTA=="'+xFilial("SE1")+cBancoLt+cAgenciaLt+cContaLt+'".And.'
		cFiltro += 'DTOS(E1_VENCREA)>="'+DTOS(dVencDe) + '".And.'
		cFiltro += 'DTOS(E1_VENCREA)<="'+DTOS(dVencAte)+ '".And.'
		cFiltro += 'E1_NATUREZ>="'      +cNatDe       + '".And.'
		cFiltro += 'E1_NATUREZ<="'      +cNatAte      + '".and.'
		cFiltro += '!(E1_TIPO$"'+MVPROVIS+"/"+MVRECANT+"/"+MVIRABT+"/"+MVINABT+"/"+MV_CRNEG

		//Destarcar Abatimentos
		If mv_par06 == 2
			cFiltro += "/"+MVABATIM+"/"+MVFUABT +'")' //adicionado MVFUABT pois a variável MVABATIM não está retornando FU-
		Else
			cFiltro += '")'
		Endif

		// Verifica integracao com TMS e nao permite baixar titulos que tenham solicitacoes
		// de transferencias em aberto.
		cFiltro += ' .And. Empty(E1_NUMSOL)'
		cFiltro += ' .And. (E1_SALDO>0 .OR. E1_OK="xx")'

	//Montando o filtro
	ElseIf IsInCallStack("FA070Chec0")
		cFiltro += 'E1_FILIAL=="' + xFilial("SE1") + '".And.'
		cFiltro += 'DTOS(E1_VENCREA)>="' + DTOS(dVencDe)  + '".And.'
		cFiltro += 'DTOS(E1_VENCREA)<="' + DTOS(dVencAte) + '".And.'
		cFiltro += 'E1_NATUREZ>="'       + cNatDe         + '".And.'
		cFiltro += 'E1_NATUREZ<="'       + cNatAte        + '".And.'
		cFiltro += '(E1_PORTADO="'       + cBancolt         + '".OR.'
		cFiltro += 'E1_PORTADO=="'+ space(Len(E1_PORTADO)) + '").AND.'
		cFiltro += '!(E1_TIPO$"'+MVPROVIS+"/"+MVRECANT+"/"+MVIRABT+"/"+MVINABT+"/"+MV_CRNEG

		//Destacar Abatimentos
		If mv_par06 == 2
			cFiltro += "/"+MVABATIM+"/"+MVFUABT +'")'//adicionado MVFUABT pois a variável MVABATIM não está retornando FU-
		Else
			cFiltro += '")'
		Endif

		// Verifica integracao com TMS e nao permite baixar titulos que tenham solicitacoes
		// de transferencias em aberto.
		cFiltro += ' .And. Empty(E1_NUMSOL)'
		cFiltro += ' .And. (E1_SALDO>0 .OR. E1_OK="xx")'
	EndIf

	cFiltro += Iif(!Empty(cFiltro), " .And. ", "")+" E1_X_CAMPO = 'XXX' "

	RestArea(aArea)
Return cFiltro
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F070OWN.
