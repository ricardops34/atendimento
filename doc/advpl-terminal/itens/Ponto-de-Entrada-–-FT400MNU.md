---
title: "Ponto de Entrada – FT400MNU"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ft400mnu/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:19"
---

# Ponto de Entrada – FT400MNU

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ft400mnu/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  FT400MNU                                                                                      |
 | Desc:  Adiciona funções no Ações Relacionadas do FATA400 (Contrato de Parceria - Venda)              |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6784115                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function FT400MNU()
	Local aArea := GetArea()

	//Adição de opção para gerar os pedidos customizados da Jolie
	aAdd(aRotina, {"* Teste", "Alert", 0, 6, 0, Nil})

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada FT400MNU.
