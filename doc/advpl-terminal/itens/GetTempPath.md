---
title: "GetTempPath"
function_name: "GetTempPath"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "s-o-e-funcionalidades"
source_url: "https://terminaldeinformacao.com/knowledgebase/gettemppath/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:52"
---

# GetTempPath

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/gettemppath/

## Exemplo da Rotina

```advpl
GetTempPath()
```

## Exemplo 1- Buscando a pasta e armazenando em uma variável

```advpl
//Buscando a pasta temporária
cPasta := GetTempPath()

//Mostrando a pasta que foi buscada
Alert(cPasta)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Retorna a pasta temporária do sistema operacional (equivalente a %temp%)
