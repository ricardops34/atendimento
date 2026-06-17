---
title: "cToD"
function_name: "cToD"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "data-e-hora"
source_url: "https://terminaldeinformacao.com/knowledgebase/ctod/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:58"
---

# cToD

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ctod/

## Exemplo da Rotina

```advpl
dVariavel := cToD("DD/MM/AAAA")
```

## Exemplo 1- Convertendo um texto em uma data

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
	Local aArea   := GetArea()
	Local cData   := "12/07/1993"
	Local dConv   := cToD(cData)

	MsgInfo("A variável dConv é do tipo "+ValType(dConv), "Atenção")

	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Função que converte texto (no formato DIA/MES/ANO) para o tipo Data.
