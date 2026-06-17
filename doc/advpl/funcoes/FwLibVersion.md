---
title: "FwLibVersion"
function_name: "FwLibVersion"
doc_type: "function"
status: "published"
page_id: 454433740
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=454433740"
tdn_last_modified: "01 fev, 2019"
exported_at: "2026-06-03 09:58:42"
has_parameters: false
has_example: false
section_keys: [conte_do]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwLibVersion

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=454433740

## ConteÃºdo

Tempo aproximado para leitura: 02 min
Descrição
Função que retorna a versão da LIB (por exemplo: 20190131). Caso a versão seja anterior a 20170511, a função retornará uma string vazia.
Não é necessário FindFunction para esta função. Mas para usar a mesma é necessário utilizar o include de compilação fwlibversion.ch.

Sintaxe
FwLibVersion() →

Exemplo
#include 'protheus.ch'
#include 'fwlibversion.ch'

User Function MyTest()

Conout(FwLibVersion())//irá retornar a versão da LIB se ela for superior ao Label 20170511.

Return
