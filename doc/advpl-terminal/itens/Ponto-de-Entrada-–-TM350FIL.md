---
title: "Ponto de Entrada – TM350FIL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tm350fil/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:32"
---

# Ponto de Entrada – TM350FIL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tm350fil/

## Exemplo do Ponto de Entrada

```advpl
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  TM350FIL                                                     |
 | Desc:  Função para filtrar os dados de apontamentos das Viagens     |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6093484 |
 *---------------------------------------------------------------------*/

User Function TM350FIL()
	Local cFiltro := ""
	Local aArea   := GetArea()

	If Alltrim(FunName()) $ "ZTESTE;"
		cFiltro := " DTW_VIAGEM == '" + cViagem  + "' "
	EndIf

	RestArea(aArea)
Return cFiltro
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TM350FIL.
