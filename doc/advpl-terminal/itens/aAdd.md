---
title: "aAdd"
function_name: "aAdd"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/aadd/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:34"
---

# aAdd

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/aadd/

## Exemplo da Rotina

```advpl
aAdd(aArray, xElemento)
```

## Exemplo 1- Adição de elemento em um vetor

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
	Local aArea  := GetArea()
	Local aArray := {}

	//Adicionando elementos no vetor
	aAdd(aArray, "Daniel")
	aAdd(aArray, "João")
	aAdd(aArray, "Gabriel")
	aAdd(aArray, "Fernando")

	//Mostra o elemento de numero 3
	Alert(aArray[3])

	RestArea(aArea)
Return
```

## Exemplo 2- Adição de elemento em uma matriz

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
	Local aArea  := GetArea()
	Local aArray := {}

	//Adicionando elementos na matriz
	aAdd(aArray, {"Daniel",   23})
	aAdd(aArray, {"João",     28})
	aAdd(aArray, {"Gabriel",  21})
	aAdd(aArray, {"Fernando", 25})

	//Mostra o elemento de numero 3, e quantos anos tem
	Alert(aArray[3][1]+" tem "+cValToChar(aArray[3][2])+" anos.")

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

Função que adiciona um elemento a um Array.
