---
title: "Ponto de Entrada – M440SC9I"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m440sc9i/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:31"
---

# Ponto de Entrada – M440SC9I

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m440sc9i/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'Protheus.ch'
#Include 'RwMake.ch'

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  M440SC9I                                                                                      |
 | Desc:  Função para gravação de campos de usuário na liberação da SC9 (MaGravaSC9)                    |
 | Links: http://tdn.totvs.com/pages/releaseview.actionçpageId=6784165                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function M440SC9I()
	Local aArea := GetArea()
	Local aAreaC9 := SC9->(GetArea())
	Local aAreaC6 := SC6->(GetArea())
	Local aAreaC5 := SC5->(GetArea())

	DbSelectArea('SC5')
	SC5->(DbSetOrder(1)) //C5_FILIAL+C5_NUM

	//Posiciona no pedido
	If SC5->(DbSeek(FWxFilial('SC5') + SC9->C9_PEDIDO))
		//Se tiver remessa
		If ! Empty(SC5->C5_X_CAMPO)
			RecLock('SC9', .F.)
				C9_X_CAMPO := SC5->C5_X_CAMPO
			SC9->(MsUnlock())
		EndIf
	EndIf

	RestArea(aAreaC5)
	RestArea(aAreaC6)
	RestArea(aAreaC9)
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M440SC9I.
