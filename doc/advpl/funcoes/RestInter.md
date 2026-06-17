---
title: "RestInter"
function_name: "RestInter"
doc_type: "function"
status: "published"
page_id: 1037984363
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=1037984363"
tdn_last_modified: "29 jan, 2026"
exported_at: "2026-06-03 09:59:00"
has_parameters: false
has_example: false
section_keys: [conte_do]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# RestInter

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=1037984363

## ConteÃºdo

Sintaxe
RestInter()

Propósito
Restaura o estados das variáveis públicas/privadas do Protheus.

Argumentos
Nenhum.

Utilização
Essa função é utilizada para restaurar as informações das seguintes variáveis:
aCols
aCpoRet
aGets
aHeader
aMemos
aPergunta
aRetBan
aRotina
aTela
cCadastro
ALTERA
DELETA
INCLUI
MV_PAR (onde XX pode ser de 01 a 60)

Exemplos
Caso seja necessário retornar as informações que foram salvas da primeira pergunta (MTR015) nas variáveis MV_PAR, é possível utilizar a função RestInter() e restaurar os valores que foram salvos (mesmo após outra pergunta feita). Vejamos o exemplo abaixo:
#include "protheus.ch"

User Function TstInter()
    Pergunte("MTR015", .T.)

    SaveInter() // Salva os valores informados na pergunta "MTR015" nas variáveis MV_PAR

    Pergunte("MTR126", .T.)

    Conout("MV_PAR01 antes do RestInter: ", MV_PAR01)
    RestInter() // Altera os valores das variáveis MV_PAR conforme foram salvas anteriormente
    Conout("MV_PAR01 depois do RestInter: ", MV_PAR01)

Return .T.

Para utilizar a função RestInter, é necessário salvar as informações das variáveis utilizando a função SaveInter.
