---
title: "Alltrim"
function_name: "Alltrim"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/alltrim/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:49"
---

# Alltrim

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/alltrim/

## Exemplo da Rotina

```advpl
Alltrim(cTexto)
```

## Exemplo 1- Retira os espaços em branco

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
	Local cTexto := "   Daniel Atilio   "

	//Retira os espaços em branco
	cTexto := Alltrim(cTexto)

	//Mostrando a mensagem sem espaços em branco
	Alert("|"+cTexto+"|")

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

Função que retira os espaços em branco nas extremidades das strings.
