---
title: "GetArea"
function_name: "GetArea"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/getarea/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:40"
---

# GetArea

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/getarea/

## Exemplo da Rotina

```advpl
aArea := GetArea()
```

## Exemplo 1- Armazenando dados de dois alias, e depois restaurando eles

```advpl
//Pegando dados dos alias abertos em memória
	aArea   := GetArea()
	aAreaB1 := SB1->(GetArea())

	//Mostrando os dados da área capturada
	Alert(aArea[1]) //Alias
	Alert(aArea[2]) //Índice
	Alert(aArea[3]) //RecNo

	//Restaurando os dados, na sequência inversa da que foi capturada
	RestArea(aAreaB1)
	RestArea(aArea)
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Armazena dados de um alias em um array, que pode ser restaurado depois com a função RestArea
