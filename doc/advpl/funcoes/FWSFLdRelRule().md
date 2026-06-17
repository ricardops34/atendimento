---
title: "FWSFLdRelRule()"
function_name: "FWSFLdRelRule"
doc_type: "function"
status: "published"
page_id: 272427688
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=272427688"
tdn_last_modified: "15 jun, 2020"
exported_at: "2026-06-03 09:58:49"
has_parameters: true
has_example: true
section_keys: [descricao, compatibilidade_banco, sistemas_operacionais, idioma, sintaxe, parametros, retorno, exemplo, programa_fonte]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FWSFLdRelRule()

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=272427688

## Descrição

Esta função retorna os dados do relacionamento das regra de acesso com os usuário do sistema extraídos
do arquivo de senhas ( SUPERFILE ).

Obs.: O arquivo SUPERFILE em questão é o SIGAPSS.SPF, que não existe mais em ambientes com dicionário no banco. Por essa razão, esta função é de uso exclusivo em ambientes com dicionario em arquivo.
No ambiente com dicionário no banco, essas informações foram normalizadas em tabelas internas e tiveram uma significativa mudança estrutural e por este motivo não houve a portabilidade dessa função.

## Compatível com as Bases de Dados

Apenas com dicionário em arquivo.

## Sistemas Operacionais Suportados

Todos

## Idioma

Português(Brasil)

## Sintaxe

```text
aRule :=FWSFLdRelRule(xSeek)
```

## Parâmetros

Id ou RecNo de identificaão do usuário

## Retorno

aRule Array com o relacionamento da regra de acesso e o usuário
O array tem o seguinte formato:
[1] RecNo da tabela
[2] Id do Usuário
[3] XML

## Exemplo

```text
#include "protheus.ch"
User Function FWSFLdRelRule()
Local nRecno := 1
Varinfo("FWSFLdRelRule", FWSFLdRelRule( nRecno ) )
Return
```

## Programa Fonte

SIGAPSW.PRG
