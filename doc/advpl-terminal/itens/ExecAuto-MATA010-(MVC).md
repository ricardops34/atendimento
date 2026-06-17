---
title: "ExecAuto MATA010 (MVC)"
function_name: "ExecAuto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "rotinas-automaticas"
source_url: "https://terminaldeinformacao.com/knowledgebase/execauto-mata010-mvc/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:32"
---

# ExecAuto MATA010 (MVC)

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/execauto-mata010-mvc/

## Exemplo da Rotina

```advpl
FWMVCRotAuto(oModel, "SB1", nOperation, {{"SB1MASTER", aFields}} ,,.T.)
```

## Exemplo 1- Incluindo um produto

```advpl
//Pegando o modelo de dados, setando a operação de inclusão
oModel := FWLoadModel("MATA010")
oModel:SetOperation(3)
oModel:Activate()

//Pegando o model e setando os campos
oSB1Mod := oModel:GetModel("SB1MASTER")
oSB1Mod:SetValue("B1_COD"    , cCod      )
oSB1Mod:SetValue("B1_DESC"   , cDesc     )
oSB1Mod:SetValue("B1_TIPO"   , cTipo     )
oSB1Mod:SetValue("B1_UM"     , cUM       )
oSB1Mod:SetValue("B1_LOCPAD" , cLocPad   )

//Setando o complemento do produto
oSB5Mod := oModel:GetModel("SB5DETAIL")
If oSB5Mod != Nil
	oSB5Mod:SetValue("B5_CEME"   , cCEME     )
EndIf

//Se conseguir validar as informações
If oModel:VldData()

	//Tenta realizar o Commit
	If oModel:CommitData()
		lOk := .T.

	//Se não deu certo, altera a variável para false
	Else
		lOk := .F.
	EndIf

//Se não conseguir validar as informações, altera a variável para false
Else
	lOk := .F.
EndIf

//Se não deu certo a inclusão, mostra a mensagem de erro
If ! lOk
	//Busca o Erro do Modelo de Dados
	aErro := oModel:GetErrorMessage()

	//Monta o Texto que será mostrado na tela
	cMessage := "Id do formulário de origem:"  + ' [' + cValToChar(aErro[01]) + '], '
	cMessage += "Id do campo de origem: "      + ' [' + cValToChar(aErro[02]) + '], '
	cMessage += "Id do formulário de erro: "   + ' [' + cValToChar(aErro[03]) + '], '
	cMessage += "Id do campo de erro: "        + ' [' + cValToChar(aErro[04]) + '], '
	cMessage += "Id do erro: "                 + ' [' + cValToChar(aErro[05]) + '], '
	cMessage += "Mensagem do erro: "           + ' [' + cValToChar(aErro[06]) + '], '
	cMessage += "Mensagem da solução: "        + ' [' + cValToChar(aErro[07]) + '], '
	cMessage += "Valor atribuído: "            + ' [' + cValToChar(aErro[08]) + '], '
	cMessage += "Valor anterior: "             + ' [' + cValToChar(aErro[09]) + ']'

	//Mostra mensagem de erro
	lRet := .F.
	ConOut("Erro: " + cMessage)
Else
	lRet := .T.
	ConOut("Produto incluido!")
EndIf

//Desativa o modelo de dados
oModel:DeActivate()
```

## Exemplo 2- Excluindo um produto

```advpl
//Pegando o modelo de dados, setando os campos
oModel := FWLoadModel("MATA010")
aFields := {}
aAdd(aFields, {"B1_COD", cCod, Nil})

//Se conseguir executar a operação automática
If FWMVCRotAuto(oModel, "SB1", 5, {{"SB1MASTER", aFields}} ,,.T.)
	lOk := .T.

Else
	lOk := .F.
EndIf

//Se não deu certo a inclusão, mostra a mensagem de erro
If ! lOk
	//Busca o Erro do Modelo de Dados
	aErro := oModel:GetErrorMessage()

	//Monta o Texto que será mostrado na tela
	cMessage := "Id do formulário de origem:"  + ' [' + cValToChar(aErro[01]) + '], '
	cMessage += "Id do campo de origem: "      + ' [' + cValToChar(aErro[02]) + '], '
	cMessage += "Id do formulário de erro: "   + ' [' + cValToChar(aErro[03]) + '], '
	cMessage += "Id do campo de erro: "        + ' [' + cValToChar(aErro[04]) + '], '
	cMessage += "Id do erro: "                 + ' [' + cValToChar(aErro[05]) + '], '
	cMessage += "Mensagem do erro: "           + ' [' + cValToChar(aErro[06]) + '], '
	cMessage += "Mensagem da solução: "        + ' [' + cValToChar(aErro[07]) + '], '
	cMessage += "Valor atribuído: "            + ' [' + cValToChar(aErro[08]) + '], '
	cMessage += "Valor anterior: "             + ' [' + cValToChar(aErro[09]) + ']'

	//Mostra mensagem de erro
	lRet := .F.
	ConOut("Erro: " + cMessage)

Else
	lRet := .T.
	ConOut("Produto excluido")
EndIf

//Desativa o modelo de dados
oModel:DeActivate()
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Rotina automática do cadastro de Produtos em MVC
