---
title: "tFTPClient"
function_name: "tFTPClient"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/tftpclient/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:20:26"
---

# tFTPClient

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/tftpclient/

## Exemplo da Rotina

```advpl
oFtp := tFTPClient():New()
```

## Exemplo 1- Envia arquivo para FTP

```advpl
Static Function fUpFile(cFileOrig, nSegundos)
	Local cServer     := "server.site.com"
	Local nPort       := 21
	Local cUser       := "usuario"
	Local cPass       := "senha@123"
	Local cFTPDest    := "/pasta_no_ftp/"
	Local cDataTemp   := "\x_ftp_temp\"
	Local cNameFile   := ""
	Local cFileDest   := ""
	Default cFileOrig := ""
	Default nSegundos := 5

	//Se tiver o arquivo e o destino
	If ! Empty(cFileOrig)

		oFtp := tFTPClient():New()

		//Tenta estabelecer a conexão
		If oFtp:FTPConnect(cServer, nPort, cUser, cPass) == 0

			//Pega apenas o nome do arquivo com a extensão
			cNameFile := SubStr(cFileOrig, RAt("\", cFileOrig) + 1, Len(cFileOrig))
			cFileDest := cValToChar(Year(Date())) + "_" + StrZero(Month(Date()), 2) + "-" + cNameFile

			//Se não existir a pasta temporária dentro da Protheus Data, cria ela
			If ! ExistDir(cDataTemp)
				MakeDir(cDataTemp)
			EndIf

			//Copia o arquivo origem para dentro da Protheus Data
			CpyT2S(cFileOrig, cDataTemp)

			//Muda o diretório do FTP
			If oFtp:ChDir(cFTPDest) == 0

				//Tenta fazer o upload da Protheus Data para o destino no FTP
				If oFtp:SendFile(cDataTemp + cNameFile, Alltrim(cFTPDest + cFileDest)) == 0
					//Sleep(nSegundos * 1000)

					u_MsgLog("Atenção", "Arquivo copiado com sucesso!" + CRLF + "Acesse em site.com.br" + StrTran((cFTPDest + cFileDest), "/public_html", ""))
				Else
					MsgStop("Falha ao copiar o arquivo para o FTP!", "Atenção")
				EndIf

			Else
				MsgStop("Não foi possível mudar o diretório de Upload!", "Atenção")
			EndIf

			//Fecha a conexão
			oFtp:Close()
		Else
			MsgStop("Erro de conexão!", "Atenção")
		EndIf
	EndIf
Return
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Classe para enviar arquivos para FTP
