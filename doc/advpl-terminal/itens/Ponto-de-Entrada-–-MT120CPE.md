---
title: "Ponto de Entrada – MT120CPE"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt120cpe/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:16"
---

# Ponto de Entrada – MT120CPE

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt120cpe/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------------------*
 | P.E.:  MT120CPE                                                                 |
 | Desc:  Setando a tecla F8 no Pedido de Compras                                  |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6085725             |
 | Obs:   Foi usado os PE MT120CPE e MT120FIM pois são os melhores encontrados     |
 |        para inclusão e limpeza das teclas F?                                    |
 *---------------------------------------------------------------------------------*/

User Function MT120CPE()
	Local lRet := .T.

	//Se não for inclusão
	If !INCLUI
		//Setando o F8
		Set Key VK_F8 To Alert('Tst')
	EndIf
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT120CPE.
