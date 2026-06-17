---
title: "Adição de colunas em P.E. MVC (GTPA283)"
function_name: "Adição de colunas em P.E. MVC (GTPA283)"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/adicao-de-colunas-em-p-e-mvc-gtpa283/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:11:40"
---

# Adição de colunas em P.E. MVC (GTPA283)

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/adicao-de-colunas-em-p-e-mvc-gtpa283/

## Exemplo 1- Exemplo do P.E. GTPA283 para adição de coluna da tabela GIC

```advpl
#include "TOTVS.ch"
#include "FWMVCDEF.CH"

/*/{Protheus.doc} User Function GTPA283
    Ponto de Entrada MVC Rotina GTPA283 (Cadastro de Requisições)
    @type  Function
    @version 1
    @param
    @return nil,null, sem retorno
    @example
    (examples)
    @see (links_or_references)
/*/

User Function GTPA283()
    Local aParams    := ParamIXB //Parâmetros do Ponto de Entrada
    Local oObj       := Nil      //Objeto do formulário ou do modelo, conforme o caso
    Local cIDEvent   := Nil      //ID do local de execução do ponto de entrada
    Local cIDForm    := Nil      //ID do formulário
    Local oMdlGIC    := Nil      //Model GRIDGIC
    Local oView      := Nil      //View Ativa
    Local oStruct    := Nil      //Struct
    Local oStruGIC   := Nil      //Struct Padrão da Tabela GIC
    Local aFieldsGIC := {}       //Campos Padrões da Tabela GIC
    Local nPosCpo1   := 0        //Posição do Campo GIC_X_NOM
    Local nPosCpo2   := 0        //Posição do Campo GIC_X_RG
    Local lFieldOK   := .F.      //Campos já existem ?
    Local nI         := 0        //Controle de FOR
    Local lRet       := .T.      //Retorno

    //Verifica se possui os parâmetros
    If !(aParams == Nil)
        oObj       := aParams[01] //Objeto do formulário ou do modelo, conforme o caso
        cIDEvent   := aParams[02] //ID do local de execução do ponto de entrada
        cIDForm    := aParams[03] //ID do formulário

        //Verifica se é TudoOK
        If (AllTrim(cIDEvent) == "MODELPOS")
            oMdlGIC := oObj:GetModel('GRIDGIC')
            GIC->(DBSetOrder(01)) //GIC_FILIAL+GIC_CODIGO
            For nI := 01 To oMdlGIC:Length()
                oMdlGIC:GoLine(nI)
                If !(oMdlGIC:IsDeleted())
                    If Empty(oMdlGIC:GetValue('GIC_X_NOM'))
                        lRet := .F.
                        Help( ,, 'Help',"GIC_X_NOM", 'Campo GIC_X_NOM não preenchido na Linha: ' + cValToChar(nI), 1, 0 )
                    ElseIf Empty(oMdlGIC:GetValue('GIC_X_RG'))
                        lRet := .F.
                        Help( ,, 'Help',"GIC_X_RG", 'Campo GIC_X_RG não preenchido na Linha: ' + cValToChar(nI), 1, 0 )
                    EndIf
                EndIf

            Next nI
        //Verifica se é o Commit do Modelo
        ElseIf (AllTrim(cIDEvent) == "MODELCOMMITNTTS")
            oMdlGIC := oObj:GetModel('GRIDGIC')
            GIC->(DBSetOrder(01)) //GIC_FILIAL+GIC_CODIGO
            For nI := 01 To oMdlGIC:Length()
                oMdlGIC:GoLine(nI)
                If !(oMdlGIC:IsDeleted())
                    //Posicionar no Registro
                    If (GIC->(DBSeek(FWxFilial('GIC') + oMdlGIC:GetValue('GIC_CODIGO'))))
                        If (RecLock('GIC', .F.))
                            GIC->GIC_X_NOM := oMdlGIC:GetValue('GIC_X_NOM')
                            GIC->GIC_X_RG     := oMdlGIC:GetValue('GIC_X_RG')
                            GIC->(MsUnlock())
                        EndIf
                    EndIf
                EndIf
            Next nI

        //Verifica se está no Evento MODELPRE e se a View Ativa foi recuperada
        ElseIf (AllTrim(cIDEvent) == "MODELPRE" .AND. AllTrim(oObj:cID) == "GTPA283")
            oView := FWViewActive()
            If ValType(oView) == "O"
                //Pegando a Struct do Modelo
                oStruct := oView:GetViewStruct("GRIDGIC")

                //Verifica se os campos já existem
                lFieldOK := AScan(oStruct:GetFields(), {|x| AllTrim(x[01]) == "GIC_X_NOM"}) > 0

                //Adicionando campos
                If (! lFieldOK)

                    //GIC_X_NOM
                    oStruct:AddField(;
                        "GIC_X_NOM" ,; //<cIdField >
                        "D1" ,; //<cOrdem >
                        "Passageiro" ,; //<cTitulo >
                        "Nome do Passageiro" ,; //<cDescric >
                        Nil ,; //<aHelp >
                        "GET" ,; //<cType >
                        "@!" ,; //<cPicture >
                        Nil ,; //<bPictVar >
                        "" ,; //<cLookUp >
                        .T. ,; //<lCanChange >
                        "" ,; //<cFolder >
                        "" ,; //<cGroup >
                        {} ,; //<aComboValues >
                        0 ,; //<nMaxLenCombo >
                        "" ,; //<cIniBrow >
                        .F. ,; //<lVirtual >
                        "" ,; //<cPictVar >
                        .F. ,; //<lInsertLine >
                        0 ,; //<nWidth >
                        )

                    //GIC_X_RG
                    oStruct:AddField(;
                        "GIC_X_RG" ,; //<cIdField >
                        "D2" ,; //<cOrdem >
                        "RG" ,; //<cTitulo >
                        "Cedula de Identidade" ,; //<cDescric >
                        Nil ,; //<aHelp >
                        "GET" ,; //<cType >
                        "@!" ,; //<cPicture >
                        Nil ,; //<bPictVar >
                        "" ,; //<cLookUp >
                        .T. ,; //<lCanChange >
                        "" ,; //<cFolder >
                        "" ,; //<cGroup >
                        {} ,; //<aComboValues >
                        0 ,; //<nMaxLenCombo >
                        "" ,; //<cIniBrow >
                        .F. ,; //<lVirtual >
                        "" ,; //<cPictVar >
                        .F. ,; //<lInsertLine >
                        0 ,; //<nWidth >
                        )

                    lCtrl283 := .T. //Campos já inclusos
                EndIf
            EndIf
        EndIf
    EndIf
Return lRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Exemplo enviado por Alison Lemes;

## Resumo

Exemplo de P.E. em MVC para adição de coluna na Grid
