---
title: "Ponto de Entrada – MTA650E"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mta650e/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:00"
---

# Ponto de Entrada – MTA650E

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mta650e/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MTA650E                                                                                       |
 | Desc:  Antes da Exclusão da OP                                                                       |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6089302                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MTA650E()
	Local aArea:=GetArea()
	Local lRet :=.F.

	lRet := MsgYesNo("Deseja continuar?", "Atenção")

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MTA650E.
