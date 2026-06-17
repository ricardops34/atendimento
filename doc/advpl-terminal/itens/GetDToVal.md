---
title: "GetDToVal"
function_name: "GetDToVal"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "valores-numericos"
source_url: "https://terminaldeinformacao.com/knowledgebase/getdtoval/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:42"
---

# GetDToVal

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/getdtoval/

## Exemplo da Rotina

```advpl
GetDToVal([Expressão])
```

## Exemplo 1- Convertendo o texto para numérico

```advpl
cTexto := "455"
nVal := GetDToVal(cTexto) //Retorna 455
```

## Exemplo 2- Convertendo o texto para numérico (apenas o valor decimal)

```advpl
cTexto := "fim.489"
nVal := GetDToVal(cTexto) //Retorna 0,489
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Retorna um número formatado conforme texto recebido por parâmetro
