---
title: "OLE_CreateLink"
function_name: "OLE_CreateLink"
doc_type: "function"
status: "published"
page_id: 239014970
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=239014970"
tdn_last_modified: "07 jun, 2016"
exported_at: "2026-06-03 09:58:58"
has_parameters: true
has_example: false
section_keys: [descricao, sintaxe, parametros, retorno, sistemas_operacionais, programa_fonte, chamados_relacionados]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# OLE_CreateLink

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=239014970

## Descrição

Realiza a conexão entre o Protheus SmartClient e a aplicação MS-Office (Word), para impressão de conteúdos que utilizam a funcionalidade de integração entre o Microsiga Protheus e o pacote Microsoft Office.

## Sintaxe

```text
OLE_CreateLink ( < cOLETypeLink >, < cOnError >, < lCabec > ) --> hOleLink
```

## Parâmetros

cOLETypeLink (caracter): String que representa a   conexão com MS Word. Utilize como padrão o valor TMsOleWord97.
cOnError (caracter): uso interno
lCabec (Lógico): Permite habilitar/desabilitar   o suporte a campos variáveis (DocumentVar) no cabeçalho e rodapé do   documento.

## Retorno

hOleLink (numerico): Handle relativo a conexão entre o SmartClient e a aplicação MS-Office. O valor retornado será 0, caso a integração com o MS Word foi iniciada com sucesso, ou -1 caso qualquer erro tenha ocorrido.

## Sistemas Operacionais Suportados

Windows

## Programa Fonte

MsOle.prw

## Chamados relacionados

TUUAER
