---
title: "Ponto de Entrada – SD3250I"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-sd3250i/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:23"
---

# Ponto de Entrada – SD3250I

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-sd3250i/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  SD3250I                                                                                       |
 | Desc:  Função para gravar informações na SD3 após gerar a produção                                   |
 | Links: http://tdn.totvs.com/pages/releaseview.action?pageId=6087850                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function SD3250I()
	Local aArea		:= GetArea()
	Local aAreaD3	:= SD3->(GetArea())
	Local aAreaC2	:= SC2->(GetArea())
	Local cOP

	//Pegando o número da op
	cOp := Alltrim(SD3->D3_OP)

	//Seleciona os apontamentos dessa OP, que estejam com o campo customizado em branco
	cQuery := " SELECT "
	cQuery += "    SD3.R_E_C_N_O_ AS RECNUM "
	cQuery += " FROM "
	cQuery += "    "+RetSQLName("SD3")+" SD3 "
	cQuery += " WHERE "
	cQuery += "    SD3.D_E_L_E_T_ ='' "
	cQuery += "    AND D3_FILIAL  = '"+xFilial('SD3')+"' "
	cQuery += "    AND D3_OP LIKE '" + cNumOp + "%' "
	cQuery += "    AND D3_X_CAMPO = '' "
	TCQuery cQuery New Alias "QRY_TST"

	//Enquanto tiver registros
	While ! QRY_TST->(EoF())
		SD3->(DbGoTo(QRY_TST->RECNUM))

		//Atualizando o campo customizado
		RecLock("SD3", .F.)
			D3_X_CAMPO := "TESTE"
		SD3->(MsUnlock())

		QRY_TST->(DbSkip())
	EndDo
	QRY_TST->(DbCloseArea())

	RestArea(aAreaC2)
	RestArea(aAreaD3)
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada SD3250I.
