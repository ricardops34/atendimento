---
title: "Ponto de Entrada – MTA103MNU"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mta103mnu/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:50"
---

# Ponto de Entrada – MTA103MNU

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mta103mnu/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*-------------------------------------------------------------*
 | P.E.:  MTA103MNU                                            |
 | Desc:  Adição de Ações Relacionadas no Documento de Entrada |
 *-------------------------------------------------------------*/

User Function MTA103MNU()
	Local aArea := GetArea()

	aAdd(aRotina, {"* Teste", "Alert", 0, 4, 0, Nil})

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MTA103MNU.
