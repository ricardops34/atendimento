---
title: "FTPDirChange"
function_name: "FTPDirChange"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/ftpdirchange/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:14:08"
---

# FTPDirChange

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ftpdirchange/

## Exemplo da Rotina

```advpl
FTPDirChange(cDiretorio)
```

## Exemplo 1- Realiza upload de arquivo

```advpl
//Bibliotecas
#Include "Totvs.ch"

Static Function fUpFile(cFileOrig)
	Local cServer  := "server.site.com.br"
	Local nPort    := 21
	Local cUser    := "user"
	Local cPass    := "senha@123"
	Local lClose   := .F.
	Local cFTPDest := "/pasta_dentro_do_ftp/"
	Local cTemp    := "\x_ftp_temp\"

	//Se tiver o arquivo e o destino
	If ! Empty(cFileOrig) .And. !Empty(cFTPDest)

		//Tenta estabelecer a conexão
		If FTPConnect(cServer, nPort, cUser, cPass)

			//Pega apenas o nome do arquivo com a extensão
			cNameFile := SubStr(cFileOrig, RAt("\", cFileOrig) + 1, Len(cFileOrig))

			//Se não existir a pasta temporária dentro da Protheus Data, cria ela
			If ! ExistDir(cTemp)
				MakeDir(cTemp)
			EndIf

			CpyT2S(cFileOrig, cTemp)

			If FTPDirChange(cFTPDest)
				If FTPUpload(cTemp + cNameFile, cFTPDest + cNameFile)
					MsgInfo("Arquivo copiado para o FTP com sucesso!", "Atenção")
				Else
					MsgStop("Falha ao copiar o arquivo para o FTP!", "Atenção")
				EndIf

			Else
				MsgStop("Não foi possível mudar o diretório de Upload!", "Atenção")
			EndIf

			//Fecha a conexão
			lClose := FTPDisconnect()
			If ! lClose
				MsgStop("Falha ao fechar a conexão!", "Atenção")
			EndIf
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

Muda o diretório no server FTP
