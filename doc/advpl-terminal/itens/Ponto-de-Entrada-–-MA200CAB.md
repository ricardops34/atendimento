---
title: "Ponto de Entrada – MA200CAB"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma200cab/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:52"
---

# Ponto de Entrada – MA200CAB

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma200cab/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*-------------------------------------------------------------------------------*
 | P.E.:  MA200CAB                                                               |
 | Desc:  Função que adiciona botões na tela de Estrutura de Produtos (MATA200)  |
 | Link:  http://tdn.totvs.com.br/pages/releaseview.action?pageId=6087606        |
 *-------------------------------------------------------------------------------*/

User Function MA200CAB()
	//Variáveis locais
	Local aDados  := {}
	Local oFntTxt := TFont():New("Calibri",,017,,.F.,,,,,.F.,.F.)
	Local oPanelNv, oBtnNv1, oBtnNv2, oBtnNv3, oBtnNv4

	//Pegando os parâmetros
	Local nOpc 		:= PARAMIXB[2]
	Local oObj 		:= PARAMIXB[3]
	Local nLin1 	:= PARAMIXB[4]
	Local nLin2 	:= PARAMIXB[5]
	Local nColIni 	:= PARAMIXB[6]
	Private cProduto:= PARAMIXB[1]

	//Descrições e ações dos botões
	//aAdd(aDados,{"Foto Pai" ,"Processa({|lEnd| MontaFt('C')},'Processando')"})
	aAdd(aDados,{"Botão 1","(SG1->(dbGoto(If(nRec>0,nRec,SG1->(GetArea()[3])))), Alert(SG1->G1_COMP))"})
	aAdd(aDados,{"Botão 2","Alert('Teste')"})
	aAdd(aDados,{"Botão 3","Alert(Posicione('SB1',1,xFilial('SB1')+cProduto,'B1_X_CAMPO'))"})
	aAdd(aDados,{"Botão 4","Alert(cProduto)"})

	//Diminuindo a largura do cabeçaho
	oObj:nWidth := oObj:nWidth - 200

	//Criando o painel
	@ 000,000 MSPANEL oPanelNv SIZE 80,40 OF oObj

	//Botão 1
	@ 005, 005 BUTTON oBtnNv1 PROMPT aDados[1][1] SIZE 030, 012 ACTION(&(aDados[1][2])) OF oPanelNv PIXEL

	//Botão 2
	@ 005, 040 BUTTON oBtnNv2 PROMPT aDados[2][1] SIZE 030, 012 ACTION(&(aDados[2][2])) OF oPanelNv PIXEL

	//Botão 3
	@ 020, 005 BUTTON oBtnNv3 PROMPT aDados[3][1] SIZE 030, 012 ACTION(&(aDados[3][2])) OF oPanelNv PIXEL

	//Botão 4
	@ 020, 040 BUTTON oBtnNv4 PROMPT aDados[4][1] SIZE 030, 012 ACTION(&(aDados[4][2])) OF oPanelNv PIXEL

	//Alinhando o painel a direita do cabeçalho
	oPanelNv:Align := CONTROL_ALIGN_RIGHT
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MA200CAB.
