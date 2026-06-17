---
title: "WSSERVICE, WSDATA e WSMETHOD"
function_name: "WSSERVICE"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "webservices"
source_url: "https://terminaldeinformacao.com/knowledgebase/wsservice-wsdata-wsmethod/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:20:40"
---

# WSSERVICE, WSDATA e WSMETHOD

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/wsservice-wsdata-wsmethod/

## Exemplo da Rotina

```advpl
WSSERVICE [Nome do WS] DESCRIPTION "Descricao do WS"

	//Atributos
	WSDATA   [Atributo 1]  as String
	WSDATA   [Atributo 2]  as String
	WSDATA   [Atributo ...]  as String

	//Métodos
	WSMETHOD [Metodo 1]       DESCRIPTION "Descricao do Metodo"
	WSMETHOD [Metodo 2]       DESCRIPTION "Descricao do Metodo"
	WSMETHOD [Metodo ...]     DESCRIPTION "Descricao do Metodo"

ENDWSSERVICE

WSMETHOD [Metodo] WsReceive [Atributo de Recebimento] WsSend [Atributo de Envio] WsService [Nome do WS]
	//Processamento
Return .T.
```

## Exemplo 1- Importação de XML ou JSON em AdvPL

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "APWebSrv.ch"
#Include "TBIConn.ch"
#Include "TBICode.ch"
#Include "TopConn.ch"
#Include "aarray.ch"
#Include "json.ch"
#Include "shash.ch"

/*
Para testar o consumo dos métodos diretamente no Protheus, é necessário criar uma User Function

User Function zTstWS()
	Local aArea := GetArea()

	...
	oWsTst := WsTeste():ImpXML(cXml)
	...

	RestArea(aArea)
Return
*/

WSSERVICE WsTeste DESCRIPTION "WebService de testes"

	//Atributos
	WSDATA   cDadXML  as String
	WSDATA   cMsgXML  as String
	WSDATA   cDadJSON as String
	WSDATA   cMsgJSON as String

	//Métodos
	WSMETHOD ImpXML       DESCRIPTION "Método de importação de XML"
	WSMETHOD ImpJSON      DESCRIPTION "Método de importação de JSON"

ENDWSSERVICE

//Importação de XML
/* Exemplo de XML:
"<?xml version='1.0'?>
<Cadastro>
  <Numero>000000</Numero>
  <Nome>Teste</Nome>
</Cadastro>"
*/

WSMETHOD ImpXML WsReceive cDadXML WsSend cMsgXML WsService WsTeste
	Local cNumero := "", cNome := ""
	Local oArq, oCad
	Local cAviso := "", cErro := ""

	ConOut("Inicio ImpXML: "+Time())

	//Convertendo o xml para objeto, e pegando o nó de cadastro
	cDadXML := FWNoAccent(::cDadXML)
	oArq    := XmlParser(cDadXML, "_", @cAviso, @cErro)
	oCad    := oArq:_Cadastro

	//Pegando os atributos de número e nome
	cNumero := oCad:_Numero:TEXT
	cNome   := oCad:_Nome:TEXT

	DbSelectArea("ZZ1")
	ZZ1->(DbSetOrder(1)) //Filial + Numero

	//Se não encontrar o numero, importa o novo registro
	If ! ZZ1->(DbSeek(FWxFilial('ZZ1') + cNumero))
		RecLock('ZZ1', .T.)
			ZZ1_FILIAL := FWxFilial('ZZ1')
			ZZ1_NUMERO := cNumero
			ZZ1_NOME   := cNome
		ZZ1->(MsUnlock())

		::cMsgXML := "Registro importado ("+cNumero+")!"

	Else
		::cMsgXML := "Registro ja existe ("+cNumero+")!"
	EndIf

	ConOut("Termino ImpXML: "+Time())
Return .T.

//Importação de JSON
/* Exemplo de JSON:
{"Cadastro": {
	"Numero": "000000",
	"Nome": "Teste"
}}
*/
WSMETHOD ImpJSON WsReceive cDadJSON WsSend cMsgJSON WsService WsTeste
	Local cNumero := "", cNome := ""
	Local oArq, oCad
	Local cAviso := "", cErro := ""

	ConOut("Inicio ImpJSON: "+Time())

	//Deserializando o JSON
	If (FWJsonDeserialize(::cDadJSON, @oArq))
		oCad := oArq:Cadastro

		//Pegando os atributos de número e nome
		cNumero := oCad:_Numero
		cNome   := oCad:_Nome

		DbSelectArea("ZZ1")
		ZZ1->(DbSetOrder(1)) //Filial + Numero

		//Se não encontrar o numero, importa o novo registro
		If ! ZZ1->(DbSeek(FWxFilial('ZZ1') + cNumero))
			RecLock('ZZ1', .T.)
				ZZ1_FILIAL := FWxFilial('ZZ1')
				ZZ1_NUMERO := cNumero
				ZZ1_NOME   := cNome
			ZZ1->(MsUnlock())

			::cMsgJSON := "Registro importado ("+cNumero+")!"

		Else
			::cMsgJSON := "Registro ja existe ("+cNumero+")!"
		EndIf

	Else
		SetSoapFault('Erro', 'JSON nao deserializado!')
		Return .F.
	EndIf

	ConOut("Termino ImpJSON: "+Time())
Return .T.
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;
– Caso você precise fazer o download das bibliotecas aarray.ch, json.ch e shash.ch, acesse Pacotão de Includes

## Referências

– leonardods
– TDN – Web Services REST
– TDN – FWJsonDeserialize
– TDN – XMLParser
– Tudo em AdvPL

## Resumo

Exemplo de montagem de serviço de WS com métodos e atributos para importação, processamento ou exportação de dados em AdvPL.
