---
title: "DaySub"
function_name: "DaySub"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "data-e-hora"
source_url: "https://terminaldeinformacao.com/knowledgebase/daysub/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:07"
---

# DaySub

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/daysub/

## Exemplo da Rotina

```advpl
dDataNova := DaySub(dVarData, nNumeroDias)
```

## Exemplo 1- Subtraindo 5 dias de uma data

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
	Local dDtNov   := DaySub(dDtAux, 5)

	MsgInfo("A data "+dToC(dDtAux)+" menos 5 dias é igual a "+dToC(dDtNov), "Atenção")

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

Função que subtrai um número de dias de uma data.
