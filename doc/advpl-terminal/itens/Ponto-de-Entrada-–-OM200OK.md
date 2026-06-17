---
title: "Ponto de Entrada – OM200OK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-om200ok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:05"
---

# Ponto de Entrada – OM200OK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-om200ok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

//Constantes
#Define POS_PEDIDO    0005
#Define STR_PULA      Chr(13)+Chr(10)

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  OM200OK                                                                                       |
 | Desc:  Ponto de entrada antes de finalizar a carga validando se os pedidos estão ok                  |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6091308                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function OM200OK()
	Local aArea     := GetArea()
	Local aPedidos  := ParamIXB[01]
	Local lContinua := .T.
	Local cLogPed   := ""
	Local nAtual    := 0

	//Percorrendo os pedidos
	For nAtual := 1 To Len(aPedidos)
		cLogPed += "Pedido "+aPedidos[nAtual][POS_PEDIDO]+";"+STR_PULA
	Next

	//Se tiver conteúdo na variável de log, mostra para o usuário
	If !Empty(cLogPed)
		Aviso("Atenção", "Pedidos: "+STR_PULA+cLogPed, {"Ok"}, 3)
	EndIf

	RestArea(aArea)
Return lContinua
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada OM200OK.
