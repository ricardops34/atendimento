---
title: "GetLastQuery"
function_name: "GetLastQuery"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/getlastquery/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:43"
---

# GetLastQuery

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/getlastquery/

## Exemplo da Rotina

```advpl
aDados := GetLastQuery() //[1] = Alias, [2] = Query
```

## Exemplo 1- Executando uma consulta, e após fechá-la pegando a query

```advpl
//Construindo a consulta
	BeginSql Alias "SQL_SBM"
		SELECT
			BM_GRUPO,
			BM_DESC
		FROM
			%table:SBM% SBM
		WHERE
			BM_FILIAL  = %xFilial:SBM%
			AND SBM.%notDel%
	EndSql

	//Fecha a consulta
	SQL_SBM->(DbCloseArea())

	//Pega as informações da última query
	aDados := GetLastQuery()

	//Mostra mensagem com todas as informações capturadas
	cMensagem := ""
	cMensagem += "* cAlias - " + aDados[1] + Chr(13) + Chr(10)
	cMensagem += "* cQuery - " + aDados[2]
	MsgInfo(cMensagem, "Atenção")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Busca a última query executada via BeginSql / EndSql
