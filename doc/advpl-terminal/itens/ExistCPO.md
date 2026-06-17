---
title: "ExistCPO"
function_name: "ExistCPO"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "funcoes-de-validacao"
source_url: "https://terminaldeinformacao.com/knowledgebase/existcpo/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:13:40"
---

# ExistCPO

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/existcpo/

## Exemplo da Rotina

```advpl
ExistCPO("Alias", "Chave")
```

## Exemplo 1- Verificando se existe um registro na tabela SA1 conforme campos de memória

```advpl
ExistCPO("SA1", M->ZZZ_CODCLI + M->ZZZ_LOJCLI)
```

## Exemplo 2- Verificando se existe um registro na tabela SA1 conforme variáveis criadas

```advpl
ExistCPO("SA1", cCodCli + cLojCli)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Valida se existe um registro em um Alias de Destino
