---
title: "IndexOrd"
function_name: "IndexOrd"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/indexord/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:00"
---

# IndexOrd

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/indexord/

## Exemplo da Rotina

```advpl
ALIAS->(IndexOrd())
```

## Exemplo 1- Buscando o índice usado e depois voltando

```advpl
DbSelectArea('SB1')
nIndiceBkp := SB1->(IndexOrd())

//Tratativas ou while realizado aqui

//Voltando o backup
SB1->(DbSetOrder(nIndiceBkp))
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Retorna o índice atual usado para o ALIAS
