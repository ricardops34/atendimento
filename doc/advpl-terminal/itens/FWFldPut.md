---
title: "FWFldPut"
function_name: "FWFldPut"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "mvc"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwfldput/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:14:16"
---

# FWFldPut

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwfldput/

## Exemplo da Rotina

```advpl
FwFldPut(cCampo, cConteudo)
```

## Exemplo 1- Insere um conteúdo em um campo

```advpl
cCampo    := "BM_DESC"
cConteudo := "Descricao Teste"

FwFldPut(cCampo, cConteudo)
```

## Exemplo 2- Força a inserção de um conteúdo em um campo

```advpl
cCampo    := "BM_DESC"
cConteudo := "Descricao Teste"

FwFldPut(cCampo, cConteudo, , , , .T.)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Insere um conteúdo em um campo na tela
