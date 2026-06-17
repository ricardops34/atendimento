---
title: "Ponto de Entrada – MT120QRY"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt120qry/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:19"
---

# Ponto de Entrada – MT120QRY

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt120qry/

## Exemplo do Ponto de Entrada

```advpl
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  MT120QRY                                                                                              |
 | Desc:  Filtro na tela do pedido de compra (mostrar apenas um item do pedido no mbrowse)                      |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6787737                                          |
 *--------------------------------------------------------------------------------------------------------------*/

User Function MT120QRY()
	Local cRet := ""
	Local cQry := ""

	//Selecionando os dados
	cQry := " SELECT "
	cQry += " 	SC7.R_E_C_N_O_ "
	cQry += " FROM "
	cQry += " 	"+RetSQLName('SC7')+" SC7 "
	cQry += " 	INNER JOIN ( "
	cQry += " 		SELECT DISTINCT "
	cQry += " 			SC7_PRIN.C7_NUM AS PEDIDO, "
	cQry += " 			( "
	cQry += " 				SELECT TOP 1 "
	cQry += " 					SC7_ITE.C7_ITEM "
	cQry += " 				FROM "
	cQry += " 					"+RetSQLName('SC7')+" SC7_ITE "
	cQry += " 				WHERE "
	cQry += " 					SC7_ITE.C7_FILIAL = SC7_PRIN.C7_FILIAL "
	cQry += " 					AND SC7_ITE.C7_NUM = SC7_PRIN.C7_NUM "
	cQry += " 					AND SC7_ITE.D_E_L_E_T_ = ' ' "
	cQry += " 				ORDER BY "
	cQry += " 					SC7_ITE.C7_ITEM DESC "
	cQry += " 			) AS ULT_ITEM "
	cQry += " 		FROM "
	cQry += " 			"+RetSQLName('SC7')+" SC7_PRIN "
	cQry += " 		WHERE "
	cQry += " 			SC7_PRIN.C7_FILIAL = '"+FWxFilial('SC7')+"' "
	cQry += " 			AND SC7_PRIN.D_E_L_E_T_ = ' ' "
	cQry += " 	) TAB_AUX ON ( "
	cQry += " 		SC7.C7_NUM  = TAB_AUX.PEDIDO "
	cQry += " 		AND SC7.C7_ITEM = TAB_AUX.ULT_ITEM "
	cQry += " 	) "
	cQry += " WHERE "
	cQry += " 	SC7.C7_FILIAL = '"+FWxFilial('SC7')+"' "
	cQry += " 	AND SC7.D_E_L_E_T_ = ' ' "

	//Montando retorno do ponto de entrada
	cRet := " R_E_C_N_O_ IN ("+cQry+") "
Return cRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT120QRY.
