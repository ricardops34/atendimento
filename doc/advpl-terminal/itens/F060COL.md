---
title: "F060COL"
function_name: "F060COL"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/f060col/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:13:47"
---

# F060COL

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/f060col/

## Exemplo da Rotina

```advpl
User Function F060COL()
	//...
Return aCampos
```

## Exemplo 1- Adicionando o IDCNAB na posição 4

```advpl
User Function F060COL()
	Local aArea    := GetArea()
	Local aCampos  := paramixb[1]
	Local nTamanho := Len(aCampos)
	Local nColNova := 4

	//Redimensionando o array, adicionando uma nova posição
	aSize(aCampos, nTamanho + 1)

	//Adicionando um campo novo na posição desejada
	aIns(aCampos, nColNova)

	//As posições das colunas são são, [1] Campo, [2] Nil, [3] Título, [4] Picture
	aCampos[nColNova] := {"E1_IDCNAB", "", "ID CNAB", ""}

	RestArea(aArea)
Return aCampos
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Ponto de entrada para adicionar coluna na FINA060
