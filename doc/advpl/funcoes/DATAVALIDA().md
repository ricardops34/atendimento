---
title: "DATAVALIDA()"
function_name: "DATAVALIDA"
doc_type: "function"
status: "published"
page_id: 224132661
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=224132661"
tdn_last_modified: "15 fev, 2016"
exported_at: "2026-06-03 09:59:04"
has_parameters: true
has_example: true
section_keys: [descricao, compatibilidade_banco, sistemas_operacionais, idioma, sintaxe, parametros, retorno, observacoes, exemplo, programa_fonte]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# DATAVALIDA()

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=224132661

## Descrição

Função que retorna uma data válida, a partir de uma data qualquer informada.

## Compatível com as Bases de Dados

Todas

## Sistemas Operacionais Suportados

Todos

## Idioma

Português(Brasil)

## Sintaxe

```text
dDataVal:=DataValida( [ dData], [ lTipo] )
```

## Parâmetros

dData (Data) - Data para iniciar o cálculo da função.
lTipo (Lógico) - Se .T. posterga a data recebida para o próximo dia útil. - Se .F. retrocede a data recebida para o dia útil anterior.

## Retorno

dDataVal (Data) - Data válida do sistema.

## Observações

A função irá considerar as datas encontradas na tabela 63 do SX5 (Tabela de Feriados), os sábados (caso o parâmetro MV_SABFERI seja igual a "S") e os domingos como sendo feriados, retornando assim a próxima data válida.
O cadastro na tabela 63 deve seguir o exemplo abaixo:
Feriado fixo: 25/12 Natal (1ª e 2ª posição DIA, 4ª e 5ª posição MÊS)
Feriado móvel: 09/02/16 Carnaval (1ª e 2ª posição DIA, 4ª e 5ª posição MÊS, 7ª e 8ª ANO)

## Exemplo

```text
#include "protheus.ch"
User Function DataValida()
Local dData := CTOD("14/11/09")L
ocal lNext := .T.
Local dNewData := DataValida(dData, lNext)
ApMsgAlert("Proxima data válida será: "+ Dtoc(dNewData)+ ' - ' +DiaExtenso(dNewData))
Return
```

## Programa Fonte

DATAVALI.PRG
