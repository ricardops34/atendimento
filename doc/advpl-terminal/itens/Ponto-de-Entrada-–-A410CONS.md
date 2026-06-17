---
title: "Ponto de Entrada – A410CONS"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a410cons/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:15"
---

# Ponto de Entrada – A410CONS

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a410cons/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'RwMake.ch'
#Include 'Protheus.ch'

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  A410Cons                                                                                      |
 | Desc:  Adiciona botão para visualizar cliente do pedido destino (São Paulo)                          |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6784033                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function A410Cons()
	Local aArea		:= GetArea()
	Local aBotoes	:= {}

	//Se não for inclusão
	If ! INCLUI
		aAdd(aBotoes,{'RELATORIO', {||Alert(SC5->C5_NUM)}, "Teste","* Teste"} )
	Endif

	RestArea(aArea)
Return(aBotoes)
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada A410CONS.
