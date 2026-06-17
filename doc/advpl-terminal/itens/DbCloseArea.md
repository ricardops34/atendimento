---
title: "DbCloseArea"
function_name: "DbCloseArea"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/dbclosearea/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:10"
---

# DbCloseArea

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/dbclosearea/

## Exemplo da Rotina

```advpl
(ALIAS)->(DbCloseArea()
```

## Exemplo 1- Fechando uma tabela aberta

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
	Local aArea    := GetArea()

	DbSelectArea('SB1')

	//Fechando a tabela de Produtos
	SB1->(DbCloseArea())

	RestArea(aArea)
Return
```

## Exemplo 2- Fechando uma consulta SQL aberta

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
	Local aArea    := GetArea()
	Local cQryAux  := ""

	//Montando a consulta
	cQryAux := " SELECT A1_NOME FROM "+RetSQLName('SA1')+" SA1 WHERE SA1.D_E_L_E_T_ = ' ' "
	TCQuery cQryAux New Alias "QRY_SA1"

	//Fechando a consulta
	QRY_SA1->(DbCloseArea())

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
– Universo AdvPL

## Resumo

Função que fecha uma tabela / query aberta.
