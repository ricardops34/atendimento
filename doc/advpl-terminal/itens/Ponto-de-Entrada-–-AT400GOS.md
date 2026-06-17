---
title: "Ponto de Entrada – AT400GOS"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-at400gos/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:24"
---

# Ponto de Entrada – AT400GOS

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-at400gos/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*--------------------------------------------------------------------------------*
 | P.E.:  AT400GOS                                                                |
 | Obs:   Rotina que ao gerar a OS através do orçamento grava dados da AB3 na AB6 |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6784600            |
 *--------------------------------------------------------------------------------*/

User Function AT400GOS()
	Local aArea    := GetArea()
	Local aAreaAB6 := AB6->(GetArea())
	Local cQuery   := ""

	DbSelectArea('AB6')

	//Seleciona os dados
	cQuery := " SELECT "
	cQuery += " 	AB3_X_VEND, "
	cQuery += " 	AB6.R_E_C_N_O_ AS AB6REC "
	cQuery += " FROM "
	cQuery += " 	"+RetSQLName('AB6')+" AB6 "
	cQuery += " 	INNER JOIN "+RetSQLName('AB3')+" AB3 ON ( "
	cQuery += " 		AB3_FILIAL = '"+FWxFilial('AB3')+"' "
	cQuery += " 		AND AB3_OK "+Iif(ThisInv(), "!= '"+ThisMark()+"'", "= '"+ThisMark()+"'")+" "
	cQuery += " 		AND AB3_OK != ' ' "
	cQuery += " 		AND AB3_STATUS = 'E' "
	cQuery += " 		AND AB3_CODCLI >= '"+MV_PAR01+"' "
	cQuery += " 		AND AB3_CODCLI <= '"+MV_PAR02+"' "
	cQuery += " 		AND AB3_EMISSA >= '"+dToS(MV_PAR03)+"' "
	cQuery += " 		AND AB3_EMISSA <= '"+dToS(MV_PAR04)+"' "
	cQuery += " 		AND AB3_NUMORC >= '"+MV_PAR05+"' "
	cQuery += " 		AND AB3_NUMORC <= '"+MV_PAR06+"' "
	cQuery += " 		AND AB3.D_E_L_E_T_ = ' ' "
	cQuery += " 	) "
	cQuery += " 	INNER JOIN "+RetSQLName('AB7')+" AB7 ON ( "
	cQuery += " 		AB7_FILIAL = '"+FWxFilial('AB7')+"' "
	cQuery += " 		AND AB7_NUMOS = AB6_NUMOS "
	cQuery += " 		AND SUBSTRING(AB7_NUMORC, 1, 6) = AB3_NUMORC "
	cQuery += " 		AND AB7.D_E_L_E_T_ = ' ' "
	cQuery += " 	) "
	cQuery += " WHERE "
	cQuery += " 	AB6_FILIAL = '"+FWxFilial('AB6')+"' "
	cQuery += " 	AND AB6.D_E_L_E_T_ = ' ' "
	TCQuery cQuery New Alias "QRY_DAD"

	//Enquanto houver registros
	While ! QRY_DAD->(EoF())
		AB6->(DbGoTo(QRY_DAD->AB6REC))

		//Atualiza o vendedor
		RecLock('AB6', .F.)
			AB6_X_CAMPO := QRY_DAD->AB3_X_CAMPO
		AB6->(MsUnlock())

		QRY_DAD->(DbSkip())
	EndDo
	QRY_DAD->(DbCloseArea())

	RestArea(aAreaAB6)
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada AT400GOS.
