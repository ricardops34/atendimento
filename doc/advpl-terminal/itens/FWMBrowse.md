---
title: "FWMBrowse"
function_name: "FWMBrowse"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "cadastros"
source_url: "https://terminaldeinformacao.com/knowledgebase/fwmbrowse/"
has_examples: true
example_count: 4
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, exemplo, exemplo, video, observacoes, resumo]
exported_at: "2026-06-03 10:14:23"
---

# FWMBrowse

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/fwmbrowse/

## Exemplo da Rotina

```advpl
oBrowse := FWMBrowse():New()
```

## Exemplo 1- Criando browse comum

```advpl
User Function zTeste()
	Local aArea   := GetArea()
	Local cFunBkp := FunName()
	Local oBrowse

	//Setando o nome da função, para a função customizada
	SetFunName("zTeste")

	//Instânciando FWMBrowse, setando a tabela, a descrição e ativando a navegação
	oBrowse := FWMBrowse():New()
	oBrowse:SetAlias("Z42")
	oBrowse:SetDescription(cTitulo)
	oBrowse:Activate()

	//Voltando o nome da função
	SetFunName(cFunBkp)

	RestArea(aArea)
Return Nil
```

## Exemplo 2- Criando browse com legenda

```advpl
User Function zTeste()
	Local aArea   := GetArea()
	Local cFunBkp := FunName()
	Local oBrowse

	//Setando o nome da função, para a função customizada
	SetFunName("zTeste")

	//Instânciando FWMBrowse, setando a tabela, a descrição
	oBrowse := FWMBrowse():New()
	oBrowse:SetAlias("Z42")
	oBrowse:SetDescription(cTitulo)

	//Adicionando legendas (alguns exemplos - PINK, WHITE, GRAY, YELLOW, ORANGE, BLACK, BLUE)
	oBrowse:AddLegend( "Z42->Z42_TIPO == '1'", "GREEN",  "Registro do Tipo 1" )
    oBrowse:AddLegend( "Z42->Z42_TIPO == '2'", "RED",    "Registro do Tipo 2" )

	//Ativando a navegação
	oBrowse:Activate()

	//Voltando o nome da função
	SetFunName(cFunBkp)

	RestArea(aArea)
Return Nil
```

## Exemplo 3- Criando browse com filtro

```advpl
User Function zTeste()
	Local aArea   := GetArea()
	Local cFunBkp := FunName()
	Local oBrowse

	//Setando o nome da função, para a função customizada
	SetFunName("zTeste")

	//Instânciando FWMBrowse, setando a tabela, a descrição
	oBrowse := FWMBrowse():New()
	oBrowse:SetAlias("Z42")
	oBrowse:SetDescription(cTitulo)

	//Filtrando os dados
	oBrowse:SetFilterDefault("Z42->Z42_TIPO != '1'")

	//Ativando a navegação
	oBrowse:Activate()

	//Voltando o nome da função
	SetFunName(cFunBkp)

	RestArea(aArea)
Return Nil
```

## Exemplo 4- Criando browse com tabela temporária

```advpl
User Function zTeste()
	Local aArea       := GetArea()
	Local oBrowse
	Local cFunBkp     := FunName()
	Local cArquivo    := "\teste"+GetDBExtension()
	Local cArqs       := ""
	Local aStrut      := {}
	Local aBrowse     := {}
	Local aSeek       := {}
	Local aIndex      := {}
	Private cAliasTmp := "CADTMP"

	//Pode se usar também a FWTemporaryTable

	//Criando a estrutura que terá na tabela
	aAdd(aStrut, {"TMP_COD", "C", 06, 0} )
	aAdd(aStrut, {"TMP_DES", "C", 50, 0} )
	aAdd(aStrut, {"TMP_VAL", "N", 10, 2} )
	aAdd(aStrut, {"TMP_DAT", "D", 08, 0} )

	//Se o arquivo dbf / ctree existir, usa ele
	If Select(cAliasTmp) == 0
		If File(cArquivo)
			DbUseArea(.T., "DBFCDX", cArquivo, cAliasTmp, .T., .F.)

		//Senão, cria uma temporária
		Else
			//Criando a temporária
			cArqs := CriaTrab( aStrut, .T. )
			DbUseArea(.T., "DBFCDX", cArqs, cAliasTmp, .T., .F.)

			MsgInfo("Arquivo criado '"+cArqs+GetDBExtension()+"'", "Atenção")
		EndIf
	EndIf

	//Definindo as colunas que serão usadas no browse
	aAdd(aBrowse, {"Codigo",    "TMP_COD", "C", 06, 0, "@!"})
	aAdd(aBrowse, {"Descricao", "TMP_DES", "C", 50, 0, "@!"})
	aAdd(aBrowse, {"Valor",     "TMP_VAL", "N", 10, 0, "@E 9,999,999.99"})
	aAdd(aBrowse, {"Data",      "TMP_DAT", "D", 08, 0, "@D"})

	SetFunName("zTmpCad")

	aAdd(aIndex, "TMP_COD" )

	//Criando o browse da temporária
	oBrowse := FWMBrowse():New()
	oBrowse:SetAlias(cAliasTmp)
	oBrowse:SetQueryIndex(aIndex)
	oBrowse:SetTemporary(.T.)
	oBrowse:SetFields(aBrowse)
	oBrowse:DisableDetails()
	oBrowse:SetDescription(cTitulo)
	oBrowse:Activate()

	SetFunName(cFunBkp)
	RestArea(aArea)
Return Nil
```

## Exemplo em Vídeo

Clique nesse link para ver um exemplo em Vídeo da nossa Maratona de Exemplos.

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;

– Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

Cria um browse para cadastros
