---
title: "aDel"
function_name: "aDel"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/adel/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:39"
---

# aDel

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/adel/

## Exemplo da Rotina

```advpl
aDel(aArray, nElemento)
```

## Exemplo 1- Exclui um elemento do Array

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
	aAdd(aArray, "Daniel")
	aAdd(aArray, "João")
	aAdd(aArray, "Gabriel")
	aAdd(aArray, "Fernando")

	//Exclui o segundo elemento do Array (Deixa o segundo elemento como Nil)
	aDel(aArray, 2)

	//Mostra o Tamanho do Array
	Alert("Tamanho do Array: "+cValToChar(Len(aArray))+", 2º elemento: "+cValToChar(aArray[2]))

	RestArea(aArea)
Return
```

## Exemplo 2- Exclui um elemento do Array e redimensiona

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
	aAdd(aArray, "Daniel")
	aAdd(aArray, "João")
	aAdd(aArray, "Gabriel")
	aAdd(aArray, "Fernando")

	//Exclui o segundo elemento do Array (Deixa o segundo elemento como Nil)
	aDel(aArray, 2)

	//Redimensiona o Array
	aSize(aArray, Len(aArray)-1)

	//Mostra o Tamanho do Array
	Alert("Tamanho do Array: "+cValToChar(Len(aArray))+", 2º elemento: "+cValToChar(aArray[2]))

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

Função que exclui um elemento do Array (deixa o último como Nil).
