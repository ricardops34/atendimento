---
title: "Ponto de Entrada – F050ROT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f050rot/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:32"
---

# Ponto de Entrada – F050ROT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f050rot/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  F050ROT                                                                                       |
 | Desc:  Adiciona ações relacionadas no Contas a Pagar                                                 |
 | Links: http://tdn.totvs.com/display/public/mp/F050ROT+-+Inclui+itens+de+menu+--+107531               |
 *------------------------------------------------------------------------------------------------------*/

User Function F050ROT()
	Local aRotina := ParamIxb
	aAdd( aRotina, { "* Teste", "Alert", 0, 8,, .F. } )
Return aRotina
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F050ROT.
