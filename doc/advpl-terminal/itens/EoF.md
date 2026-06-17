---
title: "EoF"
function_name: "EoF"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/eof/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:13:21"
---

# EoF

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/eof/

## Exemplo da Rotina

```advpl
ALIAS->(EoF())
```

## Exemplo 1- Verifica se um alias está no fim

```advpl
If ALIAS->(EoF())
	Alert("Não foi encontrado dados!")
EndIf
```

## Exemplo 2- Faz um loop percorrendo todos os registros de um alias

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

Verifica se um alias se encontra no fim do arquivo
