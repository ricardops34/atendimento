---
title: "Count To"
function_name: "Count"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/count/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:12:54"
---

# Count To

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/count/

## Exemplo da Rotina

```advpl
Count to [nVariavel]
```

## Exemplo 1- Contando os registros de uma tabela

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*/{Protheus.doc} zTeste
Função de Teste
@type function
@author Terminal de Informação
@since 13/11/2016
@version 1.0
    @example
    u_zTeste()
/*/

User Function zTeste()
	Local aArea  := GetArea()
	Local nTotal := 0

	DbSelectArea('SB1')

	//Contando os registros e voltando ao topo da tabela
	Count To nTotal
	SB1->(DbGoTop())

	MsgInfo("Total de Registros: "+cValToChar(nTotal), "Atenção")

	RestArea(aArea)
Return
```

## Exemplo 2- Contando os registros de uma query

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} zTeste
Função de Teste
@type function
@author Terminal de Informação
@since 13/11/2016
@version 1.0
    @example
    u_zTeste()
/*/

User Function zTeste()
	Local aArea  := GetArea()
	Local nTotal := 0

	//Monta e executa a consulta sql
	cQuery := " SELECT * FROM "+RetSQLName('SA1')+" SA1 WHERE SA1.D_E_L_E_T_ = ' ' "
	TCQuery cQuery New Alias "QRY_SA1"

	//Contando os registros e voltando ao topo da query
	Count To nTotal
	QRY_SA1->(DbGoTop())

	MsgInfo("Total de Registros na Query: "+cValToChar(nTotal), "Atenção")

	QRY_SA1->(DbCloseArea())
	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Comando que conta quantos registros existem na tabela ou query.
