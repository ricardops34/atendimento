---
title: "Ponto de Entrada – TK380DAT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tk380dat/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:31"
---

# Ponto de Entrada – TK380DAT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tk380dat/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  TK380DAT                                                                                              |
 | Desc:  Manipula data do atendimento (para atendimentos em datas futuras)                                     |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6787827                                          |
 *--------------------------------------------------------------------------------------------------------------*/

User Function TK380DAT()
	Local aArea := GetArea()
	Local dDataMax := PARAMIXB[1]

	dDataMax := DaySum(dDataMax, 5)

	RestArea(aArea)
Return dDataMax
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TK380DAT.
