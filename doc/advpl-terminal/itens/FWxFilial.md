---
title: "FWxFilial"
function_name: "FWxFilial"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwxfilial/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:37"
---

# FWxFilial

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwxfilial/

## Exemplo da Rotina

```advpl
FWxFilial([Tabela])
```

## Exemplo 1- Pegando a filial da tabela SB1

```advpl
cFilSB1 := FWxFilial("SB1") //Se for compartilhada, retorna " ", senão retorna "01", "0101" ou a nomenclatura criada no grupo de empresas
```

## Exemplo 2- Pegando a filial da tabela SA2

```advpl
cFilSA2 := FWxFilial("SA2")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Retorna o código da filial conforme a tabela
