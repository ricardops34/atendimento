---
title: "Ponto de Entrada – OS200PM"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-os200pm/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:13"
---

# Ponto de Entrada – OS200PM

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-os200pm/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*---------------------------------------------------------------------------------------------*
 | P.E.:  OS200PM                                                                              |
 | Desc:  P.E. executado após manutenção da carga                                              |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6091366                         |
 *---------------------------------------------------------------------------------------------*/

User Function OS200PM()
	Local aArea := GetArea()
	Local aAreaC5 := SC5->(GetArea())
	Local nAtual := 1
	Local nPosPed := GDFieldPos('DAI_PEDIDO')

	DbSelectArea('SC5')
	SC5->(DbSetOrder(1)) //Filial + Pedido
	SC5->(DbGoTop())

	//Percorre os pedidos
	For nAtual := 1 To Len(aCols)
		//Se a linha estiver excluída
		If GDDeleted(nAtual)
			//Se posicionar no pedido
			If SC5->(DbSeek(FWxFilial('SC5') + aCols[nAtual][nPosPed]))
				//Grava a flag
				RecLock('SC5', .F.)
					C5_X_CAMPO := 'TST'
				SC5->(MsUnlock())
			EndIf
		EndIf
	Next

	RestArea(aAreaC5)
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada OS200PM.
