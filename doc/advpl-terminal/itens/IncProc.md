---
title: "IncProc"
function_name: "IncProc"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "reguas-de-processamento"
source_url: "https://terminaldeinformacao.com/knowledgebase/incproc/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:56"
---

# IncProc

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/incproc/

## Exemplo da Rotina

```advpl
IncProc("Texto mostrado")
```

## Exemplo 1- Mostrando a barra de processamento

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} zTstBar
Função de exemplo de barras de processamento em AdvPL
@author Atilio
@since 28/10/2018
@version 1.0
@type function
@example u_zTstBar()
/*/

User Function zTstBar()
    Local aArea      := GetArea()
    Local lContinua  := .T.
    Local nTipoRegua := 0
    Local oProcess
    Private cQryAux  := ""

    //Monta a consulta de grupo de produtos
    cQryAux := " SELECT "                          + CRLF
    cQryAux += "     BM_GRUPO, "                    + CRLF
    cQryAux += "     BM_DESC "                      + CRLF
    cQryAux += " FROM "                            + CRLF
    cQryAux += "     SBM010 SBM "                   + CRLF
    cQryAux += " WHERE "                           + CRLF
    cQryAux += "     BM_FILIAL = ' ' "              + CRLF
    cQryAux += "     AND SBM.D_E_L_E_T_ = ' ' "     + CRLF

    Processa({|| fExemplo5()}, "Filtrando...")

    RestArea(aArea)
Return

/*-----------------------------------------------------------*
 | Func.: fExemplo5                                          |
 | Desc.: Exemplo utilizando Processa                        |
 *-----------------------------------------------------------*/

Static Function fExemplo5()
    Local aArea  := GetArea()
    Local nAtual := 0
    Local nTotal := 0

    //Executa a consulta
    TCQuery cQryAux New Alias "QRY_AUX"

    //Conta quantos registros existem, e seta no tamanho da régua
    Count To nTotal
    ProcRegua(nTotal)

    //Percorre todos os registros da query
    QRY_AUX->(DbGoTop())
    While ! QRY_AUX->(EoF())

        //Incrementa a mensagem na régua
        nAtual++
        IncProc("Analisando registro " + cValToChar(nAtual) + " de " + cValToChar(nTotal) + "...")

        QRY_AUX->(DbSkip())
    EndDo
    QRY_AUX->(DbCloseArea())
    RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Incrementa a régua do Processa
