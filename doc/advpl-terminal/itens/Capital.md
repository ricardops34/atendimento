---
title: "Capital"
function_name: "Capital"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/capital/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:41"
---

# Capital

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/capital/

## Exemplo da Rotina

```advpl
Capital("SEU TEXTO")
```

## Exemplo 1- Exemplo de utilização em uma mensagem

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
	Local cMsgOri := "TERMINAL DE INFORMAÇÃO"
	Local cMsgCap := Capital(cMsgOri)

	MsgInfo("Original: "+cMsgOri+CRLF+;
		"Capital: "+cMsgCap, "Atenção")
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– Universo AdvPL

## Resumo

Função que deixa a primeira letra de uma palavra em Maiúsculo e o restante Minúsculo.
