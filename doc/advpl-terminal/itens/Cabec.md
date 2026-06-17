---
title: "Cabec"
function_name: "Cabec"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "relatorios"
source_url: "https://terminaldeinformacao.com/knowledgebase/cabec/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:36"
---

# Cabec

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/cabec/

## Exemplo da Rotina

```advpl
Cabec("Titulo", "Cabec1", "Cabec2", "NomePrograma", "Tamanho", nTipo)
```

## Exemplo 1- Relatório exemplo de Contas a Pagar

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} zTeste
Função de Teste
@type function
@author Terminal de Informação
@since 13/11/2016
@version 1.0
    @example
    u_zTeste()
/*/

User Function zTeste()
	Local cDesc1     := "Este relatório irá imprimir informações do contas a pagar conforme"
	Local cDesc2     := "parâmetro informado. Será gerado um arquivo no diretório "
	Local cDesc3     := "Spool - zTeste_????.XLS, onde ???? e o nome do usuário."
	Private cString  := "SE2"
	Private Tamanho  := "M"
	Private aReturn  := { "Zebrado",2,"Administração",2,2,1,"",1 }
	Private wnrel    := "zTeste"
	Private NomeProg := "zTeste"
	Private nLastKey := 0
	Private Limite   := 132
	Private Titulo   := "Título a Pagar - Ordem de "
	Private cPerg    := "X_zTeste"
	Private nTipo    := 0
	Private cbCont   := 0
	Private cbTxt    := "registro(s) lido(s)"
	Private Li       := 80
	Private m_pag    := 1
	Private aOrd     := {}
	Private Cabec1   := "    PREFIXO TITULO      PARC.  TIP  EMISSAO   VENCTO      VENCTO REAL VLR. ORIGINAL       PAGO                SALDO "
	Private Cabec2   := ""

	/*
	Parâmetros do aReturn
	aReturn - Preenchido pelo SetPrint()
	aReturn[1] - Reservado para formulário
	aReturn[2] - Reservado para numero de vias
	aReturn[3] - Destinatário
	aReturn[4] - Formato 1=Paisagem 2=Retrato
	aReturn[5] - Mídia 1-Disco 2=Impressora
	aReturn[6] – Porta ou arquivo 1-Lpt1... 4-Com1...
	aReturn[7] - Expressão do filtro
	aReturn[8] - Ordem a ser selecionada
	aReturn[9] [10] [n] - Campos a processar se houver
	*/

	//Ordens do relatório
	aAdd( aOrd, "Fornecedor" )
	aAdd( aOrd, "Titulo" )
	aAdd( aOrd, "Emissão" )
	aAdd( aOrd, "Vencimento" )
	aAdd( aOrd, "Vencto. Real" )

	//Cria as perguntas do relatório e chama para a memória
	fCriaSX1()
	Pergunte(cPerg,.F.)

	//Mostra a tela de configuração do relatório
	wnrel := SetPrint(cString, wnrel, cPerg, @Titulo, cDesc1, cDesc2, cDesc3, .F., aOrd, .F., Tamanho, .F., .F.)

	//Se pressionar -ESC- encerra o programa
	If nLastKey == 27
		Return
	Endif

	//Estabelece os padrões para impressão, conforme escolha do usuário
	SetDefault(aReturn,cString)

	//Verificar se será reduzido ou normal
	nTipo := IIF(aReturn[4] == 1, 15, 18)

	//Se pressionar -ESC- encerra o programa
	If nLastKey == 27
		Return
	Endif

	//Chama função que processa os dados
	RptStatus({|lEnd| fImpRel(@lEnd) }, Titulo, "Processando e imprimindo dados, aguarde...", .T. )
Return

/*---------------------------------------------------------------------*
| Func:  fImpRel                                                      |
| Desc:  Função para impressão do relatório                           |
*---------------------------------------------------------------------*/

