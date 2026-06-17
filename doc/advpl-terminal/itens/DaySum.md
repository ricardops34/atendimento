---
title: "DaySum"
function_name: "DaySum"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "data-e-hora"
source_url: "https://terminaldeinformacao.com/knowledgebase/daysum/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:08"
---

# DaySum

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/daysum/

## Exemplo da Rotina

```advpl
dDataNova := DaySum(dVarData, nNumeroDias)
```

## Exemplo 1- Somando 5 dias de uma data

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*/{Protheus.doc} zTeste
Função de Teste
@type function
@author Terminal de Informação
@since 13/11/2016
@version 1.0
    @example
    u_zTeste()
/*/

User Function zTeste()
	Local aArea    := GetArea()
	Local dDtAux   := sToD("20160101")
	Local dDtNov   := DaySum(dDtAux, 5)

	MsgInfo("A data "+dToC(dDtAux)+" mais 5 dias é igual a "+dToC(dDtNov), "Atenção")

	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– Universo AdvPL

## Resumo

Função que soma um número de dias de uma data.
