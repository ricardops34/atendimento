---
title: "Método GoLine"
function_name: "Método GoLine"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/metodo-goline/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:24"
---

# Método GoLine

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/metodo-goline/

## Exemplo da Rotina

```advpl
oModelGrid:GoLine(nNumeroDaLinha)
```

## Exemplo 1- Percorrendo todas as linhas e setando valores para alguns campos

```advpl
//Pegando os modelos de dados
oModelPad := FWModelActivate()
oModelDet := oModel:GetModel("XXXDETAIL")

//Percorrendo todas as linhas
For nI := 1 To oModelDet:Length()
	//Posicionando na linha
	oModelDet:GoLine(nI)

	//Setando valores da grid, conforme o pai do cadastro
	oModelDet:LoadValue("C6_X_XXX",  oModelPad:GetValue("C5_X_XXX"))
	oModelDet:LoadValue("C6_X_ZZZ",  oModelPad:GetValue("C5_X_ZZZ"))
Next nI
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Método que posiciona em uma linha específica da grid
