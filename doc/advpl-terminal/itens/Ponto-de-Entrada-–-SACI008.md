---
title: "Ponto de Entrada – SACI008"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-saci008/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:19"
---

# Ponto de Entrada – SACI008

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-saci008/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include 'Protheus.ch'

/*---------------------------------------------------------------------*
 | P.E.:  SACI008                                                      |
 | Desc:  Ponto de entrada após baixa do título a receber              |
 | Link:  http://tdn.totvs.com/pages/releaseview.actionçpageId=6071312 |
 *---------------------------------------------------------------------*/

User Function SACI008()
	Local aArea := GetArea()
	Local aAreaE1 := SE1->(GetArea())

	//Gravando no título o valor recebido
	RecLock("SE1", .F.)
		E1_X_TST := "TESTE"
	SE1->(MsUnlock())

	RestArea(aAreaE1)
	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada SACI008.
