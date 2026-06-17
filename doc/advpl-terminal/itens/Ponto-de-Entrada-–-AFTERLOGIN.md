---
title: "Ponto de Entrada – AFTERLOGIN"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-afterlogin/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:23"
---

# Ponto de Entrada – AFTERLOGIN

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-afterlogin/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  AfterLogin                                                                                    |
 | Desc:  Função chamada após o login do usuário e no MDI a cada nova aba                               |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6815186                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function AfterLogin()
	Local cUser := RetCodUsr()

	//Filtra somente os pedidos que o usuário fez
	If nModulo == 5
		DbSelectArea('SC5')
		If cUser != '000000'
			SC5->(DbSetFilter({|| C5_X_USR == cUser }, "C5_X_USR == '"+cUser+"'"))
		EndIf
	EndIf
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada AFTERLOGIN.
