---
title: "Ponto de Entrada CriaSXE"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-criasxe/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:19:46"
---

# Ponto de Entrada CriaSXE

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-criasxe/

## Exemplo da Rotina

```advpl
User Function CriaSXE()
	//Tratativas
Return cProxNum
```

## Exemplo 1- Ponto de entrada para tratar várias tabelas

```advpl
#include "protheus.ch"
#include "topconn.ch"

/*/{Protheus.doc}P.E - CriaSXE

    Ponto de entrada para retornar o próximo número que deve ser utilizado na inicialização da numeração. Este ponto de entrada é recomendado
    para casos em que deseja-se alterar a regra padrão de descoberta do próximo número.
    A execução deste ponto de entrada, ocorre em casos de perda das tabelas SXE/SXF ( versões legado ) e de reinicialização do License Server.

    @author: Súlivan Simões Silva - Email: sulivansimoes@gmail.com
    @since : 15/10/2019
    @version : 1.0
    @param   : PARAMIXB, array, Vetor contendo as informações que poderão ser utilizadas pelo P.E.
    @return  : cRet, caracter, Número que será utilizado pelo controle de numeração.
               Caso seja retornado Nulo ( NIL ), a regra padrão do sistema será aplicada. Esta função nunca deve retornar uma string vazia.

    @Lik     : 1 - http://tdn.totvs.com/pages/releaseview.action?pageId=6815179
               2 - https://centraldeatendimento.totvs.com/hc/pt-br/articles/360019303171-MP-ADVPL-CRIASXE-PARA-SOLUCIONAR-LACUNAS-NO-CONTROLE-DE-NUMERA%C3%87%C3%83O

    @obs : MANUTENÇÕES FEITAS NO CÓDIGO:
    --------------------------------------------------------------------------------------------
    Versão gerada:
    Data:
    Responsável:
    Log: [Fale aqui o que foi feito]
    --------------------------------------------------------------------------------------------
/*/

user function CRIASXE()

    local aArea     := getArea()
    Local cAlias_   := paramixb[1]
    local cCpoSx8   := paramixb[2]
    local cAlias_Sx8:= paramixb[3]
    local nOrdSX8   := paramixb[4]
    local aTabelas  := {}         //Tabelas que irão permitir a execução do P.E
    local cTabela   := ""         //Alias corrente que irá permitir a execução do P.E.
    local nCount    := 0
    local cQuery    := ""         //Na query eu vejo o ultimo número que tá no banco.
    local cProxNum  := Nil        //Retorno da função.

    ConOut("[u_CRIASXE] 01 - Entrou no ponto de entrada CRIASXE / Se nao tiver log entre mensagem 01 e 02, nao foi feito nada aqui!")

       //Definindo as tabelas que irão executar o P.E / Caso precise executar em mais alguma só adicionar no array e pronto..
       aTabelas := {"SL1","FJV"}

       //Percorro array e vejo se tabela corrente deve executar o P.E
       for nCount := 1 to  len(aTabelas)

            if( cAlias_ $ aTabelas[nCount] )

                cTabela := aTabelas[nCount]

                ConOut("[u_CRIASXE] ->  TRATATIVA | Sera ajustado via P.E numeracao automatica: "+ cAlias_ + " - " +;
                        cCpoSx8 + " - " + cAlias_Sx8 + " - " + cValToChar(nOrdSX8) )
                exit
            endif
       next

       //Se a tabela corrente estiver na coleção de tabelas E as variáveis dos parâmetros não estiverem com problema.
       if( !empty(cTabela) .AND.  ! ( empty(cAlias_) .AND. empty(cCpoSx8) ) )

            ConOut("[u_CRIASXE] ->  Antes de criar consulta para pegar ultimo numero do campo "+cCpoSx8 )

            cQuery := " SELECT MAX("+ cCpoSx8+ ") AS ULTIMO_NUM FROM "+ RetSqlName(cAlias_) +" AS TMP "
            cQuery += " WHERE TMP.D_E_L_E_T_ = '' "

            cQuery := changeQuery(cQuery)
            TcQuery cQuery New Alias 'TMP_QRY'

            ConOut("[u_CRIASXE] ->  Depois de criar consulta para pegar ultimo número do campo "+cCpoSx8 )

            //Caso a query retorne ultimo número
            if( !TMP_QRY->(eof() ) )

                cProxNum := soma1(TMP_QRY->ULTIMO_NUM) //pego ultimo código e somo 1

                ConOut("[u_CRIASXE] ->  Proximo numero do campo  "+cCpoSx8+" sera "+cProxNum )
            else

                ConOut("[u_CRIASXE] ->  A query veio vazia ou ocorreu algum problema, nao conseguiu incrementar o proximo numero do campo"+cCpoSx8 )
            endif

            TMP_QRY->( dbCloseArea() )
       endif

    ConOut("[u_CRIASXE] 02 - Encerrou taferas no ponto de entrada CRIASXE")

    restArea( aArea )

return cProxNum
```

## Exemplo 2- Ponto de entrada para tratar uma tabela customizada

```advpl
//Bibliotecas
#Include "Totvs.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} CriaSXE
Ponto de Entrada para controlar a numeração
@author Atilio
@since 17/10/2019
@version 1.0
@return cCodRet, Código de retorno que entrará no lugar do chamado pelo License
@type function
@see https://tdn.totvs.com/pages/releaseview.action?pageId=6815179
@obs Esse p.e. é chamado na primeira vez de pegar a numeração na tabela
/*/

User Function CriaSXE()
	Local aArea      := GetArea()
	Local cAliasX    := ParamIXB[1] //cAlias - Nome da tabela;
	Local cCpoSX8X   := ParamIXB[2] //cCpoSX8 - Nome do campo que será utilizado para verificar o próximo sequencial;
	Local cAliasSX8X := ParamIXB[3] //cAliasSX8 - Filial e nome da tabela na base de dados que será utilizada para verificar o sequencial;
	Local nOrdSX8X   := ParamIXB[4] //nOrdSX8 - Índice de pesquisa a ser usada na tabela.
	Local cCodRet    := Nil
	Local cQryMax    := ""

	//Se for a tabela SZJ
	If cAliasX == "SZJ"

		//Montando a query, pegando o último
		cQryMax := " SELECT " + CRLF
		cQryMax += "     ISNULL(MAX(" + cCpoSX8X + "), '') AS ULTIMO " + CRLF
		cQryMax += " FROM  " + CRLF
		cQryMax += "     " + RetSQLName('SZJ') + " SZJ " + CRLF
		cQryMax += " WHERE  " + CRLF
		cQryMax += "     ZJ_FILIAL = '" + FWxFilial('SZJ') + "' " + CRLF
		cQryMax += "     AND ZJ_NUMERO NOT LIKE 'LANC%' " + CRLF
		cQryMax += "     AND SZJ.D_E_L_E_T_ = ' ' " + CRLF
		TCQuery cQryMax New Alias "QRY_MAX"

		//Se tiver dados e se não tiver vazio
		If ! QRY_MAX->(EoF()) .And. ! Empty(QRY_MAX->ULTIMO)
			cCodRet := Soma1(QRY_MAX->ULTIMO)
		EndIf
		QRY_MAX->(DbCloseArea())

	EndIf

	RestArea(aArea)
Return cCodRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Função e documentação enviada por Súlivan Simões;

## Referências

- TDN

## Resumo

Ponto de entrada acionado na primeira vez que carrega os dados da sequência de numeração das tabelas
