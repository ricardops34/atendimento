---
title: "Ponto de Entrada – F110QRCP"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f110qrcp/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:42"
---

# Ponto de Entrada – F110QRCP

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f110qrcp/

## Exemplo do Ponto de Entrada

```advpl
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  F110QRCP                                                     |
 | Desc:  Filtro na seleção de títulos do baixas a receber auto        |
 *---------------------------------------------------------------------*/

User Function F110QRCP()
	Local aArea    := GetArea()
	Local cQuery   := PARAMIXB[1]
	Local cOrderBy := ""
	Local cAux     := ""
	Local cFilRet  := ""

	//Montando o filtro de retorno para exibição dos titulos que serão baixados
	cFilRet := " AND E1_X_CAMPO = 'XXX' "

	//Pega o order by e até o order by
	cOrderBy := SubStr(cQuery, RAt("ORDER BY", cQuery), Len(cQuery))
	cAux := SubStr(cQuery, 1, RAt("ORDER BY", cQuery)-1)

	//Monta o retorno da query
	cQuery := cAux + cFilRet + cOrderBy

	RestArea(aArea)
Return cQuery
```

## Observaçõess

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F110QRCP.
