---
title: "X3Combo"
function_name: "X3Combo"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/x3combo/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:41"
---

# X3Combo

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/x3combo/

## Exemplo da Rotina

```advpl
X3Combo([Campo], [Chave Pesquisada])
```

## Exemplo 1- Buscando o tipo de cliente

```advpl
cTipo := X3Combo("A1_PESSOA", "F")
Alert("Tipo: " + cTipo) //Mostra Pessoa Física
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

– Dica enviada por Rodrigo de Oliveira, no artigo Função para pegar a descrição de um campo Combo em AdvPL

## Resumo

Retorna a opção de um campo Combo
