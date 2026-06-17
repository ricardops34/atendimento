---
title: "FwRestArea"
function_name: "FwRestArea"
doc_type: "function"
status: "published"
page_id: 691451220
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=691451220"
tdn_last_modified: "06 jun, 2022"
exported_at: "2026-06-03 09:58:47"
has_parameters: false
has_example: false
section_keys: [conte_do]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FwRestArea

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=691451220

## ConteÃºdo

Sintaxe
FwRestArea( <aArea> )

Propósito
Restaura um ambiente salvo anteriormente pela função FwGetArea().

Argumentos
< aArea >

Array no qual as informações do ambiente foram salvas pela função FwGetArea().
Contém as seguintes informações que serão restauradas:

Alias()
IndexOrd()
Recno()

Utilização
A última área restaurada pela função FwRestArea() é a área que ficará ativa para a aplicação.

Exemplos
Suponhamos que o ambiente ativo seja do alias SA1, índice 1 e registro 345. Vejamos o exemplo abaixo:

Local aAreaAnt := FwRestArea()

dbSelectArea(“SC5”)
SC5->(dbSetOrder(2))

<instruções do processamento>

FwRestArea(aAreaAnt)   // Retorna o ambiente anterior. Ou seja, as informações do alias SA1.
Return Nil
