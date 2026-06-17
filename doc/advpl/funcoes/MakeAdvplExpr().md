---
title: "MakeAdvplExpr()"
function_name: "MakeAdvplExpr"
doc_type: "function"
status: "published"
page_id: 235333170
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=235333170"
tdn_last_modified: "12 abr, 2016"
exported_at: "2026-06-03 09:59:04"
has_parameters: true
has_example: false
section_keys: [descricao, compatibilidade_banco, sistemas_operacionais, idioma, sintaxe, parametros, observacoes, programa_fonte, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# MakeAdvplExpr()

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=235333170

## Descrição

Função que transforma parâmetros do tipo Range em expressão ADVPL para ser utilizada no filtro.

## Compatível com as Bases de Dados

Todas

## Sistemas Operacionais Suportados

Todos

## Idioma

Português(Brasil)

## Sintaxe

```text
MakeAdvplExpr("MTR530")
```

## Parâmetros

MTR530 - Nome do grupo de perguntas

## Observações

A função vai transformar o conteúdo selecionado nas perguntas do tipo range em expressão ADVPL
Abaixo o conteúdo selecionado pelo usuário:

Abaixo o conteúdo atribuido ao mv_par01 para a montagem do filtro para a busca das filiais selecionadas pelo usuário
Mv_par01:= 'D MG 01,D MG 02,M SP 01,M SP 02'

## Programa Fonte

Mslib.prw

## Retorno

Observações:A função vai transformar o conteúdo selecionado nas perguntas do tipo range em expressão ADVPL
Abaixo o conteúdo selecionado pelo usuário:

Abaixo o conteúdo atribuido ao mv_par01 para a montagem do filtro para a busca das filiais selecionadas pelo usuário
Mv_par01:= 'D MG 01,D MG 02,M SP 01,M SP 02'
