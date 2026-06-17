---
title: "cValToChar"
function_name: "cValToChar"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/cvaltochar/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:03"
---

# cValToChar

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/cvaltochar/

## Exemplo da Rotina

```advpl
cValToChar(xVariavel)
```

## Exemplo 1- Mostrando as conversões padrão

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

	MsgInfo("Conversões:" + CRLF + ;
		"Data: "     + cValToChar(Date())   + CRLF + ;
		"Numérico: " + cValToChar(13.8)     + CRLF + ;
		"Lógico: "   + cValToChar(.T.)      + CRLF + ;
		"Caracter: " + cValToChar("Daniel") + CRLF, "Atenção")

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

Função que converte Numérico, Lógico e Data para Caracter.
