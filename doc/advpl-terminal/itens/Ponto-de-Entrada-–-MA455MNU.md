---
title: "Ponto de Entrada – MA455MNU"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma455mnu/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:59"
---

# Ponto de Entrada – MA455MNU

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma455mnu/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  MA455MNU                                                                                              |
 | Desc:  Ações Relacionadas da Liberação de Estoque                                                            |
 | Link:  http://tdn.totvs.com/display/public/PROT/MA455MNU                                                     |
 *--------------------------------------------------------------------------------------------------------------*/

User Function MA455MNU()
	Local aArea := GetArea()

	//Adicionando a rotina de liberação automática
	aAdd(aRotina, {"* Teste", "Alert", 0, 0, 0, NIL})

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MA455MNU.
