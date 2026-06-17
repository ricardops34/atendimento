---
title: "Ponto de Entrada – OM200QRY"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-om200qry/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:07"
---

# Ponto de Entrada – OM200QRY

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-om200qry/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*--------------------------------------------------------------------------------------*
 | P.E.:  OM200QRY                                                                      |
 | Desc:  P.E. executado antes de abrir a tela de carga                                 |
 | Link:  http://tdn.totvs.com/display/public/mp/OM200QRY+-+Filtro+dos+Pedidos+--+16484 |
 *--------------------------------------------------------------------------------------*/

User Function OM200QRY()
	Local aArea := GetArea()
	Local cQry := ParamIXB[1]

	If MsgYesNo("Deseja filtrar os pedidos de Hojeç", "Atenção")
		cQry += " AND SC5.C5_EMISSAO = '"+dToS(Date())+"' "
	EndIf

	RestArea(aArea)
Return cQry
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada OM200QRY.
