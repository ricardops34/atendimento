---
title: "Ponto de Entrada – F080ACRE"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f080acre/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:37"
---

# Ponto de Entrada – F080ACRE

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f080acre/

## Exemplo do Ponto de Entrada

```advpl
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  F080ACRE                                                                                      |
 | Desc:  P.E. para editar as variáveis no baixas a Pagar (utilizado na baixa por lote)                 |
 *------------------------------------------------------------------------------------------------------*/

User Function F080ACRE()
	Local aArea    := GetArea()
	Local nTamHist := TamSX3('E5_HISTOR')[01] //Len(cHist070)

	//Se for a janela do baixa por lote
	If IsInCallStack("fA080TitW")
		//Atualiza o histórico na baixa
		cHist070 := SE2->E2_HIST
	EndIf

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F080ACRE.
