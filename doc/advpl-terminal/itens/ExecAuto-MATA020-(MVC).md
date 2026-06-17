---
title: "ExecAuto MATA020 (MVC)"
function_name: "ExecAuto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "rotinas-automaticas"
source_url: "https://terminaldeinformacao.com/knowledgebase/execauto-mata020-mvc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:33"
---

# ExecAuto MATA020 (MVC)

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/execauto-mata020-mvc/

## Exemplo da Rotina

```advpl
oModel := FWLoadModel("MATA020M")
oModel:SetOperation(3)
oModel:Activate()

oSA2Mod:= oModel:getModel("SA2MASTER")
...

oModel:VldData()
oModel:CommitData()
```

## Exemplo 1- Criando Fornecedor

```advpl
lDeuCerto := .F.

//Pegando o modelo de dados, setando a operação de inclusão
oModel := FWLoadModel("MATA020M")
oModel:SetOperation(3)
oModel:Activate()

//Pegando o model dos campos da SA2
oSA2Mod:= oModel:getModel("SA2MASTER")
oSA2Mod:setValue("A2_COD",       cCod        ) // Codigo
oSA2Mod:setValue("A2_LOJA",      cLoja       ) // Loja
oSA2Mod:setValue("A2_NOME",      cNome       ) // Nome
oSA2Mod:setValue("A2_NREDUZ",    cNomeFant   ) // Nome reduz.
oSA2Mod:setValue("A2_END",       cEndereco   ) // Endereco
oSA2Mod:setValue("A2_BAIRRO",    cBairro     ) // Bairro
oSA2Mod:setValue("A2_TIPO",      cTp         ) // Tipo
oSA2Mod:setValue("A2_EST",       cEST        ) // Estado
oSA2Mod:setValue("A2_COD_MUN",   cCodMun     ) // Codigo Municipio
oSA2Mod:setValue("A2_MUN",       cDescMun    ) // Municipio
oSA2Mod:setValue("A2_CEP",       cCep        ) // CEP
oSA2Mod:setValue("A2_INSCR",     cIE         ) // Inscricao Estadual
oSA2Mod:setValue("A2_CGC",       cCNPJ       ) // CNPJ/CPF
oSA2Mod:setValue("A2_PAIS",      cCodPais    ) // Pais
oSA2Mod:setValue("A2_EMAIL",     cEMail      ) // E-Mail
oSA2Mod:setValue("A2_DDD",       cDDD        ) // DDD
oSA2Mod:setValue("A2_TEL",       cTelefone   ) // Fone
oSA2Mod:setValue("A2_FAX",       cFax        ) // FAX
oSA2Mod:setValue("A2_TPESSOA",   cTipPessoa  ) // Tipo Pessoa
oSA2Mod:setValue("A2_CODPAIS",   cPaisBac    ) // Pais Bacen
oSA2Mod:setValue("A2_MSBLQL",    cBlqSA      ) // Bloqueado

//Se conseguir validar as informações
If oModel:VldData()

	//Tenta realizar o Commit
	If oModel:CommitData()
		lDeuCerto := .T.

	//Se não deu certo, altera a variável para false
	Else
		lDeuCerto := .F.
	EndIf

//Se não conseguir validar as informações, altera a variável para false
Else
	lDeuCerto := .F.
EndIf

//Se não deu certo a inclusão, mostra a mensagem de erro
If ! lDeuCerto
	//Busca o Erro do Modelo de Dados
	aErro := oModel:GetErrorMessage()

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
oModel:DeActivate()
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

– Exemplo criado conforme dica enviada por Sergio Passerini

## Resumo

Rotina automática do cadastro de Fornecedores (em MVC)
