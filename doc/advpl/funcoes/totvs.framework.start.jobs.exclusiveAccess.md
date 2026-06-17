---
title: "totvs.framework.start.jobs.exclusiveAccess"
function_name: "totvs"
doc_type: "function"
status: "published"
page_id: 927556330
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=927556330"
tdn_last_modified: "25 mar, 2025"
exported_at: "2026-06-03 09:59:03"
has_parameters: true
has_example: false
section_keys: [parametros, sintaxe]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# totvs.framework.start.jobs.exclusiveAccess

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=927556330

## ParÃ¢metros

| Nome | Tipo | DescriÃ§Ã£o | ObrigatÃ³rio |
| --- | --- | --- | --- |
| lWait | Logical | Indica se irá aguardar a finalização dos jobs resiliente | .T. |
| lKillDataSharing | Logical | Indica se irá derrubar o job de data sharing | .T. |
| lKillBehaviourSharing | Logical | Indica se irá derrubar o job de behaviour sharing | .F. |
| lExclusive | Logical | Indica que irá solicitar o acesso exclusivo ao SM0 | .T. |
| lOpen | Logical | Parâmetro enviado como referência para verificar se foi possível a abertura da SM0 de acordo com o parâmetro lExclusive | N |

## Sintaxe

```text
totvs.framework.start.jobs.exclusiveAccess(lWait, lKillDataSharing, lKillBehaviourSharing, lExclusive, @lOpenSM0)
Parâmetros:
NomeTipoDescriçãoDefaultObrigatórioObservação
lWaitLogicalIndica se irá aguardar a finalização dos jobs resiliente.T.

lKillDataSharingLogicalIndica se irá derrubar o job de data sharing.T.

lKillBehaviourSharingLogicalIndica se irá derrubar o job de behaviour sharing.F.
A utilização desse parâmetro é por conta e risco do utilizador, já que pode encerrar um processo que não possui um retry de descida de dados.
lExclusiveLogicalIndica que irá solicitar o acesso exclusivo ao SM0.T.
Caso não seja solicitado o acesso exclusivo o acesso compartilhado será utilizado para a verificação.
lOpenLogicalParâmetro enviado como referência para verificar se foi possível a abertura da SM0 de acordo com o parâmetro lExclusive
XO parâmetro somente será atualizado com o resultado de tentativa de abertura da SM0 quando o parâmetro lWait estiver em uso.

Código:
Exemplo
#include "protheus.ch"

function callExclusiveAccess()
    local lOpenSM0 as logical

    totvs.framework.start.jobs.exclusiveAccess(,,,,@lOpenSM0)
	// Processo após a solicitação do acesso para os jobs resilientes
    totvs.framework.start.jobs.startThreads() // Habilita a execução dos jobs resilientes
returnA função totvs.framework.start.jobs.startThreads() não possui parâmetros e é utilizada para avisar que os jobs resilientes já podem ser chamados novamente.

Caso a função totvs.framework.start.jobs.startThreads() não seja chamada após a finalização da execução isso é realizado automaticamente no próximo login no ambiente.
```
