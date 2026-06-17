---
title: "aClone"
function_name: "aClone"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "array"
source_url: "https://terminaldeinformacao.com/knowledgebase/aclone/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:37"
---

# aClone

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/aclone/

## Exemplo da Rotina

```advpl
aClone(aOrigem)
```

## Exemplo 1- Clonagem de um Array e mostrando o conteúdo original e do clone

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*/{Protheus.doc} zTeste
Função de Teste
@type function
@author Terminal de Informação
@since 13/11/2016
@version 1.0
	@example
	u_zTeste()
/*/

User Function zTeste()
	Local aArea  := GetArea()
	Local aArray := {}
	Local aOutro := {}

	//Adicionando elementos na matriz
	aAdd(aArray, "Daniel")
	aAdd(aArray, "João")
	aAdd(aArray, "Gabriel")
	aAdd(aArray, "Fernando")

	//Clona o Array em Outro
	aOutro := aClone(aArray)

	//Muda o primeiro elemento do Array Clonado
	aOutro[1] := "Daniel Atilio"

	//Mostra o primeiro elemento de ambos os Arrays
	Alert(aArray[1]+" - "+aOutro[1])

	RestArea(aArea)
Return
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN
– Universo AdvPL

## Resumo

Função que Clona um Array em Outro criando um novo totalmente diferente (pois se apenas utilizar o := ele não cria um novo Array e utiliza o mesmo da origem).
