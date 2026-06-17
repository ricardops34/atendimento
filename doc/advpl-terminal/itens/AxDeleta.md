---
title: "AxDeleta"
function_name: "AxDeleta"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "cadastros"
source_url: "https://terminaldeinformacao.com/knowledgebase/axdeleta/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:17"
---

# AxDeleta

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/axdeleta/

## Exemplo da Rotina

```advpl
AxDeleta("Alias", nRECNO_TABELA, 5)
```

## Exemplo 1- Exclusão de um produto

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
	Local aArea       := GetArea()
	Local aAreaB1     := SB1->(GetArea())
	Local nOpcao      := 0
	Private cCadastro := "Teste"

	DbSelectArea('SB1')
	SB1->(DbSetOrder(1)) //B1_FILIAL + B1_COD
	SB1->(DbGoTop())

	//Se conseguir posicionar no produto
	If SB1->(DbSeek(FWxFilial('SB1') + 'F00001'))
		nOpcao := AxDeleta('SB1', SB1->(RecNo()), 5)
		If nOpcao == 1
			MsgInfo("Rotina confirmada", "Atenção")
		EndIf
	EndIf

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

Função que exclui um registro de uma tabela.
