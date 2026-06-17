---
title: "Ponto de Entrada – MT010INC"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt010inc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:11"
---

# Ponto de Entrada – MT010INC

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt010inc/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT010INC                                                                                      |
 | Desc:  Ponto de entrada após inclusão do produto                                                     |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6087685                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MT010INC()
	Local aArea := GetArea()
	Local cRetorno := ""

	RecLock('SB1', .F.)
		B1_X_USER := RetCodUsr()
	SB1->(MsUnlock())

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT010INC.
