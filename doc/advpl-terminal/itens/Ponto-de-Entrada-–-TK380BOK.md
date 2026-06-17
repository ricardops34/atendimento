---
title: "Ponto de Entrada – TK380BOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tk380bok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:29"
---

# Ponto de Entrada – TK380BOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tk380bok/

## Exemplo do Ponto de Entrada

```advpl
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  TK380BOK                                                                                              |
 | Desc:  Função chamada ao clicar no botão OK na Agenda do Operador                                            |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=233734789                                        |
 *--------------------------------------------------------------------------------------------------------------*/

User Function TK380BOK()
	Local aArea := GetArea()
	Local aAtivs := ParamIXB[1]

	Alert(SUC->(RecNo()))

	RestArea(aArea)
Return .T.
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TK380BOK.
