---
title: "TMailMessage e TMailManager"
function_name: "TMailMessage"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/tmailmessage-e-tmailmanager/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:30"
---

# TMailMessage e TMailManager

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/tmailmessage-e-tmailmanager/

## Exemplo 1- Dispara um e-Mail conforme parametrizações do Protheus

```advpl
Static Function fEnvMail(cAssunto, cMensagem, cPara)
	Local aArea        := GetArea()
	Local lRet         := .T.
	Local oMsg         := Nil
	Local oSrv         := Nil
	Local nRet         := 0
	Local cFrom        := Alltrim(GetMV("MV_RELACNT"))
	Local cUser        := SubStr(cFrom, 1, At("@", cFrom)-1)
	Local cPass        := Alltrim(GetMV("MV_RELPSW"))
	Local cSrvFull     := Alltrim(GetMV("MV_RELSERV"))
	Local cServer      := ""
	Local nPort        := 0
	Local nTimeOut     := GetMV("MV_RELTIME")
	Local cLog         := ""
	Local nAtu         := 0
	Local lUsaTLS      := .T.
	Default cAssunto   := ""
	Default cMensagem  := ""

	//Se tiver em branco o destinatario, o assunto ou o corpo do email
	If Empty(cPara) .Or. Empty(cAssunto) .Or. Empty(cMensagem)
		cLog += "001 - Destinatario, Assunto ou Corpo do e-Mail vazio(s)!" + CRLF
		lRet := .F.
	EndIf

	//Se tiver ok, continua com a montagem do e-Mail
	If lRet
		cServer      := Iif(':' $ cSrvFull, SubStr(cSrvFull, 1, At(':', cSrvFull)-1), cSrvFull)
		nPort        := Iif(':' $ cSrvFull, Val(SubStr(cSrvFull, At(':', cSrvFull)+1, Len(cSrvFull))), 587)

		//Cria a nova mensagem
		oMsg := TMailMessage():New()
		oMsg:Clear()

		//Define os atributos da mensagem
		oMsg:cFrom    := cFrom
		oMsg:cTo      := cPara
		oMsg:cSubject := cAssunto
		oMsg:cBody    := cMensagem

		//Cria servidor para disparo do e-Mail
		oSrv := tMailManager():New()

		//Define se ira utilizar o TLS
		If lUsaTLS
			oSrv:SetUseTLS(.T.)
		EndIf

		//Inicializa conexao
		nRet := oSrv:Init("", cServer, cUser, cPass, 0, nPort)
		If nRet != 0
			cLog += "004 - Nao foi possivel inicializar o servidor SMTP: " + oSrv:GetErrorString(nRet) + CRLF
			lRet := .F.
		EndIf

		If lRet
			//Define o time out
			nRet := oSrv:SetSMTPTimeout(nTimeOut)
			If nRet != 0
				cLog += "005 - Nao foi possivel definir o TimeOut '"+cValToChar(nTimeOut)+"'" + CRLF
			EndIf

			//Conecta no servidor
			nRet := oSrv:SMTPConnect()
			If nRet <> 0
				cLog += "006 - Nao foi possivel conectar no servidor SMTP: " + oSrv:GetErrorString(nRet) + CRLF
				lRet := .F.
			EndIf

			If lRet
				//Realiza a autenticacao do usuario e senha
				nRet := oSrv:SmtpAuth(cContaAuth, cPassAuth)
				If nRet <> 0
					cLog += "007 - Nao foi possivel autenticar no servidor SMTP: " + oSrv:GetErrorString(nRet) + CRLF
					lRet := .F.
				EndIf

				If lRet
					//Envia a mensagem
					nRet := oMsg:Send(oSrv)
					If nRet <> 0
						cLog += "008 - Nao foi possivel enviar a mensagem: " + oSrv:GetErrorString(nRet) + CRLF
						lRet := .F.
					EndIf
				EndIf

				//Disconecta do servidor
				nRet := oSrv:SMTPDisconnect()
				If nRet <> 0
					cLog += "009 - Nao foi possivel desconectar do servidor SMTP: " + oSrv:GetErrorString(nRet) + CRLF
				EndIf
			EndIf
		EndIf
	EndIf

	//Se tiver log de avisos/erros
	If !Empty(cLog)

		cLog := "+======================= Envio de eMail =======================+" + CRLF + ;
			"Data  - "+dToC(Date())+ " " + Time() + CRLF + ;
			"Funcao    - " + FunName() + CRLF + ;
			"Processos - " + cProcessos + CRLF + ;
			"Para      - " + cPara + CRLF + ;
			"Assunto   - " + cAssunto + CRLF + ;
			"Corpo     - " + cMensagem + CRLF + ;
			"Existem mensagens de aviso: "+ CRLF +;
			cLog + CRLF +;
			"+======================= Envio de eMail =======================+"

		Aviso("Log", cLog, {"Ok"}, 2)
	EndIf

	RestArea(aArea)
Return lRet
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Dispara um e-Mail
