---
title: "Ponto de Entrada – F380VLD"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f380vld/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:52"
---

# Ponto de Entrada – F380VLD

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f380vld/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  F380VLD                                                      |
 | Desc:  Validação de reconciliação bancária                          |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6071440 |
 *---------------------------------------------------------------------*/

User Function F380VLD()
	Local aArea := GetArea()
	Local aAreaA6 := SA6->(GetArea())
	Local lRet := .T.
	Local lJaConc := Iif(MV_PAR01 == 1 .Or. MV_PAR01 == 3, .T., .F.)
	Local dDataIni := ParamIXB[2]
	Local dDataFin := ParamIXB[3]

	lRet := MsgYesNo("Deseja continuar? Banco "+cBco380, "Atenção")

	RestArea(aAreaA6)
	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F380VLD.
