---
title: "aSort"
function_name: "aSort"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/asort/"
has_examples: true
example_count: 3
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:07"
---

# aSort

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/asort/

## Exemplo da Rotina

```advpl
aSort(aArray)
```

## Exemplo 1- Ordenação de um Array simples

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
	Local cMsg    := ""

	//Adicionando elementos no Array
	aAdd(aDados, "Daniel")
	aAdd(aDados, "Atilio")
	aAdd(aDados, "Hudson")
	aAdd(aDados, "Terminal")
	aAdd(aDados, "Teste")

	//Ordena o Array por Nome
	aSort(aDados)

	//Percorre para compor a mensagem
	For nPos := 1 To Len(aDados)
		cMsg += "Nome: "+aDados[nPos]+"."+CRLF
	Next
	MsgInfo("Ordenação: "+CRLF+cMsg, "Atenção")

	RestArea(aArea)
Return
```

## Exemplo 2- Ordenação Crescente de um Array Multidimensional

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
	Local cMsg    := ""

	//Adicionando elementos no Array (código, nome e idade)
	aAdd(aDados, {"0001", "Daniel",   23})
	aAdd(aDados, {"0002", "Atilio",   33})
	aAdd(aDados, {"0003", "Hudson",   43})
	aAdd(aDados, {"0004", "Terminal", 53})
	aAdd(aDados, {"0005", "Teste",    63})

	//Ordena o Array por Nome (Array multidimensional) - Crescente
	aSort(aDados, , , {|x, y| x[2] < y[2]})

	//Percorre para compor a mensagem
	For nPos := 1 To Len(aDados)
		cMsg += aDados[nPos][2]+", código "+aDados[nPos][1]+"."+CRLF
	Next
	MsgInfo("Ordenação Crescente: "+CRLF+cMsg, "Atenção")

	RestArea(aArea)
Return
```

## Exemplo 3- Ordenação Decrescente de um Array Multidimensional

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
	Local cMsg    := ""

	//Adicionando elementos no Array (código, nome e idade)
	aAdd(aDados, {"0001", "Daniel",   23})
	aAdd(aDados, {"0002", "Atilio",   33})
	aAdd(aDados, {"0003", "Hudson",   43})
	aAdd(aDados, {"0004", "Terminal", 53})
	aAdd(aDados, {"0005", "Teste",    63})

	//Ordena o Array por Nome (Array multidimensional) - Decrescente
	aSort(aDados, , , {|x, y| x[2] > y[2]})

	//Percorre para compor a mensagem
	For nPos := 1 To Len(aDados)
		cMsg += aDados[nPos][2]+", código "+aDados[nPos][1]+"."+CRLF
	Next
	MsgInfo("Ordenação Decrescente: "+CRLF+cMsg, "Atenção")

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

Função que ordena um Array.
