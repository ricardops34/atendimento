---
title: "FWNoAccent"
function_name: "FWNoAccent"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwnoaccent/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:29"
---

# FWNoAccent

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwnoaccent/

## Exemplo da Rotina

```advpl
FWNoAccent([Seu texto])
```

## Exemplo 1- Testando os caracteres

```advpl
cVariavel := FWNoAccent("áàâã éèêë íìîï óòõôö úùûü")
//Resultado: aaaa eeee iiii ooooo uuuu
```

## Exemplo 2- Removendo caracteres de uma frase

```advpl
cVariavel := FWNoAccent("A expressão arborização urbana diz respeito aos elementos vegetais de porte arbóreo...")
//Resultado: A expressao arborizacao urbana diz respeito aos elementos vegetais de porte arboreo
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Retira a acentuação de caracteres
