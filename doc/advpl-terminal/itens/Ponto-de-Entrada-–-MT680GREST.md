---
title: "Ponto de Entrada – MT680GREST"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt680grest/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:45"
---

# Ponto de Entrada – MT680GREST

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt680grest/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT680GREST                                                                                    |
 | Desc:  P.E. após executar o Estorno do Apontamento Mod 2                                             |
 | Links: http://tdn.totvs.com/display/public/mp/MT680GREST+-+Estorno+do+Movimento                      |
 *------------------------------------------------------------------------------------------------------*/

User Function MT680GREST()
	Local aArea  := GetArea()
	Local cQuery := ''

	RecLock("SH6", .F.)
		H6_X_TESTE := 'Estorno'
	SH6->(MsUnlock())

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT680GREST.
