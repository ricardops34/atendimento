---
title: "Ponto de Entrada – M200TEXT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m200text/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:26"
---

# Ponto de Entrada – M200TEXT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m200text/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  M200TEXT                                                                                      |
 | Desc:  Criação de função para alterar a descrição do item na estrutura                               |
 | Link:  http://tdn.totvs.com.br/pages/releaseview.action?pageId=6087873                               |
 *------------------------------------------------------------------------------------------------------*/

User Function M200TEXT()
	Local aArea    := GetArea()
	Local aAreaSB1 := SB1->(GetArea())
	Local cQuant   := ""
	Local cTextOri := ParamIXB[1] // Texto original, já com o TRT e a QTDE adicionados por padrão do sistema
	Local cPai     := ParamIXB[2] // Código do item pai
	Local cTRT     := ParamIXB[3] // Sequencia TRT do item na estrutura
	Local cComp    := ParamIXB[4] // Código do componente que está sendo inserido na árvore
	Local nQuant   := ParamIXB[5] // Quantidade do item na estrutura
	Local nTamCod  := TamSX3("B1_COD")
	Local nTamQtd  := TamSX3("G1_QUANT")
	Local cReturn  := cComp

	//Se o componente não estiver em branco
	If !(Empty(cComp))
	    SB1->(dbSetOrder(1))
	    If SB1->(dbSeek(xFilial("SB1") + cComp))
	    	cReturn += ' - '+Alltrim(SubStr(SB1->B1_DESC,1,30))       //Descrição
	    	cReturn += '     / Qtd.: '+cValToChar(nQuant)    //Quantidade
	    	cReturn += '     / Campo: '+SB1->B1_X_CAMPO
	    EndIf
	EndIf

	// Restaura as áreas originais
	RestArea(aAreaSB1)
	RestArea(aArea)
Return cReturn // novo texto a ser apresentado na árvore da estrutura
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M200TEXT.
