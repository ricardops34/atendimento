---
title: "Ma200Monta"
function_name: "Ma200Monta"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "funcoes-internas"
source_url: "https://terminaldeinformacao.com/knowledgebase/ma200monta/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:06"
---

# Ma200Monta

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ma200monta/

## Exemplo da Rotina

```advpl
Ma200Monta(oTree, oDialog, cProduto)
```

## Exemplo 1- Mostrando a estrutura em uma janela customizada

```advpl
Static Function fVerEstr()
	Local aArea    := GetArea()
	Local nJanLarg := 800
	Local nJanAltu := 500
	Local cProduto := "000001"
	Local cDescric := "Caneta Azul"
	Private oDlgEstr
	Private oTreePad
	//Variaveis para usar o Ma200Monta
	Private ldbTree := .T.
	Private nIndex  := 1

	//Criando a janela
	DEFINE MSDIALOG oDlgEstr TITLE "Estrutura" FROM 000, 000  TO nJanAltu, nJanLarg COLORS 0, 16777215 PIXEL
		@ 001, 001 Say "Produto: " + Alltrim(cProduto) + " (" + Alltrim(cDescric) + ")" of oDlgEstr Pixel

		//Criando o DbTree
		oTreePad := dbTree():New(011,003,(nJanAltu/2)-26,(nJanLarg/2)-1,oDlgEstr,{|| },,.T.)

		//Monta os dados da Tree
		Pergunte('MTA200', .F.)
		Ma200Monta(oTreePad, oDlgEstr, cProduto)

		//Legenda
		@ (nJanAltu/2)-23, 003 GROUP oGrpLeg TO (nJanAltu/2)-3, (nJanLarg/2-003)-96 PROMPT "Legenda: " OF oDlgEstr COLOR 0, 16777215 PIXEL
			@ (nJanAltu/2)-17, 006 BITMAP oBmpPend SIZE 012, 011 OF oDlgEstr FILENAME "FOLDER5"  NOBORDER ADJUST PIXEL
			@ (nJanAltu/2)-17, 067 BITMAP oBmpFina SIZE 012, 011 OF oDlgEstr FILENAME "FOLDER7" NOBORDER ADJUST PIXEL
			@ (nJanAltu/2)-14, 024 SAY oSayPend PROMPT "Componente Ok"        SIZE 040, 007 OF oDlgEstr PIXEL
			@ (nJanAltu/2)-14, 085 SAY oSayFina PROMPT "Componente Expirado"  SIZE 060, 007 OF oDlgEstr PIXEL

		@ (nJanAltu/2)-23, (nJanLarg/2-003)-93 GROUP oGrpAco TO (nJanAltu/2)-3, (nJanLarg/2)-1 PROMPT "Acoes: " OF oDlgEstr COLOR 0, 16777215 PIXEL
			@ (nJanAltu/2)-17,(nJanLarg/2-003)-(0042*01) BUTTON "&Sair"       Size 040, 012 Action (oDlgEstr:End()) PIXEL

	ACTIVATE MSDIALOG oDlgEstr CENTERED

	RestArea(aArea)
Return
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Monta a visualização da estrutura
