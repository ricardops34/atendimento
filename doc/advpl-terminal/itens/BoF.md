---
title: "BoF"
function_name: "BoF"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/bof/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:29"
---

# BoF

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/bof/

## Exemplo da Rotina

```advpl
(ALIAS)->(BoF())
```

## Exemplo 1- Percorrendo os registros da SB1

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
	Local aArea   := GetArea()
	Local aAreaB1 := SB1->(GetArea())
	Local nTot    := 0

	DbSelectArea('SB1')
	SB1->(DbSetOrder(1)) //B1_FILIAL + B1_COD

	//Enquanto não estiver no começo da tabela
	SB1->(DbGoBottom())
	While ! SB1->(BoF())
		nTot++

		SB1->(DbSkip(-1))
	EndDo
	MsgInfo("Foram processados "+cValToChar(nTot)+" registros.", "Atenção")

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
– Universo AdvPL

## Resumo

Função que verifica se a tabela está no começo (antes do primeiro registro).
