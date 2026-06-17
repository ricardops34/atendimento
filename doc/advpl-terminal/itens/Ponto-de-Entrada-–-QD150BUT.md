---
title: "Ponto de Entrada – QD150BUT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-qd150but/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:17"
---

# Ponto de Entrada – QD150BUT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-qd150but/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  QD150BUT                                                                                      |
 | Desc:  Adição de botões na rotina de Agenda Auditoria                                                |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6801545                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function QD150BUT()
	Local aBotoes := {}
	Local aArea   := GetArea()

	//Adicionando os botões
	aAdd(aBotoes,{"", {|| Alert('') }, "* Teste"})

	RestArea(aArea)
Return (aBotoes)
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada QD150BUT.
