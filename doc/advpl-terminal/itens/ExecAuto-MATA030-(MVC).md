---
title: "ExecAuto MATA030 (MVC)"
function_name: "ExecAuto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "rotinas-automaticas"
source_url: "https://terminaldeinformacao.com/knowledgebase/execauto-mata030-mvc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:35"
---

# ExecAuto MATA030 (MVC)

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/execauto-mata030-mvc/

## Exemplo da Rotina

```advpl
oModel := FWLoadModel("CRMA980") //"MATA030" na antiga MATA030
oModel:SetOperation(3)
oModel:Activate()

oSA1Mod:= oModel:getModel("SA1MASTER") //"MATA030_SA1" na antiga MATA030
...

oModel:VldData()
oModel:CommitData()
```

## Exemplo 1- Criando Cliente

```advpl
lDeuCerto := .F.

//Pegando o modelo de dados, setando a operação de inclusão
oModel := FWLoadModel("CRMA980") //"MATA030" na antiga MATA030
oModel:SetOperation(3)
oModel:Activate()

//Pegando o model dos campos da SA1
oSA1Mod:= oModel:getModel("SA1MASTER") //"MATA030_SA1" na antiga MATA030
oSA1Mod:setValue("A1_COD",       cCod        ) // Codigo
oSA1Mod:setValue("A1_LOJA",      cLoja       ) // Loja
oSA1Mod:setValue("A1_NOME",      cNome       ) // Nome
oSA1Mod:setValue("A1_NREDUZ",    cNomeFant   ) // Nome reduz.
oSA1Mod:setValue("A1_END",       cEndereco   ) // Endereco
oSA1Mod:setValue("A1_BAIRRO",    cBairro     ) // Bairro
oSA1Mod:setValue("A1_TIPO",      cTp         ) // Tipo
oSA1Mod:setValue("A1_EST",       cEST        ) // Estado
oSA1Mod:setValue("A1_COD_MUN",   cCodMun     ) // Codigo Municipio
oSA1Mod:setValue("A1_MUN",       cDescMun    ) // Municipio
oSA1Mod:setValue("A1_CEP",       cCep        ) // CEP
oSA1Mod:setValue("A1_INSCR",     cIE         ) // Inscricao Estadual
oSA1Mod:setValue("A1_CGC",       cCNPJ       ) // CNPJ/CPF
oSA1Mod:setValue("A1_PAIS",      cCodPais    ) // Pais
oSA1Mod:setValue("A1_EMAIL",     cEMail      ) // E-Mail
oSA1Mod:setValue("A1_DDD",       cDDD        ) // DDD
oSA1Mod:setValue("A1_TEL",       cTelefone   ) // Fone
oSA1Mod:setValue("A1_PESSOA",    cTipPessoa  ) // Tipo Pessoa

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

– Esse exemplo foi atualizado, pois a MATA030 foi descontinuada, sendo substituída pela CRMA980

## Resumo

Rotina automática do cadastro de Clientes (em MVC)
