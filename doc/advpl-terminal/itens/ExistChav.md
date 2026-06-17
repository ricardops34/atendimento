---
title: "ExistChav"
function_name: "ExistChav"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "funcoes-de-validacao"
source_url: "https://terminaldeinformacao.com/knowledgebase/existchav/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:13:38"
---

# ExistChav

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/existchav/

## Exemplo da Rotina

```advpl
ExistChav("Alias", "Chave")
```

## Exemplo 1- Verificando se o código do cliente já existe conforme campos da memória na SA1

```advpl
ExistChav("SA1", M->A1_COD + M->A1_LOJA)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Valida se existe um registro na mesma tabela
