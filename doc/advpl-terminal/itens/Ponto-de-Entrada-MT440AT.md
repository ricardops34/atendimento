---
title: "Ponto de Entrada MT440AT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt440at/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:19:48"
---

# Ponto de Entrada MT440AT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt440at/

## Exemplo da Rotina

```advpl
User Function MT440AT()
    //...
Return lRet
```

## Exemplo 1- Impedir a Liberação do Pedido de Vendas para Vendedor Desativado

```advpl
#include "protheus.ch"
#INCLUDE "RWMAKE.CH"
#INCLUDE "TOPCONN.CH"

//=================================================================================
/*/{Protheus.doc} MT440AT
Regra para Impedir a Liberação do Pedido para Vendedor Desativado

@type       function
@author     Thiago.Andrrade
@since      07/10/2019
@version    1.0
/*/
//=================================================================================

User Function MT440AT()

Local _lRet := .T.
Local cTipo := Posicione("SA3",1,FwxFilial("SA3")+ALLTRIM(M->C5_VEND1),"A3_TIPO")

If cEmpAnt == "01"
    If cTipo == "D"
        MsgStop("Vendedor "+M->C5_VEND1+" Desativado! Ajuste o cadastro antes de prosseguir!", "Atenção")
        _lRet   := .F.
    Endif
Endif

Return _lRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Função e documentação enviada por Thiago.Andrrade;

## Referências

- TDN

## Resumo

Ponto de Entrada que valida liberação do pedido de venda
