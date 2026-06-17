---
title: "M261BCHOI"
function_name: "M261BCHOI"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/m261bchoi/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:05"
---

# M261BCHOI

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/m261bchoi/

## Exemplo 1- Adicionando uma função

```advpl
User function M261BCHOI()
	Local aArea    := GetArea()
	Local aButtons := {}

	aAdd(aButtons, {'BITMAP', { || U_z261Bar() }  ,OemtoAnsi('Cód.Barras')})

	RestArea(aArea)
Return aButtons
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

P.E. para adicionar funções no Outras Ações dentro da tela de Transferência Múltipla
