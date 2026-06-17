---
title: "AddMashupAlias()"
function_name: "AddMashupAlias"
doc_type: "function"
status: "published"
page_id: 285640286
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=285640286"
tdn_last_modified: "21 jul, 2017"
exported_at: "2026-06-03 09:58:29"
has_parameters: true
has_example: true
section_keys: [descricao, compatibilidade_banco, sistemas_operacionais, idioma, sintaxe, parametros, retorno, exemplo, programa_fonte]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# AddMashupAlias()

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=285640286

## Descrição

A função tem o objetivo de alterar o uso da consulta Mashup para uma determinada área(s) de trabalho.
Essa função deve ser usada pela equipe do produto quando uma tela possui vários cadastros na mesma interface ou quando a rotina modificar a área no momento da consulta do Mashup.
A função deve ser executada no inicio do cadastro, indicando quais as áreas estarão disponíveis para a execução do Mashup.
Caso não seja utilizada a função, como padrão será a área corrente no momento da execução do Mashup.

## Compatível com as Bases de Dados

Todas

## Sistemas Operacionais Suportados

Todos

## Idioma

Português(Brasil)

## Sintaxe

```text
AddMashupAlias( aAreas )
```

## Parâmetros

aAreas = (Array): Deve ser informado uma lista de área(s) de trabalho ex. {"SA1","SA2","SB1"}

## Retorno

A função não possui retorno.

## Exemplo

```text
/*
O exemplo mostra a inclusão das áreas SA1,SA2,SB1 no cadastro de produtos por ponto de entrada apenas como exemplo.
Para a inclusão de novas áreas de trabalho ao Mashup, deve ser solicitado ao Dono do Produto correspondente a inclusão da função.
*/
#include "protheus.ch"
user function MT010MEM()
AddMashupAlias({"SA1","SA2","SB1"})
Return
```

## Programa Fonte

apcfg10l.prw
