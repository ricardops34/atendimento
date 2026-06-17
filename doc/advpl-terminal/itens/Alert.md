---
title: "Alert"
function_name: "Alert"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "avisos-e-alertas"
source_url: "https://terminaldeinformacao.com/knowledgebase/alert/"
has_examples: true
example_count: 4
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:11:44"
---

# Alert

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/alert/

## Exemplo da Rotina

```advpl
Alert(xExpressao)
```

## Exemplo 1- Mostrando Mensagem

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

	//Mostra a Mensagem
	Alert("Olá Mundo")

	RestArea(aArea)
Return
```

## Exemplo 2- Mostrando Mensagem concatenando com outro Texto

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

	//Mostra a Mensagem concatenando com outro texto
	Alert("Olá Mundo, agora é "+Time())

	RestArea(aArea)
Return
```

## Exemplo 3- Mostrando Mensagem quebra de linha

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

	//Mostra a Mensagem com quebra de linha
	Alert("Olá Mundo,"+Chr(13)+Chr(10)+"agora é "+Time())

	RestArea(aArea)
Return
```

## Exemplo 4- Mostrando Mensagem com tags HTML

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

	//Mostra a Mensagem com tags HTML
	Alert('
<h1>Atenção:</h1>
Olá <b>Mundo</b>, agora é <font color="#FF0000">'+Time()+'</font>')

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

## Resumo

Função que mostra uma mensagem de Alert na tela (o ícone é um X Vermelho).
