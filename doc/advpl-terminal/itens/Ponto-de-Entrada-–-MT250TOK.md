---
title: "Ponto de Entrada – MT250TOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt250tok/"
has_examples: true
example_count: 3
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, exemplo, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:18:30"
---

# Ponto de Entrada – MT250TOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt250tok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  MT250TOK                                                                                              |
 | Desc:  Função chamada ao confirmar Apontamento de Produção                                                   |
 | Link:  http://tdn.totvs.com/display/public/mp/MT250TOK+-+Valida+valor+digitado+ou+tela+toda                  |
 *--------------------------------------------------------------------------------------------------------------*/

User Function MT250TOK()
	Local lRet		:= ParamIXB
	Local aArea		:= GetArea()

	lRet := MsgYesNo("Deseja continuar? OP: "+M-&gt;D3_OP, "Atenção")

	RestArea(aArea)
Return lRet
```

## Exemplo 2- Bloquear o Apontamento de Produção por um periodo determinado

```advpl
#INCLUDE "PROTHEUS.CH"
#include "rwmake.ch"
#include "topconn.ch"

//=================================================================================
/*/{Protheus.doc} MT250TOK
Bloquear o Apontamento de Produção por um periodo determinado [MATA250]

@type       function
@author     Thiago.Andrrade
@since      04/10/2019
@version    1.0

/*/
//=================================================================================

User Function MT250TOK

	Local lRet  := .T.

	If DTOS(dDatabase) == "20191031"
		msgstop ("Apontamento de Produção Bloqueado até a finalização da Virada de Saldos do Estoque !", "Atenção")
		lRet  := .F.
	Endif

Return (lRet)
```

## Exemplo 3- Bloquear Apontamento de Produto Acabado em um determinado Armazém

```advpl
//=================================================================================
/*/{Protheus.doc} MT250TOK
Bloquear Apontamento de PA no 08 e 09

@type       function
@author     Thiago.Andrrade
@since      04/10/2019
@version    1.0

/*/
//=================================================================================

User Function MT250TOK

Local lRet  := .T.

Local cTipo   := Posicione("SB1",1,xFilial("SB1")+M->D3_COD,"B1_TIPO")

If cFilAnt == '02'
    If M->D3_LOCAL $ "08/09"
        If cTipo == "PA"
            msgstop ("Não é permitido realizar o apontamento de PA no Armazém "+ M->D3_LOCAL +" !", "Atenção")
            lRet  := .F.
        Endif
    Endif
Endif

Return (lRet)
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Exemplos 2 e 3 enviados por Thiago.Andrrade;

## Referências

- TDN

## Resumo

Exemplo do Ponto de Entrada MT250TOK.
