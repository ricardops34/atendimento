---
title: "Ponto de Entrada – A680PERG"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a680perg/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:21"
---

# Ponto de Entrada – A680PERG

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a680perg/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  A680PERG                                                                                      |
 | Desc:  Validação após mostrar tela de confirmação do último apontamento de produção Mod.2            |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6089322                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function A680PERG()
	Local aArea := GetArea()
	Local lRet  := .T.

	lRet := MsgYesNo("Deseja continuar?", "Atenção")

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada A680PERG.
