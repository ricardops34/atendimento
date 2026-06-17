---
title: "Soma1"
function_name: "Soma1"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "outras-funcoes"
source_url: "https://terminaldeinformacao.com/knowledgebase/soma1/"
has_examples: true
example_count: 3
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:20:16"
---

# Soma1

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/soma1/

## Exemplo da Rotina

```advpl
cTexto := Soma1(cTexto)
```

## Exemplo 1- Incrementando o valor 100 para ficar 101

```advpl
cNum := "100"
cNum := Soma1(cNum)
Alert(cNum)
```

## Exemplo 2- Incrementando o valor 9999 para ficar 999A

```advpl
cNum := "9999"
cNum := Soma1(cNum)
Alert(cNum)
```

## Exemplo 3- Incrementando o valor 123AB para ficar 123AC

```advpl
cNum := "123AB"
cNum := Soma1(cNum)
Alert(cNum)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;
- Função e documentação enviada por Caio Henrique;

## Referências

- TDN

## Resumo

Incrementa um valor, e quando chega ao limite, envolve alfabeto (por exemplo, 9999 -> 999A)
