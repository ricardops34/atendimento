---
title: "WModeAccess - Retorna o modo de compartilhamento"
function_name: "WModeAccess"
doc_type: "function"
status: "published"
page_id: 312155906
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=312155906"
tdn_last_modified: "10 nov, 2017"
exported_at: "2026-06-03 09:58:43"
has_parameters: true
has_example: false
section_keys: [linha_de_produto, parametros, pa_s_es, banco_s_de_dados, sistema_s_operacional_is, programa_fonte, sintaxe, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# WModeAccess - Retorna o modo de compartilhamento

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=312155906

## Linha de Produto

Protheus

## Parâmetro(s)

Nome
Tipo
Descrição
Default
Obrigatório
Referência

cAlias
Caracter
Indica o alias em que o modo de compartilhamento deve ser avaliado
Alias()

nLevel
Array of Record
Indica o nível a ser avaliado (1=Empresa, 2=Unidade de Negócio e 3=Filial)
3

cGrpCompany
Array of Record
Indica o grupo de empresas que deverá ser verificado
cEmpAnt

## País(es)

Todos

## Banco(s) de Dados

Todos

## Sistema(s) Operacional(is)

Todos

## Programa Fonte

FWFilial

## Sintaxe

```text
FWModeAccess - Retorna o modo de compartilhamento ( [ cAlias ] [ nLevel ] [ cGrpCompany ] ) --> cMode
```

## Retorno

cMode(caracter)
Indica o modo de compartilhamento da tabela.
Exemplos:cCompEmp := FWModeAccess("SA1",1)
