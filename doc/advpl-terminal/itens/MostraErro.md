---
title: "MostraErro"
function_name: "MostraErro"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "avisos-e-alertas"
source_url: "https://terminaldeinformacao.com/knowledgebase/mostraerro/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:15:34"
---

# MostraErro

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/mostraerro/

## Exemplo da Rotina

```advpl
MostraErro()
```

## Exemplo 1- Mostrando mensagem de erro

```advpl
AutoGrLog("Mensagem de Erro")

MostraErro()
```

## Exemplo 2- Salvando mensagem de erro

```advpl
AutoGrLog("Mensagem de Erro")

MostraErro("\x_erros\", "nome_do_arquivo")
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Mostra mensagem de Erro ou salva ela em um diretório
