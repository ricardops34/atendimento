---
title: "FWIsInCallStack"
function_name: "FWIsInCallStack"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "funcoes-de-validacao"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwisincallstack/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:18"
---

# FWIsInCallStack

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwisincallstack/

## Exemplo da Rotina

```advpl
FWIsInCallStack([Sua Função])
```

## Exemplo 1- Testando se está sendo chamado por uma User Function

```advpl
If FWIsInCallStack("U_zFuncao")
	Alert("Está na pilha de chamadas da u_zFuncao")
EndIf
```

## Exemplo 2- Testando se está sendo chamado dentro de uma função padrão (nesse caso, documento de entrada)

```advpl
If FWIsInCallStack("a103procPC") .And. FWIsInCallStack("MATA103")
	//...
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Verifica se está em uma pilha de chamadas determinada função
