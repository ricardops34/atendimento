---
title: "ReadVar"
function_name: "ReadVar"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "telas-objetos"
source_url: "https://terminaldeinformacao.com/knowledgebase/readvar/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:19:55"
---

# ReadVar

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/readvar/

## Exemplo da Rotina

```advpl
ReadVar()
```

## Exemplo 1- Mostrando o campo e o conteúdo

```advpl
cCampo   := ReadVar()
xConteud := &(ReadVar())

MsgInfo("Campo: " + cCampo + ", Conteúdo: " + cValToChar(xConteud), "Atenção")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Fornece o nome da variável do Get / Campo atual
