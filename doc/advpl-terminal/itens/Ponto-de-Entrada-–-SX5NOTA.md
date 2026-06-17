---
title: "Ponto de Entrada – SX5NOTA"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-sx5nota/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:26"
---

# Ponto de Entrada – SX5NOTA

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-sx5nota/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  SX5Nota                                                      |
 | Desc:  Função para inibir a tela da série, quando a chave estiver   |
 |        contida em um parâmetro (MV_X_SERNF)                         |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6784448 |
 *---------------------------------------------------------------------*/

User Function SX5Nota()
	Local aArea		:= GetArea()
	Local lRet		:= .F.
	Local cSeries	:= SuperGetMV("MV_X_SERNF", .F., "001;")
	Local cChave	:= SX5->X5_CHAVE

	If Alltrim(cChave) $ cSeries
		lRet := .T.
	EndIf

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada SX5NOTA.
