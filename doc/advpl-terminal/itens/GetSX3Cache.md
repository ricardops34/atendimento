---
title: "GetSX3Cache"
function_name: "GetSX3Cache"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/getsx3cache/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:49"
---

# GetSX3Cache

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/getsx3cache/

## Exemplo da Rotina

```advpl
GetSX3Cache([Campo do dicionário procurado], [Campo da SX3])
```

## Exemplo 1- Buscando o tipo do campo B1_COD

```advpl
cTipo := GetSX3Cache("B1_COD", "X3_TIPO")
Alert("Tipo: " + cTipo)
```

## Exemplo 2- Buscando a pasta do campo B1_COD

```advpl
cPasta := GetSX3Cache("B1_COD", "X3_FOLDER")
Alert("Pasta: " + cPasta)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Retorna um conteúdo da SX3 referente a um campo
