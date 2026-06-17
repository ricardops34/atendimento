---
title: "DbEval"
function_name: "DbEval"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/dbeval/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:16"
---

# DbEval

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/dbeval/

## Exemplo da Rotina

```advpl
DbEval(bBlocoCodigo, , bEnquanto)
```

## Exemplo 1- Contando os registros enquanto o X5_TABELA for igual a 00

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
	Local nCnt     := 0
	Local cMsg     := ""
	Local bBloco
	Local bEnquanto

	//Posiciona no arquivo de tabelas da SX5
	DbSelectArea("SX5")
	SX5->(DbSetOrder(1)) //X5_FILIAL + X5_TABELA + X5_CHAVE

	//Se conseguir posicionar na tabela 00
	If SX5->(DbSeek(FWxFilial("SX5") + "00"))
		bBloco    := {|x| nCnt++, cMsg += Alltrim(SX5->X5_CHAVE)+", "}
		bEnquanto := {||SX5->X5_FILIAL == FWxFilial("SX5") .And. SX5->X5_TABELA<="00"}

		//Setando a régua
		DbEval(bBloco, , bEnquanto)

		//Mostrando a mensagem
		Aviso('Atenção', "Foram processados "+cValToChar(nCnt)+" registros:"+CRLF+cMsg, {'Ok'}, 2)
	EndIf

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

Executa um bloco de código para cada registro de uma tabela.
