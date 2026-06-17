---
title: "Aviso"
function_name: "Aviso"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "avisos-e-alertas"
source_url: "https://terminaldeinformacao.com/knowledgebase/aviso/"
has_examples: true
example_count: 4
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:12"
---

# Aviso

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/aviso/

## Exemplo da Rotina

```advpl
Aviso("Título", "Mensagem", {"Ok"}, 1)
```

## Exemplo 1- Mensagem pequena

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
	Local cMsg    := "Terminal de Informação"
	Local nOpc    := 0

	//Mensagem pequena normal
	Aviso("Título", cMsg, {"OK"}, 1, "Sub Título")

	RestArea(aArea)
Return
```

## Exemplo 2- Mensagem média com vários botões

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
	Local cMsg    := "Terminal de Informação"
	Local nOpc    := 0

	//Mensagem média com botões
	nOpc := Aviso("Título", cMsg, {"Sim", "Não", "Talvez"}, 2, "Sub Título")
	If nOpc == 1
		MsgInfo("Clicou no Sim", "Atenção")
	EndIf

	RestArea(aArea)
Return
```

## Exemplo 3- Mensagem grande com ícone

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
	Local cMsg    := "Terminal de Informação"
	Local nOpc    := 0

	//Mensagem grande com ícone
	Aviso("Título", cMsg, {"OK"}, 3, "Sub Título", , "BR_AZUL")

	RestArea(aArea)
Return
```

## Exemplo 4- Mensagem média que é fechada após 5 segundos

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
	Local cMsg    := "Terminal de Informação"
	Local nOpc    := 0

	//Mensagem média que é fechada após 5 segundos
	Aviso("Título", cMsg, {"OK"}, 2, "Sub Título", , , , 5000)

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

Função que mostra mensagem com opção de fechar a janela após alguns segundos.
