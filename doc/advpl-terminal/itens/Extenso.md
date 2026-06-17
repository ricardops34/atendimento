---
title: "Extenso"
function_name: "Extenso"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/extenso/"
has_examples: true
example_count: 3
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:41"
---

# Extenso

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/extenso/

## Exemplo da Rotina

```advpl
Extenso(nValor)
```

## Exemplo 1- Guardando em uma variável o valor em texto

```advpl
nValor := 500
cTexto := Extenso(nValor) //QUINHENTOS REAIS
```

## Exemplo 2- Guardando em uma variável o valor em texto, mas de uma forma legível melhor

```advpl
nValor := 500
cTexto := Capital(Extenso(nValor)) //Quinhentos Reais
```

## Exemplo 3- Guardando em uma variável o valor em texto sem o texto de reais (formato de quantidade), mas de uma forma legível melhor

```advpl
nValor := 2.87
cTexto := Capital(Extenso(nValor, .T.)) //Dois e Oitenta e Sete
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Imprime um valor por Extenso
