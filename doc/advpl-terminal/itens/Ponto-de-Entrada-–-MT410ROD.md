---
title: "Ponto de Entrada – MT410ROD"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt410rod/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:34"
---

# Ponto de Entrada – MT410ROD

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt410rod/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  MT410ROD                                                                                              |
 | Desc:  Função para alterar os dados do rodapé do pedido                                                      |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6784352                                          |
 *--------------------------------------------------------------------------------------------------------------*/

User Function MT410ROD()
	Local aArea     := GetArea()
	Local oObjOrig  := ParamIXB[1]
	Local cDescCli  := ParamIXB[2]
	Local nValBruto := ParamIXB[3]
	Local nValDescA := ParamIXB[4]
	Local nValLiq   := ParamIXB[5]

	cDescCli := "AAA"+cDescCli

	//Altera as descrições
	Eval(oObjOrig,	cDescCli,;
					Iif(nValLiq > nValBruto, nValLiq - (nValDescA), nValLiq + nValBruto),;
					nValDescA,;
					nValLiq)

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT410ROD.
