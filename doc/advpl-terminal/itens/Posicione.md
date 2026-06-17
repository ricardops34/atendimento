---
title: "Posicione"
function_name: "Posicione"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/posicione/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:19:50"
---

# Posicione

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/posicione/

## Exemplo da Rotina

```advpl
Posicione("Alias", Índice, Chave, Campo)
```

## Exemplo 1- Pegando a descrição do produto

```advpl
//Código do Produto
cCodigo := "000324"

//Pegando a descrição do produto
cDescr := Posicione('SB1', 1, FWxFilial('SB1') + cCodigo, 'B1_DESC')
```

## Exemplo 2- Pegando o nome do cliente

```advpl
//Pegando o nome do cliente
cNome := Posicione('SA1', 1, FWxFilial('SA1') + cCodigo + cLoja, 'A1_NOME')
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Retorna o conteúdo de um campo pesquisando através de uma expressão
