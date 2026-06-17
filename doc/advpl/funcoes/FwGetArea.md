---
title: "FwGetArea"
function_name: "FwGetArea"
doc_type: "function"
status: "published"
page_id: 691451170
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=691451170"
tdn_last_modified: "06 jun, 2022"
exported_at: "2026-06-03 09:58:39"
has_parameters: false
has_example: false
section_keys: [conte_do]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwGetArea

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=691451170

## ConteÃºdo

Sintaxe
FwGetArea()

Propósito
Salva o ambiente ativo.

Argumentos
Nenhum.

Utilização
Essa função é utilizada para proteger e preservar o ambiente ativo quando houver a necessidade de algum processamento específico.
Para salvar outra área de trabalho (alias), que não a ativa, a função FwGetArea() deve ser executada dentro do alias. Por exemplo: SA1->(FwGetArea()).
A função retorna um array contendo as seguintes variáveis do ambiente:

Alias()
IndexOrd()
Recno()

Exemplos
Suponhamos que o ambiente ativo seja do alias SA1, índice 1 e registro 345. Vejamos o exemplo abaixo:
Local aAreaAnt := FwGetArea()

dbSelectArea(“SC5”)
dbSetOrder(2)

…

<instruções do processamento>

…

FwRestArea(aAreaAnt)   // Retorna o ambiente anterior

Return Nil

As funções GetArea e FwGetArea possuem a mesma funcionalidade, sendo recomendável priorizar o uso da FwGetArea por se tratar de uma função pertencente a Lib.
