---
title: "CriaTrab"
function_name: "CriaTrab"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/criatrab/"
has_examples: true
example_count: 1
has_video_reference: false
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:55"
---

# CriaTrab

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/criatrab/

## Exemplo da Rotina

```advpl
cArq := CriaTrab(aEstruturaTabela, lNova)
```

## Exemplo 1- Criação de tabela temporária

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
	Local aArea     := GetArea()
	Local cAliasTmp := "TMP_"+RetCodUsr()
	Local cFiles
	Local cMark     := "OK"
	Local aStruTmp  := {}
	Local cTexto    := ""

	//Adicionando a Estrutura (Campo, Tipo, Tamanho, Decimal)
	aStruTmp:={}
	aAdd(aStruTmp,{ "TMP_COD",   "C", 005, 0})
	aAdd(aStruTmp,{ "TMP_NOME",  "C", 050, 0})
	aAdd(aStruTmp,{ "TMP_NASC",  "D", 008, 0})
	aAdd(aStruTmp,{ "TMP_IDADE", "N", 003, 0})

	//Criando tabela temporária
	cFiles := CriaTrab( aStruTmp, .T. )
	dbUseArea( .T.,"DBFCDX", cFiles, cAliasTmp, .T., .F. )

	//Gerando o registro 1
	RecLock(cAliasTmp,.T.)
		TMP_COD   := "00001"
		TMP_NOME  := "Daniel Atilio"
		TMP_NASC  := sToD("19930712")
		TMP_IDADE := 22
	(cAliasTmp)->(MsUnlock())

	//Gerando o registro 2
	RecLock(cAliasTmp,.T.)
		TMP_COD   := "00002"
		TMP_NOME  := "Daniel Hudson"
		TMP_NASC  := sToD("19830712")
		TMP_IDADE := 32
	(cAliasTmp)->(MsUnlock())

	//Gerando o registro 3
	RecLock(cAliasTmp,.T.)
		TMP_COD   := "00003"
		TMP_NOME  := "Daniel"
		TMP_NASC  := sToD("19730712")
		TMP_IDADE := 42
	(cAliasTmp)->(MsUnlock())

	//Percorre os registros e monta mensagem de texto
	(cAliasTmp)->(DbGoTop())
	While !(cAliasTmp)->(EoF())
		cTexto += (cAliasTmp)->TMP_COD+"-> "+Alltrim((cAliasTmp)->TMP_NOME)+", nascido em "+dToC((cAliasTmp)->TMP_NASC)+" ("+cValToChar((cAliasTmp)->TMP_IDADE)+" anos)"+Chr(13)+Chr(10)

		(cAliasTmp)->(DbSkip())
	EndDo
	Aviso('Atenção', cTexto, {'Ok'}, 02)

	//Se tiver aberto o alias, fecha e exclui o temporário
	If Select(cAliasTmp)>0
		(cAliasTmp)->(DbCloseArea())
	EndIf
	fErase(cAliasTmp + GetDBExtension())

	RestArea(aArea)
Return
```

## Observações

– Caso tenha dúvidas ou problemas com os exemplos, entre em contato;
– Se tiver sugestões de rotinas, pode entrar em contato;

## Referências

– TDN

## Resumo

Função que cria um novo arquivo de trabalho / tabela.
