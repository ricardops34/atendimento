---
title: "RecCount"
function_name: "RecCount"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/reccount/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:19:56"
---

# RecCount

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/reccount/

## Exemplo da Rotina

```advpl
ALIAS->(RecCount())
```

## Exemplo 1- Pegando o total de registros da tabela de produtos

```advpl
DbSelectArea('SB1')
nTotRec := SB1->(RecCount())

Alert("SB1 possui " + cValToChar(nTotRec) + " registros")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Conta o total de Recnos de uma tabela
