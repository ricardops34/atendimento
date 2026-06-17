---
title: "Chr"
function_name: "Chr"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/chr/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:44"
---

# Chr

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/chr/

## Exemplo da Rotina

```advpl
Chr(nCodigoAscii)
```

## Exemplo 1- Pegando um código ASCII e mostrando o caracter

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
	Local nAscii := 69
	Local cCarac := Chr(nAscii)

	MsgInfo("O código ASCII "+cValToChar(nAscii)+;
		" é "+cCarac+".", "Atenção")
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

Função que retorna um caracter conforme código ASCII.
