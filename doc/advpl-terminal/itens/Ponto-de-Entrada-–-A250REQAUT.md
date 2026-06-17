---
title: "Ponto de Entrada – A250REQAUT"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a250reqaut/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:16:14"
---

# Ponto de Entrada – A250REQAUT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-a250reqaut/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*------------------------------------------------------------------------------------------------------*
 | P.E.:  A250REQAUT                                                                                    |
 | Desc:  Permite manipular o conteúdo do parâmetro MV_REQAUT nos apontamentos                          |
 | Links: http://tdn.totvs.com/display/public/mp/A250REQAUT+-+Manipula+MV_REQAUT+nos+apontamentos       |
 *------------------------------------------------------------------------------------------------------*/

User Function A250REQAUT()
	Local cReqAut   := PARAMIXB[1]
	Local cProgMenu := FunName()
	Local cRet      := cReqAut

	If Upper(Alltrim(cProgMenu)) $ "ZTESTE, ZTST"
		cRet := "D" //D = Digitado / Manual; A = Automático
	EndIf
Return cRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada A250REQAUT.
