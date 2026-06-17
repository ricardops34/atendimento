---
title: "Ponto de Entrada – GP011MEN"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-gp011men/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:21"
---

# Ponto de Entrada – GP011MEN

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-gp011men/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  GP011MEN                                                     |
 | Desc:  Adição de opções no menu do cadastro de Gestão Funcionário   |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6079100 |
 *---------------------------------------------------------------------*/

User Function GP011MEN()
	Local aArea := GetArea()
	Local aAux := aClone(aFuncion)

	//Adicionando opção
	aAdd(aAux, { "Teste", "Alert", 0, 7} )

	RestArea(aArea)
Return aAux
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada GP011MEN.
