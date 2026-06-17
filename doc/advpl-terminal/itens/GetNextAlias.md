---
title: "GetNextAlias"
function_name: "GetNextAlias"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/getnextalias/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:48"
---

# GetNextAlias

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/getnextalias/

## Exemplo da Rotina

```advpl
cAlias := GetNextAlias()
```

## Exemplo 1- Pegando o alias e colocando em uma query

```advpl
//Pega o próximo alias disponível
	cAliasAux := GetNextAlias()

	//Faz a query
	cQuery := " SELECT BM_GRUPO, BM_DESC FROM " + RetSQLName('SBM') + " SBM WHERE SBM.D_E_L_E_T_ = ' ' "

	//Executa a query apontando para o alias
	TCQuery cQuery New Alias (cAliasAux)

	//Se houver dados, mostra mensagem
	If ! (cAliasAux)->(EoF())
		MsgInfo("O alias [" + cAliasAux + "] possui dados!", "Atenção")
	EndIf

	//Encerra o Alias
	(cAliasAux)->(DbCloseArea())
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Busca um alias disponível para utilização
