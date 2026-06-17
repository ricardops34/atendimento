---
title: "Ponto de Entrada – TMKBARLA"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tmkbarla/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:44"
---

# Ponto de Entrada – TMKBARLA

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tmkbarla/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  TMKBARLA                                                                                              |
 | Desc:  Adição Ações Relacionadas da rotina de Call Center                                                    |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6787776                                          |
 *--------------------------------------------------------------------------------------------------------------*/

User Function TMKBARLA(aBotao, aTitulo)
	//Adicionando o botão
	aAdd(aBotao,{"DISCAGEM",	{|| Alert(M->UC_CODCONT)}, "* Teste", "* Teste" })
Return aBotao
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TMKBARLA.
