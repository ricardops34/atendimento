---
title: "Ponto de Entrada – A010TOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a010tok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:10"
---

# Ponto de Entrada – A010TOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a010tok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  A010TOK                                                                                       |
 | Desc:  Confirmação do cadastro de produtos                                                           |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6087477                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function A010TOK()
	Local aArea := GetArea()
	Local aAreaB1 := SB1->(GetArea())
	Local lRet := .T.

	//Se for inclusão
	If INCLUI
		MsgInfo("Estou em uma <b>inclusão</b>!", "Atenção")
	EndIf

	//Se for alteração
	If ALTERA
		MsgInfo("Estou em uma <b>alteração</b>!", "Atenção")
	EndIf

	//Se for cópia
	If lCopia
		MsgInfo("Estou em uma <b>cópia</b>!", "Atenção")
	EndIf

	lRet := MsgYesNo("Deseja continuarç", "Atenção")

	RestArea(aAreaB1)
	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada A010TOK.
