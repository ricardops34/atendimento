---
title: "FieldGet"
function_name: "FieldGet"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/fieldget/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:57"
---

# FieldGet

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fieldget/

## Exemplo da Rotina

```advpl
FieldGet(nPosicao)
```

## Exemplo 1- Pegando o primeiro campo 3 da tabela e mostrando

```advpl
xValor := FieldGet(1)
Alert(xValor)
```

## Exemplo 2- Pegando um campo da tabela de fornecedor, verificando se existe e mostrando mensagem

```advpl
cNome := FieldGet( FieldPos("A2_NOME") )

If ! Empty(cNome)
	Alert("O nome é " + cNome)
EndIf
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Retorna o valor do campo através da posição ordinal do campo (inverso da FieldPut)
