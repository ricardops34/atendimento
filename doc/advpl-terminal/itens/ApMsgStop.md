---
title: "ApMsgStop"
function_name: "ApMsgStop"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "avisos-e-alertas"
source_url: "https://terminaldeinformacao.com/knowledgebase/apmsgstop/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:54"
---

# ApMsgStop

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/apmsgstop/

## Exemplo da Rotina

```advpl
ApMsgStop("Mensagem", "Título")
```

## Exemplo 1- Mensagem simples

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

	ApMsgStop("Mensagem de teste", "Título")

	RestArea(aArea)
Return
```

## Exemplo 2- Mensagem com trecho em negrito

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

	ApMsgStop("Mensagem de <b>teste</b>", "Título")

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

Função que mostra mensagem com um ícone de erro.
