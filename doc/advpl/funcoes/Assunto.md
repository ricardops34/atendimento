---
title: "Assunto"
function_name: "Assunto"
doc_type: "function"
status: "published"
page_id: 297929359
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=297929359"
tdn_last_modified: "26 set, 2017"
exported_at: "2026-06-03 09:58:53"
has_parameters: false
has_example: true
section_keys: [produto, fun_o, programa_fonte, sintaxe, retorno, exemplo]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# Assunto

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=297929359

## Produto

Microsiga Protheus

## Função

i18n()

## Programa fonte

i18n.prw

## Sintaxe

```text
i18n(cTranslation,aToken)

Parâmetros:
Param.DescriçãoObrigatório
cTranslationTexto com as tags de tradução (#n)Sim
aTokenArray com o texto que será utilizado no local da tagSim
```

## Retorno

cTextoTexto com as tags trocadas

## Exemplo

```text
I18N("A casa é do #1[João]#",{"Edu"})
//Retorno: A casa é do Edu
//Nota: Note que João é uma dica para a equipe de tradução saber a variação do texto.

I18N("A casa é do #1",{"João"})
//Retorno: A casa é do João
```
