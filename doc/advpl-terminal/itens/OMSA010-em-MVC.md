---
title: "OMSA010 em MVC"
function_name: "OMSA010"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "pontos-de-entrada"
source_url: "https://terminaldeinformacao.com/knowledgebase/omsa010-em-mvc/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [exemplo, observacoes, resumo]
exported_at: "2026-06-03 10:15:59"
---

# OMSA010 em MVC

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/omsa010-em-mvc/

## Exemplo 1- Percorre todos os itens da DA1 e efetua a gravação de log

```advpl
//Bibliotecas
#Include "Protheus.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} OMSA010
Exemplo de Ponto de Entrada em MVC - Tabela de Preço
@author zIsMVC
@since 21/06/2018
@version 1.0
@type function
@obs Deixar o nome do prw como: OMSA010_pe.prw
/*/

User Function OMSA010()
	Local aParam     := PARAMIXB
	Local xRet       := .T.
	Local oObj       := Nil
	Local cIdPonto   := ""
	Local cIdModel   := ""
	Local oModelPad  := Nil
	Local oModelGrid := Nil
	Local cProduto   := ""
	Local cTabela    := ""
	Local nValor     := 0
	Local lExcluido  := .F.
	Local nComissao  := 0
	Local nQuantid   := 0
	Local cQryZ12 := ""
	Local nErro

	//Se tiver parâmetros
	If aParam != Nil

		//Pega informações dos parâmetros
		oObj := aParam[1]
		cIdPonto := aParam[2]
		cIdModel := aParam[3]

		//Valida a abertura da tela
		If cIdPonto == "MODELVLDACTIVE"
			xRet := .T.

		//Pré configurações do Modelo de Dados
		ElseIf cIdPonto == "MODELPRE"
			xRet := .T.

		//Pré configurações do Formulário de Dados
		ElseIf cIdPonto == "FORMPRE"
			xRet := .T.

		//Adição de opções no Ações Relacionadas dentro da tela
		ElseIf cIdPonto == "BUTTONBAR"
			xRet := {}

		//Pós configurações do Formulário
		ElseIf cIdPonto == "FORMPOS"
			xRet := .T.

		//Validação ao clicar no Botão Confirmar
		ElseIf cIdPonto == "MODELPOS"
			xRet := .T.

		//Pré validações do Commit
		ElseIf cIdPonto == "FORMCOMMITTTSPRE"

			//Se vier da Grid
			If cIdModel == "DA1DETAIL"
				//Pegando os modelos de dados
				oModelPad  := FWModelActive()
				oModelGrid := oModelPad:GetModel('DA1DETAIL')

				//Pegando as informações do item atual
				cProduto  := oModelGrid:GetValue("DA1_CODPRO")
				cTabela   := oModelPad:GetValue("DA0MASTER", "DA0_CODTAB")
				nValor    := oModelGrid:GetValue("DA1_PRCVEN")
				lExcluido := oModelGrid:IsDeleted()

				//Chama a rotina do log (para gravar alterações de preço)
				u_zDA1Log(cTabela, cProduto, nValor, lExcluido)
			EndIf

		//Pós validações do Commit
		ElseIf cIdPonto == "FORMCOMMITTTSPOS"
			//Se a tabela nao estiver ativa, desativa ela do cadastro auxiliar
			If DA0->DA0_ATIVO == '2'
				cQryZ12 := " UPDATE " + CRLF
				cQryZ12 += " 	Z12010 " + CRLF
				cQryZ12 += " SET " + CRLF
				cQryZ12 += " 	Z12_FLAG = 'N' " + CRLF
				cQryZ12 += " WHERE " + CRLF
				cQryZ12 += " 	Z12_FILIAL = '" + FWxFilial('Z12') + "' " + CRLF
				cQryZ12 += " 	AND Z12_TABPRC = '" + DA0->DA0_CODTAB + "' " + CRLF
				cQryZ12 += " 	AND D_E_L_E_T_ = ' ' " + CRLF

				nErro := TcSqlExec(cQryZ12)
				If nErro != 0
					Alert("Erro na execucao do UPDATE para desativar auxiliar: " + TcSqlError())
				EndIf
			EndIf

		//Commit das operações (antes da gravação)
		ElseIf cIdPonto == "MODELCOMMITTTS"

		//Commit das operações (após a gravação)
		ElseIf cIdPonto == "MODELCOMMITNTTS"

		EndIf
	EndIf
Return xRet
```

## Observações

- Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
- Se tiver sugestões de rotinas, pode entrar em contato;

## Resumo

P.E. no cadastro de tabela de preço
