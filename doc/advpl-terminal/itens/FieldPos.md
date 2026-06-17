---
title: "FieldPos"
function_name: "FieldPos"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/fieldpos/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:58"
---

# FieldPos

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fieldpos/

## Exemplo da Rotina

```advpl
FieldPos(cCampo)
```

## Exemplo 1- Verifica se um campo customizado existe na tabela

```advpl
If FieldPos("A2_X_CAMPO") > 0
	Alert("O campo tem o valor de " + SA2->A2_X_CAMPO)
Else
	Alert("Campo não encontrado")
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Retorna a posição do campo de uma tabela