Static Function fImpRel(lEnd)
	Local nIndice   := 0
	Local cArq      := ""
	Local cIndice   := ""
	Local cFiltro   := ""
	Local aCol      := {}
	Local cFornec   := ""
	Local nValor    := 0
	Local nPago     := 0
	Local nSaldo    := 0
	Local nT_Valor  := 0
	Local nT_Pago   := 0
	Local nT_Saldo  := 0
	Local cArqExcel := ""
	Local cAliasImp
	Local oExcelApp
	Titulo += aOrd[aReturn[8]]

	//Se não utilizar banco top connect, executa filtro manualmente na tabela
	#IFNDEF TOP
	cAliasImp := "SE2"
	cFiltro := "E2_FILIAL == '"+xFilial("SE2")+"' "
	cFiltro += ".And. E2_FORNECE >= '"+mv_par01+"' "
	cFiltro += ".And. E2_FORNECE <= '"+mv_par02+"' "
	cFiltro += ".And. E2_TIPO >= '"+mv_par03+"' "
	cFiltro += ".And. E2_TIPO <= '"+mv_par04+"' "
	cFiltro += ".And. Dtos(E2_VENCTO) >= '"+Dtos(mv_par05)+"' "
	cFiltro += ".And. Dtos(E2_VENCTO) <= '"+Dtos(mv_par06)+"' "

	//Ordenação por Fornecedor
	If aReturn[8] == 1
		cIndice := "E2_FORNECE+E2_LOJA+E2_NUM"

		//Ordenação por Título
	Elseif aReturn[8] == 2
		cIndice := "E2_NUM+E2_FORNECE+E2_LOJA"

		//Ordenação por Emissão
	Elseif aReturn[8] == 3
		cIndice := "Dtos(E2_EMISSAO)+E2_FORNECE+E2_LOJA"

		//Ordenação por Vencimento
	Elseif aReturn[8] == 4
		cIndice := "Dtos(E2_VENCTO)+E2_FORNECE+E2_LOJA"

		//Ordenação por Vencimento Real
	Elseif aReturn[8] == 5
		cIndice := "Dtos(E2_VENCREA)+E2_FORNECE+E2_LOJA"
	Endif

	//Cria arquivo temporário filtrando via AdvPL
	cArq := CriaTrab(NIL,.F.)
	dbSelectArea(cAliasImp)
	IndRegua(cAliasImp,cArq,cIndice,,cFiltro)
	nIndice := RetIndex()
	nIndice := nIndice + 1
	dbSetIndex(cArq+OrdBagExt())
	dbSetOrder(nIndice)

	//Senão, monta consulta SQL
	#ELSE
	cAliasImp := "QRY_IMP"
	cQuery := "SELECT "
	cQuery += "E2_PREFIXO, E2_NUM, E2_PARCELA, E2_TIPO, E2_FORNECE, E2_LOJA, E2_NOMFOR, "
	cQuery += "E2_EMISSAO, E2_VENCTO, E2_VENCREA, E2_VALOR, E2_SALDO "
	cQuery += "FROM "+RetSqlName("SE2")+" "
	cQuery += "WHERE E2_FILIAL = '"+xFilial("SE2")+"' "
	cQuery += "AND E2_FORNECE >= '"+mv_par01+"' "
	cQuery += "AND E2_FORNECE <= '"+mv_par02+"' "
	cQuery += "AND E2_TIPO    >= '"+mv_par03+"' "
	cQuery += "AND E2_TIPO    <= '"+mv_par04+"' "
	cQuery += "AND E2_VENCTO  >= '"+Dtos(mv_par05)+"' "
	cQuery += "AND E2_VENCTO  <= '"+Dtos(mv_par06)+"' "
	cQuery += "AND D_E_L_E_T_  = ' ' "
	cQuery += "ORDER BY "

	//Ordenação por Fornecedor
	If aReturn[8] == 1
		cQuery += "E2_FORNECE,E2_LOJA,E2_NUM"

		//Ordenação por Título
	Elseif aReturn[8] == 2
		cQuery += "E2_NUM,E2_FORNECE,E2_LOJA"

		//Ordenação por Emissão
	Elseif aReturn[8] == 3
		cQuery += "E2_EMISSAO,E2_FORNECE,E2_LOJA"

		//Ordenação por Vencimento
	Elseif aReturn[8] == 4
		cQuery += "E2_VENCTO,E2_FORNECE,E2_LOJA"

		//Ordenação por Vencimento Real
	Elseif aReturn[8] == 5
		cQuery += "E2_VENCREA,E2_FORNECE,E2_LOJA"
	Endif
	TCQuery cQuery New Alias "QRY_IMP"

	#ENDIF
	dbGoTop()
	SetRegua(0)

	//Colunas de impressão
	aAdd( aCol, 004 ) //Prefixo
	aAdd( aCol, 012 ) //Titulo
	aAdd( aCol, 024 ) //Parcela
	aAdd( aCol, 031 ) //Tipo
	aAdd( aCol, 036 ) //Emissao
	aAdd( aCol, 046 ) //Vencimento
	aAdd( aCol, 058 ) //Vencimento Real
	aAdd( aCol, 070 ) //Valor Original
	aAdd( aCol, 090 ) //Pago
	aAdd( aCol, 110 ) //Saldo
	cFornec := (cAliasImp)->E2_FORNECE+(cAliasImp)->E2_LOJA

	//Enquanto houver dados
	While !Eof() .And. !lEnd
		//Se atingir 55 linhas, imprime cabeçalho
		If Li > 55
			Cabec(Titulo,Cabec1,Cabec2,NomeProg,Tamanho,nTipo)
		Endif

		//Imprime dados do Fornecedor
		@ Li, aCol[1] PSay "Cod/Loj/Nome: "+(cAliasImp)->E2_FORNECE+"-"+(cAliasImp)->E2_LOJA+" "+(cAliasImp)->E2_NOMFOR
		Li ++

		//Enquanto for o fornecedor atual
		While !Eof() .And. !lEnd .And. (cAliasImp)->E2_FORNECE+(cAliasImp)->E2_LOJA == cFornec
			IncRegua()
			//Testa para quebra de linha
			If Li > 55
				Cabec(Titulo,Cabec1,Cabec2,NomeProg,Tamanho,nTipo)
			Endif

			//Se for analítico, imprime os dados do título
			If mv_par07 == 2
				@ Li, aCol[1] PSay (cAliasImp)->E2_PREFIXO
				@ Li, aCol[2] PSay (cAliasImp)->E2_NUM
				@ Li, aCol[3] PSay (cAliasImp)->E2_PARCELA
				@ Li, aCol[4] PSay (cAliasImp)->E2_TIPO
				@ Li, aCol[5] PSay (cAliasImp)->E2_EMISSAO
				@ Li, aCol[6] PSay (cAliasImp)->E2_VENCTO
				@ Li, aCol[7] PSay (cAliasImp)->E2_VENCREA
				@ Li, aCol[8] PSay (cAliasImp)->E2_VALOR PICTURE "@E 99,999,999,999.99"
				@ Li, aCol[9] PSay (cAliasImp)->E2_VALOR - (cAliasImp)->E2_SALDO PICTURE "@E 99,999,999,999.99"
				@ Li, aCol[10] PSay (cAliasImp)->E2_SALDO PICTURE "@E 99,999,999,999.99"
				Li ++
			Endif

			//Atualiza os totais
			nValor   += (cAliasImp)->E2_VALOR
			nPago    += ((cAliasImp)->E2_VALOR-(cAliasImp)->E2_SALDO)
			nSaldo   += (cAliasImp)->E2_SALDO
			nT_Valor += (cAliasImp)->E2_VALOR
			nT_Pago  += ((cAliasImp)->E2_VALOR-(cAliasImp)->E2_SALDO)
			nT_Saldo += (cAliasImp)->E2_SALDO
			dbSkip()
		EndDo

		//Imprime os totais
		@ Li, 000 PSay Replicate("-",Limite)
		Li ++
		@ Li, aCol[1] PSay "TOTAL....."
		@ Li, aCol[8] PSay nValor PICTURE "@E 99,999,999,999.99"
		@ Li, aCol[9] PSay nPago PICTURE "@E 99,999,999,999.99"
		@ Li, aCol[10] PSay nSaldo PICTURE "@E 99,999,999,999.99"
		Li +=2
		cFornec := (cAliasImp)->E2_FORNECE+(cAliasImp)->E2_LOJA
		nValor := 0
		nPago := 0
		nSaldo := 0
	EndDo

	//Se o usuário cancelou, finaliza
	If lEnd
		@ Li, aCol[1] PSay cCancel
		Return
	Endif

	//Imprime o total geral
	@ Li, 000 PSay Replicate("=",Limite)
	Li ++
	@ Li, aCol[1] PSay "TOTAL GERAL....."
	@ Li, aCol[8] PSay nT_Valor PICTURE "@E 99,999,999,999.99"
	@ Li, aCol[9] PSay nT_Pago PICTURE "@E 99,999,999,999.99"
	@ Li, aCol[10] PSay nT_Saldo PICTURE "@E 99,999,999,999.99"

	//Se não atingiu o limite, imprime o rodapé
	If Li <> 80
		Roda(cbCont,cbTxt,Tamanho)
	Endif

	//Gera arquivo do tipo .DBF com extensão .XLS p/ usuário abrir no Excel
	cArqExcel := __RELDIR+NomeProg+"_"+Substr(cUsuario,7,4)+".XLS"
	Copy To &cArqExcel
	#IFNDEF TOP
	dbSelectArea(cAliasImp)
	RetIndex(cAliasImp)
	Set Filter To
	#ELSE
	dbSelectArea(cAliasImp)
	(cAliasImp)->(dbCloseArea())
	#ENDIF
	DbSelectArea('SE2')
	SE2->(DbSetOrder(1))
	SE2->(DbGoTop())

	//Mostra o relatório
	If aReturn[5] == 1
		Set Printer TO
		dbCommitAll()
		OurSpool(wnrel)
	EndIf

	//Abrindo planilha MS-Excel
	If mv_par08 == 1
		__CopyFile(cArqExcel,GetTempPath()+NomeProg+"_"+Substr(cUsuario,7,4)+".XLS")
		If ! ApOleClient("MsExcel")
			MsgAlert("MsExcel não instalado", "Atenção")
			Return
		Endif
		oExcelApp := MsExcel():New()
		oExcelApp:WorkBooks:Open( GetTempPath()+NomeProg+"_"+Substr(cUsuario,7,4)+".XLS" )
		oExcelApp:SetVisible(.T.)
		oExcel:Destroy()
	Endif
	Ms_Flush()
