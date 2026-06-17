---
title: "ButtonBar"
function_name: "ButtonBar"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "telas-objetos"
source_url: "https://terminaldeinformacao.com/knowledgebase/buttonbar/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:12:34"
---

# ButtonBar

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/buttonbar/

## Exemplo da Rotina

```advpl
DEFINE BUTTONBAR oBar SIZE 25,25 3D TOP OF oDlgTst
```

## Exemplo 1- Barra de Botões, com alguns botões de Exemplo

```advpl
//Bibliotecas
#Include "Protheus.ch"

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
	Local oDlgTst
	Local oBar
	Local oBtnCalc
	Local oBtnPar
	Local oBtnOk

	//Criando a janela
	oDlgTst  := MsDialog():New(000,000,305,505, 'Exemplo -BUTTONBAR',,,,,,,,,.T.)
		//Criando a barra de botões
		DEFINE BUTTONBAR oBar SIZE 25,25 3D TOP OF oDlgTst

		//Criando botões pertencentes a barra de botões
		DEFINE BUTTON           RESOURCE "S4WB005N"      OF oBar          ACTION NaoDisp()      TOOLTIP "Recortar"
		DEFINE BUTTON           RESOURCE "S4WB006N"      OF oBar          ACTION NaoDisp()      TOOLTIP "Copiar"
		DEFINE BUTTON           RESOURCE "S4WB007N"      OF oBar          ACTION NaoDisp()      TOOLTIP "Colar"
		DEFINE BUTTON oBtnCalc  RESOURCE "S4WB008N"      OF oBar GROUP    ACTION Calculadora()  TOOLTIP "Calculadora"
		DEFINE BUTTON           RESOURCE "S4WB009N"      OF oBar          ACTION Agenda()       TOOLTIP "Agenda"
		DEFINE BUTTON           RESOURCE "S4WB010N"      OF oBar          ACTION OurSpool()     TOOLTIP "Spool"
		DEFINE BUTTON           RESOURCE "S4WB016N"      OF oBar GROUP    ACTION HelProg()      TOOLTIP "Ajuda"
		DEFINE BUTTON oBtnPar   RESOURCE "PARAMETROS"    OF oBar GROUP    ACTION Sx1C020()      TOOLTIP "Parâmetros"
		DEFINE BUTTON oBtnOk    RESOURCE "FINAL"         OF oBar GROUP    ACTION oDlgTst:End()  TOOLTIP "Sair"

		//Definindo título de alguns botões
		oBtnCalc:cTitle := "Calc"
		oBtnPar:cTitle  := "Param."

		//Definindo clique com o botão direito
		oBar:bRClicked := {|| AllwaysTrue()}

		oDlgTst:lCentered := .T.
	oDlgTst:Activate()
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Função que monta uma barra de botões com ícones em uma Dialog.
