---
title: "AmIIn"
function_name: "AmIIn"
doc_type: "function"
status: "published"
page_id: 555856401
source_url: "https://tdn.totvs.com/pages/releaseview.action?pageId=555856401"
tdn_last_modified: "23 jul, 2025"
exported_at: "2026-06-03 09:58:29"
has_parameters: false
has_example: false
section_keys: [sintaxe, retorno]
tags:
- "advpl"
- "tdn"
- "totvs"
- "function"
---

# AmIIn

> Fonte oficial: https://tdn.totvs.com/pages/releaseview.action?pageId=555856401

## Sintaxe

```text
AMIIn(nMd01, nMd02, ...nMd20) -> lRet
Parâmetros:
nMd{nn} => Número do Módulo a ser verificado
```

## Retorno

Logical → Verdadeiro se a função está sendo chamada de algum dos módulos passado nos parâmetros.

Exemplo trava simples
lRet := AmIIn(5)  // valida se está no módulo do faturamento

lRet := AmIIn(12,23)  // valida se está em algum dos módulos sigaloja ou sigafrt

Bloqueio avançado:
Existe a possibilidade de tornar esta validação um pouco mais restritiva com o uso da função FwBlkUserFunction. Essa função habilita a restrição para que funções que utilizam a trava com AmIIn não possam ser encapsuladas dentro de funções de usuário e inseridas no menu de outros módulos.
Com isso este recurso habilitado a validação também é feita considerando o módulo logado pelo usuário e não o módulo associado com o programa no menu.
O exemplo de programa a seguir não permite a chamada do programa fora do menu do Ativo Fixo mesmo que esteja encapsulado por user function.
O bloqueio não valida a pilha de execução, logo será executado em menu, msexecauto, browse, job, schedule, rest, soap etc.
AmIIn / bloqueia encapsulamento
// programa padrão
function xyzMenu()
  local lMenuAllowed as logical

  FwBlkUserFunction(.T.)
  lMenuAllowed := AmIIn(1)  // exemplo com Ativo Fixo
  FwBlkUserFunction(.F.)

  if !lMenuAllowed
	// cancela o processamento do programa
	return
  endif

 // segue o processamento
 // ...
returnEsse bloqueio do encapsulamento por funções de usuário está disponível nas libs com label a partir de 20200727.
