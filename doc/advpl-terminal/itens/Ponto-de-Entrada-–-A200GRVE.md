---
title: "Ponto de Entrada – A200GRVE"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a200grve/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:11"
---

# Ponto de Entrada – A200GRVE

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a200grve/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  A200GRVE                                                                                              |
 | Desc:  P.E. chamado na confirmação de dados da Estrutura                                                     |
 | Link:  http://tdn.totvs.com/display/public/PROT/A200GRVE                                                     |
 *--------------------------------------------------------------------------------------------------------------*/

User Function A200GRVE()
	Local aArea     := GetArea()
	Local nOperacao := ParamIxb[1]
	Local lMapDiv   := ParamIxb[2]
	Local aRecExc   := ParamIxb[3]
	Local aRecAlt   := ParamIxb[4]
	Local cEmAlter  := SuperGetMV("MV_X_ALTEM", .F., "suporte@terminaldeinformacao.com")
	Local cEmExclu  := SuperGetMV("MV_X_EXCEM", .F., "suporte@terminaldeinformacao.com")
	Local cMsg      := ""
	Local nAtual    := 0
	Local aRegsInc  := {}
	Local aRegsAlt  := {}
	Local aRegsExc  := {}
	Local cQryAux   := ""
	Local cCodProd  := ""
	Local cDesProd  := ""

	If nOperacao != 3
		cMsg += "Produto: "+cProduto+"("+Alltrim(Posicione('SB1', 1, FWxFilial('SB1')+cProduto, 'B1_DESC'))+")<br>"
		cMsg += "Data: "+dToC(Date())+"<br>"
		cMsg += "Hora: "+Time()+"<br>"
		cMsg += "Usuário: "+RetCodUsr()+" ("+cUserName+")<br><br>"
	EndIf

	//Visualização
	If nOperacao == 2

	//Inclusão
	ElseIf nOperacao == 3

	//Alteração
	ElseIf nOperacao == 4
		//Se tiver alteração, dispara e-Mail
		cMsg := '<font face="tahoma"><h1>Alteração na Estrutura.</h1><br><br>'+cMsg+'<br><br>'

		//Percorre os recnos
		For nAtual := 1 To Len(aRecAlt)
			cQryAux := " SELECT "
			cQryAux += " 	G1_COMP, "
			cQryAux += " 	B1_DESC AS DESCRICAO "
			cQryAux += " FROM "
			cQryAux += " 	"+RetSQLName('SG1')+" SG1 WITH (NOLOCK) "
			cQryAux += " 	INNER JOIN "+RetSQLName('SB1')+" SB1 WITH (NOLOCK) ON ("
			cQryAux += " 		B1_FILIAL = '"+FWxFilial('SB1')+"' "
			cQryAux += " 		AND B1_COD = G1_COMP "
			cQryAux += " 		AND SB1.D_E_L_E_T_ = ' ' "
			cQryAux += " 	) "
			cQryAux += " WHERE "
			cQryAux += " 	SG1.R_E_C_N_O_ = "+cValToChar(aRecAlt[nAtual][1])+" "
			TCQuery cQryAux New Alias "QRY_AUX"
			cCodProd  := ""
			cDesProd  := ""

			//Se houver dados
			If !QRY_AUX->(EoF())
				cCodProd := QRY_AUX->G1_COMP
				cDesProd := QRY_AUX->DESCRICAO
			EndIf
			QRY_AUX->(DbCloseArea())

			//Se tiver produto e/ou descrição
			If !Empty(cCodProd) .Or. !Empty(cDesProd)
				//Alteração de Item
				If aRecAlt[nAtual][2] == 3
					aAdd(aRegsInc, {cCodProd, cDesProd})

				//Inclusão de Item
				ElseIf aRecAlt[nAtual][2] == 1
					aAdd(aRegsAlt, {cCodProd, cDesProd})

				//Exclusão de Item
				ElseIf aRecAlt[nAtual][2] == 2
					aAdd(aRegsExc, {cCodProd, cDesProd})
				EndIf
			EndIf
		Next

		//Se tiver dados de inclusão
		If Len(aRegsInc) > 0
			cMsg += '<center><b>Inclusão de Produtos:</b><br>'
			cMsg += '<table border="4" bordercolor=="#367feb" width="800px">'
			cMsg += '<tr>'
			cMsg += '<td width="20%" align="center" colspan="5" bgcolor="#050505"><b><font color="ffffff">Código</font></b></td>'
			cMsg += '<td width="80%" align="center" colspan="5" bgcolor="#050505"><b><font color="ffffff">Descrição</font></b></td>'
			cMsg += '</tr>'
			For nAtual := 1 To Len(aRegsInc)
				cMsg += '<tr>'
				cMsg += '<td width="20%" colspan="5">'+aRegsInc[nAtual][1]+'</td>'
				cMsg += '<td width="80%" colspan="5">'+aRegsInc[nAtual][2]+'</td>'
				cMsg += '</tr>'
			Next
			cMsg += '</table>'
			cMsg += '</center>'
			cMsg += '<br><br>'
		EndIf

		//Se tiver dados de alteração
		If Len(aRegsAlt) > 0
			cMsg += '<center><b>Alteraç&ão de Produtos:</b><br>'
			cMsg += '<table border="4" bordercolor=="#367feb" width="800px">'
			cMsg += '<tr>'
			cMsg += '<td width="20%" align="center" colspan="5" bgcolor="#050505"><b><font color="ffffff">Código</font></b></td>'
			cMsg += '<td width="80%" align="center" colspan="5" bgcolor="#050505"><b><font color="ffffff">Descrição</font></b></td>'
			cMsg += '</tr>'
			For nAtual := 1 To Len(aRegsAlt)
				cMsg += '<tr>'
				cMsg += '<td width="20%" colspan="5">'+aRegsAlt[nAtual][1]+'</td>'
				cMsg += '<td width="80%" colspan="5">'+aRegsAlt[nAtual][2]+'</td>'
				cMsg += '</tr>'
			Next
			cMsg += '</table>'
			cMsg += '</center>'
			cMsg += '<br><br>'
		EndIf

		//Se tiver dados de exclusão
		If Len(aRegsExc) > 0
			cMsg += '<center><b>Exclusão de Produtos:</b><br>'
			cMsg += '<table border="4" bordercolor=="#367feb" width="800px">'
			cMsg += '<tr>'
			cMsg += '<td width="20%" align="center" colspan="5" bgcolor="#050505"><b><font color="ffffff">Código</font></b></td>'
			cMsg += '<td width="80%" align="center" colspan="5" bgcolor="#050505"><b><font color="ffffff">Descrição</font></b></td>'
			cMsg += '</tr>'
			For nAtual := 1 To Len(aRegsExc)
				cMsg += '<tr>'
				cMsg += '<td width="20%" colspan="5">'+aRegsExc[nAtual][1]+'</td>'
				cMsg += '<td width="80%" colspan="5">'+aRegsExc[nAtual][2]+'</td>'
				cMsg += '</tr>'
			Next
			cMsg += '</table>'
			cMsg += '</center>'
			cMsg += '<br><br>'
		EndIf

		cMsg += '</font>'
		u_EnviarEmail(cEmAlter, "[Estrutura] Alteração de Produto", cMsg)

	//Exclusão
	ElseIf nOperacao == 5
		cMsg := "<h1>Produto excluído na Estrutura - "+cProduto+".</h1><br><br>"+cMsg
		u_EnviarEmail(cEmExclu, "[Estrutura] Exclusão de Produto", cMsg)
	EndIf

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada A200GRVE.
