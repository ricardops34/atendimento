---
title: "BeginSQL … EndSQL"
function_name: "BeginSQL"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "exemplos-de-comandos"
source_url: "https://terminaldeinformacao.com/knowledgebase/beginsql-endsql/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:27"
---

# BeginSQL … EndSQL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/beginsql-endsql/

## Exemplo da Rotina

```advpl
BeginSql Alias "SEU_ALIAS"
	//Comandos para a consulta SQL
EndSql
```

## Exemplo 1- Criando consulta para a SB1 e percorrendo

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
	Local cWhere := "%B1_TIPO = 'PI' AND B1_LOCPAD = '01'%"
	Local nRegs  := 0

	//Construindo a consulta
	BeginSql Alias "SQL_SB1"
		//COLUMN CAMPO AS DATE //Deve se usar isso para transformar o campo em data

		SELECT
			B1_COD,
			B1_DESC
		FROM
			%table:SB1% SB1
		WHERE
			B1_FILIAL  = %xFilial:SB1%
			AND B1_MSBLQL != '1'
			AND %Exp:cWhere%
			AND SB1.%notDel%
	EndSql

	//Enquanto houver registros
	While ! SQL_SB1->(EoF())
		nRegs++

		SQL_SB1->(DbSkip())
	EndDo
	SQL_SB1->(DbCloseArea())

	MsgInfo("Foram processados "+cValToChar(nRegs)+" produtos.", "Atenção")

	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Exemplo de utilização de query SQL com Embedded SQL.
