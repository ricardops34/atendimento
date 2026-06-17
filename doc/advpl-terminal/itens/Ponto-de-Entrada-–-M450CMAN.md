---
title: "Ponto de Entrada – M450CMAN"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m450cman/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:34"
---

# Ponto de Entrada – M450CMAN

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m450cman/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  M450CMAN                                                                                      |
 | Desc:  Análise de Crédito Cliente                                                                    |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6784168                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function M450CMAN()
	Local aArea  := GetArea()
	Local lRet   := .T.
	Local nOpcao := PARAMIXB[1]

	//Se for a opção Rejeita
	If nOpcao == 3
		MsgStop("Opção <b>Rejeita</b> indisponível!", "Atenção")
		lRet := .F.
	EndIf

	RestArea(aArea)
Return lRet
```

## Observaçõess

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M450CMAN.
