---
title: "Separa"
function_name: "Separa"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/separa/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:08"
---

# Separa

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/separa/

## Exemplo da Rotina

```advpl
aDados := Separa([Texto], [Caracter de Quebra], [Considera espaços em branco])
```

## Exemplo 1- Separando considerando espaços em branco

```advpl
cExpressao := "Daniel;Atilio;Terminal; ;Bauru;Teste;;"
aDad1  := Separa(cExpressao, ';', .T.) //Array com 8 Colunas Daniel, Atilio, Terminal, "", Bauru, Teste, "", ""
```

## Exemplo 2- Separando sem considerar espaços em branco

```advpl
cExpressao := "Daniel;Atilio;Terminal; ;Bauru;Teste;;"
aDad2  := Separa(cExpressao, ';', .F.) //Array Com 6 Colunas Daniel, Atilio, Terminal, "", Bauru, Teste
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Quebra um texto transformando em um array (com opção de considerar colunas vazias)
