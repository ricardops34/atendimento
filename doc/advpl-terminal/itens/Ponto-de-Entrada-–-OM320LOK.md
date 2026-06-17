---
title: "Ponto de Entrada – OM320LOK"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-om320lok/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:08"
---

# Ponto de Entrada – OM320LOK

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-om320lok/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*---------------------------------------------------------------------------------------------*
 | P.E.:  Om320LOk                                                                             |
 | Desc:  P.E. executado ao validar a linha no Retorno do Carregamento                         |
 | Link:  http://tdn.totvs.com/display/public/mp/OM320LOK+-+Valida+Retorno+de+Cargas++--+16479 |
 *---------------------------------------------------------------------------------------------*/

User Function Om320LOk()
	Local aArea	:= GetArea()
	Local lRet		:= PARAMIXB[1]

	//Se a linha atual não estiver deletada
	If !GDDeleted(n)
		lRet := MsgYesNo("Deseja Continuar?", "Atenção")
	EndIf

	RestArea(aArea)
Return lRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada OM320LOK.
