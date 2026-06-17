---
title: "Max"
function_name: "Max"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/max-2/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:09"
---

# Max

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/max-2/

## Exemplo da Rotina

```advpl
Max([Expressão 1], [Expressão 2])
```

## Exemplo 1- Mostra o maior valor

```advpl
nValor1 := 10
nValor2 := 50

nMaior  := Max(nValor1, nValor2)
Alert(nMaior)
```

## Exemplo 2- Mostra a maior data

```advpl
dData1 := sToD("20190101")
dData2 := sToD("20150327")

dMaior := Max(dData1, dData2)
Alert(dMaior)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Retorna o maior valor entre 2 expressões
