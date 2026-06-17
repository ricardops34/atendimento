---
title: "Ponto de Entrada – TM540GRV"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tm540grv/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:36"
---

# Ponto de Entrada – TM540GRV

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tm540grv/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  TM540GRV                                                     |
 | Desc:  No momento do encerramento, altera o status de armazenagem   |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6093262 |
 *---------------------------------------------------------------------*/

User Function TM540GRV()
	Local aArea    := GetArea()
	Local aAreaDUU := DUU->(GetArea())
	Local nOpcx    := PARAMIXB[1]
	Local lRet     := .T.

	//Se for Encerramento
	If nOpcx == 6
		DbSelectArea("DT6")
		DT6->(DbSetOrder(1)) //DT6_FILIAL+DT6_FILDOC+DT6_DOC+DT6_SERIE
		DT6->(DbGoTop())
		//Se conseguir posicionar no registro
		If DT6->(DbSeek(xFilial('DT6') + DUU->DUU_FILDOC + DUU->DUU_DOC + DUU->DUU_SERIE))
			Alert(DT6->DT6_DOC)
		EndIf
	Endif

	RestArea(aAreaDUU)
	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TM540GRV.
