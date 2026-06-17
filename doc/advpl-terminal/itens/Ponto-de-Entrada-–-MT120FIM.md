---
title: "Ponto de Entrada – MT120FIM"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt120fim/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:17"
---

# Ponto de Entrada – MT120FIM

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt120fim/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------------------*
 | P.E.:  MT120FIM                                                                 |
 | Desc:  Atualização Pedido Compra                                                |
 | Link:  http://tdn.totvs.com/display/public/mp/MT120FIM                          |
 *---------------------------------------------------------------------------------*/

User Function MT120FIM()
	Local aArea      := GetArea()
	Local aAreaC7    := SC7->(GetArea())
	Local nPosNum    := aScan(aHeader,{|x| AllTrim(x[2]) == "C7_NUM"})
	Local nPosItem   := aScan(aHeader,{|x| AllTrim(x[2]) == "C7_ITEM"})
	Local nPosQtde   := aScan(aHeader,{|x| AllTrim(x[2]) == "C7_QUJE"})
	Local nPosVlr    := aScan(aHeader,{|x| AllTrim(x[2]) == "C7_PRECO"})

	DbSelectArea('SC7')
	SC7->(dbSetOrder(1)) //C7_FILIAL+C7_NUM+C7_ITEM+C7_SEQUEN

	//Percorrendo todos os itens
	For nLinAtu := 1 To Len(aCols)
		//Se conseguir posicionar no registro
		If SC7->(DbSeek(FWxFilial("SC7")+aCols[nLinAtu][nPosNum]+aCols[nLinAtu][nPosItem]))
			RecLock('SC7', .F.)
				C7_X_ORIG := aCols[nLinAtu][nPosQtde] * aCols[nLinAtu][nPosVlr]
			SC7->(MsUnlock())
		EndIf
	Next

	RestArea(aAreaC3)
	RestArea(aAreaC7)
	RestArea(aArea)
Return
```

## Observa趥s

– Caso tenha das ou problemas com os exemplos, entre em contato;
– Se tiver sugest��de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT120FIM.
