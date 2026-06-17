---
title: "Ponto de Entrada – MT440VLD"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt440vld/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:38"
---

# Ponto de Entrada – MT440VLD

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt440vld/

## Exemplo do Ponto de Entrada

```advpl
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT440VLD                                                                                      |
 | Desc:  Ponto de entrada antes de começar a liberação, a após mostrar a primeira pergunta             |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6784366                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MT440VLD()
	Local aArea := GetArea()
	Local lRet := .T.

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

Exemplo do Ponto de Entrada MT440VLD.
