---
title: "CursorArrow"
function_name: "CursorArrow"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "s-o-e-funcionalidades"
source_url: "https://terminaldeinformacao.com/knowledgebase/cursorarrow/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:00"
---

# CursorArrow

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/cursorarrow/

## Exemplo da Rotina

```advpl
CursorArrow()
```

## Exemplo 1- Utilizando a função como exemplo

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

	//Volta o cursor para flecha
	CursorArrow()

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

Função que deixa o ponteiro do mouse como flecha (padrão).
