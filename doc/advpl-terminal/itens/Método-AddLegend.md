---
title: "Método AddLegend"
function_name: "Método AddLegend"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/metodo-addlegend/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:18"
---

# Método AddLegend

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/metodo-addlegend/

## Exemplo da Rotina

```advpl
oBrowse:AddLegend("Condição", "Cor", "Descrição", Sequencia)
```

## Exemplo 1- Adicionando apenas 1 coluna de legenda

```advpl
oBrowse:AddLegend("CAMPO == '1'", "GREEN",  "Registro OK")
oBrowse:AddLegend("CAMPO != '1'", "YELLOW", "Validar Informações")
oBrowse:AddLegend("CAMPO == ' '", "WHITE",  "Faltando Análise")
```

## Exemplo 2- Adicionando 2 colunas de legenda

```advpl
//Primeira coluna de legenda
oBrowse:AddLegend("CAMPO == '1'", "GREEN",  "Registro OK",         "1")
oBrowse:AddLegend("CAMPO != '1'", "YELLOW", "Validar Informações", "1")
oBrowse:AddLegend("CAMPO == ' '", "WHITE",  "Faltando Análise",    "1")

//Segunda coluna de legenda
oBrowse:AddLegend("CAMPO_X == 'S'", "GREEN", "Ativo",     "2")
oBrowse:AddLegend("CAMPO_X == 'N'", "RED",   "Bloqueado", "2")
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Exemplo enviado por Alison Lemes;

## Resumo

Método para adicionar legendas em um grid MVC
