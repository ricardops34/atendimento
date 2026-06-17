---
title: "MsgNoYes"
function_name: "MsgNoYes"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "avisos-e-alertas"
source_url: "https://terminaldeinformacao.com/knowledgebase/msgnoyes/"
has_examples: true
example_count: 4
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:41"
---

# MsgNoYes

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/msgnoyes/

## Exemplo da Rotina

```advpl
MsgNoYes("Mensagem", "Título")
```

## Exemplo 1- Mostrando Mensagem

```advpl
If MsgNoYes("Olá Mundo", "Confirma?")
	Alert("Clicou no Não")
Else
	Alert("Clicou no Sim")
EndIf
```

## Exemplo 2- Mostrando Mensagem concatenando com outro Texto

```advpl
If MsgNoYes("Olá Mundo, agora é " + Time(), "Confirma?")
	Alert("Clicou no Não")
Else
	Alert("Clicou no Sim")
EndIf
```

## Exemplo 3- Mostrando Mensagem quebra de linha

```advpl
If MsgNoYes("Olá Mundo," + Chr(13) + Chr(10) + "agora é " + Time(), "Confirma?")
	Alert("Clicou no Não")
Else
	Alert("Clicou no Sim")
EndIf
```

## Exemplo 4- Mostrando Mensagem com tags HTML

```advpl
If MsgNoYes('<h1>Confirma?</h1><br>Olá <b>Mundo</b>, agora é <font color="#FF0000">' + Time() + '</font>', "Confirma?")
	Alert("Clicou no Não")
Else
	Alert("Clicou no Sim")
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Mostra uma mensagem com dois botões, Não e Sim
