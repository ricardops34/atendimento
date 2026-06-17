---
title: "VarInfo"
function_name: "VarInfo"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "funcoes-internas"
source_url: "https://terminaldeinformacao.com/knowledgebase/varinfo/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:35"
---

# VarInfo

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/varinfo/

## Exemplo da Rotina

```advpl
VarInfo("Título", xVariavel, , lHtml)
```

## Exemplo 1- Gerando os dados da variável em um arquivo html

```advpl
MemoWrite("C:\SuaPasta\seu_arquivo.html", VarInfo("aSeuArray", aSeuArray))
```

## Exemplo 2- Gerando os dados da variável em um arquivo txt

```advpl
MemoWrite("C:\SuaPasta\seu_arquivo.txt", VarInfo("aSeuArray", aSeuArray, , .F.))
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Retorna os dados de uma variável, mesmo se for Array ou Objeto
