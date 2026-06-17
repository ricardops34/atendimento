---
title: "Ponto de Entrada – MA103OPC"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma103opc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:51"
---

# Ponto de Entrada – MA103OPC

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-ma103opc/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MA103OPC                                                                                      |
 | Desc:  Inclusão de Ações Relacionadas no Documento de Entrada                                        |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6085341                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MA103OPC()
	Local aRet := {}

	aAdd(aRet,{'* Teste', 'Alert', 0, 5})
Return aRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MA103OPC.
