---
title: "Ponto de Entrada – MT680EST"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt680est/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:44"
---

# Ponto de Entrada – MT680EST

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt680est/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT680EST                                                                                      |
 | Desc:  Valida se pode estornar o apontamento de produção Mod 2                                       |
 | Links: http://tdn.totvs.com/display/public/mp/MT680EST+-+Estorno+do+Apontamento                      |
 *------------------------------------------------------------------------------------------------------*/

User Function MT680EST()
	Local lRet  := .F.

	lRet := MsgYesNo("Deseja continuar?", "Atenção")

Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT680EST.