Return

/*---------------------------------------------------------------------*
| Func:  fCriaSX1                                                     |
| Desc:  Função para criar o grupo de perguntas                       |
*---------------------------------------------------------------------*/

Static Function fCriaSx1()
	Local aP := {}
	Local i := 0
	Local cSeq
	Local cMvCh
	Local cMvPar
	Local aHelp := {}

	//Adiciona os parâmetros
	aAdd(aP,{"Fornecedor de","C",6,0,"G","","SA2","" ,"" ,"","",""})
	aAdd(aP,{"Fornecedor ate","C",6,0,"G","(mv_par02>=mv_par01)","SA2","" ,"" ,"","",""})
	aAdd(aP,{"Tipo de","C",3,0,"G","","05" ,"" ,"" ,"","",""})
	aAdd(aP,{"Tipo ate","C",3,0,"G","(mv_par04>=mv_par03)","05" ,"" ,"" ,"","",""})
	aAdd(aP,{"Vencimento de","D",8,0,"G","","" ,"" ,"" ,"","",""})
	aAdd(aP,{"Vencimento ate","D",8,0,"G","(mv_par06>=mv_par05)","" ,"" ,"" ,"","",""})
	aAdd(aP,{"Aglutinar pagto.de fornec.","N",1,0,"C","","","Sim","Não","","",""})
	aAdd(aP,{"Abrir planilha MS-Excel" ,"N",1,0,"C","","","Sim","Não","","",""})
	aAdd(aHelp,{"Informe o código do fornecedor.","inicial."})
	aAdd(aHelp,{"Informe o código do fornecedor.","final."})
	aAdd(aHelp,{"Tipo de título inicial."})
	aAdd(aHelp,{"Tipo de título final."})
	aAdd(aHelp,{"Digite a data do vencimento inicial."})
	aAdd(aHelp,{"Digite a data do vencimento final."})
	aAdd(aHelp,{"Aglutinar os títulos do mesmo forne-","cedor totalizando seus valores."})
	aAdd(aHelp,{"Será gerada uma planilha para ","MS-Excel, abrir esta planilha?"})

	//Percorre, recriando
	For i:=1 To Len(aP)
		cSeq := StrZero(i,2,0)
		cMvPar := "mv_par"+cSeq
		cMvCh := "mv_ch"+IIF(i<=9,Chr(i+48),Chr(i+87))
		PutSx1(cPerg,;
		cSeq,;
		aP[i,1],aP[i,1],aP[i,1],;
		cMvCh,;
		aP[i,2],;
		aP[i,3],;
		aP[i,4],;
		0,;
		aP[i,5],;
		aP[i,6],;
		aP[i,7],;
		"",;
		"",;
		cMvPar,;
		aP[i,8],aP[i,8],aP[i,8],;
		"",;
		aP[i,9],aP[i,9],aP[i,9],;
		aP[i,10],aP[i,10],aP[i,10],;
		aP[i,11],aP[i,11],aP[i,11],;
		aP[i,12],aP[i,12],aP[i,12],;
		aHelp[i],;
		{},;
		{},;
		"")
	Next i
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Função que imprime o cabeçalho dos antigos relatórios gerados com SetPrint.
