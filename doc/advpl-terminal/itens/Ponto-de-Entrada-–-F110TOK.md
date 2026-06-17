---
title: "Ponto de Entrada – F110TOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f110tok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:43"
---

# Ponto de Entrada – F110TOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f110tok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  F110TOK                                                      |
 | Desc:  Validação do Baixas do Contas a Receber Automático           |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6070960 |
 *---------------------------------------------------------------------*/

User Function F110TOK()
	Local aArea:= GetArea()
	Local lRet := .T.
	Local cBco := ParamIXB[1]
	Local cAge := ParamIXB[2]
	Local cCnt := ParamIXB[3]

	lRet := MsgYesNo("Deseja continuar? Banco "+cBco, "Atenção")

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F110TOK.
