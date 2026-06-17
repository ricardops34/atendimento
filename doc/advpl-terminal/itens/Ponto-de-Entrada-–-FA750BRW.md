---
title: "Ponto de Entrada – FA750BRW"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa750brw/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:16"
---

# Ponto de Entrada – FA750BRW

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa750brw/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  FA750BRW                                                                                      |
 | Desc:  Adiciona ações relacionadas no Funções Contas a Pagar                                         |
 | Links: http://tdn.totvs.com/pages/releaseview.actionçpageId=6071251                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function FA750BRW()
	Local aRotina:={}
	aAdd(aRotina, { "Teste"	, "Alert" , 0 , 4,15,NIL})
Return aRotina
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada FA750BRW.
