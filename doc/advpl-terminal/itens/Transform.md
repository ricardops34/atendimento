---
title: "Transform"
function_name: "Transform"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "manipulacao-de-texto"
source_url: "https://terminaldeinformacao.com/knowledgebase/transform/"
has_examples: true
example_count: 8
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, exemplo, exemplo, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:20:32"
---

# Transform

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/transform/

## Exemplo da Rotina

```advpl
Transform(xValor, cMascara)
```

## Exemplo 1- Transformando valor

```advpl
cVar := Alltrim(Transform(57485.34, "@E 999,999,999.99")) //57.485,34
```

## Exemplo 2- Transformando valor com arredondamento

```advpl
cVar := Alltrim(Transform(57485.3477, "@E 999,999,999.99")) //57.485,35
```

## Exemplo 3- Transformando variável na máscara de CEP

```advpl
cVar := Alltrim(Transform("99999999", "@R 99999-999")) //99999-999
```

## Exemplo 4- Transformando variável na máscara de Telefone / Celular

```advpl
cVar := Alltrim(Transform("00911112222", "@R (99) 9 9999-9999")) //(00) 9 1111-2222
```

## Exemplo 5- Transformando variável na máscara de CPF

```advpl
cVar := Alltrim(Transform("11122233344", "@R 999.999.999-99")) //111.222.333-44
```

## Exemplo 6- Transformando variável na máscara de RG

```advpl
cVar := Alltrim(Transform("11222333A", "@R 99.999.999-X")) //11.222.333-A
```

## Exemplo 7- Transformando variável na máscara de CNPJ

```advpl
cVar := Alltrim(Transform("11222333444455", "@R 99.999.999/9999-99")) //11.222.333/4444-55
```

## Exemplo 8- Transformando variável na máscara de deixar todos os caracteres maiúsculos

```advpl
cVar := Alltrim(Transform("Daniel Atilio", "@!")) //DANIEL ATILIO
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Transforma uma variável utilizando uma Picture (Máscara)
