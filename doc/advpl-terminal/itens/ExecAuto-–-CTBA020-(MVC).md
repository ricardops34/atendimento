---
title: "ExecAuto – CTBA020 (MVC)"
function_name: "ExecAuto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "rotinas-automaticas"
source_url: "https://terminaldeinformacao.com/knowledgebase/execauto-ctba020/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:26"
---

# ExecAuto – CTBA020 (MVC)

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/execauto-ctba020/

## Exemplo da Rotina

```advpl
oModelCtb := FWLoadModel('CTBA020')
EndIf

oModelCtb:SetOperation(4)
oModelCtb:Activate()

oCVD := oModelCtb:GetModel('CVDDETAIL')
oCVD:SetValue('CVD_FILIAL', FWxFilial('CVD'))
...

If oModelCtb:VldData()
	oModelCtb:CommitData()
EndIf
```

## Exemplo 1- Alterando e incluindo dados na CVD

```advpl
cPasta := "C:\TOTVS\log_CVD\"

//Se for nulo, carrega o modelo de dados
If oModelCtb == Nil
	oModelCtb := FWLoadModel('CTBA020')
EndIf

//Posiciona no Plano de Contas
DBSelectArea("CT1")
CT1->(DbGoTo(QRY_CONTA->CT1REC))

//Seta a operação de Alteração no modelo, e ativa ele
oModelCtb:SetOperation(nOpcAuto)
oModelCtb:Activate()

//Pega o modelo (grid) da CVD, e define os campos
oCVD := oModelCtb:GetModel('CVDDETAIL')
oCVD:SetValue('CVD_FILIAL', FWxFilial('CVD'))
oCVD:SetValue('CVD_ENTREF', cEntidade )
oCVD:SetValue('CVD_CODPLA', cPlanoRef )
oCVD:SetValue('CVD_VERSAO', cVersao   )
oCVD:SetValue('CVD_CTAREF', cContaRef )
oCVD:SetValue('CVD_CUSTO' , cCenCusto )
oCVD:SetValue('CVD_CLASSE', cClaConta )
oCVD:SetValue('CVD_TPUTIL', cTpUtil   )
oCVD:SetValue('CVD_NATCTA', cNatConta )
oCVD:SetValue('CVD_CTASUP', cEntSuper )

//Valida os dados preenchidos, se deu certo
If oModelCtb:VldData()

	//Grava a informação no banco
	oModelCtb:CommitData()
	cIncluido += "- " + QRY_CONTA->CT1_CONTA + " (Cta.Ref.: " + cContaRef + ");" + CRLF

Else

	//Recupera o erro e joga no array de log
	aLog := oModelCtb:GetErrorMessage()
	cLog := ""

	//Percorre as linhas do log
	For nX := 1 to Len(aLog)

		//Se tiver conteúdo na linha do log, adiciona na variável de log
		If ! Empty(aLog[nX])
			cLog += Alltrim(aLog[nX]) + CRLF
		EndIf
	Next

	//Monta o nome do arquivo, e grava o log nele
	cArquivo := QRY_CONTA->CT1_CONTA + " - log - " + dToS(Date()) + " - " + StrTran(Time(), ':', '-')+".txt"
	MemoWrite(cPasta + cArquivo, cLog)

	cErros += "- " + QRY_CONTA->CT1_CONTA + " (Log em '" + cPasta + cArquivo + "');" + CRLF
EndIf

//Desativa o modelo de dados
oModelCtb:DeActivate()
```

## Exemplo 2- Incluindo registro na CT1

```advpl
//Carrega o model
    oModelCtb := FWLoadModel('CTBA020')

    //Seta a operação de Inclusão
    oModelCtb:SetOperation(3)
    oModelCtb:Activate()

    //Pega o modelo da CT1 e define os campos
    oModelCT1 := oModelCtb:GetModel('CT1MASTER')
    oModelCT1:SetValue('CT1_CONTA',  "CONTA000000000000002")
    oModelCT1:SetValue('CT1_DESC01', "CONTA DE TESTES 2" )
    oModelCT1:SetValue('CT1_CLASSE', "1" )
    oModelCT1:SetValue('CT1_NORMAL', "1" )

    /* Se quiser, aqui você pode colocar para criar os outros details, como o da linha 17 a 27 do exemplo acima */

    //Valida os dados preenchidos, se deu certo
    If oModelCtb:VldData() .And. oModelCtb:CommitData()
        FWAlertSuccess("Registro incluido na tabela CT1.", "Sucesso!")

    Else

        //Busca o Erro do Modelo de Dados
		aErro := oModelCtb:GetErrorMessage()

		//Monta o Texto que será mostrado na tela
		AutoGrLog("Id do formulário de origem:"  + ' [' + AllToChar(aErro[01]) + ']')
		AutoGrLog("Id do campo de origem: "      + ' [' + AllToChar(aErro[02]) + ']')
		AutoGrLog("Id do formulário de erro: "   + ' [' + AllToChar(aErro[03]) + ']')
		AutoGrLog("Id do campo de erro: "        + ' [' + AllToChar(aErro[04]) + ']')
		AutoGrLog("Id do erro: "                 + ' [' + AllToChar(aErro[05]) + ']')
		AutoGrLog("Mensagem do erro: "           + ' [' + AllToChar(aErro[06]) + ']')
		AutoGrLog("Mensagem da solução: "        + ' [' + AllToChar(aErro[07]) + ']')
		AutoGrLog("Valor atribuído: "            + ' [' + AllToChar(aErro[08]) + ']')
		AutoGrLog("Valor anterior: "             + ' [' + AllToChar(aErro[09]) + ']')

		//Mostra a mensagem de Erro
		MostraErro()
    EndIf

    //Desativa o modelo de dados
    oModelCtb:DeActivate()
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Rotina Automática para criação de dados nas Contas Contábeis
