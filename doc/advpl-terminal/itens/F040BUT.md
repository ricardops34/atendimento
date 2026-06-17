---
title: "F040BUT"
function_name: "F040BUT"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/f040but/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:44"
---

# F040BUT

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/f040but/

## Exemplo da Rotina

```advpl
User Function F040BUT()
//...
Return aButtons
```

## Exemplo 1- Adicionando duas funções para o Outras Ações

```advpl
User Function F040BUT()
	Local aArea := GetArea()
	Local aButtons := {}

	aAdd(aButtons, {"BUDGETY", {|| U_fFuncao1() } , "* Título Função 1" } )
	aAdd(aButtons, {"BUDGETY", {|| U_fFuncao2() } , "* Título Função 2" } )

	RestArea(aArea)
Return aButtons
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

P.E. que adiciona botões no Outras Ações dentro do Título a Receber
