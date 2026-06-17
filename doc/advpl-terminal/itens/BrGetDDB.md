---
title: "BrGetDDB"
function_name: "BrGetDDB"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "grids"
source_url: "https://terminaldeinformacao.com/knowledgebase/brgetddb/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:31"
---

# BrGetDDB

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/brgetddb/

## Exemplo da Rotina

```advpl
oBrowse := BrGetDDB():New(nLinhaInicial,nColunaInicial,nLargura,nAltura,,,,oDlg,,,,,,,,,,,,,'SA1',lCoordenadasEmPixel,,.F.,,, )
```

## Exemplo 1- Grid da SA1

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
	Local aArea := GetArea()
	Local oDlgTst
	Local oBrowse

	DbSelectArea('SA1')

	//Criando a janela
	DEFINE MsDialog oDlgTst FROM 0,0 TO 402,402 PIXEL TITLE 'Exemplo'
		//Declarando o BrGetDDb
		oBrowse := BrGetDDB():New(1,1,200,150,,,,oDlgTst,,,,,,,,,,,,,'SA1',.T.,,,,, )

		//Adicionando colunas
		oBrowse:AddColumn(TCColumn():New('Codigo', {||SA1->A1_COD},,,,  'LEFT',,   .F.,.F.,,,,.F.,))
		oBrowse:AddColumn(TCColumn():New('Loja',   {||SA1->A1_LOJA},,,, 'CENTER',, .F.,.F.,,,,.F.,))
		oBrowse:AddColumn(TCColumn():New('Nome',   {||SA1->A1_NOME},,,, 'LEFT',,   .F.,.F.,,,,.F.,))

		//Adicionando botões
		TButton():New(160, 001, 'GoUp()',                            oDlgTst,{|| oBrowse:GoUp()},             40,10,,,,.T.)
		TButton():New(170, 001, 'GoDown()',                          oDlgTst,{|| oBrowse:GoDown()},           40,10,,,,.T.)
		TButton():New(180, 001, 'GoTop()',                           oDlgTst,{|| oBrowse:GoTop()},            40,10,,,,.T.)
		TButton():New(190, 001, 'GoBottom()',                        oDlgTst,{|| oBrowse:GoBottom()},         40,10,,,,.T.)
		TButton():New(160, 060, 'nAt (Linha selecionada)',           oDlgTst,{|| Alert(oBrowse:nAt)},         80,10,,,,.T.)
		TButton():New(170, 060, 'nRowCount (Nr de linhas visiveis)', oDlgTst,{|| Alert(oBrowse:nRowCount())}, 80,10,,,,.T.)
		TButton():New(180, 060, 'nLen (Numero total de linhas)',     oDlgTst,{|| Alert(oBrowse:nLen)},        80,10,,,,.T.)
		TButton():New(190, 060, 'A1_COD Atual',                      oDlgTst,{|| Alert(SA1->A1_COD)},         80,10,,,,.T.)
	ACTIVATE MsDialog oDlgTst CENTERED

	RestArea(aArea)
Return
```

## Exemplo 2- Grid com a fonte Arial e com opção de dois cliques na linha

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
	Local aArea := GetArea()
	Local oDlgTst
	Local oBrowse
	Local oFontTst := TFont():New('Arial',,-10)

	DbSelectArea('SA1')

	//Criando a janela
	DEFINE MsDialog oDlgTst FROM 0,0 TO 402,402 PIXEL TITLE 'Exemplo'
		//Declarando o BrGetDDb
		oBrowse := BrGetDDB():New(1,1,200,150,,,,oDlgTst,,,,, {|| MsgInfo("Estou posicionado no cliente "+SA1->A1_NOME)},, oFontTst,,,,,,'SA1',.T.,,,,, )

		//Adicionando colunas
		oBrowse:AddColumn(TCColumn():New('Codigo', {||SA1->A1_COD},,,,  'LEFT',,   .F.,.F.,,,,.F.,))
		oBrowse:AddColumn(TCColumn():New('Loja',   {||SA1->A1_LOJA},,,, 'CENTER',, .F.,.F.,,,,.F.,))
		oBrowse:AddColumn(TCColumn():New('Nome',   {||SA1->A1_NOME},,,, 'RIGHT',,  .F.,.F.,,,,.F.,))

		//Adicionando botões
		TButton():New(160, 001, 'GoUp()',                            oDlgTst,{|| oBrowse:GoUp()},             40,10,,,,.T.)
		TButton():New(170, 001, 'GoDown()',                          oDlgTst,{|| oBrowse:GoDown()},           40,10,,,,.T.)
		TButton():New(180, 001, 'GoTop()',                           oDlgTst,{|| oBrowse:GoTop()},            40,10,,,,.T.)
		TButton():New(190, 001, 'GoBottom()',                        oDlgTst,{|| oBrowse:GoBottom()},         40,10,,,,.T.)
		TButton():New(160, 060, 'nAt (Linha selecionada)',           oDlgTst,{|| Alert(oBrowse:nAt)},         80,10,,,,.T.)
		TButton():New(170, 060, 'nRowCount (Nr de linhas visiveis)', oDlgTst,{|| Alert(oBrowse:nRowCount())}, 80,10,,,,.T.)
		TButton():New(180, 060, 'nLen (Numero total de linhas)',     oDlgTst,{|| Alert(oBrowse:nLen)},        80,10,,,,.T.)
		TButton():New(190, 060, 'A1_COD Atual',                      oDlgTst,{|| Alert(SA1->A1_COD)},         80,10,,,,.T.)
	ACTIVATE MsDialog oDlgTst CENTERED

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Função que monta grid conforme alias aberto.
