---
title: "MesExtenso"
function_name: "MesExtenso"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "data-e-hora"
source_url: "https://terminaldeinformacao.com/knowledgebase/mesextenso/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:15:14"
---

# MesExtenso

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/mesextenso/

## Exemplo da Rotina

```advpl
MesExtenso(nNumeroMes)
```

## Exemplo 1- Mostrando todos os meses

```advpl
Alert(MesExtenso(1))
Alert(MesExtenso(2))
Alert(MesExtenso(3))
Alert(MesExtenso(4))
Alert(MesExtenso(5))
Alert(MesExtenso(6))
Alert(MesExtenso(7))
Alert(MesExtenso(8))
Alert(MesExtenso(9))
Alert(MesExtenso(10))
Alert(MesExtenso(11))
Alert(MesExtenso(12))
```

## Exemplo 2- Mostrando o mês através de uma variável

```advpl
//Pega a data atual, e o mês dela
dData := Date()
nMes  := Month(dData)

//Pega o mês por extenso
cMesExtenso := MesExtenso(nMes)

//Mostra em uma mensagem
Alert(cMesExtenso)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Retorna o nome do mês por extenso (por exemplo, Janeiro, Fevereiro, Março, Abril, etc)
