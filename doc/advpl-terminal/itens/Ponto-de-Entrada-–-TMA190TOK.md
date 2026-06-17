---
title: "Ponto de Entrada – TMA190TOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tma190tok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:41"
---

# Ponto de Entrada – TMA190TOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tma190tok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "RwMake.ch"
#Include "TopConn.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  TMA190TOK                                                                                     |
 | Desc:  Ponto de entrada na validação na geração do manifesto                                         |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6087685                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function TMA190TOK()
	Local aArea  := GetArea()
	Local lRet   := .T.

	lRet := MsgYesNo("Deseja continuar? "+DTQ->DTQ_VIAGEM, "Atenção")

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TMA190TOK.
