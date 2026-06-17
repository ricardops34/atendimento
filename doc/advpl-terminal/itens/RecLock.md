---
title: "RecLock"
function_name: "RecLock"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/reclock/"
has_examples: true
example_count: 5
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:19:58"
---

# RecLock

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/reclock/

## Exemplo da Rotina

```advpl
RecLock([Alias], [.T. = inclusão, .F. = manipulação])
```

## Exemplo 1- Incluindo um registro em uma tabela customizada

```advpl
RecLock("ZZZ", .T.)
	ZZZ->ZZZ_FILIAL := FWxFilial('ZZZ')
	ZZZ->ZZZ_CAMP01 := "AAA"
	ZZZ->ZZZ_CAMP02 := "BBB"
	ZZZ->ZZZ_CAMP03 := "CCC"
	ZZZ->ZZZ_CAMP04 := "DDD"
ZZZ->(MsUnlock())
```

## Exemplo 2- Alterando um registro via DbSeek

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

## Exemplo 3- Alterando um registro via DbGoTo

```advpl
//Pegando o RecNo desejado
nRecno := 41574

//Posicionando no registro
DbSelectArea('SB1')
SB1->(DbGoTo(nRecno))

//Alterando o registro
RecLock('SB1', .F.)
	SB1->B1_X_CAMPO := "CCC"
SB1->(MsUnlock())
```

## Exemplo 4- Excluindo um registro de uma tabela customizada

```advpl
RecLock("ZZZ", .F.)
	DbDelete()
ZZZ->(MsUnlock())
```

## Exemplo 5- Verificando se pode ser feita uma manipulação

```advpl
If RecLock("ZZZ", .F.)
	//comandos
	ZZZ->(MsUnlock())

Else
	MsgStop("Não foi possível travar o registro para manipulação!", "Atenção")
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

Trava um registro para manipulação
