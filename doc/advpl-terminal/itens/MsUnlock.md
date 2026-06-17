---
title: "MsUnlock"
function_name: "MsUnlock"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/msunlock/"
has_examples: true
example_count: 3
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:53"
---

# MsUnlock

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/msunlock/

## Exemplo da Rotina

```advpl
ALIAS->(MsUnlock())
```

## Exemplo 1- Destravando o registro de uma Inclusão

```advpl
RecLock("ZZZ", .T.)
	ZZZ->ZZZ_FILIAL := FWxFilial('ZZZ')
	ZZZ->ZZZ_CAMP01 := "AAA"
	ZZZ->ZZZ_CAMP02 := "BBB"
	ZZZ->ZZZ_CAMP03 := "CCC"
	ZZZ->ZZZ_CAMP04 := "DDD"
ZZZ->(MsUnlock())
```

## Exemplo 2- Destravando o registro de uma Alteração

```advpl
DbSelectArea('SB1')
SB1->(DbSetOrder(1)) // Filial + Código

//Se conseguir posicionar no produto
If SB1->(DbSeek(FWxFilial('SB1') + "COD_AAA"))
	RecLock('SB1', .F.)
		SB1->B1_X_CAMPO := "AAA"
	SB1->(MsUnlock())
EndIf
```

## Exemplo 3- Destravando o registro de uma Exclusão

```advpl
RecLock("ZZZ", .F.)
	DbDelete()
ZZZ->(MsUnlock())
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Destrava um registro da manipulação
