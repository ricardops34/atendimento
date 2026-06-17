---
title: "Ponto de Entrada – MTA260MNU"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mta260mnu/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:54"
---

# Ponto de Entrada – MTA260MNU

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mta260mnu/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MTA260MNU                                                                                     |
 | Desc:  Criação de função para inserção de rotinas no ações relacionadas - Transferências             |
 | Link:  http://tdn.totvs.com.br/pages/releaseview.action?pageId=6087760                               |
 *------------------------------------------------------------------------------------------------------*/

User Function MTA260MNU()
	aAdd(aRotina, {"* Teste", "Alert", 0, 7, 0, Nil})
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MTA260MNU.
