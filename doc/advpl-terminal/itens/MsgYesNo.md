---
title: "MsgYesNo"
function_name: "MsgYesNo"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "avisos-e-alertas"
source_url: "https://terminaldeinformacao.com/knowledgebase/msgyesno/"
has_examples: true
example_count: 4
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:46"
---

# MsgYesNo

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/msgyesno/

## Exemplo da Rotina

```advpl
MsgYesNo("Mensagem", "Título")
```

## Exemplo 1- Mostrando Mensagem

```advpl
If MsgYesNo("Olá Mundo", "Confirma?")
	Alert("Clicou no Sim")
Else
	Alert("Clicou no Não")
EndIf
```

## Exemplo 2- Mostrando Mensagem concatenando com outro Texto

```advpl
If MsgYesNo("Olá Mundo, agora é " + Time(), "Confirma?")
	Alert("Clicou no Sim")
Else
	Alert("Clicou no Não")
EndIf
```

## Exemplo 3- Mostrando Mensagem quebra de linha

```advpl
If MsgYesNo("Olá Mundo," + Chr(13) + Chr(10) + "agora é " + Time(), "Confirma?")
	Alert("Clicou no Sim")
Else
	Alert("Clicou no Não")
EndIf
```

## Exemplo 4- Mostrando Mensagem com tags HTML

```advpl
If MsgYesNo('<h1>Confirma?</h1><br>Olá <b>Mundo</b>, agora é <font color="#FF0000">' + Time() + '</font>', "Confirma?")
	Alert("Clicou no Sim")
Else
	Alert("Clicou no Não")
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

Mostra uma mensagem com dois botões, Sim e Não
