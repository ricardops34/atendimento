---
title: "Ponto de Entrada – OS200EST"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-os200est/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:11"
---

# Ponto de Entrada – OS200EST

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-os200est/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  OS200EST                                                                                      |
 | Desc:  Tratativa ao estornar a carga, zerar o campo de transportadora e veÃ­culo do pedido            |
 | Links: http://tdn.totvs.com/display/public/mp/OS200EST+-++Estorno+da+Carga+--+16536                  |
 *------------------------------------------------------------------------------------------------------*/

User Function OS200EST()
	Local aArea   := GetArea()
	Local cCarga  := PARAMIXB[1]
	Local cSeqCar := PARAMIXB[2]
	Local cQry    := ""

	DbSelectArea('SC5')
	SC5->(DbSetOrder(1))

	//Seleciona os pedidos conforme a carga
	cQry := " SELECT DISTINCT "
	cQry += "    C9_PEDIDO "
	cQry += " FROM "
	cQry += "    "+RetSQLName('SC9')+" SC9 "
	cQry += " WHERE "
	cQry += "    C9_FILIAL     = '"+FWxFilial('SC9')+"' "
	cQry += "    AND C9_CARGA  = '"+cCarga+"' "
	cQry += "    AND C9_SEQCAR = '"+cSeqCar+"' "
	cQry += "    AND D_E_L_E_T_ = ' ' "
	TCQuery cQry New Alias "QRY_SC9"

	//Enquanto houver pedidos
	While ! QRY_SC9->(EoF())
		//Se conseguir posicionar, zera os campos
		If SC5->(DbSeek(FWxFilial('SC5') + QRY_SC9->C9_PEDIDO))
			RecLock('SC5', .F.)
				C5_X_CAMPO  := "TST"
			SC5->(MsUnlock())
		EndIf

		QRY_SC9->(DbSkip())
	EndDo
	QRY_SC9->(DbCloseArea())
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada OS200EST.
