---
title: "Ponto de Entrada – FA070CA4"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa070ca4/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:08"
---

# Ponto de Entrada – FA070CA4

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa070ca4/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  FA070CA4                                                                                      |
 | Desc:  Permite cancelar a baixa do Contas a Pagar                                                    |
 | Links: http://tdn.totvs.com/display/public/mp/FA070CA4+-+Permite+cancelar+baixa+--+11877             |
 *------------------------------------------------------------------------------------------------------*/

User Function FA070CA4()
	LOCAL lRet := .t.
	LOCAL aAreaA6 := SA6->(GetArea())
	LOCAL aArea := GetArea()

	lRet := MsgYesNo("Deseja continuar?", "Atenção")

	restarea(aAreaA6)
	restarea(aArea)
return(lRet)
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada FA070CA4.
