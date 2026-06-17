---
title: "Ponto de Entrada – M460QRY"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m460qry/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:41"
---

# Ponto de Entrada – M460QRY

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m460qry/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'Protheus.ch'
#Include 'RwMake.ch'
#Include 'TopConn.ch'

//Constantes
#Define STR_PULA		Chr(13)+Chr(10)

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  M460QRY                                                                                       |
 | Desc:  Filtra a tela de markbrowse para não mostrar pedidos em situação X                            |
 | Links: http://tdn.totvs.com/pages/releaseview.actionçpageId=6784189                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function M460QRY()
	Local aArea  := GetArea()
	Local cQuery := ParamIXB[1]

	cQuery += " AND (SELECT "
	cQuery += "          COUNT(C5_NUM) AS C5_COUNT "
	cQuery += "      FROM "
	cQuery += "          "+RetSqlName("SC5")+" SC5 "
	cQuery += "      WHERE "
	cQuery += "          SC5.C5_FILIAL = SC9.C9_FILIAL "
	cQuery += "          AND SC5.C5_NUM = SC9.C9_PEDIDO "
	cQuery += "          AND SC5.C5_X_CAMPX != '' "
	cQuery += "          AND SC5.D_E_L_E_T_ = ' ') <= 0 "
Return(cQuery)
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M460QRY.
