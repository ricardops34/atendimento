---
title: "F040URET"
function_name: "F040URET"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/f040uret/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:13:46"
---

# F040URET

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/f040uret/

## Exemplo da Rotina

```advpl
User Function F040URET()
//...
Return aRet
```

## Exemplo 1- Adicionando a cor violeta

```advpl
User Function F040URET()
	Local aArea := GetArea()
	Local aRet  := {}

	aAdd(aRet, {"E1_ORIGEM == 'PLSA510'", "BR_VIOLETA"})

	RestArea(aArea)
Return aRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Exemplo enviado por Cássio Winkler;
- Este p.e. deve ser usado juntamente com o F040ADLE;

## Referências

- TDN

## Resumo

P.E. para adicionar uma nova legenda no Contas a Receber
