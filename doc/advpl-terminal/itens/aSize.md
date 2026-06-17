---
title: "aSize"
function_name: "aSize"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/asize/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:05"
---

# aSize

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/asize/

## Exemplo da Rotina

```advpl
aSize(aArray, nNovo_Tamanho)
```

## Exemplo 1- Diminuindo o tamanho do Array

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
	Local aDados  := {}
	Local nPos    := 0

	//Adicionando elementos no Array (código, nome e idade)
	aAdd(aDados, {"0001", "Daniel",   23})
	aAdd(aDados, {"0002", "Atilio",   33})
	aAdd(aDados, {"0003", "Hudson",   43})
	aAdd(aDados, {"0004", "Terminal", 53})
	aAdd(aDados, {"0005", "Teste",    63})

	//Diminuindo o Array
	aSize(aDados, 4)
	MsgInfo("O tamanho do aDados é "+cValToChar(Len(aDados)), "Atenção")

	RestArea(aArea)
Return
```

## Exemplo 2- Aumentando o tamanho do Array

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
	Local aDados  := {}
	Local nPos    := 0

	//Adicionando elementos no Array (código, nome e idade)
	aAdd(aDados, {"0001", "Daniel",   23})
	aAdd(aDados, {"0002", "Atilio",   33})
	aAdd(aDados, {"0003", "Hudson",   43})
	aAdd(aDados, {"0004", "Terminal", 53})
	aAdd(aDados, {"0005", "Teste",    63})

	//Aumentando o array
	aSize(aDados, 6)
	aDados[6] := {"0006", "Novo", 73}
	MsgInfo("O tamanho do aDados é "+cValToChar(Len(aDados))+", sendo que a linha 6 tem: "+CRLF+;
		"[1]: "+aDados[6][1]+", [2]: "+aDados[6][2]+", [3]: "+cValToChar(aDados[6][3]), "Atenção")

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
– Universo AdvPL

## Resumo

Função que redimensiona o tamanho de um array.
