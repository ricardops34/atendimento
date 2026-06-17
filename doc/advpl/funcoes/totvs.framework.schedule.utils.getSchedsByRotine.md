---
title: "totvs.framework.schedule.utils.getSchedsByRotine"
function_name: "totvs"
doc_type: "article"
status: "published"
page_id: 720350312
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=720350312"
tdn_last_modified: "01 nov, 2022"
exported_at: "2026-06-03 09:59:03"
has_parameters: false
has_example: false
section_keys: [conte_do]
tags:
- "advpl"
- "tdn"
- "totvs"
- "article"
---

# totvs.framework.schedule.utils.getSchedsByRotine

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=720350312

## ConteÃºdo

Disponibilidade
Disponível a partir da LIB Label 20221128
Função criada para retornar todos os ID's dos agendamentos que contenham a rotina passada por parâmetro.

Exemplo de uso:
user function schdbyrot()
    local aScheds as array
    local nX as numeric

    aScheds := totvs.framework.schedule.utils.getSchedsByRotine("MATR010")

    Conout("Agendamentos com a rotina MATR010: ")

    for nX := 1 To Len(aScheds)
        Conout(aScheds[nX])
    next nX
returnSintaxe: totvs.framework.schedule.utils.getSchedsByRotine(cRotine) → aScheds
Exemplo do retorno:
