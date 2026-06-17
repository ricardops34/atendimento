---
title: "aScan"
function_name: "aScan"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/ascan/"
has_examples: true
example_count: 3
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:03"
---

# aScan

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ascan/

## Exemplo da Rotina

```advpl
aScan(aArray, {|x| x == "SUA_BUSCA"})
```

## Exemplo 1- Buscando um elemento no Array

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

	//Adicionando elementos no Array
	aAdd(aDados, "Daniel")
	aAdd(aDados, "Atilio")
	aAdd(aDados, "Hudson")
	aAdd(aDados, "Terminal")
	aAdd(aDados, "Teste")

	//Procurando pelo nome Atilio
	nPos := aScan(aDados, {|x| AllTrim(Upper(x)) == "ATILIO"})
	If nPos > 0
		MsgInfo("Atilio encontrado, na linha "+cValToChar(nPos)+".", "Atenção")
	Else
		MsgAlert("Atilio não foi encontrado!", "Atenção")
	EndIf

	RestArea(aArea)
Return
```

## Exemplo 2- Buscando um elemento no Array, a partir de uma posição

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

	//Adicionando elementos no Array
	aAdd(aDados, "Daniel")
	aAdd(aDados, "Atilio")
	aAdd(aDados, "Hudson")
	aAdd(aDados, "Terminal")
	aAdd(aDados, "Teste")

	//Procurando pelo nome Atilio a partir da linha 3
	nPos := aScan(aDados, {|x| AllTrim(Upper(x)) == "ATILIO"}, 3)
	If nPos > 0
		MsgInfo("Atilio encontrado, na linha "+cValToChar(nPos)+".", "Atenção")
	Else
		MsgAlert("Atilio não foi encontrado (após a linha 3)!", "Atenção")
	EndIf

	RestArea(aArea)
Return
```

## Exemplo 3- Buscando um elemento no Array Multidimensional

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

	//Procurando pelo nome Hudson
	nPos := aScan(aDados, {|x| AllTrim(Upper(x[2])) == "HUDSON"})
	If nPos > 0
		MsgInfo("Hudson encontrado, na linha "+cValToChar(nPos)+".", "Atenção")
	Else
		MsgAlert("Hudson não foi encontrado!", "Atenção")
	EndIf

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

Função que faz a busca de um elementro dentro de um Array.
