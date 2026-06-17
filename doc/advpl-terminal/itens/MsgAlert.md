---
title: "MsgAlert"
function_name: "MsgAlert"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "avisos-e-alertas"
source_url: "https://terminaldeinformacao.com/knowledgebase/msgalert/"
has_examples: true
example_count: 4
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:38"
---

# MsgAlert

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/msgalert/

## Exemplo da Rotina

```advpl
MsgAlert("Mensagem", "Título")
```

## Exemplo 1- Mostrando Mensagem

```advpl
MsgAlert("Olá Mundo", "Atenção")
```

## Exemplo 2- Mostrando Mensagem concatenando com outro Texto

```advpl
MsgAlert("Olá Mundo, agora é " + Time(), "Atenção")
```

## Exemplo 3- Mostrando Mensagem quebra de linha

```advpl
MsgAlert("Olá Mundo," + Chr(13) + Chr(10) + "agora é " + Time()), "Atenção"
```

## Exemplo 4- Mostrando Mensagem com tags HTML

```advpl
MsgAlert('<h1>Atenção:</h1><br>Olá <b>Mundo</b>, agora é <font color="#FF0000">' + Time() + '</font>', "Atenção")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Mostra uma mensagem com o símbolo de Alerta (Triângulo amarelo com Exclamação)
