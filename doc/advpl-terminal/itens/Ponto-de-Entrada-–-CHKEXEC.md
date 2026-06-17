---
title: "Ponto de Entrada – CHKEXEC"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-chkexec/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:29"
---

# Ponto de Entrada – CHKEXEC

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-chkexec/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

//Constantes
#Define STR_PULA	Chr(13)+Chr(10)

/*----------------------------------------------------------------------------------*
 | P.E.:  ChkExec                                                                   |
 | Desc:  P.E. executado ao abrir rotina no menu                                    |
 | Link:  http://tdn.totvs.com/display/public/mp/CHKEXEC+-+Dispara+ponto+de+entrada |
 *----------------------------------------------------------------------------------*/

User Function ChkExec()
	Local aArea		:= GetArea()
	Local lRet		:= .T.
	Local cLog		:= ""

	//Se for o faturamento, registra log
	If nModulo == 5
		cLog := "Data:    "+dToC(dDataBase)+CRLF
		cLog += "Hora:    "+Time()+CRLF
		cLog += "Usuario: "+RetCodUsr()+" ("+UsrRetName(RetCodUsr)+")"+CRLF

		MemoWrite("\x_logs\acesso_"+dToS(dDataBase)+"_"+StrTran(Time(), ':', '-')+".log", cLog)
	EndIf

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada CHKEXEC.
