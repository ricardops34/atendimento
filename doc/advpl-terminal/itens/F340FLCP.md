---
title: "F340FLCP"
function_name: "F340FLCP"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/f340flcp/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:50"
---

# F340FLCP

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/f340flcp/

## Exemplo da Rotina

```advpl
User Function F340FLCP()
	//Expressão em SQL
	cFiltro := " ... "
Return cFiltro
```

## Exemplo 1- Filtra um fornecedor específico

```advpl
User Function F340FLCP()
	Local aArea    := GetArea()
	Local cQry     := ""
	Local cFornece := "XXXX"

	cQry := " AND E2_FORNECE = '" + cFornece + "' "

	RestArea(aArea)
Return cQry
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Exemplo enviado por Cássio Winkler;

## Referências

- TDN

## Resumo

Implementa expressão complementar na filtragem de títulos na compensação do contas a pagar
