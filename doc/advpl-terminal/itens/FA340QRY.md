---
title: "FA340QRY"
function_name: "FA340QRY"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/fa340qry/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:53"
---

# FA340QRY

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fa340qry/

## Exemplo da Rotina

```advpl
User Function FA340QRY()
	//Expressão em SQL
	cFiltro := " ... "
Return cFiltro
```

## Exemplo 1- Filtrando apenas a filial atual

```advpl
User Function FA340QRY()
	Local cQry := ""

	cQry := "SE5.E5_FILIAL = '" + FWxFilial('SE5') + "'"

Return cQry
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Exemplo enviado por Cássio Winkler;

## Referências

- TDN

## Resumo

Implementa expressão complementar na filtragem de cancelamento de compensação
