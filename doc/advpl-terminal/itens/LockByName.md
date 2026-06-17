---
title: "LockByName"
function_name: "LockByName"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/lockbyname/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:15:03"
---

# LockByName

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/lockbyname/

## Exemplo da Rotina

```advpl
LockByName("NOME_SEMAFORO",.T.,.F.)
```

## Exemplo 1- Usando o LockByName em uma rotina comum

```advpl
User Function zSemaforo()
	//Habilitando o semáforo
	If ! LockByName("ZSEMAFORO", .T., .F.)
		MsgStop("Semáforo já existente, função não pode ser executada!", "Atenção")
		Return
	EndIf

	//Comandos

	//Desabilitando o semáforo
	UnlockByName("ZSEMAFORO", .T., .F., .F.)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Faz o travamento de uma função, como se fosse um semáforo
