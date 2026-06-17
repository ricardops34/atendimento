---
title: "Ponto de Entrada – FA040INC"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa040inc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:07"
---

# Ponto de Entrada – FA040INC

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa040inc/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------*
 | P.E.:  FA040INC                                                                |
 | Desc:  Função chamada ao incluir título a receber                              |
 | Link:  http://tdn.totvs.com/display/public/mp/FA040INC+-+Valida+dados+--+11845 |
 *--------------------------------------------------------------------------------*/

User Function FA040INC()
	Local aArea := GetArea()
	Local lRet  := .T.

	//Se for RA
	If Alltrim(M->E1_TIPO) == 'RA'
		MsgInfo("Inclusão de Recebimento Antecipado!", "Atenção")
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

Exemplo do Ponto de Entrada FA040INC.
