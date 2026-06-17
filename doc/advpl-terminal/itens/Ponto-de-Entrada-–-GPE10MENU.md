---
title: "Ponto de Entrada – GPE10MENU"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-gpe10menu/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:22"
---

# Ponto de Entrada – GPE10MENU

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-gpe10menu/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  GPE10MENU                                                    |
 | Desc:  Adição de opções no menu do cadastro de Funcionário          |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6079250 |
 *---------------------------------------------------------------------*/

User Function GPE10MENU()
	Local aArea := GetArea()

	//Adicionando opção no menu
	aAdd(aRotina, { "Teste", "Alert", 0, 7, 0, Nil })

	RestArea(aArea)
Return Nil
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada GPE10MENU.
