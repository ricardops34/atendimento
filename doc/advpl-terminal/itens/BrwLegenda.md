---
title: "BrwLegenda"
function_name: "BrwLegenda"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "telas-objetos"
source_url: "https://terminaldeinformacao.com/knowledgebase/brwlegenda/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:32"
---

# BrwLegenda

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/brwlegenda/

## Exemplo da Rotina

```advpl
BrwLegenda("Título", "Sub Título", aLegendas)
```

## Exemplo 1- Listagem das cores de legenda (imagens começadas com BR_*)

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
	Local aLegenda := {}

	//Monta as legendas (Cor, Legenda)
	aAdd(aLegenda,{"BR_AMARELO",      "Teste 01"})
	aAdd(aLegenda,{"BR_AZUL",         "Teste 02"})
	aAdd(aLegenda,{"BR_AZUL_CLARO",   "Teste 03"})
	aAdd(aLegenda,{"BR_BRANCO",       "Teste 04"})
	aAdd(aLegenda,{"BR_CANCEL",       "Teste 05"})
	aAdd(aLegenda,{"BR_CINZA",        "Teste 06"})
	aAdd(aLegenda,{"BR_LARANJA",      "Teste 07"})
	aAdd(aLegenda,{"BR_MARROM",       "Teste 08"})
	aAdd(aLegenda,{"BR_MARRON",       "Teste 09"})
	aAdd(aLegenda,{"BR_PINK",         "Teste 10"})
	aAdd(aLegenda,{"BR_PRETO",        "Teste 11"})
	aAdd(aLegenda,{"BR_VERDE",        "Teste 12"})
	aAdd(aLegenda,{"BR_VERDE_ESCURO", "Teste 13"})
	aAdd(aLegenda,{"BR_VERMELHO",     "Teste 14"})
	aAdd(aLegenda,{"BR_VIOLETA"	,     "Teste 15"})

	//Chama a função que monta a tela de legenda
	BrwLegenda("Título", "Sub Título", aLegenda)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Função que monta uma tela com legendas (imagem e descrição).
