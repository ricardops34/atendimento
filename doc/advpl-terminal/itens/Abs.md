---
title: "Abs"
function_name: "Abs"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "valores-numericos"
source_url: "https://terminaldeinformacao.com/knowledgebase/abs/"
has_examples: true
example_count: 1
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:35"
---

# Abs

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/abs/

## Exemplo da Rotina

```advpl
Abs(nValor)
```

## Exemplo 1- Mostrando o Valor Absoluto de uma variável com valor negativo

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
	Local aArea   := GetArea()
	Local nValor  := -5
	Local nValAbs := 0

	//Transforma em valor absoluto
	nValAbs := Abs(nValor)

	//Mostra o valor Absoluto
	Alert(nValAbs)

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

Função que retorna o valor absoluto de um valor numérico.
