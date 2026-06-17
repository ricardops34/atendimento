---
title: "FWTimeStamp"
function_name: "FWTimeStamp"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "data-e-hora"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwtimestamp/"
has_examples: true
example_count: 5
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:33"
---

# FWTimeStamp

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwtimestamp/

## Exemplo da Rotina

```advpl
FWTimeStamp([Tipo de 1 a 5], [Data, por padrão pega a função Date()], [Hora, por padrão pega a função Time()])
```

## Exemplo 1- Mostrando no formato aaaammddhhmmss

```advpl
FWTimeStamp(1) //20190414084826
```

## Exemplo 2- Mostrando no formato dd/mm/aaaa-hh:mm:ss

```advpl
FWTimeStamp(2) //14/04/2019-08:48:39
```

## Exemplo 3- Mostrando no formato UTC aaaa-mm-ddThh:mm:ss (Local)

```advpl
FWTimeStamp(3) //2019-04-14T08:48:50
```

## Exemplo 4- Mostrando no formato de estampa de tempo em milissegundos desde 01/01/1970 00:00:00

```advpl
FWTimeStamp(4) //1555242635
```

## Exemplo 5- Mostrando no formato UTC aaaa-mm-ddThh:mm:ss-+Time Zone 

```advpl
FWTimeStamp(5) //2019-04-14T08:49:21-03:00
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Função que retorna a data e hora atual
