---
title: "Método ClearData"
function_name: "Método ClearData"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/metodo-cleardata/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:23"
---

# Método ClearData

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/metodo-cleardata/

## Exemplo da Rotina

```advpl
oSeuModel:ClearData()
```

## Exemplo 1- Pegando o modelo da grid, e limpando os dados

```advpl
//Pegando os modelos de dados
oModelPad := FWModelActivate()
oModelDet := oModel:GetModel("XXXDETAIL")

//Limpando a grid
oModelDet:ClearData()
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Limpa os registros de uma grid (somente se for inclusão)
