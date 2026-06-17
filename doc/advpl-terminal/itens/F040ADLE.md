---
title: "F040ADLE"
function_name: "F040ADLE"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/f040adle/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:43"
---

# F040ADLE

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/f040adle/

## Exemplo da Rotina

```advpl
User Function F040ADLE()
//...
Return aRet
```

## Exemplo 1- Adicionando a cor violeta

```advpl
User Function F040ADLE()
	Local aArea := GetArea()
	Local aRet  := {}

	aAdd(aRet, {"BR_VIOLETA", "Título PLS"})

	RestArea(aArea)
Return aRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Exemplo enviado por Cássio Winkler;
- Este p.e. deve ser usado juntamente com o F040URET;

## Referências

- TDN

## Resumo

P.E. para incluir uma nova legenda no Contas a Receber
