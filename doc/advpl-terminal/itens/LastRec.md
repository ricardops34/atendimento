---
title: "LastRec"
function_name: "LastRec"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/lastrec/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:01"
---

# LastRec

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/lastrec/

## Exemplo da Rotina

```advpl
ALIAS->(LastRec())
```

## Exemplo 1- Pegando a quantidade de uma tabela

```advpl
//Abre a tabela de produtos
DbSelectArea('SB1')

//Pegando o último
nUltimo := SB1->(LastRec())

//Mostrando o valor
Alert("Último da SB1: " + cValToChar(nUltimo))
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Retorna a quantidade de registros de um alias
