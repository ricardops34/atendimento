---
title: "Ponto de Entrada – TMA144BUT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tma144but/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:39"
---

# Ponto de Entrada – TMA144BUT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tma144but/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*-----------------------------------------------------------------------------------------------------*
 | P.E.:  TMA144BUT                                                                                    |
 | Desc:  Adição de Ações relacionadas na função que faz os documentos de redespacho na viagem mod 2   |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6093303                                 |
 *-----------------------------------------------------------------------------------------------------*/

User Function TMA144BUT()
	Local aArea      := GetArea()
	Local aBtnsExtra := {}

	Aadd(aBtnsExtra,{'X_TESTE', {|| Alert('Tst')}, '* Teste'})

	RestArea(aArea)
Return aBtnsExtra
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TMA144BUT.
