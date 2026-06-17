---
title: "Ponto de Entrada – F060OK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f060ok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:34"
---

# Ponto de Entrada – F060OK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f060ok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  F060OK                                                       |
 | Desc:  P.E. que valida dados ao confirmar Tranferência Financeira   |
 | Link:  http://tdn.totvs.com/display/public/mp/F060OK                |
 *---------------------------------------------------------------------*/

User Function F060OK()
	Local aArea := GetArea()
	Local lRet := .T.
	Local aAux := aClone(ParamIxb)

	//Conteudo de aAux
	//[01]	cSituacao	= Situacao para a qual esta sendo transferido o titulo
	//[02]	cPort060	= Banco para o qual esta sendo transferido o titulo
	//[03]	cAgen060	= Agencia para a qual esta sendo transferido o titulo
	//[04]	cConta060	= Conta para a qual esta sendo transferido o titulo
	//[05]	lDesc		= Informa se a carteira para a qual esta sendo transferido o titulo eh 2 (descontada) ou 7 (Descontada caucionada)
	//[06]	cCliente	= Cliente, Loja e Nome do Cliente do titulo
	//[07]	cTitulo	=`Prefixo, Numero e Parcela do titulo
	//[08]	cSituAnt	= Situacao de cobranca anterior
	//[09]	cContrato	= Numero do contrato bancário
	//[10]	cPortador	= Portador anterior do titulo

	lRet := MsgYesNo("Confirma? Banco "+aAux[02])

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada F060OK.
