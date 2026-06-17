---
title: "Ponto de Entrada – TM850FIL"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tm850fil/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:19:38"
---

# Ponto de Entrada – TM850FIL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-tm850fil/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------*
 | P.E.:  TM850FIL                                                     |
 | Desc:  Filtragem da mBrowse da tela de Faturas por Documento        |
 *---------------------------------------------------------------------*/

User Function TM850FIL()
	Local aArea     := GetArea()
	Local cRet      := ""

	cRet += " E1_X_CAMPO = 'TST' "

	RestArea(aArea)
Return cRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada TM850FIL.
