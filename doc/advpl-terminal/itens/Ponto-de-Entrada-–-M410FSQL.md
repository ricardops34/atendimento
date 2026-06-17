---
title: "Ponto de Entrada – M410FSQL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m410fsql/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:27"
---

# Ponto de Entrada – M410FSQL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m410fsql/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  M410FSQL                                                     |
 | Desc:  Função que filtra a tela do pedido de vendas                 |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6784180 |
 *---------------------------------------------------------------------*/

User Function M410FSQL()
	Local aArea := GetArea()
	Local cFiltro := ""
	Local cPerg := PadR("X_M410FSQL", 10)
	Local dDataDe := sToD("")
	Local dDataAt := sToD("")

	//Criando a pergunta
	fValidPerg(cPerg)

	//Se a pergunta for confirmada
	If Pergunte(cPerg, .T.)
		dDataDe := MV_PAR01
		dDataAt := MV_PAR02
		cFiltro += '('

		//Emissão De
		cFiltro += 'C5_EMISSAO >= sToD("'+dToS(dDataDe)+'") '

		//Emissão Até
		cFiltro += '.And. C5_EMISSAO <= sToD("'+dToS(dDataAt)+'") '

		cFiltro += ')'
	EndIf

	RestArea(aArea)
Return cFiltro

/*---------------------------------------------------------------------*
 | Func:  fValidPerg                                                   |
 | Desc:  Função para criação do grupo de perguntas                    |
 *---------------------------------------------------------------------*/

Static Function fValidPerg(cPerg)
	//(		cGrupo,	cOrdem,	cPergunt,				cPergSpa,		cPergEng,	cVar,		cTipo,	nTamanho,					nDecimal,	nPreSel,	cGSC,	cValid,	cF3,	cGrpSXG,	cPyme,	cVar01,		cDef01,	cDefSpa1,	cDefEng1,	cCnt01,	cDef02,		cDefSpa2,	cDefEng2,	cDef03,		cDefSpa3,		cDefEng3,	cDef04,	cDefSpa4,	cDefEng4,	cDef05,	cDefSpa5,	cDefEng5,	aHelpPor,	aHelpEng,	aHelpSpa,	cHelp)
	PutSx1(cPerg,		"01",		"Dt.Emissao Deç",		"",				"",			"mv_ch0",	"D",	TamSX3("C5_EMISSAO")[1],	0,			0,			"G",	"",			"",		"",			"",		"mv_par01",	"",			"",			"",			"",			"",				"",			"",			"",				"",				"",			"",			"",			"",			"",			"",			"",			{},			{},			{},			"")
	PutSx1(cPerg,		"02",		"Dt.Emissao Ateç",	"",				"",			"mv_ch1",	"D",	TamSX3("C5_EMISSAO")[1],	0,			0,			"G",	"",			"",		"",			"",		"mv_par02",	"",			"",			"",			"",			"",				"",			"",			"",				"",				"",			"",			"",			"",			"",			"",			"",			{},			{},			{},			"")
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M410FSQL.
