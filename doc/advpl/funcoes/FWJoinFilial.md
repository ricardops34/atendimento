---
title: "FWJoinFilial"
function_name: "FWJoinFilial"
doc_type: "function"
status: "published"
page_id: 725744304
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=725744304"
tdn_last_modified: "04 abr, 2023"
exported_at: "2026-06-03 09:58:42"
has_parameters: false
has_example: false
section_keys: [nome, calias1, calias2, ctbalias1, ctbalias2, lprefixo, cdbms, lfilcompjoin, sintaxe]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# FWJoinFilial

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=725744304

## Nome

Tipo

## cAlias1

Caractere

## cAlias2

Caractere

## cTbAlias1

Caractere

## cTbAlias2

Caractere

## lPrefixo

Lógico

## cDbMs

Caractere

## lFilCompJoin

Lógico

## Sintaxe

```text
FwJoinFilial(cAlias1, cAlias2) → string

Exemplo de uso - Embedded SQL
local cAlias as character
local cJoin as character

cAlias := GetNextAlias()
cJoin := "%" + FWJoinFilial("SRA", "SRC") + "%"

BEGINSQL ALIAS cAlias
    SELECT
        SRA.RA_FILIAL,
        SRA.RA_MAT,
        SRC.RC_PD,
        SRC.RC_VALOR
    FROM
        %table:SRA% SRA
    INNER JOIN  %table:SRC% SRC ON
        SRA.RA_MAT = SRC.RC_MAT AND
        %exp:cJoin%
    WHERE
        SRA.RA_MAT = '000001' AND
        SRA.RA_FILIAL = 'E01U01F01'
ENDSQLExemplo de uso - MPSysOpenQuery
local cAlias as character
local cJoin as character
local cQuery as character

cJoin := FWJoinFilial("SRA", "SRC")

cQuery := "SELECT "
cQuery += "     SRA.RA_FILIAL, "
cQuery += "     SRA.RA_MAT, "
cQuery += "     SRC.RC_PD, "
cQuery += "     SRC.RC_VALOR "
cQuery += " FROM "
cQuery += "     " + RetSqlName("SRA") + " SRA "
cQuery += " INNER JOIN " + RetSqlName("SRC") + " SRC ON "
cQuery += "     SRA.RA_MAT = SRC.RC_MAT AND "
cQuery += FWJoinFilial("SRA", "SRC")
cQuery += " WHERE "
cQuery += "     SRA.RA_MAT = '000001' AND "
cQuery += "     SRA.RA_FILIAL = 'E01U01F01' "

cAlias := MPSysOpenQuery(cQuery)
```
