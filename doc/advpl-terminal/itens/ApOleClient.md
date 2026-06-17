---
title: "ApOleClient"
function_name: "ApOleClient"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "integracao-com-o-office"
source_url: "https://terminaldeinformacao.com/knowledgebase/apoleclient/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:11:56"
---

# ApOleClient

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/apoleclient/

## Exemplo da Rotina

```advpl
ApOleClient("APLICATIVO")
```

## Exemplo 1- Testando se os aplicativos estão instalados

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

	//Verifica se o Excel esta instalado
	If ApOleClient("MSEXCEL")
		MsgInfo("Excel instalado", "Atenção")
	EndIf

	//Verifica se o Project esta instalado
	If ApOleClient("MSPROJECT")
		MsgInfo("Project instalado", "Atenção")
	EndIf

	//Verifica se o Visio esta instalado
	If ApOleClient("VISIO")
		MsgInfo("Visio instalado", "Atenção")
	EndIf

	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Função que verifica se o Microsoft Office Excel ou Project ou Visio estão instalados.
