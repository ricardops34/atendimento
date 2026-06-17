---
title: "Ponto de Entrada – M460MARK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m460mark/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:38"
---

# Ponto de Entrada – M460MARK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m460mark/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'RwMake.ch'
#Include 'Protheus.ch'
#Include 'TopConn.ch'

//Constantes
#Define STR_PULA		Chr(13)+Chr(10)

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  M460MARK                                                                                      |
 | Desc:  Não permite usuário marcar registros para faturar, caso o pedido tenha remessa                |
 | Links: http://tdn.totvs.com/pages/releaseview.actionçpageId=6784189                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function M460MARK()
	Local aArea		:= GetArea()
	Local aAreaC9	:= SC9->(GetArea())
	Local aAreaC5	:= SC5->(GetArea())
	Local lRet		:= .T.
	Local cMarca	:= ParamIXB[1]
	Local lInverte	:= ParamIXB[2]
	Local cSQL		:= ""
	Local cMens		:= ""
	Local cMensBoni := ""
	Local cMensAux := ""
	Local cPedsMark := ""

	Pergunte("MT461A", .F.)

	//Criando a consulta
	cSQL += " SELECT "																											+ STR_PULA
	cSQL += "  C9_PEDIDO AS PEDIDO "																							+ STR_PULA
	cSQL += " FROM "+RetSQLName("SC9")+" SC9 "																				+ STR_PULA
	cSQL += "   INNER JOIN "+RetSQLName("SC5")+" SC5 ON ("																	+ STR_PULA
	cSQL += "       SC5.D_E_L_E_T_='' "																						+ STR_PULA
	cSQL += "       AND C5_FILIAL = C9_FILIAL "																				+ STR_PULA
	cSQL += "       AND C5_NUM = C9_PEDIDO "																					+ STR_PULA
	cSQL += "   ) "																												+ STR_PULA
	cSQL += " WHERE SC9.D_E_L_E_T_ = ' ' " 																					+ STR_PULA
	cSQL += "  AND C9_FILIAL='"+FWxFilial("SC9")+"' "																		+ STR_PULA
	cSQL += "  AND C9_OK"+Iif(lInverte, "<>", "=")+ "'"+cMarca+"' "														+ STR_PULA
	cSQL += "  AND C9_CLIENTE >= '" + MV_PAR07 + "' AND C9_CLIENTE <= '" + MV_PAR08 + "' "								+ STR_PULA
	cSQL += "  AND C9_LOJA >= '" + MV_PAR09 + "' AND C9_LOJA <= '" + MV_PAR10 + "' "										+ STR_PULA
	cSQL += "  AND C9_DATALIB >= '" + dToS(MV_PAR11) + "' AND C9_DATALIB <= '" + dToS(MV_PAR12) + "' "				+ STR_PULA
	cSQL += "  AND C9_PEDIDO >= '" + MV_PAR05 + "' AND C9_PEDIDO <= '" + MV_PAR06 + "' "								+ STR_PULA
	cSQL += "  AND C9_BLEST = '' AND C9_BLCRED = ''"																			+ STR_PULA

	//Executando a Cláusula
	TCQuery cSQL NEW ALIAS QRY_SC9
	//Indo ao top e verificando se há registros
	QRY_SC9->(DbGoTop())
	If QRY_SC9->(Eof())
		MSGInfo('Nenhum item de pedido foi encontrado para faturamento!',"Atenção")
		lRet:=.F.
	Endif
	QRY_SC9->(DbCloseArea())

	RestArea(aAreaC5)
	RestArea(aAreaC9)
	RestArea(aArea)

	//Restaurando a pergunta do botão Prep.Doc.
	Pergunte("MT460A", .F.)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M460MARK.
