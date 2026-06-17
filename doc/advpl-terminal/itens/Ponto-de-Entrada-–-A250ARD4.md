---
title: "Ponto de Entrada – A250ARD4"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a250ard4/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:13"
---

# Ponto de Entrada – A250ARD4

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a250ard4/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  A250ARD4                                                                                              |
 | Desc:  Define o(s) empenho(s) utilizado(s) na produção                                                       |
 | Links: http://tdn.totvs.com/display/public/mp/A250ARD4+-+Seleciona+os+dados+da+Tabela+SD4+e+ordena+empenhos  |
 *--------------------------------------------------------------------------------------------------------------*/

User Function A250ARD4()
	Local aItensSD4 := ParamIXB
	Local aArea     := GetArea()

	If FunName() == "ZTESTE"
		MsgInfo(SD4->D4_LOTECTL)
	EndIf

	RestArea(aArea)
Return aItensSD4
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada A250ARD4.
