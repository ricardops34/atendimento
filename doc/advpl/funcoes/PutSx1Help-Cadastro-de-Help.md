---
title: "PutSx1Help - Cadastro de Help"
function_name: "PutSx1Help"
doc_type: "function"
status: "published"
page_id: 244740727
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=244740727"
tdn_last_modified: "17 ago, 2016"
exported_at: "2026-06-03 09:59:00"
has_parameters: false
has_example: false
section_keys: [linha_de_produto, m_dulo, fun_o, chamados_relacionados, vers_es, programa_fonte, sintaxe, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# PutSx1Help - Cadastro de Help

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=244740727

## Linha de Produto

PROTHEUS

## Módulo

SIGACFG

## Função

PUTSX1HELP.

## Chamados relacionados

TVOJ50

## Versões

Microsiga Protheus 8.11 , Protheus 10, Protheus 11

## Programa Fonte

SIGAHLP.PRW

## Sintaxe

```text
PutSx1Help - Cadastro de Help ( cKey [ aHelpPor ] [ aHelpEng ] [ aHelpSpa ] [ lUpdate ] [ cStatus ] )
```

## Retorno

Não há
Observações
cKey
A varíavel cKey deve ser composta pelas letras "P" ou "S" seguidos pelo nome do help
"P" -  utilizado para identificar que o texto do help se refere a um problema
"S" - utilizado para identificar que o texto do help se refere a uma solução.
aHelpPor, aHelpEng, aHelpSpa
Cada posição do array deve conter no máximo 40 caracteres

Função não disponivel no Protheus 12. Todas as alteações de dicionarios devem ser feitas via Configurador ou através do Release Incremental.

Parâmetros:

 Nome  Tipo  Descrição  Default  Obrigatório  Referência
 cKey  Caracter  Nome do help a ser cadastrado     X
 aHelpPor  Vetor  Array com o texto do help em Português  {}
 aHelpEng  Vetor  Array com o texto do help em Inglês  {}
 aHelpSpa  Vetor  Array com o texto do help em Espanhol  {}
 lUpdate  Lógico  Caso seja .T. e já existir um help com o mesmo nome, atualiza o registro. Se for .F. não atualiza  .T.
 cStatus  Caracter  Parâmetro reservado

Exemplos
#include "protheus.ch"
User Function IncHelp()
Local cKey := "PTESTE00"
Local aHelpPor := {}
Local aHelpSpa := {}
Local aHelpEng := {}
//Cadastra help de problema
AAdd(aHelpPor,"Cadastro de help de problema no arquivo")
AAdd(aHelpPor,"SIGAHLP.HLP (Arq. de Help do Protheus)")
AAdd(aHelpSpa,"Cadastro de help de problema no arquivo")
AAdd(aHelpSpa,"SIGAHLS.HLS (Arq. de Help do Protheus)")
AAdd(aHelpEng,"Cadastro de help de problema no arquivo")
AAdd(aHelpEng,"SIGAHLE.HLE (Arq. de Help do Protheus)")
PutSX1Help(cKey,aHelpPor,aHelpEng,aHelpSpa)
//Cadastra help de solução
cKey := "STESTE00"
aHelpPor := {}
aHelpSpa := {}
aHelpEng := {}
AAdd(aHelpPor,"Cadastro de help de solução no arquivo")
AAdd(aHelpPor,"SIGAHLP.HLP (Arq. de Help do Protheus)")
AAdd(aHelpSpa,"Cadastro de help de solução no arquivo")
AAdd(aHelpSpa,"SIGAHLS.HLS (Arq. de Help do Protheus)")
AAdd(aHelpEng,"Cadastro de help de solução no arquivo")
AAdd(aHelpEng,"SIGAHLE.HLE (Arq. de Help do Protheus)")
PutSX1Help(cKey,aHelpPor,aHelpEng,aHelpSpa)
Help(" ",1,"TESTE00")
Return
