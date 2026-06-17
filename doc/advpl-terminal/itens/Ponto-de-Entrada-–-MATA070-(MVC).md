---
title: "Ponto de Entrada – MATA070 (MVC)"
function_name: "Ponto"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mata070-mvc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, links, resumo]
exported_at: "2026-06-03 10:18:03"
---

# Ponto de Entrada – MATA070 (MVC)

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/ponto-de-entrada-mata070-mvc/

## Exemplo do Ponto de Entrada

```advpl
//Bibliotecas
#Include "Protheus.ch"

/*---------------------------------------------------------------------------------------------------------------------------*
 | P.E.:  MATA070                                                                                                            |
 | Desc:  Ponto de entrada MVC no cadastro de Bancos                                                                         |
 | Obs.:  Ao criar um P.E. em MVC com o mesmo nome do ModelDef, deixe o nome do prw com outro nome, por exemplo,             |
 |        MATAXXX_pe.prw                                                                                                     |
 | Ref.:  http://tdn.totvs.com/display/public/mp/Pontos+de+Entrada+para+fontes+Advpl+desenvolvidos+utilizando+o+conceito+MVC |
 *---------------------------------------------------------------------------------------------------------------------------*/

User Function MATA070()
	Local aParam     := PARAMIXB
	Local xRet       := .T.
	Local oObj       := Nil
	Local cIdPonto   := ''
	Local cIdModel   := ''
	Local nOper      := 0
	Local cCampo     := ''
	Local cTipo      := ''

	//Se tiver parâmetros
	If aParam <> NIL
		ConOut("> "+aParam[2])

		//Pega informações dos parâmetros
		oObj     := aParam[1]
		cIdPonto := aParam[2]
		cIdModel := aParam[3]

		//Valida a abertura da tela
		If cIdPonto == "MODELVLDACTIVE"
			nOper := oObj:nOperation

			//Se for Exclusão, não permite abrir a tela
			If nOper == 5
				xRet := .F.
			EndIf

		//Pré configurações do Modelo de Dados
		ElseIf cIdPonto == "MODELPRE"
			xRet := .T.

		//Pré configurações do Formulário de Dados
		ElseIf cIdPonto == "FORMPRE"
			nOper  := oObj:GetModel(cIdPonto):nOperation
			cTipo  := aParam[4]
			cCampo := aParam[5]

			//Se for Alteração
			If nOper == 4
				//Não permite alteração dos campos chave
				If cTipo == "CANSETVALUE" .And. Alltrim(cCampo) $ ("A6_COD.A6_AGENCIA.A6_NUMCON")
					xRet := .F.
				EndIf
			EndIf

		//Adição de opções no Ações Relacionadas dentro da tela
		ElseIf cIdPonto == 'BUTTONBAR'
			xRet := {}
			aAdd(xRet, {"* Titulo 1", "", {|| Alert("Botão 1")}, "Tooltip 1"})
			aAdd(xRet, {"* Titulo 2", "", {|| Alert("Botão 2")}, "Tooltip 2"})
			aAdd(xRet, {"* Titulo 3", "", {|| Alert("Botão 3")}, "Tooltip 3"})

		//Pós configurações do Formulário
		ElseIf cIdPonto == 'FORMPOS'
			xRet := .T.

		//Validação ao clicar no Botão Confirmar
		ElseIf cIdPonto == 'MODELPOS'
			//Se o campo de contato estiver em branco, não permite prosseguir
			If Empty(M->A6_CONTATO)
				Aviso('Atenção', 'Por favor, informe um Contato!', {'OK'}, 03)
				xRet := .F.
			EndIf

		//Pré validações do Commit
		ElseIf cIdPonto == 'FORMCOMMITTTSPRE'

		//Pós validações do Commit
		ElseIf cIdPonto == 'FORMCOMMITTTSPOS'

		//Commit das operações (antes da gravação)
		ElseIf cIdPonto == 'MODELCOMMITTTS'

		//Commit das operações (após a gravação)
		ElseIf cIdPonto == 'MODELCOMMITNTTS'
			nOper := oObj:nOperation

			//Se for inclusão, mostra mensagem de sucesso
			If nOper == 3
				Aviso('Atenção', 'Banco criado com sucesso!', {'OK'}, 03)
			EndIf
		EndIf
	EndIf
Return xRet
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;
– Para pontos de entrada em MVC nesse sentido, crie um prw com outro nome, como por exemplo, MATA070_pe.prw;

## Links

– Pesquisa no TDN

## Resumo

Exemplo do Ponto de Entrada MATA070.
