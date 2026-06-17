---
title: "Array"
function_name: "Array"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/array/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:58"
---

# Array

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/array/

## Exemplo da Rotina

```advpl
aDados := Array(5)
```

## Exemplo 1- Cria um array simples com 3 linhas

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
	Local aArea      := GetArea()
	Local aDados     := Array(3)
	Local nAtual     := 0

	//Define o Array
	aDados[1] := "Daniel"
	aDados[2] := "Hudson"
	aDados[3] := "Atilio"

	//Percorre e mostra o nome
	For nAtual := 1 To Len(aDados)
		MsgInfo("["+cValToChar(nAtual)+"] "+aDados[nAtual], "Atenção")
	Next

	RestArea(aArea)
Return
```

## Exemplo 2- Cria um array múltiplo com 2 linhas e 3 colunas

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
	Local aArea      := GetArea()
	Local aDadosMult := Array(2, 3)
	Local nAtual     := 0

	//Define o Array Multidimensional
	aDadosMult[1] := {"Daniel", "XXX", "23"}
	aDadosMult[2] := {"Hudson", "YYY", "33"}

	//Percorre e mostra o nome
	For nAtual := 1 To Len(aDadosMult)
		MsgInfo("["+cValToChar(nAtual)+"] [1]"+aDadosMult[nAtual][01]+;
			", [2] RG: "+aDadosMult[nAtual][02]+;
			", [3] Idade: "+aDadosMult[nAtual][03], "Atenção")
	Next

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

Função que cria um Array com tamanho pré-definido.
