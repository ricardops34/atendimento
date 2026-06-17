---
title: "RecNo"
function_name: "RecNo"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/recno/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:19:59"
---

# RecNo

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/recno/

## Exemplo da Rotina

```advpl
ALIAS->(RecNo())
```

## Exemplo 1- Pegando o RecNo da tabela para depois restaurar onde estava

```advpl
//Pegando o RecNo atual
nRecno := SB1->(RecNo())

//Processamento de While ou algum outro que desposicione o registro

SB1->(DbGoTo(nRecNo))
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Pega o RecNo de uma linha da tabela
