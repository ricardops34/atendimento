---
title: "Ponto de Entrada – MT010ALT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt010alt/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:08"
---

# Ponto de Entrada – MT010ALT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt010alt/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT010ALT                                                                                      |
 | Desc:  Ponto de entrada após alteração do produto                                                    |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6087681                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MT010ALT()
	Local aArea := GetArea()

	//Grava o usuário que alterou
	RecLock('SB1', .F.)
		B1_X_ALTUS := RetCodUsr()
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

Exemplo do Ponto de Entrada MT010ALT.
