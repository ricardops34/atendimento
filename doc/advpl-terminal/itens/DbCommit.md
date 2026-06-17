---
title: "DbCommit"
function_name: "DbCommit"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/dbcommit/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:11"
---

# DbCommit

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/dbcommit/

## Exemplo da Rotina

```advpl
(ALIAS)->(DbCommit())
```

## Exemplo 1- Alterando a descrição de um produto

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

		//Salva as alterações pendentes
		SB1->(DbCommit())
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

Salva as alterações pendentes de uma tabela.
