---
title: "Ponto de Entrada – F080FIL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f080fil/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:38"
---

# Ponto de Entrada – F080FIL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f080fil/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------------------------------------------*
 | P.E.:  F080FIL                                                                                          |
 | Desc:  P.E. executado para filtrar as baixas por lote - Contas a Pagar                                  |
 | Link:  http://tdn.totvs.com/display/public/mp/F080FIL+-+Antes+da+IndRegua+na+baixa+por+lote+CP+--+11661 |
 *---------------------------------------------------------------------------------------------------------*/

User Function F080FIL()
	Local aArea := GetArea()
	Local cFiltro := ""

	cFiltro += " SE2->E2_X_CAMPO = 'XXX' "

	RestArea(aArea)
Return cFiltro
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F080FIL.
