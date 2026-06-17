---
title: "Begin Transaction … End Transaction"
function_name: "Begin"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "exemplos-de-comandos"
source_url: "https://terminaldeinformacao.com/knowledgebase/transaction-transaction/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:26"
---

# Begin Transaction … End Transaction

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/transaction-transaction/

## Exemplo da Rotina

```advpl
Begin Transaction
	//Tratativas de inclusão, alteração, disarm
End Transaction
```

## Exemplo 1- Exemplo de criação de registro no cadastro de Produtos, perguntando se deseja cancelar

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
	Local aAreaB1  := SB1->(GetArea())

	//Iniciando controle de transações
	Begin Transaction
		RecLock('SB1', .T.)
			B1_COD  := dToS(dDataBase)+StrTran(Time(), ':', '')
			B1_DESC := "Teste"
		SB1->(MsUnlock())

		//Se a pergunta foi confirmada, cancela os lançamentos na transação
		If MsgYesNo("Deseja cancelar e disarmar a transação?", "Atenção")
			DisarmTransaction()
		EndIf

	//Finalizando controle de transações
	End Transaction

	RestArea(aAreaB1)
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

Exemplo de utilização de controle de transação no AdvPL, podendo utilizar “rollback” nas alterações feitas.
