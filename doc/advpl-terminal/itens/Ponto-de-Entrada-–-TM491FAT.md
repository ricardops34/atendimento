---
title: "Ponto de Entrada – TM491FAT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tm491fat/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:34"
---

# Ponto de Entrada – TM491FAT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tm491fat/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  TM491FAT                                                     |
 | Desc:  Na geração do registro, bloqueia a continuidade              |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6093547 |
 *---------------------------------------------------------------------*/

User Function TM491FAT()
	Local aArea   := GetArea()
	Local lRet    := .T.
	Local cParFil := PARAMIXB[1] //DT6_FILDOC
	Local cParDoc := PARAMIXB[2] //DT6_DOC
	Local cParSer := PARAMIXB[3] //DT6_SERIE

	lRet := MsgYesNo("Continua? "+cParDoc, "Atenção")

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TM491FAT.
