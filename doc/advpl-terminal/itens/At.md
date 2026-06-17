---
title: "At"
function_name: "At"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/at/"
has_examples: true
example_count: 3
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:09"
---

# At

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/at/

## Exemplo da Rotina

```advpl
At('PESQUISA', 'FRASE DE PESQUISA COMPLETA')
```

## Exemplo 1- Pesquisa de uma letra

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
	Local cFrase  := "Terminal de Informação"
	Local nPos    := 0

	//Encontrando a primeira letra 'a' na frase
	nPos := At("a", cFrase)
	MsgInfo("A primeira letra 'a' esta na posição "+cValToChar(nPos), "Atenção")

	RestArea(aArea)
Return
```

## Exemplo 2- Pesquisa de uma letra a partir de uma posição

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
	Local cFrase  := "Terminal de Informação"
	Local nPos    := 0

	//Encontrando a primeira letra 'a' na frase, a partir da posição 10
	nPos := At("a", cFrase, 10)
	MsgInfo("A primeira letra 'a' esta na posição "+cValToChar(nPos)+" (a partir da posição 10)", "Atenção")

	RestArea(aArea)
Return
```

## Exemplo 3- Pesquisa de uma frase dentro de outra

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
	Local cFrase  := "Terminal de Informação"
	Local nPos    := 0

	//Encontrando o texto 'forma' e onde começa na frase
	nPos := At("forma", cFrase)
	MsgInfo("'forma' esta a partir da posição "+cValToChar(nPos), "Atenção")

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

Função que retorna a primeira posição encontrada em uma string através de outra.
