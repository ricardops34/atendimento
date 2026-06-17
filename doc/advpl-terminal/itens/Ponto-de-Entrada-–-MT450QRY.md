---
title: "Ponto de Entrada – MT450QRY"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt450qry/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:41"
---

# Ponto de Entrada – MT450QRY

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt450qry/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

//Constantes
#Define STR_PULA		Chr(13)+Chr(10)

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  MT450QRY                                                                                              |
 | Desc:  Ponto de Entrada chamado pela Liberação Automática                                                    |
 | Link:  http://tdn.totvs.com/display/public/PROT/MA455MNU                                                     |
 *--------------------------------------------------------------------------------------------------------------*/

User Function MT450QRY()
	Local aArea   := GetArea()
	Local cQryFil := ParamIXB[1]

	Aviso("Query:", cQryFil, {"Ok"}, 2)

	RestArea(aArea)
Return cQryFil
```

## Observaçõs

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT450QRY.
