---
title: "Ponto de Entrada – M440STTS"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m440stts/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:32"
---

# Ponto de Entrada – M440STTS

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m440stts/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'Protheus.ch'
#Include 'RwMake.ch'
#Include 'TopConn.ch'

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  M440STTS                                                                                      |
 | Desc:  Liberação de Pedidos - Manual                                                                 |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6784166                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function M440STTS()
	Local aArea     := GetArea()
	Local aAreaSC5  := SC5->(GetArea())
	Local aAreaSC6  := SC6->(GetArea())
	Local aAreaSB1  := SB1->(GetArea())

	If Alltrim(FunName()) != 'MATA440'
		Return
	EndIf

	RestArea(aAreaSB1)
	RestArea(aAreaSC6)
	RestArea(aAreaSC5)
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M440STTS.
