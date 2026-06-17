---
title: "IndexKey"
function_name: "IndexKey"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/indexkey/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:58"
---

# IndexKey

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/indexkey/

## Exemplo da Rotina

```advpl
ALIAS->(IndexKey( [Número do Índice] ))
```

## Exemplo 1- Verificando o índice 1 do cadastro de clientes

```advpl
DbSelectArea('SA1')
cIndice := SA1->(IndexOrd(1))

Alert(cIndice) //Irá mostrar = "A1_FILIAL+A1_COD+A1_LOJA"
```

## Exemplo 2- Ordenando uma query SQL usando o índice 2 do cadastro de produtos

```advpl
cQuery := " SELECT B1_COD FROM " + RetSQLName('SB1')
cQuery += " ORDER BY " + SqlOrder(SB1->(IndexKey( 2 )))
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Retorna a expressão do índice da tabela
