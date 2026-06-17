---
title: "FA740BRW"
function_name: "FA740BRW"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/fa740brw/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:55"
---

# FA740BRW

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fa740brw/

## Exemplo da Rotina

```advpl
User Function FA740BRW()
//...
Return aRotina
```

## Exemplo 1- Adicionando duas funções no Menu

```advpl
User Function FA740BRW()
	Local aArea := GetArea()
	Local aRotina := {}

	aAdd(aRotina, {"* Título Função 1", "u_zFuncao1", 0 , 9})
	aAdd(aRotina, {"* Título Função 2", "u_zFuncao2", 0 , 9})

	RestArea(aArea)
Return aRotina
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

P.E. que adiciona botão no browse do Funções Contas a Receber
