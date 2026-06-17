---
title: "Ponto de Entrada – AT410GRV"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-at410grv/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:26"
---

# Ponto de Entrada – AT410GRV

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-at410grv/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*--------------------------------------------------------------------------------*
 | P.E.:  AT410GRV                                                                |
 | Obs:   Rotina que ao gerar o pedido através da OS grava dados da AB6 na SC5    |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6785888            |
 *--------------------------------------------------------------------------------*/

User Function AT410GRV()
	Local aArea := GetArea()

	//Se vier da rotina de Ordens de Serviço
	If Alltrim(FunName()) == 'TECA450'
		M->C5_X_CAMPO := AB6->AB6_X_CAMPO
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

Exemplo do Ponto de Entrada AT410GRV.
