---
title: "Método Length"
function_name: "Método Length"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/metodo-length/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:26"
---

# Método Length

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/metodo-length/

## Exemplo da Rotina

```advpl
oModelDet:Length()
```

## Exemplo 1- Pegando o tamanho das linhas e percorrendo os registros

```advpl
//Pegando os modelos de dados
oModelPad := FWModelActivate()
oModelDet := oModel:GetModel("XXXDETAIL")

//Percorrendo todas as linhas
For nI := 1 To oModelDet:Length()
    //Posicionando na linha
    oModelDet:GoLine(nI)

    //Mostrando o valor em um Alert
	Alert(oModelDet:GetValue("C6_X_XXX"))
Next nI
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Retorna o número de linhas de uma grid em MVC
