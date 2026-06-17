---
title: "Ponto de Entrada – F560BLOCK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f560block/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:01"
---

# Ponto de Entrada – F560BLOCK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f560block/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  F560BLOCK                                                    |
 | Desc:  Valida Exclusão de Movimentação Caixinha                     |
 *---------------------------------------------------------------------*/

User Function F560BLOCK()
	Local aArea:= GetArea()
	Local aAreaET:=SET->(GetArea())
	Local lRet := .T.
	Local cBco := ""
	Local cAge := ""
	Local cCnt := ""

	//Posicionando no caixinha
	DbSelectArea('SET')
	SET->(DbSetOrder(1))
	SET->(DbGoTop())
	If SET->(DbSeek(FWxFilial('SET') + M->EU_CAIXA))
		cBco := SET->ET_BANCO
		cAge := SET->ET_AGEBCO
		cCnt := SET->ET_CTABCO

		lRet := MsgYesNo("Continuar? Banco: "+cBco, "Atenção")
	EndIf

	RestArea(aAreaET)
	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F560BLOCK.
