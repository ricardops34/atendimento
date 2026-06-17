---
title: "MsDocument"
function_name: "MsDocument"
doc_type: "function"
status: "published"
page_id: 274632224
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=274632224"
tdn_last_modified: "22 mai, 2017"
exported_at: "2026-06-03 09:58:57"
has_parameters: true
has_example: true
section_keys: [descricao, compatibilidade_banco, sistemas_operacionais, idioma, sintaxe, parametros, retorno, exemplo, programa_fonte]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# MsDocument

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=274632224

## Descrição

Amarração de Entidades x Documentos (utilizada principalmente no Banco de Conhecimento do Protheus)

## Compatível com as bases de dados

Todas

## Sistemas Operacionais Suportados

Todos

## Idioma

Português(Brasil)

## Sintaxe

```text
MsDocument(cAlias, nReg, nOpc, xVar, nOper, aRecACB , lExcelConnect)
```

## Parâmetros

ExpC1 -> Entidade
ExpN1 -> Registro
ExpN2 -> Opção
ExpX1 -> Sem Função
ExpN5 -> Tipo de Operação
ExpA6 -> Array de referência retorno dos anexos (Recno)
ExpL7 -> Flag que indica se abre as planilhas Excel conectadas ao Protheus

## Retorno

Lógico (.T. ou .F.)

## Exemplo

```text
Aadd(aEntRelac,{STR0014,"MsDocument('SA1',SA1->(RecNo()), 4)", 0, 4,0,NIL})
```

## Programa Fonte

MATXFUNC.PRX
