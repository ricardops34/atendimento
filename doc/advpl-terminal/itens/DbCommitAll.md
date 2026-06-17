---
title: "DbCommitAll"
function_name: "DbCommitAll"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/dbcommitall/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:13"
---

# DbCommitAll

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/dbcommitall/

## Exemplo da Rotina

```advpl
DbCommitAll()
```

## Exemplo 1- Altera a descrição de um produto e o nome de um cliente

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
	Local cDescAtu := ""
	Local cNomeAtu := ""

	DbSelectArea('SB1')
	SB1->(DbSetOrder(1)) //B1_FILIAL + B1_COD
	SB1->(DbGoTop())

	//Se conseguir posicionar no produto
	If SB1->(DbSeek(FWxFilial('SB1') + 'F00003'))
		cDescAtu := Alltrim(SB1->B1_DESC)+"..."

		//Atualiza a Descrição
		RecLock('SB1', .F.)
			B1_DESC := cDescAtu
		SB1->(MsUnlock())
	EndIf

	DbSelectArea('SA1')
	SA1->(DbSetOrder(1)) //A1_FILIAL + A1_COD + A1_LOJA
	SA1->(DbGoTop())

	//Se conseguir posicionar no cliente
	If SA1->(DbSeek(FWxFilial('SA1') + 'C00003'))
		cNomeAtu := Alltrim(SA1->A1_NOME)+"..."

		//Atualiza o nome
		RecLock('SA1', .F.)
			A1_NOME := cNomeAtu
		SA1->(MsUnlock())
	EndIf

	//Salva todas as alterações pendentes
	DbCommitAll()

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

Salva todas as alterações pendentes de todos os alias abertos na thread.
