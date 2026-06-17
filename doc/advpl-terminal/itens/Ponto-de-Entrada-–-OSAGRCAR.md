---
title: "Ponto de Entrada – OSAGRCAR"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-osagrcar/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:14"
---

# Ponto de Entrada – OSAGRCAR

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-osagrcar/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*---------------------------------------------------------------------*
 | P.E.:  OSAGRCAR                                                     |
 | Desc:  Função executada após aglutinação de carga (gravar E1)       |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6091373 |
 *---------------------------------------------------------------------*/

User Function OSAGRCAR()
	Local aArea := GetArea()
	Local aDados := ParamIXB
	Local cCargaOri := aDados[1][1][1]
	Local cCargaDes := aDados[2]
	Local cQuery := ""

	DbSelectArea("SE1")
	SE1->(DbSetOrder(1))
	SE1->(DbGoTop())

	//Montando a consulta pegando os recnos dos títulos que tem essa carga
	cQuery := "	SELECT "
	cQuery += "		SE1.R_E_C_N_O_ AS RECNUM, SE1.E1_PEDIDO,SE1.E1_PREFIXO "
	cQuery += "	FROM "
	cQuery += "		"+RetSQLName("SE1")+" SE1 "
	cQuery += "	WHERE "
	cQuery += "		E1_FILIAL = '"+FWxFilial('SE1')+"' "
	cQuery += "		AND E1_X_CGORI = '"+cCargaOri+"' "
	cQuery += "		AND SE1.D_E_L_E_T_ = '' "
	TCQuery cQuery New Alias "QRY_CAR"

	//Enquanto houver regitros
	While !QRY_CAR->(EoF())
		SE1->(DbGoTo(QRY_CAR->RECNUM))

		//Gravando a carga nova
		RecLock('SE1', .F.)
			E1_X_CGDES := cCargaDes
		SE1->(MsUnlock())

		QRY_CAR->(DbSkip())
	EndDo
	QRY_CAR->(DbCloseArea())

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada OSAGRCAR.
