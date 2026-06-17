---
title: "SoftLock"
function_name: "SoftLock"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/softlock/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:20:14"
---

# SoftLock

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/softlock/

## Exemplo da Rotina

```advpl
SoftLock("Alias")
```

## Exemplo 1- Reservando um produto para alteração

```advpl
DbSelectArea('SB1')
SB1->(DbSetOrder(1)) // Filial + Código

//Se conseguir posicionar no produto
If SB1->(DbSeek(FWxFilial('SB1') + "COD_AAA"))
	SoftLock('SB1')

	RecLock('SB1', .F.)
		SB1->B1_X_CAMPO := "AAA"
	SB1->(MsUnlock())
EndIf
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Reserva um registro para alteração
