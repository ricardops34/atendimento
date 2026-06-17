---
title: "GetNewPar"
function_name: "GetNewPar"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/getnewpar/"
has_examples: true
example_count: 2
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:46"
---

# GetNewPar

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/getnewpar/

## Exemplo da Rotina

```advpl
GetNewPar("Parametro", "Conteúdo padrão se não existir o parâmetro", "Código da Filial")
```

## Exemplo 1- Buscando um parâmetro, se não existir atribuindo um conteúdo

```advpl
xConteud := GetNewPar("MV_X_PAR", "Conteudo Default")
```

## Exemplo 2- Buscando um parâmetro, se não existir atribuindo um conteúdo (Filial 02)

```advpl
xConteud := GetNewPar("MV_X_PAR", "Conteudo Default", "02")
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

- TDN

## Resumo

Retorna o conteúdo de um parâmetro conforme a filial passada
