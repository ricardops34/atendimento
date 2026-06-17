---
title: "Ponto de Entrada – MT120TEL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt120tel/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:21"
---

# Ponto de Entrada – MT120TEL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt120tel/

## Exemplo do Ponto de Entrada

```advpl
#Include "Protheus.ch"

/*--------------------------------------------------------------------------------------------------------------*
 | P.E.:  MT120TEL                                                                                              |
 | Desc:  Ponto de Entrada para adicionar campos no cabeçalho do pedido de compra                               |
 | Link:  http://tdn.totvs.com/display/public/mp/MT120TEL                                                       |
 *--------------------------------------------------------------------------------------------------------------*/

User Function MT120TEL()
    Local aArea     := GetArea()
    Local oDlg      := PARAMIXB[1]
    Local aPosGet   := PARAMIXB[2]
    Local nOpcx     := PARAMIXB[4]
    Local nRecPC    := PARAMIXB[5]
    Local lEdit     := IIF(nOpcx == 3 .Or. nOpcx == 4 .Or. nOpcx ==  6, .T., .F.) //Somente será editável, na Inclusão, Alteração e Cópia
    Local oXObsAux
    Public cXObsAux := ""

    //Define o conteúdo para os campos
    SC7->(DbGoTo(nRecPc))
    If nOpcx == 3
        cXObsAux := CriaVar("C7_X_OBS",.F.)
    Else
        cXObsAux := SC7->C7_X_OBS
    EndIf

    //Criando na janela o campo OBS
    @ 044, aPosGet[1,1] SAY Alltrim(RetTitle("C7_X_OBS")) OF oDlg PIXEL SIZE 050,006
    @ 043, aPosGet[1,2] MSGET oXObsAux VAR cXObsAux SIZE 100, 006 OF oDlg COLORS 0, 16777215  PIXEL
    oXObsAux:bHelp := {|| ShowHelpCpo( "C7_X_OBS", {GetHlpSoluc("C7_X_OBS")[1]}, 5  )}

    //Se não houver edição, desabilita os gets
    If !lEdit
        oXObsAux:lActive := .F.
    EndIf

    RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT120TEL.
