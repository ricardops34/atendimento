---
title: "Ponto de Entrada – M460NUM"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m460num/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:40"
---

# Ponto de Entrada – M460NUM

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m460num/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*-----------------------------------------------------------------------------*
 | P.E.:  M460NUM                                                              |
 | Desc:  Função para alterar a sequencia de documentos antes da transmissão   |
 | Link:  http://tdn.totvs.com/pages/releaseview.action?pageId=6784193         |
 *-----------------------------------------------------------------------------*/

User Function M460NUM()
    Local aArea        := GetArea()
    Local cQrySped    := ""
    Local lAmbOfic    := IIf(Alltrim(Upper(GetEnvServer())) $ Alltrim(Upper(GetNewPar("MV_X_AMBIE",""))),.T.,.F.)    //Verifica se esta usando ambiente oficial
    Local cBaseTSS    := Iif(lAmbOfic, "TOTVSTSS.dbo.", "TSS_TST.dbo.")
    Local lExist        := .T.
    Local cNumNovo    := cNumero
    Local cFilSped    := cFilAnt

    //Se vier do cálculo de documentos do TMS
    If Alltrim(FunName()) $ "TMSA200;"
        While lExist
            cQrySped := " SELECT "+CRLF
            cQrySped += "     SP50.NFE_ID "+CRLF
            cQrySped += " FROM "+CRLF
            cQrySped += "     "+cBaseTSS+"SPED050 SP50 "+CRLF
            cQrySped += " WHERE "+CRLF
            cQrySped += "     SP50.NFE_ID = '"+cSerie+cNumNovo+"' "+CRLF
            cQrySped += "     AND SP50.ID_ENT = '"+RetIdEnti()+"' "
            TCQuery cQrySped New Alias "QRY_SPED"

            //Se não tiver registro, finaliza o laço, senão, soma 1 ao número
            If QRY_SPED->(EoF())
                lExist := .F.
            Else
                cNumNovo := Soma1(cNumNovo)
            EndIf
            QRY_SPED->(DbCloseArea())
        EndDo

        //Se os números tiverem divergentes, atualiza a SX5
        If cNumNovo != cNumero
            cLog := "Filial: "+cFilAnt+CRLF
            cLog += "Série: "+cSerie+CRLF
            cLog += "Número Original: "+cNumero+CRLF
            cLog += "Número Novo: "+cNumNovo+CRLF
            cLog += "Usuário: "+RetCodUsr()//+" - "+UsrRetName(RetCodUsr())

            //Se conseguir posicionar no registro, atualiza colocando sempre o próximo número disponível
            DbSelectArea("SX5")
            SX5->(DbSetOrder(1))
            If SX5->(DbSeek(cFilSped + '01' + cSerie ))
                RecLock("SX5", .F.)
                    X5_DESCRI    := Soma1(cNumNovo)
                    X5_DESCENG    := Soma1(cNumNovo)
                    X5_DESCSPA    := Soma1(cNumNovo)
                MsUnlock()
            Endif

            //Atualizando a numeração atual
            cNumero := cNumNovo
        EndIf
    EndIf

    RestArea(aArea)
Return .T.
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M460NUM.
