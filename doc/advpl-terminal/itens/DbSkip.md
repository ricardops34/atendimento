---
title: "DbSkip"
function_name: "DbSkip"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/dbskip/"
has_examples: true
example_count: 3
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:13:18"
---

# DbSkip

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/dbskip/

## Exemplo da Rotina

```advpl
DbSkip()
```

## Exemplo 1- Pula um registro

```advpl
ALIAS->(DbSkip())
```

## Exemplo 2- Pula um registro de maneira inversa (voltando)

```advpl
ALIAS->(DbSkip(-1))
```

## Exemplo 3- Percorrendo um ALIAS pulando os registros

```advpl
While ! ALIAS->(EoF())

	Alert("Estou no registro " + ALIAS->CAMPO)

	ALIAS->(DbSkip())
EndDo
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Pula registro de um alias
