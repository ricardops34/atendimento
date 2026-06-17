---
title: "Ponto de Entrada – MTA455P"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mta455p/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:57"
---

# Ponto de Entrada – MTA455P

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mta455p/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'Protheus.ch'
#Include 'RwMake.ch'

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MTA455P                                                                                       |
 | Desc:  Validação de liberação de estoque Manual                                                      |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6784411                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MTA455P()
	Local aArea   := GetArea()
	Local aAreaC9 := SC9->(GetArea())
	Local aAreaC6 := SC6->(GetArea())
	Local aAreaC5 := SC5->(GetArea())
	Local lRet := .T.

	lRet := MsgYesNo("Deseja continuar?", "Atenção")

	RestArea(aAreaC5)
	RestArea(aAreaC6)
	RestArea(aAreaC5)
	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MTA455P.
