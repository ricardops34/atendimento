---
title: "ElapTime"
function_name: "ElapTime"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "data-e-hora"
source_url: "https://terminaldeinformacao.com/knowledgebase/elaptime/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:13:20"
---

# ElapTime

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/elaptime/

## Exemplo da Rotina

```advpl
ElapTime(cHoraIni, cHoraFim)
```

## Exemplo 1- Mostrando a diferença entre duas horas

```advpl
//Define as variáveis
cHoraIni := "14:30:07"
cHoraIni := "17:45:37"

//Pega a diferença
cDiferenca := ElapTime(cHoraIni, cHoraFim)

//Mostra ela em uma mensagem
MsgInfo("A diferença é de " + cDiferenca, "Atenção")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Retorna a diferença entre duas variáveis com horas
