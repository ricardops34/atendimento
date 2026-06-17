---
title: "tMailManager"
function_name: "tMailManager"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/tmailmanager/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:29"
---

# tMailManager

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/tmailmanager/

## Exemplo 1- Acessando uma caixa de entrada e baixando arquivos com extensão .txt (via IMAP)

```advpl
Static Function fProcessa()
	Private cDirBase  := GetSrvProfString("RootPath", "")
	Private cDirPad   := "\x_importacao\"
	Private cConta    := ''
	Private cSenha    := ''
	Private cSrvFull  := ''
	Private cServer   := ''
	Private nPort     := 0

	cConta   := "email@dominio.com.br"
	cSenha   := "senha"
	cSrvFull := "servidor:993"
	cServer   := Iif(':' $ cSrvFull, SubStr(cSrvFull, 1, At(':', cSrvFull)-1), cSrvFull)
	nPort     := Iif(':' $ cSrvFull, Val(SubStr(cSrvFull, At(':', cSrvFull)+1, Len(cSrvFull))), 110)

	//Se o último caracter não for barra, retira ela
	If SubStr(cDirBase, Len(cDirBase), 1) == '\'
		cDirBase := SubStr(cDirBase, 1, Len(cDirBase)-1)
	EndIf

	//O diretório cheio, será o caminho absoluto + conteúdo do parâmetro, por exemplo, D:\TOTVS\TOTVS Protheus\Protheus_Data\x_importacao_email
	cDirFull := cDirBase + cDirPad

	//Chama a importação
	fBaixa()
Return

Static Function fBaixa()
	Local aArea := GetArea()
	Local cArqINI
	Local cBkpConf
	Local nRet
	Local nNumMsg
	Local nMsgAtu
	Local oManager
	Local oMessage
	Local nAnexoAtu
	Local nTotAnexo
	Local aInfAttach
	Local lOk
	Local lEntrou

	//Altera o arquivo appserver.ini, deixando como IMAP
	cArqINI  := GetSrvIniName()
	cBkpConf := GetPvProfString( "MAIL", "Protocol", "", cArqINI )
	WritePProString('MAIL', 'PROTOCOL', 'IMAP', cArqINI)

	//Cria a conexão base no gerenciamento
	oManager := tMailManager():New()
	oManager:SetUseSSL(.T.)
	oManager:SetUseTLS(.T.)
	oManager:Init(cServer, "", cConta, cSenha, nPort, 0)

	//Caso não consiga setar 120 segundos como timeout (2 minutos), não continua
	If oManager:SetPopTimeOut(120) != 0
		//ConOut("[zBxMail] Falha ao setar o timeout" )
	Else

		//Faz a conexão com IMAP
		nRet := oManager:IMAPConnect()

		//Se não conseguir conectar, mostra qual é a mensagem de erro
		If nRet != 0
			//ConOut("[zBxMail] Falha ao conectar" )
			//ConOut("[zBxMail][ERROR] " + StrZero(nRet, 6), oManager:GetErrorString(nRet))

		Else
			//ConOut("[zBxMail] Sucesso ao conectar" )

			//Busca o número de mensagens na caixa de entrada
			nNumMsg := 0
			oManager:GetNumMsgs(@nNumMsg)

			//Se houver mensagens a serem processadas
			If nNumMsg > 0
				ProcRegua(nNumMsg)

				//Percorre o número de mensagens
				For nMsgAtu := 1 To nNumMsg
					IncProc("Baixando e-Mail " + cValToChar(nMsgAtu) + " de " + cValToChar(nNumMsg) + "...")

					//Buscando a mensagem atual
					oMessage := tMailMessage():new()
					oMessage:Clear()
					oMessage:Receive(oManager, nMsgAtu)

					//Busca o total de Anexos
					nTotAnexo := oMessage:GetAttachCount()

					//Limpando a flag
					lOk := .T.
					lEntrou := .F.

					//Percorre todos os anexos
					For nAnexoAtu := 1 To nTotAnexo
						//Busca as informações do anexo
						aInfAttach := oMessage:GetAttachInfo(nAnexoAtu)

						//Se tiver conteúdo, e for do tipo TXT e vier do email teste@dominio.com
						If ! Empty(aInfAttach[1]) .And. Upper(Right(AllTrim(aInfAttach[1]),4)) == '.TXT' .And. "TESTE@DOMINIO.COM" $ Upper(oMessage:cFrom)
							lEntrou := .T.

							//Salva o arquivo na pasta correta
							If oMessage:SaveAttach(nAnexoAtu, cDirFull + aInfAttach[1])

								//ConOut("+================================+")
								//ConOut("[zBxMail] e-Mail Lido com Anexo: ")
								//ConOut("e-Mail Origem:      " + cConta)
								//ConOut("Número da Mensagem: " + cValToChar(nMsgAtu))
								//ConOut("De:                 " + oMessage:cFrom)
								//ConOut("Cópia:              " + oMessage:cCc)
								//ConOut("Assunto:            " + oMessage:cSubject)
								//ConOut("Número Anexo:       " + cValToChar(nAnexoAtu))
								//ConOut("Anexo " + StrZero(nAnexoAtu, 3) + ":          " + aInfAttach[1] )
								//ConOut("Corpo:              " + oMessage:cBody)
								//ConOut("+================================+")

							Else
								lOk := .F.
								//ConOut("[zBxMail] Erro ao salvar anexo " + cValToChar(nAnexoAtu) + ": " + aInfAttach[1] )
							EndIf
						EndIf

					Next nAnexoAtu

					//Se o anexo tiver sido salvo com sucesso
					If lOk
						If lEntrou
							If ! (oManager:MoveMsg(nMsgAtu, "Importados"))
								//ConOut("[zBxMail] Não foi possível mover a mensagem - " + cValToChar(nMsgAtu) + "...")
							EndIf
						Else
							If ! (oManager:MoveMsg(nMsgAtu, "Processados"))
								//ConOut("[zBxMail] Não foi possível mover a mensagem - " + cValToChar(nMsgAtu) + "...")
							EndIf
						EndIf
					EndIf

					//ConOut(CRLF)
				Next nMsgAtu

			Else
				//ConOut("[zBxMail] Não existem mensagens para processamento...")
			EndIf

			//Desconecta do servidor IMAP
			oManager:IMAPDisconnect()
		EndIf
	EndIf

	//Volta a configuração de Protocol no arquivo appserver.ini
	WritePProString('MAIL', 'PROTOCOL', cBkpConf, cArqINI)

	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Realiza conexão a uma conta de e-Mail e faz download das mensagens / anexos
