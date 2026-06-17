---
title: "Ponto de Entrada – MT241LOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt241lok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:25"
---

# Ponto de Entrada – MT241LOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt241lok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  MT241LOK                                                                                              |
 | Desc:  Ponto de Entrada na validação da linha do movimento interno mod 2                                     |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6087850                                          |
 *--------------------------------------------------------------------------------------------------------------*/

User Function MT241LOK()
	Local lRet		:= .T.
	Local aArea		:= GetArea()
	Local aAreaD3	:= SD3->(GetArea())
	Local nPosCont	:= 0
	Local cConteudo	:= ""

	//Pegando a posição e o contéudo do campo
	nPosCont	:= aScan(aHeader, {|x| AllTrim(Upper(x[2])) == "D3_X_CAMPO"})
	cConteudo	:= aCols[n][nPosCont]

	//Se o Campo estiver em branco
	If Empty(cConteudo)
		lRet := MsgYesNo("O CAMPO está em branco, deseja prosseguir?", "Atenção")
	EndIf

	RestArea(aAreaD3)
	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT241LOK.
