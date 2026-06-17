---
title: "Ponto de Entrada – MT250SAL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt250sal/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:28"
---

# Ponto de Entrada – MT250SAL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt250sal/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------------------------------------------------------------------------------*
 | P.E.:  MT250SAL                                                                                                                             |
 | Desc:  Liberação de saldos requisitados no apontamento de produção                                                                          |
 | Links: http://tdn.totvs.com/display/public/mp/MT250SAL+-+Manipula+os+valores+de+saldos+dos+produtos+a+serem+requisitados+pelo+apontamento   |
 *---------------------------------------------------------------------------------------------------------------------------------------------*/

User Function MT250SAL()
	Local nInd

	//Se for a função Beluga
	If FunName() == 'BELUGA'
		For nInd:=1 to Len(aSaldos)
			aSaldos[nInd,3]:=0
			aSaldos[nInd,4]:=0
		Next
	endif

Return aSaldos
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT250SAL.
