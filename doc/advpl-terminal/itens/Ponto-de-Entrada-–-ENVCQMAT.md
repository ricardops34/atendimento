---
title: "Ponto de Entrada – ENVCQMAT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-envcqmat/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:16:31"
---

# Ponto de Entrada – ENVCQMAT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-envcqmat/

## Exemplo da Rotina

```advpl
User Function ENVCQMAT()
	//...
Return lRet
```

## Exemplo 1- Verificando o tipo de produto para enviar ao CQ

```advpl
#Include "rwmake.ch"
#Include "TOPCONN.CH"
#Include "PROTHEUS.CH"

//=================================================================================
/*/{Protheus.doc} ENVCQMAT
P.E permite manipular o envio do material para o C.Q [98] [mata103]

@type       function
@author Thiago.Andrrade
@since      28/05/2019
@version    1.0
@param      PARAMIXB, Logico, Envia CQ
@return .T. -> Envia para C.Q
            .F. -> Não envia para C.Q.
/*/
//=================================================================================

User Function ENVCQMAT()

Local lRet := .F.

//Regra IM
If cEmpAnt == '01' .and. cFilAnt == '02'
    If SF1->F1_TIPO == 'N'
        If Posicione("SB1", 1, FWxFilial("SB1") + SD1->D1_COD, "B1_TIPO") == "IM"
            lRet := .T.
        Endif
    Endif
Endif

Return (lRet)
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

– Função e documentação enviada por Thiago.Andrrade;

## Referências

– TDN

## Resumo

Ponto de Entrada para definir se o material será enviado ao CQ na Entrada [mata103]
