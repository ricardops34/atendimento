---
title: "Ponto de Entrada – FA080POS"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa080pos/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:10"
---

# Ponto de Entrada – FA080POS

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa080pos/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  FA080POS                                                                                      |
 | Desc:  Função para editar as variáveis da tela de Baixas a Pagar                                     |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6815186                                  |
 *------------------------------------------------------------------------------------------------------*/
User Function FA080POS()
	Local aArea    := GetArea()
	Local nTamHist := TamSX3('E5_HISTOR')[01] //Len(cHist070)

	//Atualiza o histórico na baixa
	cHist070 := SE2->E2_HIST

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada FA080POS.
