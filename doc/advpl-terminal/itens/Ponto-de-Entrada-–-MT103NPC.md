---
title: "Ponto de Entrada – MT103NPC"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt103npc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:14"
---

# Ponto de Entrada – MT103NPC

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt103npc/

## Exemplo do Ponto de Entrada

```advpl
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  MT103NPC                                                                                              |
 | Desc:  Preenchimento de campos customizados no botão de pedido na Pré-Nota                                   |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6085416                                          |
 *--------------------------------------------------------------------------------------------------------------*/

User Function MT103NPC()
	Local aArea     := GetArea()
	Local nPosCod   := aScan(aHeader,{|x| AllTrim(Upper(x[2]))=="D1_COD" })
	Local nPosCampo := aScan(aHeader,{|x| AllTrim(Upper(x[2]))=="D1_X_CAMPO" })
	Local nAtual    := 0

	//Percorrendo os acols
	For nAtual := 1 To Len(aCols)
		aCols[nAtual][nPosCampo] := Posicione('SB1', 1, FWxFilial('SB1')+aCols[nAtual][nPosCod], "B1_X_CAMPO")
	Next

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT103NPC.
