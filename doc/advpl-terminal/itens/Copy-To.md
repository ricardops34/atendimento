---
title: "Copy To"
function_name: "Copy"
source_type: "community"
authority: "supplemental"
doc_type: "knowledgebase_item"
needs_review: true
category_slug: "banco-de-dados"
source_url: "https://terminaldeinformacao.com/knowledgebase/copy/"
has_examples: true
example_count: 2
has_video_reference: true
related_tdn_path: ""
related_tdn_title: ""
section_keys: [assinatura, exemplo, exemplo, video, observacoes, referencias, resumo]
exported_at: "2026-06-03 10:12:52"
---

# Copy To

> Fonte comunitaria: https://terminaldeinformacao.com/knowledgebase/copy/

## Exemplo da Rotina

```advpl
Copy [arquivo] to DESTINO
```

## Exemplo 1- Exportando dados de um alias para o Excel

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
	Local cArqExcel := "teste_sb1.xls"

	//Copiando tabela para o arquivo Excel
	DbSelectArea('SB1')
	Copy To &("\system\"+cArqExcel)

	//Copia o arquivo para a máquina
	__CopyFile("\system\"+cArqExcel, GetTempPath()+cArqExcel)

	//Se não extiver instalado o excel, encerra
	If ! ApOleClient("MsExcel")
		MsgAlert("MsExcel não instalado", "Atenção")
		Return
	EndIf

	//Abre o arquivo do Excel
	oExcelApp := MsExcel():New()
	oExcelApp:WorkBooks:Open(GetTempPath()+cArqExcel)
	oExcelApp:SetVisible(.T.)
	oExcelApp:Destroy()

	RestArea(aArea)
Return
```

## Exemplo 2- Mandando um arquivo para ser impresso em uma porta LPT1

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
	Local cTexto := ""

	//Copiando o aruqivo para uma porta
	cTexto := "teste"
	MemoWrite("c:\teste\arquivo.txt", cTexto)
	Copy File "c:\teste\arquivo.txt" To LPT1

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

Comando que copia informações de um alias / arquivo para outro (ao utilizar Copy File pode se mandar para uma porta, como LPT1).
