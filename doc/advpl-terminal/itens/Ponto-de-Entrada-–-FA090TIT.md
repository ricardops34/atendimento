---
title: "Ponto de Entrada – FA090TIT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa090tit/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:11"
---

# Ponto de Entrada – FA090TIT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-fa090tit/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  FA090TIT                                                     |
 | Desc:  P.E. que valida dados ao confirmar baixa automática Ct.Pagar |
 | Link:  http://tdn.totvs.com/display/public/mp/F060OK                |
 *---------------------------------------------------------------------*/

User Function FA090TIT()
	Local aArea := GetArea()
	Local aAreaA6 := SA6->(GetArea())
	Local lRet := .T.
	Local aAux := aClone(ParamIxb) //{cBco090,cAge090,cCta090,cCheq090}

	//Posicionando no banco
	DbSelectArea('SA6')
	SA6->(DbSetOrder(1))
	SA6->(DbGoTop())
	If SA6->(DbSeek(FWxFilial("SA6")+ aAux[01] + aAux[02] + aAux[03] ))
		//Se tiver data final
		If !Empty(SA6->A6_X_DTLIM)

			//Se a data for menor que a do cadastro de bancos
			If dDataMov < SA6->A6_X_DTLIM
				MsgStop(	"Não é possível fazer esta <b>movimentação financeira</b> "+;
							"Origem: FA090TIT", "Atenção")
				lRet := .F.
			EndIf
		EndIf
	EndIf

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

Exemplo do Ponto de Entrada FA090TIT.
