---
title: "StrTokArr"
function_name: "StrTokArr"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/strtokarr/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:19"
---

# StrTokArr

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/strtokarr/

## Exemplo da Rotina

```advpl
aDados := StrTokArr([Texto], [Separador])
```

## Exemplo 1- Separando a expressão por ponto e vírgula

```advpl
cExpressao := "Daniel;Atilio;Terminal; ;Bauru;Teste;;"
aDados := StrTokArr(cExpressao, ';') //Array Com 6 Colunas Daniel, Atilio, Terminal, "", Bauru, Teste
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Quebra um texto transformando em um array
