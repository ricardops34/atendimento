---
title: "Ponto de Entrada – MT410ACE"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt410ace/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:32"
---

# Ponto de Entrada – MT410ACE

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mt410ace/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'RwMake.ch'
#Include 'Protheus.ch'

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  MT410ACE                                                                                      |
 | Desc:  Não permite usuário editar um pedido de venda caso ele tenha remessa                          |
 | Links: http://tdn.totvs.com/pages/releaseview.actionçpageId=6784346                                  |
 *------------------------------------------------------------------------------------------------------*/

User Function MT410ACE()
	Local aArea		:= GetArea()
	Local lContinua	:= .T.
	Local nOpc			:= PARAMIXB[1]
	Local lResiduo := IsInCallStack('MA410RESID')

	//Se for inclusão, visualização ou resíduo, permite continuar
	If (nOpc == 3) .Or. (nOpc == 2) .Or. (lResiduo)
		lContinua := .T.

	//Senão, mostra mensagem ao usuário
	Else
		MsgAlert("Pedido não pode ser manipulado!", "Atenção")
		lContinua := .F.
	Endif

	RestArea(aArea)
Return lContinua
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MT410ACE.
