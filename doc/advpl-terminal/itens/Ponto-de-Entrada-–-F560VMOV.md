---
title: "Ponto de Entrada – F560VMOV"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f560vmov/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:05"
---

# Ponto de Entrada – F560VMOV

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f560vmov/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  F560VMOV                                                     |
 | Desc:  Inclusão de Movimentação Caixinha                            |
 | Link:  http://tdn.totvs.com/display/public/mp/F560VMOV              |
 *---------------------------------------------------------------------*/

User Function F560VMOV()
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

Exemplo do Ponto de Entrada F560VMOV.
