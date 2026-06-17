---
title: "Ponto de Entrada – M461SER"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m461ser/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:17:45"
---

# Ponto de Entrada – M461SER

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-m461ser/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

//Constantes
#Define POS_PEDIDO 0001
#Define POS_ITEM   0002
#Define POS_PROD   0006

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  M461SER                                                                                       |
 | Desc:  Verificação da série                                                                          |
 *------------------------------------------------------------------------------------------------------*/

User Function M461SER()
	Local aArea  := GetArea()
	Local aParam := PARAMIXB
	Local nAtual := 0

	//Numero e série
	MsgInfo("Numero: "+cNumero, "Atenção")
	MsgInfo("Serie:  "+cSerie, "Atenção")

	//Percorrendo os itens que irão gerar a nota
	For nAtual := 1 To Len(aParam)
		MsgInfo("Pedido: "+aParam[nAtual][POS_PEDIDO]+", Item: "+aParam[nAtual][POS_ITEM]+", Produto: "+aParam[nAtual][POS_PROD], "Atenção")
	Next

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada M461SER.
