---
title: "Ponto de Entrada – TMFATFIL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tmfatfil/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:42"
---

# Ponto de Entrada – TMFATFIL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tmfatfil/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*-------------------------------------------------------------------------------------------------------------------*
 | P.E.:  TMFATFIL                                                                                                   |
 | Desc:  No momento da filtragem dos registros do Fatura Automática - também é utilizado no Fatura por Documentos   |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6093375                                               |
 *-------------------------------------------------------------------------------------------------------------------*/

User Function TMFATFIL()
	Local aArea   := GetArea()
	Local cRet    := ""
	Local cQryIso := ""

	cRet += " AND DT6_X_CAMPO = 'TST' "

	RestArea(aArea)
Return cRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TMFATFIL.
