---
title: "Ponto de Entrada MT260TOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt260tok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:19:47"
---

# Ponto de Entrada MT260TOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt260tok/

## Exemplo da Rotina

```advpl
User Function MT260TOK()
    //...
Return lRet
```

## Exemplo 1- Validar Transferencia Simples para um Armazem definido.

```advpl
#INCLUDE "RWMAKE.CH"
#INCLUDE 'protheus.ch'

//=================================================================================
/*/{Protheus.doc} MT260TOK
Bloqueio de Transf. Simples de PA no Armazem 08 e 09    (MATA260)

@type       function
@author     Thiago.Andrrade
@since      01/10/2019
@version    1.0
@return     .T. Libera transferencia
/*/
//=================================================================================
User Function MT260TOK

Local lRet:= .T.

If cFilant == "02"
    If CLOCDEST $ "08/09"
        If SB1->B1_TIPO == "PA"
            msgstop ("Não é permitido realizar Transferência de PA no Armazém "+ CLOCDEST +"!", "Atenção")
            lRet  := .F.
        Endif
    Endif
Endif

Return lRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Função e documentação enviada por Thiago.Andrrade;

## Referências

- TDN

## Resumo

Ponto de entrada que valida as informações na transferência simples
