---
title: "ConOut"
function_name: "ConOut"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "avisos-e-alertas"
source_url: "https://terminaldeinformacao.com/knowledgebase/conout/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:49"
---

# ConOut

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/conout/

## Exemplo da Rotina

```advpl
ConOut("SuaMensagem")
```

## Exemplo 1- Mostrando duas mensagens no console.log

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
	Local cCodigo := ''

	ConOut("> Terminal de Informação")
	ConOut("> Terminal"+CRLF+;
		"  de "+CRLF+;
		"  Informação")

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

Função que mostra uma mensagem no AppServer em modo console ou no arquivo console.log.
