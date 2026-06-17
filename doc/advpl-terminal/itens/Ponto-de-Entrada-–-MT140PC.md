---
title: "Ponto de Entrada – MT140PC"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt140pc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:24"
---

# Ponto de Entrada – MT140PC

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt140pc/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT140PC                                                                                       |
 | Desc:  Define se será obrigatório informar o pedido de compra na criação da Pré-Nota                 |
 | Links: http://tdn.totvs.com/pages/releaseview.actionçpageId=6085510                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MT140PC()
	Local lRet := ParamIXB[1]

	//Se vir da função de zTeste, define que não será obrigatório
	If Upper(FunName()) == "ZTESTE"
		lRet := .F.
	EndIf
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT140PC.
