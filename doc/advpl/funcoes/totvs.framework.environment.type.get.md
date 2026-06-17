---
title: "totvs.framework.environment.type.get"
function_name: "totvs"
doc_type: "function"
status: "published"
page_id: 969122503
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=969122503"
tdn_last_modified: "22 jul, 2025"
exported_at: "2026-06-03 09:59:02"
has_parameters: false
has_example: true
section_keys: [sintaxe, retorno, exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# totvs.framework.environment.type.get

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=969122503

## Sintaxe

```text
totvs.framework.environment.type.get() → cType
```

## Retorno

cType → Character, Tipo de ambiente, o retorno pode ser vazio caso ainda não esteja definido e 1 para produção, 2 para homologação e 3 para desenvolvimento.

## Exemplo

```text
local cTypeEnv as character

cTypeEnv := totvs.framework.environment.type.get()

if cTypeEnv == "1"
	MsgInfo("Estou em produção", "Framework")
elseif cTypeEnv == "2"
	MsgInfo("Estou em homologação", "Framework")
elseif cTypeEnv == "3"
 	MsgInfo("Estou em desenvolvimento", "Framework")
elseif Empty(cTypeEnv)
	MsgInfo("Tipo de ambiente não informado", "Framework")
else
 	MsgStop("Tipo de ambiente inválido", "Framework")
endif

Observação:
Função disponível na lib 20250811 ou superior.

Demais informações:
Configuração do tipo de ambiente do Protheus
```
