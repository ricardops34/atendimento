---
title: "Ponto de Entrada – MA030TOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma030tok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:48"
---

# Ponto de Entrada – MA030TOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma030tok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MA030TOK                                                                                      |
 | Desc:  Função chamada na validação do cadastro de clientes                                           |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6784252                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MA030TOK()
	Local lRet := .F.

	lRet := MsgYesNo("Deseja continuar?", "Atenção")

Return lRet
```

## Observa趥s

– Caso tenha das ou problemas com os exemplos, entre em contato;
– Se tiver sugest��de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MA030TOK.
