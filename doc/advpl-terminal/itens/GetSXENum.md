---
title: "GetSXENum"
function_name: "GetSXENum"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/getsxenum/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:51"
---

# GetSXENum

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/getsxenum/

## Exemplo da Rotina

```advpl
GetSXENum("Alias", "Campo")
```

## Exemplo 1- Pegando o próximo código do campo A1_COD da tabela SA1

```advpl
Begin Transaction
	//Pegando o último código do cliente conforme a SXE / SXF
	cCodigo := GetSXENum('SA1', 'A1_COD')

	//Perguntando se deseja confirmar esse código, para confirmar e atualizar as tabelas SXE / SXF
	If MsgYesNo("Deseja confirmar o código "+cCodigo+"?", "Atenção")
		ConfirmSX8()

	//Senão, volta a numeração onde estava
	Else
		RollBackSX8()
	EndIf
End Transaction
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Função que pega o próximo código sequencial (SXE / SXF)
