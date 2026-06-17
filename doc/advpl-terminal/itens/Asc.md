---
title: "Asc"
function_name: "Asc"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/asc/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:01"
---

# Asc

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/asc/

## Exemplo da Rotina

```advpl
Asc("A")
```

## Exemplo 1- Pegando o ASCII da letra D e mostrando o resultado

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
	Local cCaracter  := "D"
	Local nAscii     := Asc(cCaracter)

	MsgInfo("O Caracter "+cCaracter+", é o código "+cValToChar(nAscii)+" da tabela ASCII", "Atenção")

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

Função que retorna o código ASCII de um caracter (ou do primeiro caracter da variável).
