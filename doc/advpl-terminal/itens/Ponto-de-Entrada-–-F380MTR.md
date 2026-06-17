---
title: "Ponto de Entrada – F380MTR"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f380mtr/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:51"
---

# Ponto de Entrada – F380MTR

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f380mtr/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  F380MTR                                                      |
 | Desc:  Após checagem da conciliação bancária                        |
 *---------------------------------------------------------------------*/

User Function F380MTR()
	Local cMsg := ""
	Local aArea := GetArea()
	Local aAreaTRB := TRB->(GetArea())

	//Enquanto houver registros na tabela temporária
	DbSelectArea("TRB")
	While ! TRB->(EoF())
		//Se o registro tiver marcado para ser desconciliado
		If !Empty(TRB->E5_OK)
			dbSelectArea("SE5")
			SE5->(DbGoTo(TRB->E5_RECNO))

			//Se o movimento já tiver sido conciliado
			If ! Empty(SE5->E5_RECONC)
				cMsg += "- "+SE5->E5_PREFIXO+" - "+SE5->E5_NUMERO+" - "+SE5->E5_PARCELA+" - "+dToC(SE5->E5_DTDISPO)+" - "+SE5->E5_HISTOR+"..."+Chr(13)+Chr(10)
			EndIf
		EndIf

		TRB->(DbSkip())
	EndDo

	//Se tiver mensagem para ser mostrada
	If !Empty(cMsg)
		cMsg := "O(s) seguinte(s) movimento(s) serão desconciliados:"+Chr(13)+Chr(10)+"- Prefixo - Número - Parcela - Data - Histórico" + Chr(13)+Chr(10)+ cMsg
		cMsg += Chr(13)+Chr(10)+"Origem: F380MTR "
		Aviso('Atenção', cMsg, {'OK'}, 03)
	EndIf

	RestArea(aAreaTRB)
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F380MTR.
