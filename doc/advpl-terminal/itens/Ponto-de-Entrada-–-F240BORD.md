---
title: "Ponto de Entrada – F240BORD"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f240bord/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:16:48"
---

# Ponto de Entrada – F240BORD

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-f240bord/

## Exemplo da Rotina

```advpl
User Function F240BORD()
```

## Exemplo 1- Filtrando de modo simples

```advpl
/* Bibliotecas */
#Include 'Protheus.ch'
#Include 'TbiConn.ch'

/*/{Protheus.doc} F240BORD
Ponto de Entrada para alterar o número do Borderô conforme o Tipo de Pagamento
do Título
@author Caio César Henrique
@since 29/05/2019
@version 1.0
@type function
@example U_F240BORD()
@obs  No exemplo abaixo, caso o cliente selecione mais de uma forma de pagamento para um único borderô, seleciono todos os títulos gerados e crio novos borderôs separados por Forma de Pagamento. Esta ação é necessária, pois na hora da geração do arquivo SISPAG, o Protheus não efetua a quebra das Formas de Pagamento, causando rejeição do arquivo no banco.
/*/

User Function F240BORD()

    /* Variáveis Locais */
    Local aArea  := GetArea()
    Local cBord  := cNumBor
    Local cQuery := ''
    Local cAlias := GetNextAlias()
    Local lPrimeiro := .T.
    Local cModelo := ''
    Local aBord   := {}
    Local cString := ''
    Local n       := 0

    /* Abre tabela de Borderô */
    dbSelectArea("SEA")
    SEA->(dbSetOrder(1))

    /* Query para busca dos títulos do Borderô */
    cQuery := "SELECT EA_NUMBOR, EA_MODELO, R_E_C_N_O_ RECNO "
    cQuery += " FROM "+RetSqlName("SEA")+" SEA "
    cQuery += " WHERE EA_NUMBOR = '"+cNumBor+"' "
    cQuery += " AND EA_FILIAL = '"+xFilial("SEA")+"' "
    cQuery += " AND SEA.D_E_L_E_T_ = ' ' "
    cQuery += "ORDER BY EA_MODELO "

    dbUseArea( .T., "TOPCONN", TCGenQry(,,cQuery), (cAlias), .F., .T.)

    /* Pega o primeiro Modelo encontrado */
    (cAlias)->(dbGoTop())
    cModelo := (cAlias)->EA_MODELO
    (cAlias)->(dbGoTop())

    /* Guarda para histórico e mensagem */
    aAdd(aBord,cNumBor)

    /* Percorre todos os títulos encontrados */
    Do While (cAlias)->(!Eof())

        /* Descarta o primeiro Borderô localizado */
        If lPrimeiro
            Do While (cAlias)->(!Eof()) .and. (cAlias)->EA_MODELO == cModelo
                (cAlias)->(dbSkip())
            End Do
            lPrimeiro := .F.
        EndIf

        /* Se for final de arquivo após o Primeiro, sai do Looping */
        If (cAlias)->(Eof())
            Exit
        EndIf

        /* Pega o número do novo Modelo */
        cModelo := (cAlias)->EA_MODELO

        /* Verifica numero do ultimo Bordero Gerado */
        DbSelectArea("SX6")
        cBord := Soma1(Pad(GetMV("MV_NUMBORP"),Len(SEA->EA_NUMBOR)),Len(SEA->EA_NUMBOR))
        While !MayIUseCode( "EA_NUMBOR"+SX6->X6_FIL+cBord)
            cBord := Soma1(cBord)
        EndDo

        /* Grava novo número do Borderô paga o Novo Modelo */
        Do While (cAlias)->(!Eof()) .and. (cAlias)->EA_MODELO == cModelo
            SEA->(MSGOTO((cAlias)->RECNO))
            If RecLock("SEA",.F.)
                SEA->EA_NUMBOR := cBord
                SEA->(MsUnlock())
            EndIf
            (cAlias)->(dbSkip())
        End Do

        /* Guarda para histórico e mensagem */
        aAdd(aBord,cBord)

        /* Grava o numero do bordero atualizado
           Utilize sempre GetMv para posicionar o SX6.
        */
        dbSelectArea("SX6")
        GetMv("MV_NUMBORP")

        /* Garante que o numero do bordero seja sempre superior ao numero anterior */
        If SX6->X6_CONTEUD < cBord
            RecLock("SX6",.F.)
            SX6->X6_CONTEUD := cBord
            msUnlock()
        Endif

    End Do

    /* Monta mensagem com todos os Borderôs gerados */
    If Len(aBord) > 0
        For n := 1 To Len(aBord)
            cString += "Borderô: "+aBord[n]+" gerado com sucesso!"+Chr(13)+Chr(10)
        Next
    EndIf

    /* Exibe mensagem */
    MsgInfo(cString)

    /* Restaura área de trabalho */
    RestArea(aArea)

Return ( Nil )
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

– Função e documentação enviada por Caio Henrique;

## Referências

– TDN

## Resumo

Ponto de Entrada para alterar o número do Borderô
