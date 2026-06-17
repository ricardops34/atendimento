---
title: "ArrTokStr"
function_name: "ArrTokStr"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/arrtokstr/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:11:59"
---

# ArrTokStr

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/arrtokstr/

## Exemplo da Rotina

```advpl
cDados := ArrTokStr(aDados)
```

## Exemplo 1- Quebrando um array simples em texto

```advpl
aNomes := {"Daniel", "Atilio", "Terminal de Informação"}
cNomes := ArrTokStr(aNomes) //Daniel|Atilio|Terminal de Informação
```

## Exemplo 2- Quebrando um array multidimensional em texto

```advpl
aNomes := {{"Daniel", "26"}, {"João", "60"}, {"Terminal", "7"}}
cNomes := ArrTokStr(aNomes) //{"Daniel","26"}|{"João","60"}|{"Terminal","7"}
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Quebra um array transformando em texto
