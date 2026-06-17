---
title: "Ponto de Entrada – M460FIM"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m460fim/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:36"
---

# Ponto de Entrada – M460FIM

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m460fim/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "TOPCONN.CH"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  M460FIM                                                                                       |
 | Desc:  Gravação dos dados após gerar NF de Saída                                                     |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6784180                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function M460FIM()
	Local cPedido  := ''
	Local cCampo   := ''
	Local aAreaSF2 := SF2->(GetArea())
	Local aAreaSD2 := sd2->(GetArea())
	Local aAreaSC5 := sc5->(GetArea())
	Local aAreaSE1 := sE1->(GetArea())
	Local aAreaSA1 := sA1->(GetArea())

	//Pega o pedido
	DbSelectArea("SD2")
	SD2->(DbSetorder(3))
	If SD2->(DbSeek(SF2->(F2_FILIAL+F2_DOC+F2_SERIE+F2_CLIENTE+F2_LOJA)))
		cPedido := SD2->D2_PEDIDO
	Endif

	//Se tiver pedido
	If !Empty(cPedido)
		DbSelectArea("SC5")
		SC5->(DbSetorder(1))

		//Se posiciona pega o tipo de pagamento
		If SC5->(DbSeek(FWxFilial('SC5')+cPedido))
			cCampo := SC5->C5_X_CAMPO
		Endif
	Endif

	//Filtra títulos dessa nota
	cSql := "SELECT R_E_C_N_O_ AS REC FROM "+RetSqlName("SE1")
	cSql += " WHERE E1_FILIAL = '"+xFilial("SE1")+"' AND D_E_L_E_T_<>'*' "
	cSql += " AND E1_PREFIXO = '"+SF2->F2_SERIE+"' AND E1_NUM = '"+SF2->F2_DOC+"' "
	cSql += " AND E1_TIPO = 'NF' "
	TcQuery ChangeQuery(cSql) New Alias "_QRY"

	//Enquanto tiver dados na query
	While !_QRY->(eof())
		DbSelectArea("SE1")
		SE1->(DbGoTo(_QRY->REC))

		//Se tiver dado, altera o tipo de pagamento
		If !SE1->(EoF())
			RecLock("SE1",.F.)
				Replace E1_X_CAMPO WITH cCampo
			MsUnlock()
		EndIf

		_QRY->(DbSkip())
	Enddo
	_QRY->(DbCloseArea())

	RestArea(aAreaSF2)
	RestArea(aAreaSD2)
	RestArea(aAreaSC5)
	RestArea(aAreaSE1)
	RestArea(aAreaSA1)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M460FIM.
