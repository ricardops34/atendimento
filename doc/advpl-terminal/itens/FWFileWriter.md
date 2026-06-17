---
title: "FWFileWriter"
function_name: "FWFileWriter"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "arquivos"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwfilewriter/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:14"
---

# FWFileWriter

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwfilewriter/

## Exemplo da Rotina

```advpl
oFWriter := FWFileWriter():New("Caminho do arquivo", .T.)
oFWriter:Write('')
oFWriter:Close()
```

## Exemplo 1- Escrevendo um texto simples

```advpl
#Include "Protheus.ch"

User Function zTstTxt()
	Local cPasta   := ""
	Local cArquivo := ""

	//Define a pasta como a temporária do S.O. e o nome do arquivo como teste1
	cPasta   := GetTempPath()
	cArquivo := "teste1.txt"

	//Chama a criação da classe
	oFWriter := FWFileWriter():New(cPasta + cArquivo, .T.)

	//Se houve falha ao criar, mostra a mensagem
	If ! oFWriter:Create()
		MsgStop("Houve um erro ao gerar o arquivo: " + CRLF + oFWriter:Error():Message, "Atenção")

	//Senão, continua com o processamento
	Else

		//Escreve uma frase qualquer no arquivo
		oFWriter:Write('Hello World' + CRLF)

		//Encerra o arquivo
		oFWriter:Close()

		//Pergunta se deseja abrir o arquivo
		If MsgYesNo("Arquivo gerado com sucesso (" + cPasta + cArquivo + ")!" + CRLF + "Deseja abrir?", "Atenção")
			ShellExecute("OPEN", cArquivo, "", cPasta, 1 )
		EndIf
	EndIf

Return
```

## Exemplo 2- Escrevendo os dados de uma query

```advpl
#Include "Protheus.ch"
#Include "TopConn.ch"

User Function zTstTxt()
	Local cPasta   := ""
	Local cArquivo := ""
	Local cQuery   := ""
	Local cLinha   := ""

	//Define a pasta como a temporária do S.O. e o nome do arquivo como teste1
	cPasta   := GetTempPath()
	cArquivo := "teste2.txt"

	//Chama a criação da classe
	oFWriter := FWFileWriter():New(cPasta + cArquivo, .T.)

	//Se houve falha ao criar, mostra a mensagem
	If ! oFWriter:Create()
		MsgStop("Houve um erro ao gerar o arquivo: " + CRLF + oFWriter:Error():Message, "Atenção")

	//Senão, continua com o processamento
	Else

		//Monta a query
		cQuery := " SELECT "                                        + CRLF
		cQuery += "     BM_GRUPO, BM_DESC "                         + CRLF
		cQuery += " FROM "                                          + CRLF
		cQuery += "     " + RetSQLName('SBM') + " SBM "             + CRLF
		cQuery += " WHERE "                                         + CRLF
		cQuery += " 	BM_FILIAL = '" + FWxFilial('SBM') + "' "    + CRLF
		cQuery += " 	AND SBM.D_E_L_E_T_ = ' ' "                  + CRLF
		TCQuery cQuery New Alias "QRY_SBM"

		//Enquanto houver dados
		While ! QRY_SBM->(EoF())
			//Monta a linha que será escrita
			cLinha := ""
			cLinha += QRY_SBM->BM_GRUPO + ";"
			cLinha += QRY_SBM->BM_DESC  + ";"

			//Escreve a linha com a quebra do CRLF no fim
			oFWriter:Write(cLinha + CRLF)

			QRY_SBM->(DbSkip())
		EndDo
		QRY_SBM->(DbCloseArea())

		//Encerra o arquivo
		oFWriter:Close()

		//Pergunta se deseja abrir o arquivo
		If MsgYesNo("Arquivo gerado com sucesso (" + cPasta + cArquivo + ")!" + CRLF + "Deseja abrir?", "Atenção")
			ShellExecute("OPEN", cArquivo, "", cPasta, 1 )
		EndIf
	EndIf

Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Classe para criar um arquivo e popular incrementalmente
