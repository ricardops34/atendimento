---
title: "Ponto de Entrada – F200CNAB"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f200cnab/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:45"
---

# Ponto de Entrada – F200CNAB

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f200cnab/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------------------*
 | P.E.:  F200CNAB                                                                 |
 | Desc:  Ponto de entrada antes do retorno, para filtrar apenas a Filial atual    |
 *--------------------------------------------------------------------------------*/

User Function F200CNAB()
	Local aArea := GetArea()
	Local lRet := .T.

	//Filtrando apenas a filial corrente
	dbSelectArea('SE1')
	SE1->(DbSetOrder(13)) //E1_FILIAL+E1_ORDPAGO
	SE1->(DbSetFilter({|| SE1->E1_FILIAL = FWxFilial('SE1')}, "E1_FILIAL = '"+FWxFilial('SE1')+"'"))

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F200CNAB.
