---
title: "Ponto de Entrada – A415LIOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a415liok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:18"
---

# Ponto de Entrada – A415LIOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a415liok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------------------*
 | P.E.:  A415LIOK                                                                 |
 | Desc.: Ponto de entrada para validar o preço na linha de digitação do orçamento |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6784038             |
 *---------------------------------------------------------------------------------*/

User Function A415LIOK()
	Local aArea := GetArea()
	Local aAreaCJ := SCJ->(GetArea())
	Local aAreaCK := SCK->(GetArea())
	Local cTabAtu := M->CJ_TABELA
	Local cCodProd := ""
	Local nPrcProd := 0
	Local lRet := .T.

	//Se tiver tabela de preço preenchida
	If !Empty(cTabAtu)
		DbSelectArea('DA1')
		DA1->(DbSetOrder(1)) //DA1_FILIAL+DA1_CODTAB+DA1_CODPRO+DA1_INDLOT+DA1_ITEM
		DA1->(DbGoTop())

		//Pega as informações do produto da grid e preço
		cCodProd := TMP1->CK_PRODUTO
		nPrcProd := TMP1->CK_PRCVEN

		//Se conseguir posicionar na tabela de preço + produto
		If DA1->(DbSeek(FWxFilial('DA1') + cTabAtu + cCodProd ))
			//Verifica se o preço do produto no orçamento é maior que o preço máximo da tabela
			If nPrcProd > DA1->DA1_PRCMAX
				lRet := .F.
				Alert("Preço inválido!", "Atenção")
			EndIf
		EndIf
	EndIf

	Restarea(aAreaCK)
	RestArea(aAreaCJ)
	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada A415LIOK.
