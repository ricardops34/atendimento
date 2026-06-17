---
title: "SaveInter"
function_name: "SaveInter"
doc_type: "function"
status: "published"
page_id: 1037984360
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=1037984360"
tdn_last_modified: "29 jan, 2026"
exported_at: "2026-06-03 09:59:01"
has_parameters: false
has_example: false
section_keys: [conte_do]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# SaveInter

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=1037984360

## ConteÃºdo

Sintaxe
SaveInter()

Propósito
Salva o estados das variáveis públicas/privadas do Protheus.

Argumentos
Nenhum.

Utilização
Essa função é utilizada para salvar as informações das seguintes variáveis:
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
MV_PARXX (onde XX pode ser de 01 a 60)

Exemplos
Suponhamos que haja a necessidade de salvar as informações preenchidas em uma tela de pergunta, porém, logo após a primeira tela de pergunta, existe uma segunda tela de pergunta. Vejamos o exemplo abaixo:
#include "protheus.ch"

User Function TstInter()
    Pergunte("MTR015", .T.)

    SaveInter() // Salva os valores informados na pergunta "MTR015" nas variáveis MV_PAR

    Pergunte("MTR126", .T.)

    Conout("MV_PAR01 antes do RestInter: ", MV_PAR01)
    RestInter() // Altera os valores das variáveis MV_PAR conforme foram salvas anteriormente
    Conout("MV_PAR01 depois do RestInter: ", MV_PAR01)

Return .T.

Para utilizar os valores que foram salvos pela função SaveInter, é necessário chamar a função RestInter.
